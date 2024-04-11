from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from .. import database, logger
from ..middlewares import Middlewares as __Middlewares
from ..middlewares.auth import required
from ..models.checklist import Checklist as __Checklist
from ..models.revision_checklist import RevisionChecklist as __RevisionChecklist
from ..models.usuarios import Usuarios as __Usuarios

__response = __Middlewares.Responses()
checklist = APIRouter(
    prefix="/checklist",
    tags=["Checklist"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@checklist.get("/all")
async def get_all(user=Depends(required), db: Session = Depends(database.valuaciones)):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        ckl = __Checklist(db=db)
        if ckl.filter_group(valuador=user.id) is None:
            return __response.success(data=[])
        return __response.success(data=ckl.to_list())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@checklist.get("/{id}}")
async def get_id(
    id: int, user=Depends(required), db: Session = Depends(database.valuaciones)
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        ckl = __Checklist(db=db)
        if ckl.filter(id=id, valuador=user.id) is None:
            return __response.error(message="No se encontró el checklist")
        return __response.success(data=ckl.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@checklist.patch("/{id}")
async def patch_id(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.valuaciones),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        ckl = __Checklist(db=db)
        if ckl.filter(id=id, valuador=user.id) is None:
            return __response.error(message="No se encontró el checklist")
        data = await request.json()
        if ckl.update(**data) is None:
            return __response.error(message="No se pudo actualizar el checklist")
        return __response.success(data=ckl.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@checklist.post("/create")
async def create(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.valuaciones),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        ckl = __Checklist(db=db)
        data = await request.json()
        if ckl.create(**data, valuador=user.id) is None:
            return __response.error(message="No se pudo registrar el checklist")
        return __response.success(data=ckl.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@checklist.get("/revisiones/all")
async def get_all_revisiones(
    user=Depends(required), db: Session = Depends(database.valuaciones)
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        revision = __RevisionChecklist(db=db)
        ckl = __Checklist(db=db)
        user = __Usuarios(db=db)
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
        return __response.success(data=data)
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@checklist.get("/revisiones/{id}")
async def get_revision_id(
    user=Depends(required), db: Session = Depends(database.valuaciones)
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        revision = __RevisionChecklist(db=db)
        ckl = __Checklist(db=db)
        user = __Usuarios(db=db)
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
        return __response.success(data=data)
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@checklist.post("/revisiones/create")
async def create_revision(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.valuaciones),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        revision = __RevisionChecklist(db=db)
        data = await request.json()
        if revision.create(**data, revisor=user.id) is None:
            return __response.error(message="No se pudo registrar el checklist")
        return __response.success(data=revision.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@checklist.patch("/revisiones/{id}")
async def patch_revision_id(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.valuaciones),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        revision = __RevisionChecklist(db=db)
        if revision.filter(id=id, revisor=user.id) is None:
            return __response.error(message="No se encontró el checklist")
        data = await request.json()
        if revision.update(**data) is None:
            return __response.error(message="No se pudo actualizar el checklist")
        return __response.success(data=revision.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))
