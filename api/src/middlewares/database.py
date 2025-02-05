from itertools import groupby
from typing import Any, Dict, Generator, Iterable, List, Optional, Union

from geoalchemy2 import WKBElement
from geoalchemy2.shape import to_shape
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlmodel import Session, SQLModel, create_engine, select

from .. import DBS, config


class Instance:
    BASE = None
    URIS = {}
    ENGINES = {}
    SESSIONS = {}

    def dynamic_database(self, schema: Optional[str]):
        """Método dinámico para obtener la sesión de la base de datos."""

        def dynamic():
            if schema not in self.ENGINES.keys():
                raise ValueError(f"Database '{schema}' not found.")
            engine = self.ENGINES[schema]
            session = Session(engine)
            self.SESSIONS[schema] = session
            try:
                yield session
            finally:
                session.close()

        return dynamic

    def __new__(cls):
        cls.BASE = declarative_base()

        cls.URIS = {db.name: f"{config.SECRETS.DB_URI}/{db.value}" for db in DBS}
        cls.ENGINES = {db.name: create_engine(cls.URIS[db.name]) for db in DBS}
        cls.SESSIONS = {
            db.name: sessionmaker(
                autocommit=False, autoflush=False, bind=cls.ENGINES[db.name]
            )
            for db in DBS
        }
        return super().__new__(cls)

    def __init__(self):
        for db in DBS:
            setattr(
                self,
                db.name,
                self.dynamic_database(db.name),
            )

    def get_db(self, db: DBS = DBS.CATASTRO_V2) -> Session:
        __current = self.SESSIONS[db.name]()
        try:
            return __current
        finally:
            __current.close()

    def get_all_dbs(self):
        return [db.value for db in DBS]

    def get_all_schemas(self, db: DBS = DBS.CATASTRO_V2) -> list:
        engine = self.ENGINES[db.name]
        with engine.connect() as connection:
            sql = "SELECT schema_name FROM information_schema.schemata;"
            result = connection.execute(text(sql))
            return [row[0] for row in result.fetchall()]

    def get_all_tables(self, db: DBS = DBS.CATASTRO_V2, schema: str = "public"):
        engine = self.ENGINES[db.name]
        with engine.connect() as connection:
            sql = f"SELECT table_name FROM information_schema.tables WHERE table_schema = '{schema}';"
            result = connection.execute(text(sql))
            return [row[0] for row in result.fetchall()]

    def group_by_db(
        self,
        db: Optional[DBS] = None,
        schema: Optional[str] = None,
        table: Optional[str] = None,
    ):
        db_list = [db] if db else DBS
        data = {}
        for db in db_list:
            engine = self.ENGINES[db.name]
            with engine.connect() as connection:
                query = """
                    SELECT table_schema, table_name
                    FROM information_schema.tables
                    WHERE table_type = 'BASE TABLE'
                """
                if schema:
                    query += " AND table_schema = :schema_name"
                if table:
                    query += " AND table_name = :table_name"
                query += " ORDER BY table_schema, table_name;"
                result = connection.execute(
                    text(query), {"schema_name": schema, "table_name": table}
                ).fetchall()
                data[db.value] = {
                    schema: [table for _, table in tables]
                    for schema, tables in groupby(result, lambda x: x[0])
                }
        return data

    def logged_actions(
        self,
        limit: int = 100,
        schema_name: Optional[str] = None,
        table_name: Optional[str] = None,
        user_name: Optional[str] = None,
        action: Optional[str] = None,
    ):
        db = DBS.VALUACIONES
        engine = self.ENGINES[db.name]
        with engine.connect() as connection:
            query = """SELECT 
                schema_name, table_name, user_name, action_tstamp, 'action', original_data, new_data, query, client_addr
                FROM audit.logged_actions
                WHERE (schema_name = :schema_name OR :schema_name IS NULL)
                    AND (table_name = :table_name OR :table_name IS NULL)
                    AND (user_name = :user_name OR :user_name IS NULL)
                    AND (action = :action OR :action IS NULL)
                LIMIT :limit
            """
            result = connection.execute(
                text(query),
                {
                    "schema_name": schema_name,
                    "table_name": table_name,
                    "user_name": user_name,
                    "action": action,
                    "limit": limit,
                },
            )
            return [dict(row) for row in result.mappings().all()]

    def inspect_me(self, db: DBS, schema: str = "valuaciones"):
        with catch_warnings():
            simplefilter("ignore", category=SAWarning)
            engine = self.ENGINES[db.name]
            meta = MetaData()
            meta.reflect(bind=engine, schema=schema)
        return meta.tables.keys()


