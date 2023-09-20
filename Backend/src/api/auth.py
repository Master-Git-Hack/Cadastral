from base64 import b64decode

from flasgger import swag_from
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from .. import config
from ..controllers.auth import remove_token
from ..models.usuarios import Usuarios
from ..utils.response import Responses

auth: Blueprint = Blueprint("Auth", __name__, url_prefix="/auth")
__swagger: dict = config.API_MODELS.get("auth", {})


@auth.get("/sign-in")
@swag_from(__swagger.get("sign_in", {}))
def sign_in(response=Responses()):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return response.error(
            status_code=401, message="No se encontró la autorización requerida"
        )

    # Check if the Authorization header starts with 'Basic '
    if not auth_header.startswith("Basic "):
        return response.error(status_code=401, message="Tipo de autorization no válida")

    # Decode the base64 encoded credentials
    auth_token = auth_header[len("Basic ") :]
    try:
        decoded_token = b64decode(auth_token).decode()
        username, password = decoded_token.split(":", 1)
    except Exception as e:
        print(e)
        return response.error(status_code=401, message="Credenciales Incorrectas")

    user = Usuarios()
    if user.filter(usuario=username) is None:
        return response.error(status_code=404, message="Usuario no encontrado")
    if user.current.estatus == 0:
        return response.error(status_code=401, message="Usuario inactivo")
    if not user.check_password(password):
        return response.error(status_code=401, message="Credenciales Incorrectas")
    token = user.enconde()
    if token is None:
        return response.error(status_code=422, message="No se pudo generar el token")

    return response.success(
        message=f"Bienvenido {user.current.nombre}!",
        data={
            "username": username,
            "name": user.current.nombre,
            "reviewer": user.current.revisor,
            "group": user.current.grupo,
        },
        headers={"Authorization": token},
    )


@auth.get("/sign-out")
@swag_from(__swagger.get("sign_out", {}))
@jwt_required
def sign_out(response=Responses()):
    jti = get_jwt_identity()["jti"]
    return remove_token(jti)
