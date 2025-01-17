from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from .. import config, database, middlewares
from ..models.usuarios import Usuarios

response = middlewares.RESPONSES()

oauth2 = APIRouter(
    prefix="/oauth2",
    tags=["OAuth2"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@oauth2.post(
    "/sign-in",
    response_model=Usuarios.response_model,
)
async def sign_in(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    Session=Depends(database.VALUACIONES),
):
    username, password = form_data.username, form_data.password

    try:
        user = Usuarios(Session)
        if user.filter(usuario=username) is None:
            return response.error(status_code=404, message="Usuario no encontrado")
        if user.Current.estatus == 0:
            return response.error(status_code=401, message="Usuario inactivo")
        if not user.verify_password(password):
            return response.error(status_code=401, message="Credenciales Incorrectas")
        if (token := user.encode()) is None:
            return response.error(
                status_code=422, message="No se pudo generar el token"
            )

        return response.success(
            message=f"Bienvenido {user.Current.nombre}!",
            data=user.dict(excludes=["contrasenia"]),
            headers={"Authorization": token},
        )

    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return response.error(message=str(e))


@oauth2.post("/token", include_in_schema=False)
async def is_auth(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    Session=Depends(database.VALUACIONES),
):
    username, password = form_data.username, form_data.password

    try:
        user = Usuarios(Session)
        if user.filter(usuario=username) is None:
            return response.error(status_code=404, message="Usuario no encontrado")
        if user.Current.estatus == 0:
            return response.error(status_code=401, message="Usuario inactivo")
        if not user.verify_password(password):
            return response.error(status_code=401, message="Credenciales Incorrectas")
        if (token := user.encode()) is None:
            return response.error(
                status_code=422, message="No se pudo generar el token"
            )
        if token in blacklist:
            return response.error(status_code=401, message="Token inválido")
        return response.success(
            content={"access_token": token, "token_type": "bearer", "scopes": ""},
        )

    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return response.error(message=str(e))


blacklist = set()


@oauth2.delete("/sign-out")
async def sign_out(token: Annotated[str, Depends(config.OAUTH2)]):
    try:
        blacklist.add(token)
        return response.success(message="Sesión cerrada exitosamente")
    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return response.error(message=str(e))
