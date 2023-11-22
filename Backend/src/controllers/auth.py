from functools import wraps

from flask_jwt_extended import current_user, get_jwt_identity, verify_jwt_in_request

from .. import config
from ..models.usuarios import Usuarios
from ..utils.response import Responses

jwt = config.auth_manager


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    user = Usuarios()
    return user.get(id=identity)


# Lista negra para tokens
blacklisted_tokens = set()


@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    response = Responses()
    return response.error(
        message="Lo siento, tu sesión ha expirado. Intentalo Nuevamente.",
        status_code=401,
    )


# Función para agregar tokens a la lista negra
@jwt.token_in_blocklist_loader
def is_token_blacklisted(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    return jti in blacklisted_tokens


def remove_token(jti: str, response=Responses()):
    blacklisted_tokens.add(jti)
    return response.success(message="Token eliminado")
