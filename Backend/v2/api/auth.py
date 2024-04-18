"""
Handle AUTH endpoints.
create a route object to handle the authentication endpoints.
exports a route object to be used in the main app.

Methods:
- sign_in: sign in a user in the system
- sign_up: sign up a user in the system
- sign_out: sign out a user in the system

Author: Einar Jhordany Serna Valdivia
Version: 1.0.0
Date: November 7th, 2022
"""

from fastapi import APIRouter, Depends, Request
from fastapi.security import HTTPBasic, HTTPBasicCredentials, HTTPBearer
from fastapi_jwt_auth import AuthJWT
from sqlalchemy.orm import Session

from .. import database, logger
from ..middlewares import Middlewares as __Middlewares
from ..middlewares.auth import denylist
from ..models.usuarios import Usuarios

__response = __Middlewares.Responses()


bearer = HTTPBearer()
__User = Usuarios
auth = APIRouter(
    prefix="/auth",
    tags=["Auth"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

# Security dependency for basic authentication
security = HTTPBasic()


@auth.get("/sign-in")
async def sign_in(
    db: Session = Depends(database.valuaciones),
    credentials: HTTPBasicCredentials = Depends(security),
):
    # credentials = await request.json()

    username = credentials.username
    password = credentials.password

    try:
        user = __User(db=db)
        if user.filter(usuario=username) is None:
            return __response.error(status_code=404, message="Usuario no encontrado")
        if user.current.estatus == 0:
            return __response.error(status_code=401, message="Usuario inactivo")
        if not user.check_password(password):
            return __response.error(status_code=401, message="Credenciales Incorrectas")
        if (token := user.encode()) is None:
            return __response.error(
                status_code=422, message="No se pudo generar el token"
            )

        return __response.success(
            message=f"Bienvenido {user.current.nombre}!",
            data=dict(
                username=user.current.usuario,
                name=user.current.nombre,
                reviewer=user.current.revisor,
                group=user.current.grupo,
            ),
            headers=dict(Authorization=token),
        )

    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@auth.delete("/sign-out")
async def sing_out(
    authorize: AuthJWT = Depends(),
    _: HTTPBasicCredentials = Depends(bearer),
):
    """Sign out a user in the system
    Args:
        request (Request): request object received
        authorize (AuthJWT): Authorization. Defaults to Depends().
    Returns:
        Dict: response
    """
    try:
        authorize.jwt_required()
        __token = authorize.get_raw_jwt()["jti"]
        denylist.add(__token)
        if not __token in denylist:
            return __response.error(error_message="0003")

        return __response.success(message="Sesión cerrada correctamente")
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))
