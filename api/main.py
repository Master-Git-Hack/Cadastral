from . import config, create_app, database

app = create_app()
from datetime import datetime, timezone
from typing import Any, Dict, Optional

from fastapi import Depends
from jose import ExpiredSignatureError, JWTError, jwt
from sqlmodel import (
    Field,
    Session,
    SQLModel,
    create_engine,
    declarative_base,
    sessionmaker,
    text,
)


class Usuario(SQLModel, table=True):
    """Modelo de usuarios utilizando SQLModel"""

    __tablename__ = "usuarios"  # No es estrictamente necesario, SQLModel usa el nombre de la clase por defecto

    id: Optional[int] = Field(default=None, primary_key=True)
    usuario: str = Field(sa_column_kwargs={"unique": True})
    grupo: Optional[int] = Field(default=None)
    nombre: Optional[str] = Field(default=None)
    iniciales: Optional[str] = Field(default=None)
    contrasenia: Optional[str] = Field(default=None)
    estatus: Optional[int] = Field(default=1)
    revisor: Optional[str] = Field(default=None)


@app.get("/usuarios")
async def get_users():
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

    class Usuario(SQLModel, table=True):
        """Modelo de usuarios utilizando SQLModel"""

        __tablename__ = "usuarios"  # No es estrictamente necesario, SQLModel usa el nombre de la clase por defecto

        id: Optional[int] = Field(default=None, primary_key=True)
        usuario: str = Field(sa_column_kwargs={"unique": True})
        grupo: Optional[int] = Field(default=None)
        nombre: Optional[str] = Field(default=None)
        iniciales: Optional[str] = Field(default=None)
        contrasenia: Optional[str] = Field(default=None)
        estatus: Optional[int] = Field(default=1)
        revisor: Optional[str] = Field(default=None)

    instance = Instance()
    print(instance.__dict__)
