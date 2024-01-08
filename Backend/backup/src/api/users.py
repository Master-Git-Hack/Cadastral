from base64 import b64decode

from flasgger import swag_from
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from .. import config
from ..controllers.auth import remove_token
from ..models import Modelos
from ..models.usuarios import Usuarios
from ..utils.response import Responses

users: Blueprint = Blueprint("Users", __name__, url_prefix="/users")
__swagger: dict = config.API_MODELS.get("users", {})
__User = Modelos.Usuarios


@users.get("/all")
@swag_from(__swagger.get("get_all_users", {}))
@jwt_required()
def get_all(user, response=Responses()):
    try:
        __users = __User()
        if __users.all(exclude=["contrasenia", "iniciales"]) is None:
            return response.success(data=[])
        return response.success(
            data=list(
                filter(lambda x: x.id != user.id and x.status == 1, __users.to_list())
            )
        )

    except Exception as e:
        return response.error(message=str(e))
