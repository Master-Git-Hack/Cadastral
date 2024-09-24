from datetime import datetime, timezone
from typing import Any, Dict, Optional

from fastapi import Depends
from jose import ExpiredSignatureError, JWTError, jwt
from sqlmodel import Field, Session, SQLModel

from .. import config, database


class Usuario(SQLModel, table=True):
    """Modelo de usuarios utilizando SQLModel"""

    __tablename__ = "usuarios"  # No es estrictamente necesario, SQLModel usa el nombre de la clase por defecto
    __table_args__ = {"extend_existing": True}
    id: Optional[int] = Field(default=None, primary_key=True)
    usuario: str = Field(sa_column_kwargs={"unique": True})
    grupo: Optional[int] = Field(default=None)
    nombre: Optional[str] = Field(default=None)
    iniciales: Optional[str] = Field(default=None)
    contrasenia: Optional[str] = Field(default=None)
    estatus: Optional[int] = Field(default=1)
    revisor: Optional[str] = Field(default=None)


class Usuarios(Template):
    # def __init__(self, db) -> None:
    #     super().__init__(Model=Model, db=db, Schema=Schema)

    def encode(
        self,
        id: Optional[int] = None,
    ) -> Optional[str]:
        """Generate the auth token.
        Args:
            _id (int): User id.
        Returns:
            response (tuple): Tuple of tokens.
        """
        if id is not None:
            self.Current = self.get(id=id)
        if self.Current is None:
            return None
        user = self.dict()

        return jwt.encode(
            {
                "exp": datetime.now(timezone.utc) + config.SECRETS.EXPIRATION_TIME,
                "iat": datetime.now(timezone.utc),
                "sub": str(user.id),
            },
            config.SECRETS.KEY,
            algorithm=config.SECRETS.ALGORITHM,
        )

    @staticmethod
    def required(token: Annotated[str, Depends(config.OAUTH2)]) -> Optional[Dict]:
        """Decode the auth token.
        Args:
            _authorize (AuthJWT): AuthJWT object.
        Returns:
            response (User): The current user or None.
        """

        try:
            # Intentar decodificar el token JWT
            data = jwt.decode(
                token,
                config.SECRETS.KEY,
                algorithms=[config.SECRETS.ALGORITHM],
            )
            return data
        except ExpiredSignatureError:
            # Si el token ha expirado
            print("Token has expired")
            return None
        except JWTError:
            # Otros errores relacionados con JWT
            print("Invalid token")
            return None

    def verify_password(self, password: str, username: Optional[str] = None) -> bool:
        if username is not None:
            self.Current = self.filter(usuario=username)
        if self.Current is None:
            return False

        password, *_ = self.db.query(func.valuaciones.public.sha1(password)).one()
        return self.Current.contrasenia == password
