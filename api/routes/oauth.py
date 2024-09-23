from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import database,middlewares

from ..middlewares.auth import denylist
from ..models.users import Users
response = middlewares.RESPONSES()

auth = APIRouter(
    prefix="/oauth2",
    tags=["OAuth2"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@auth.post("/sign-in")
async def sign_in(
    db=Depends(database.get_db),
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    client:str
):
    if client is None:
        return response.error(status_code=401, message="Cliente no encontrado")
    
    username, password = form_data.username, form_data.password

    try:
        user = Users(db=db, Schema="BASE")
        if user.filter(email=username) is None:
            return response.error(status_code=404, message="Usuario no encontrado")
        if user.current.estatus == 0:
            return response.error(status_code=401, message="Usuario inactivo")
        if not user.check_password(password):
            return response.error(status_code=401, message="Credenciales Incorrectas")
        if (token := user.encode()) is None:
            return response.error(
                status_code=422, message="No se pudo generar el token"
            )

        return response.success(
            message=f"Bienvenido {user.current.nombre}!",
            data=user.dict(),
            headers={"access_token": token},
        )

    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return response.error(message=str(e))
