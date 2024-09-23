from typing import Any, Dict, Generator, Iterable, List, Optional, Union
from warnings import catch_warnings, simplefilter

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.exc import SAWarning
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker

from .. import config


class Instance:
    BASE = None
    URIS = {}
    ENGINES = {}
    SESSIONS = {}

    def dynamic_method(self, db_name: str) -> Session:
        __Current = self.SESSIONS[db_name]()
        try:
            yield __Current
        finally:
            __Current.close()

    def __new__(cls):
        cls.BASE = declarative_base()
        names = config.SECRETS.DB_CLIENTS
        cls.URIS = {name: f"{config.SECRETS.DB_URI}/{name}" for name in names}
        cls.ENGINES = {name: create_engine(cls.URIS[name]) for name in names}
        cls.SESSIONS = {
            name: sessionmaker(
                autocommit=False, autoflush=False, bind=cls.ENGINES[name]
            )
            for name in names
        }

        return super().__new__(cls)

    def __init__(self) -> None:
        for db_name in self.SESSIONS.keys():
            setattr(self, db_name, self.dynamic_func.__get__(self))

    def get_db(self, db_name: str) -> Session:
        __Current = self.SESSIONS[db_name]()
        try:
            return __Current
        finally:
            __Current.close()

    def execute_query(self, db_name: str, query: str):
        engine = self.ENGINES.get(db_name)
        if engine:
            with engine.connect() as connection:
                result = connection.execute(text(query))
                return result.fetchall()
        else:
            raise ValueError(f"Database '{db_name}' not found.")


class Template:
    Model: object = None
    Schema = None
    Current: Optional[object] = None

    def __init__(
        self,
        Model,
        Schema,
        db: Session,
    ) -> None:
        self.Model = Model
        self.db = db
        self.Schema = Schema
        self.__check_attr()

    def __check_attr(self):
        if self.Model is None:
            print("----------> Model is not defined:\n")
            return False
        return True

    def __enter__(self):
        if self.__check_attr():
            return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.Model = None
        self.Schema = None
        self.Current = None

    def __call__(self) -> Any:
        return self.Current

    def get(self, id: int, dict: bool = False, **kwargs) -> Optional[object]:
        """
        Get a record by id
        Args:
            id (int): The id of the record
            dict (bool): Whether to return a dictionary or an object
            exclude (list): List of fields to exclude
        Returns:
            object: The record
        """
        self.__check_attr()
        try:
            self.Current = self.db.query(self.Model).get(id)
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.Current = None
        if dict:
            return self.dict(**kwargs)
        return self.Current

    def filter(
        self, dict: bool = False, excludes: Optional[List[str]] = None, **kwargs
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
            self.Current = self.db.query(self.Model).filter_by(**kwargs).one_or_none()
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.Current = None
        if dict:
            return self.dict(excludes=excludes)
        return self.Current

    def get_first(
        self, dict: bool = False, excludes: Optional[List[str]] = None, **kwargs
    ):
        self.__check_attr()
        try:
            self.Current = (
                self.db.query(self.Model)
                .filter_by(**kwargs)
                .order_by(self.Model.id.asc())
                .one_or_none()
            )
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.Current = None
        if dict:
            return self.dict(excludes=excludes)
        return self.Current

    def get_last(
        self, dict: bool = False, excludes: Optional[List[str]] = None, **kwargs
    ):
        self.__check_attr()
        try:
            self.Current = (
                self.db.query(self.Model)
                .filter_by(**kwargs)
                .order_by(self.Model.id.desc())
                .one_or_none()
            )
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.Current = None

        if dict:
            return self.dict(excludes=excludes)
        return self.Current

    def filter_group(
        self, list: bool = False, excludes: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Filter records
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.__check_attr()

        self.Current = self.db.query(self.Model).filter_by(**kwargs).all()

        if list:
            return self.list(excludes=excludes)
        return self.Current

    def filter_raw(self, **kwargs):
        self.__check_attr()
        try:
            return self.db.query(self.Model).filter(**kwargs)
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            return None

    def all(
        self,
        list: bool = False,
        excludes: Optional[List[str]] = None,
    ) -> Optional[object]:
        """
        Get all records
        Returns:
            object: The record
        """
        self.__check_attr()

        self.Current = self.db.query(self.Model).all()

        if list:
            return self.list(excludes=excludes)
        return self.Current

    def create(
        self, dict: bool = False, excludes: Optional[List[str]] = None, **kwargs
    ) -> Optional[object]:
        """
        Create a record
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.__check_attr()

        self.Current = self.Model(**kwargs)
        try:
            self.db.add(self.Current)
            self.db.commit()
            self.db.refresh(self.Current)
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.db.rollback()

            return None
        else:
            if dict:
                return self.dict(excludes=excludes)
            return self.Current

    def update(
        self,
        id: Optional[int] = None,
        dict: bool = False,
        excludes: Optional[List[str]] = None,
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
            self.Current = self.db.query(self.Model).get(id)
        for key, value in kwargs.items():
            setattr(self.Current, key, value)
        try:
            self.db.merge(self.Current)
            self.db.commit()
            self.db.refresh(self.Current)

        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.db.rollback()

            return None
        else:
            if dict:
                self.dict(excludes=excludes)
            return self.Current

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
            self.Current = self.db.query(self.Model).get(id)
        if self.Current is None:
            return None
        try:
            self.db.delete(self.Current)
            self.db.commit()
            self.Current = None
            return self.Current
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.db.rollback()
            return self.Current

    def dict(
        self,
        data: Optional[object] = None,
        includes: Optional[List[str]] = None,
        excludes: Optional[List[str]] = None,
    ) -> Dict:
        if includes and excludes:
            raise ValueError("Use either includes or excludes, not both.")

        # Si se pasa data, se asigna a self.Current
        self.__check_attr()
        if data:
            self.Current = data

        if self.Current is None:
            return {}

        # Filtrar el esquema según incluye/excluye
        schema = self.__apply_includes_excludes(
            (
                self.Schema.from_orm(self.Current)
                if self.Schema
                else {
                    key: value
                    for key, value in vars(self.Current).items()
                    if not key.startswith("_")
                }
            ),
            includes,
            excludes,
        )

        return schema.dict() if hasattr(schema, "dict") else schema

    def __apply_includes_excludes(
        self, schema: Dict, includes: Optional[List[str]], excludes: Optional[List[str]]
    ) -> Dict:
        if excludes:
            # Excluir campos en excludes
            for key in excludes:
                schema.pop(key, None)
        if includes:
            # Solo mantener los campos en includes
            schema = {key: schema.get(key) for key in includes}
        return schema

    def list(
        self,
        data: Optional[object] = None,
        as_generator: bool = False,  # Nuevo parámetro para controlar el tipo de retorno
        **kwargs,
    ) -> Union[List, Generator]:
        self.__check_attr()

        # Si se pasa data, se asigna a self.Current
        if data is not None:
            self.Current = data

        if self.Current is None:
            return [] if not as_generator else self.__empty_generator()

        # Si no es iterable, lo convertimos en una lista con un solo elemento
        if not isinstance(self.Current, Iterable):
            self.Current = [self.Current]

        # Generador que procesa cada registro utilizando la función dict()
        generator: Generator = (
            self.dict(data=record, **kwargs) for record in self.Current
        )

        # Retornar generador o lista según el valor de return_generator
        return generator if as_generator else list(generator)

    def __empty_generator(self) -> Generator:
        yield from ()
