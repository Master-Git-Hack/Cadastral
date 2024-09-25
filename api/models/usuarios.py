from datetime import datetime, timezone
from typing import Annotated, Any, Dict, Optional

from fastapi import Depends
from jose import ExpiredSignatureError, JWTError, jwt
from sqlalchemy import func
from sqlmodel import Field, Session, SQLModel

from .. import config, database
from ..middlewares.database import Template
from . import response_model


class Model(SQLModel, table=True):
    """Modelo de usuarios utilizando SQLModel"""

    __tablename__ = "usuarios"  # No es estrictamente necesario, SQLModel usa el nombre de la clase por defecto
    __table_args__ = {"extend_existing": True}

    id: int = Field(default=None, primary_key=True)
    usuario: str = Field(sa_column_kwargs={"unique": True})
    grupo: Optional[int] = Field(default=None)
    nombre: Optional[str] = Field(default=None)
    iniciales: Optional[str] = Field(default=None)
    contrasenia: Optional[str] = Field(default=None)
    estatus: Optional[int] = Field(default=1)
    revisor: Optional[str] = Field(default=None)


class Usuarios(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)

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

        return jwt.encode(
            {
                "exp": datetime.now(timezone.utc) + config.SECRETS.EXPIRATION_TIME,
                "iat": datetime.now(timezone.utc),
                "sub": str(self.Current.id),
            },
            config.SECRETS.KEY,
            algorithm=config.SECRETS.ALGORITHM,
        )

    @staticmethod
    def required(
        token: Annotated[str, Depends(config.OAUTH2)],
        Session=Depends(database.valuaciones),
    ) -> Optional[Dict]:
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
            if data.get("sub") is None:
                return None
            user = Usuarios(Session)
            if user.get(id=int(data.get("sub"))) is None:
                return None
            return user.Current
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
        with self.Session as session:
            password, *_ = session.exec(
                func.valuaciones.public.sha1(password)
            ).one_or_none()

        return self.Current.contrasenia == password