class Template:
    Model: object = None
    Current: Optional[object] = None
    QUERY = None

    def __init__(
        self,
        Model,
        Session: Session,
    ) -> None:
        self.Model = Model
        self.QUERY = select(self.Model)
        self.Session = Session
        self.__check_attr()

    def __check_attr(self):
        if self.Model is None:
            raise ValueError("Model is not defined.")
        if self.Session is None:
            raise ValueError("Session is not defined.")

    def __enter__(self):
        if self.__check_attr():
            return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.Model = None
        self.Current = None

    def __call__(self) -> Any:
        return self.Current

    def get(self, id: int, **kwargs) -> Optional[object]:
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
            with self.Session as session:
                query = self.QUERY.filter_by(id=id)
                self.Current = session.exec(query).one_or_none()
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.Current = None
        return self.Current

    def filter(self, **kwargs) -> Optional[object]:
        """
        Filter records
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.__check_attr()
        try:
            with self.Session as session:
                query = self.QUERY.filter_by(**kwargs)
                self.Current = session.exec(query).one_or_none()
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.Current = None
        return self.Current

    def get_order_by(self, order_by: str = "asc", **kwargs) -> Optional[object]:
        self.__check_attr()
        if order_by != "asc":
            order_by = "desc"
        orders = {"asc": self.Model.id.asc(), "desc": self.Model.id.desc()}
        order = orders.get(order_by, self.Model.id.asc())
        try:
            with self.Session as session:
                query = self.QUERY.filter_by(**kwargs).order_by(order)
                self.Current = session.exec(query).one_or_none()
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.Current = None
        return self.Current

    def filter_group(
        self, offset: Optional[int] = None, limit: Optional[int] = None, **kwargs
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
            with self.Session as session:
                query = self.QUERY.filter_by(**kwargs)
                if offset is not None:
                    query = query.offset(offset)
                if limit is not None:
                    query = query.limit(limit)
                self.Current = session.exec(query).all()
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.Current = None
        return self.Current

    def all(
        self,
        offset: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Optional[object]:
        """
        Get all records
        Returns:
            object: The record
        """
        self.__check_attr()
        try:
            with self.Session as session:
                query = self.QUERY
                if offset is not None:
                    query = query.offset(offset)
                if limit is not None:
                    query = query.limit(limit)
                self.Current = session.exec(query).all()
        except Exception as e:
            print(f"----------> Unexpected error:\n {str(e)}")
            self.Current = None
        return self.Current

    def create(self, **kwargs) -> Optional[object]:
        """
        Create a record
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            object: The record
        """
        self.__check_attr()

        with self.Session as session:
            try:
                self.Current = self.Model(**kwargs)
                if self.Current not in session:
                    self.Current = session.merge(self.Current)

                session.flush()
                session.commit()
                session.refresh(self.Current)
                if self.Current not in session:
                    self.Current = session.merge(self.Current)
            except Exception as e:
                print(f"----------> Unexpected error:\n {str(e)}")
                session.rollback()
                self.Current = None
        return self.Current

    def update(
        self,
        id: Optional[int] = None,
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
            self.get(id=id)
        if self.Current is None:
            return None
        with self.Session as session:
            if self.Current not in session:
                self.Current = session.merge(self.Current)
            try:
                for key, value in kwargs.items():
                    setattr(self.Current, key, value)
                session.flush()
                session.commit()
                session.refresh(self.Current)
            except Exception as e:
                print(f"----------> Unexpected error:\n {str(e)}")
                session.rollback()
                self.Current = None
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
            self.get(id=id)
        if self.Current is None:
            return None
        with self.Session as session:
            try:
                if self.Current not in session:
                    self.Current = session.merge(self.Current)
                session.delete(self.Current)
                session.flush()
                session.commit()
                session.refresh(self.Current)
                return None
            except Exception as e:
                print(f"----------> Unexpected error:\n {str(e)}")
                session.rollback()
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
        return self.__apply_includes_excludes(
            self.Current,
            includes,
            excludes,
        )

    def __convert_geometry_to_geojson(self, wkb_element):
        geom = to_shape(wkb_element)  # Convertimos a una geometría Shapely
        return geom.__geo_interface__

    def __apply_includes_excludes(
        self, data, includes: Optional[List[str]], excludes: Optional[List[str]]
    ) -> Dict:
        schema = {
            key: (
                value
                if not isinstance(value, WKBElement)
                else self.__convert_geometry_to_geojson(value)
            )
            for key, value in data.__dict__.items()
            if not key.startswith("_")
        }
        if excludes:
            # Excluir campos en excludes
            schema = {
                key: value for key, value in schema.items() if key not in excludes
            }
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
