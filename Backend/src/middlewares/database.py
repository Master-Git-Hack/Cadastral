from typing import Any, Dict, List, Optional, Tuple

from fastapi import Depends, FastAPI, HTTPException, status
from marshmallow import ValidationError, fields, post_dump, pre_load
from marshmallow.utils import isoformat, to_iso_date
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, scoped_session, sessionmaker
from sqlalchemy.schema import MetaData

from .. import config, logger
from ..utils.geom_schema import GeometryField


class InstanceDB:
    BASE = None
    URIS = {}
    ENGINES = {}
    SESSIONS = {}

    def __new__(cls):
        cls.BASE = declarative_base()
        names = config.SECRETS.get("DB_NAMES", [])
        cls.URIS = {name: f"{config.PSQL_URI}/{name}" for name in names}
        cls.ENGINES = {name: create_engine(cls.URIS[name]) for name in names}
        cls.SESSIONS = {
            name: sessionmaker(
                autocommit=False, autoflush=False, bind=cls.ENGINES[name]
            )
            for name in names
        }
        return super().__new__(cls)

    def get_db(self, db_name: str = "catastro_v2") -> Session:
        __current = self.SESSIONS[db_name]()
        try:
            return __current
        finally:
            __current.close()

    def valuaciones(
        self,
    ) -> Session:
        __current = self.SESSIONS["valuaciones"]()
        try:
            yield __current
        finally:
            __current.close()

    def catastro_v2(
        self,
    ) -> Session:
        __current = self.SESSIONS["catastro_v2"]()
        try:
            yield __current
        finally:
            __current.close()

    def execute_query(self, db_name: str, query: str):
        engine = self.ENGINES.get(db_name)
        if engine:
            with engine.connect() as connection:
                result = connection.execute(text(query))
                return result.fetchall()
        else:
            raise ValueError(f"Database '{db_name}' not found.")

    def inspect_all_schemas(self, db_name: str = "valuaciones"):
        return [
            {
                "label": schema,
                "code": code,
                "items": [
                    {"label": table.replace(f"{schema}.", ""), "parent": schema}
                    for table in self.inspect_me(db_name=db_name, schema=schema)
                ],
            }
            for code, schema in enumerate(self.get_all_schemas(db_name))
        ]

    def get_all_schemas(self, db_name: str = "valuaciones") -> list:
        engine = self.ENGINES[db_name]
        with engine.connect() as connection:
            sql = "SELECT schema_name FROM information_schema.schemata;"
            result = connection.execute(text(sql))
            return [row[0] for row in result.fetchall()]

    def inspect_me(self, db_name: str, schema: str = "valuaciones"):
        engine = self.ENGINES[db_name]
        meta = MetaData()
        meta.reflect(bind=engine, schema=schema)
        return meta.tables.keys()


def create_schema(
    model,
    schema_args: Optional[List[Tuple[str, Any]]] = None,
    **meta_kwargs: Optional[Dict[str, Any]],
) -> object:
    class Model:
        pass

    Model = model

    class Schema(SQLAlchemyAutoSchema):
        """Class for schema.
        Example:
            >>> Schema().dump(model)->dict
            >>> Schema().load(model)
            >>> Schema(many=True).dump(model)->list
            >>> Schema(many=True).load(model)
        Args:
            SQLAlchemyAutoSchema (class): class for schema.
        Attributes:
            Meta (class): class for schema.
        """

        __geometry_field_name__ = "geom"  # or geom, or shape, or ....
        geom = GeometryField()

        class Meta:
            model = Model
            load_instance = True
            include_relationships = True
            include_fk = True

        def unwrap_feature(self, data):
            """
            Unwrap an individual feature object
            Pull down all the properties field, and then under the geometry
            field name put in the actual geometry data
            """
            if data["type"] != "Feature":
                raise ValidationError("Expecting a Feature object")
            flat = data["properties"]
            flat[self.__geometry_field_name__] = data["geom"]
            return flat

        @pre_load(pass_many=True)
        def unwrap_envelope(self, data, many):
            if "type" not in data:
                raise ValidationError("GeoJSON type could not be found")
            if many and data["type"] != "FeatureCollection":
                raise ValidationError("Expecting a FeatureCollection object")

            if not many:
                return self.unwrap_feature(data)

            return [self.unwrap_feature(feature) for feature in data["features"]]

        def wrap_feature(self, data):
            """
            Wrap the individual feature as a GeoJSON feature object
            """
            feature = data
            if data.get(self.__geometry_field_name__) is not None:
                feature |= {
                    "geom": data.pop(self.__geometry_field_name__).get(
                        "coordinates", [0, 0]
                    ),
                }

            return feature

        @post_dump(pass_many=True)
        def wrap_with_envelope(self, data, many):
            if not many:
                return self.wrap_feature(data)

            return {
                "type": "FeatureCollection",
                "features": [self.wrap_feature(feature) for feature in data],
            }

    if schema_args is not None:
        for key, value in schema_args:
            setattr(Schema, key, value)

    for key, value in meta_kwargs.items():
        if "model" == key:
            continue

        setattr(Schema.Meta, key, value)

    return Schema


