from flasgger import swag_from
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from .. import config

from ..models import Modelos
from ..utils.response import Responses

checklist: Blueprint = Blueprint("Checklist", __name__, url_prefix="/checklist")
__dbs = config.db
__swagger: dict = config.API_MODELS.get("checklist", {})
__Checklist = Modelos.CheckList
__RevisionChecklist = Modelos.RevisionChecklist
__User = Modelos.Usuarios


@checklist.get("/all")
@swag_from(__swagger.get("get_all", {}))
@jwt_required()
def get_all(user, response=Responses()):
    try:
        ckl = __Checklist()
        if ckl.filter_group(valuador=user.id) is None:
            return response.success(data=[])
        return response.success(data=ckl.to_list())
    except Exception as e:
        return response.error(message=str(e))


@checklist.get("/<int:id>")
@swag_from(__swagger.get("get_checklist", {}))
@jwt_required()
def get_checklist(user, id: int, response=Responses()):
    try:
        ckl = __Checklist()
        if ckl.filter(id=id, valuador=user.id) is None:
            return response.error(message="No se encontró el checklist")
        return response.success(data=ckl.to_dict())
    except Exception as e:
        return response.error(message=str(e))


# patch para actualizar el estatus de un checklist
@checklist.post("/create")
@swag_from(__swagger.get("post_checklist", {}))
@jwt_required()
def post_checklist(user, response=Responses()):
    try:
        ckl = __Checklist()
        data: request = request.json
        if ckl.create(**data, valuador=user.id) is None:
            return response.error(message="No se pudo registrar el checklist")
        return response.success(data=ckl.to_dict())
    except Exception as e:
        return response.error(message=str(e), status_code=500)


# patch para actualizar el estatus de un checklist
@checklist.patch("/<int:id>")
@swag_from(__swagger.get("patch_checklist", {}))
@jwt_required()
def patch_checklist(user, id: int, response=Responses()):
    try:
        ckl = __Checklist()
        if ckl.filter(id=id, valuador=user.id) is None:
            return response.error(message="No se encontró el checklist")
        data: request = request.json
        if ckl.update(id, **data) is None:
            return response.error(message="No se pudo actualizar el checklist")
        return response.success(data=ckl.to_dict())
    except Exception as e:
        return response.error(message=str(e), status_code=500)


@checklist.get("/revisiones/all")
@swag_from(__swagger.get("get_all_revisiones", {}))
@jwt_required()
def get_all_revisiones(user, response=Responses()):
    try:
        revision = __RevisionChecklist()
        ckl = __RevisionChecklist()
        user = __User()
        if revision.filter_group(revisor=user.id) is None:
            return response.error(message="Aun no tienes revisiones asignadas")
        revisiones = revision.to_list()
        data = {}
        for registro_check_list in revisiones:
            if registro_check_list["parent"] is not None:
                revision.filter(id=registro_check_list["parent"])
                registro_check_list["parent"] = revision.to_dict()
                user.filter(id=revision.current.revisor)
                registro_check_list["parent"]["revisor"] = user.current.nombre
            ckl.filter(id=registro_check_list["checklist"])
            registro_check_list["checklist"] = ckl.to_dict()
            user.filter(id=ckl.current.valuador)
            registro_check_list["checklist"]["valuador"] = user.current.nombre
            data[registro_check_list["id"]] = registro_check_list
        return response.success(data=data)
    except Exception as e:
        return response.error(message=str(e))


@checklist.get("/revisiones/<int:id>")
@swag_from(__swagger.get("get_revision", {}))
@jwt_required()
def get_revision(user, id: int, response=Responses()):
    try:
        revision = __RevisionChecklist()
        ckl = __RevisionChecklist()
        user = __User()
        if revision.filter(id=id, revisor=user.id) is None:
            return response.error(message="No se encontró el checklist")
        data = revision.to_dict()
        if data["parent"] is not None:
            revision.filter(id=data["parent"])
            data["parent"] = revision.to_dict()
            user.filter(id=revision.current.revisor)
            data["parent"]["revisor"] = user.current.nombre
        ckl.filter(id=data["checklist"])
        data["checklist"] = ckl.to_dict()
        user.filter(id=ckl.current.valuador)
        data["checklist"]["valuador"] = user.current.nombre
        return response.success(data=data)
    except Exception as e:
        return response.error(message=str(e))


@checklist.post("/revisiones/create")
@swag_from(__swagger.get("post_revision", {}))
@jwt_required()
def post_revision(user, response=Responses()):
    try:
        revision = __RevisionChecklist()

        data: request = request.json
        if revision.create(**data, revisor=user.id) is None:
            return response.error(
                message="No se pudo registrar la revison del checklist"
            )
        return response.success(data=revision.to_dict())
    except Exception as e:
        return response.error(message=str(e), status_code=500)


@checklist.patch("/revisiones/<int:id>")
@swag_from(__swagger.get("patch_revision", {}))
@jwt_required()
def patch_revision(user, id: int, response=Responses()):
    try:
        revision = __RevisionChecklist()
        if revision.filter(id=id, revisor=user.id) is None:
            return response.error(message="No se encontró el checklist")
        data: request = request.json
        if revision.update(id, **data) is None:
            return response.error(message="No se pudo actualizar el checklist")
        return response.success(data=revision.to_dict())
    except Exception as e:
        return response.error(message=str(e), status_code=500)
