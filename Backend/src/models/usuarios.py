from base64 import b64decode
from typing import Any, Dict, Optional

from flask_jwt_extended import create_access_token
from sqlalchemy import BigInteger, Column, Integer, SmallInteger, String, func

from .. import config, database
from . import Template

secure = config.bcrypt


class Model(database.BASE):
    __tablename__ = "usuarios"

    id = Column(BigInteger, primary_key=True)
    usuario = Column(String, unique=True)
    grupo = Column(Integer)
    nombre = Column(String)
    iniciales = Column(String)
    contrasenia = Column(String)
    estatus = Column(SmallInteger, default=1)
    revisor = Column(String, nullable=True)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


class Usuarios(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)

    def check_password(self, password: str, username: Optional[str] = None):
        if username is not None:
            self.current = self.filter(usuario=username)
        if self.current is None:
            return False

        password, *_ = self.db.query(func.valuaciones.public.sha1(password)).one()
        return self.current.contrasenia == password

    def enconde(self, username: Optional[str] = None) -> Optional[str]:
        if username is not None:
            self.current = self.filter(usuario=username)
        if self.current is None:
            return None
        return create_access_token(identity=self.current)