class Template:
    model: object = None
    schema = None
    current: Optional[object] = None

    def __init__(
        self, model, db: Session, schema_args: Optional[List] = [], **schema_kwargs
    ) -> None:
        self.model = model
        self.db = db
        self.schema = create_schema(
            self.model, **schema_kwargs, schema_args=schema_args
        )
        self.__check_attr()

    def __check_attr(self):
        if self.model is None:
            logger.debug("----------> Model is not defined:\n")

        if self.schema is None:
            self.schema = create_schema(model=self.model)
        return True

    def __enter__(self):
        if self.__check_attr():
            return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.model = None
        self.schema = None
        self.current = None

    def __call__(self) -> Any:
        return self.current

    def get(self, id: int, to_dict: bool = False, **kwargs) -> Optional[object]:
        """
        Get a record by id
        Args:
            id (int): The id of the record
            to_dict (bool): Whether to return a dictionary or an object
            exclude (list): List of fields to exclude
        Returns:
            object: The record
        """
        self.__check_attr()
        try:
            self.current = self.db.query(self.model).get(id)
        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            self.current = None
        if to_dict:
            return self.to_dict(**kwargs)
        return self.current

    def filter(
        self, to_dict: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Filter records
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.__check_attr()
        try:
            self.current = self.db.query(self.model).filter_by(**kwargs).one_or_none()
        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            self.current = None
        if to_dict or exclude is not None and len(exclude) > 0:
            return self.to_dict(exclude=exclude)
        return self.current

    def get_first(
        self, to_dict: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ):
        self.__check_attr()
        try:
            self.current = (
                self.db.query(self.model)
                .filter_by(**kwargs)
                .order_by(self.model.id.asc())
                .one_or_none()
            )
        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            self.current = None
        if to_dict or exclude is not None and len(exclude) > 0:
            return self.to_dict(exclude=exclude)
        return self.current

    def get_last(
        self, to_dict: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ):
        self.__check_attr()
        try:
            self.current = (
                self.db.query(self.model)
                .filter_by(**kwargs)
                .order_by(self.model.id.desc())
                .one_or_none()
            )
        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            self.current = None

        if to_dict or exclude is not None and len(exclude) > 0:
            return self.to_dict(exclude=exclude)
        return self.current

    def filter_group(
        self, to_list: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Filter records
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.__check_attr()

        self.current = self.db.query(self.model).filter_by(**kwargs).all()

        if to_list or exclude is not None and len(exclude) > 0:
            return self.to_list(exclude=exclude)
        return self.current

    def all(
        self,
        to_list: bool = False,
        exclude: Optional[List[str]] = None,
    ) -> Optional[object]:
        """
        Get all records
        Returns:
            object: The record
        """
        self.__check_attr()

        self.current = self.db.query(self.model).all()

        if to_list or exclude is not None and len(exclude) > 0:
            return self.to_list(exclude=exclude)
        return self.current

    def create(
        self, to_dict: bool = False, exclude: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Create a record
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.__check_attr()

        self.current = self.model(**kwargs)
        try:
            self.db.add(self.current)
            self.db.commit()
            self.db.refresh(self.current)
        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            self.db.rollback()

            return None
        else:
            if to_dict or exclude is not None and len(exclude) > 0:
                return self.to_dict(exclude=exclude)
            return self.current

    def update(
        self,
        id: Optional[int] = None,
        to_dict: bool = False,
        exclude: Optional[List[str]] = None,
        **kwargs,
    ) -> Optional[object]:
        """
        Update a record
        Args:
            id (int): The id of the record
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.__check_attr()

        if id is not None:
            self.current = self.db.query(self.model).get(id)
        for key, value in kwargs.items():
            setattr(self.current, key, value)
        try:
            self.db.merge(self.current)
            self.db.commit()
            self.db.refresh(self.current)

        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            self.db.rollback()

            return None
        else:
            if to_dict or exclude is not None and len(exclude) > 0:
                self.to_dict(exclude=exclude)
            return self.current

    def delete(self, id: Optional[int] = None) -> None:
        """
        Delete a record
        Args:
            id (int): The id of the record
        Returns:
            None
        """
        self.__check_attr()

        if id is not None:
            self.current = self.db.query(self.model).get(id)
        if self.current is None:
            return None
        try:
            self.db.delete(self.current)
            self.db.commit()
            self.current = None
            return self.current
        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            self.db.rollback()
            return self.current

    def to_dict(
        self,
        data: Optional[object] = None,
        exclude: Optional[List[str]] = None,
        **kwargs,
    ) -> Dict:
        self.__check_attr()
        if "many" in kwargs:
            kwargs.pop("many")
        if data is not None:
            self.current = data
        if self.current is None:
            return {}
        if exclude is not None:
            return self.schema(exclude=exclude, **kwargs).dump(self.current)
        return self.schema(**kwargs).dump(self.current)

    def to_list(
        self,
        data: Optional[object] = None,
        exclude: Optional[List[str]] = None,
        **kwargs,
    ) -> List:
        self.__check_attr()
        if data is not None:
            self.current = data
        if self.current is None:
            return []
        if exclude is not None:
            return self.schema(exclude=exclude, many=True, **kwargs).dump(self.current)
        return self.schema(many=True, **kwargs).dump(self.current)
