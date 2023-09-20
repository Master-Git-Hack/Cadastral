from functools import wraps

from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request

from .. import config
from ..models.usuarios import Usuarios
from ..utils.response import Responses

jwt = config.auth_manager


def auth_required(func):
    @wraps(func)
    def auth_wrapper(
        *args, **kwargs
    ):  # Cambia el nombre de la función de vista en el decorador
        response = Responses()
        try:
            user = Usuarios()
            # Verifica la presencia y validez del token en la solicitud
            verify_jwt_in_request()
            if user.get(id=get_jwt_identity()) is None:
                return response.error(status_code=404, message="Usuario no encontrado")

            # Llama a la función protegida con el usuario como argumento
            return func(user.current, *args, **kwargs)

        except Exception as e:
            # return unknown error
            return response.error(status_code=500, message=str(e))

    return auth_wrapper  # Cambia el nombre de la función de vista de retorno


# Lista negra para tokens
blacklisted_tokens = set()


# Función para agregar tokens a la lista negra
@jwt.token_in_blocklist_loader
def is_token_blacklisted(decrypted_token):
    jti = decrypted_token["jti"]
    return jti in blacklisted_tokens


def remove_token(jti: str):
    blacklisted_tokens.add(jti)
    response = Responses()
    return response.success(message="Token eliminado")
