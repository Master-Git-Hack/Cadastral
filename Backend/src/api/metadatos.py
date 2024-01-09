from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from .. import database, logger
from ..middlewares import Middlewares as __Middlewares
from ..middlewares.auth import required
from ..models.dataset import Dataset as __Dataset
from ..models.metadatos import MetadatosTemporales as __TMP

__response = __Middlewares.Responses()
metadatos = APIRouter(
    prefix="/metadatos",
    tags=["Metadatos"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@metadatos.get("/complete")
async def get_all_metadatos(
    user=Depends(required), db: Session = Depends(database.catastro_v2)
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __Dataset(db=db)
        if meta.all() is None:
            return __response.success(data=[])
        print(meta.to_list())
        return __response.success(data=meta.to_list())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.get("/preview")
async def get_all_metadatos_preview(
    user=Depends(required), db: Session = Depends(database.catastro_v2)
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __Dataset(db=db)
        if meta.all() is None:
            return __response.success(data=[])

        return __response.success(
            data=meta.to_list(
                only=[
                    "uid",
                    "table_name",
                    "schema_name",
                    "title",
                    "purpose",
                    "abstract",
                ]
            )
        )
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.get("/temporal")
async def get_all_temporal_metadatos(
    user=Depends(required), db: Session = Depends(database.catastro_v2)
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __TMP(db=db)
        encargado = user.id
        if meta.filter(encargado=encargado, estatus=1) is None:
            __response.success(data=[])

        return __response.success(data=meta.to_list())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.get("/{uid}")
async def get_id(
    uid: str, user=Depends(required), db: Session = Depends(database.catastro_v2)
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __TMP(db=db)
        if meta.get(uid) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )

        return __response.success(data=meta.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.post("/create")
async def create(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.catastro_v2),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __TMP(db=db)
        data = await request.json()
        if meta.create(**data, encargado=user.id) is None:
            return __response.error(message="No se pudo registrar el metadato")
        return __response.success(data=meta.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.patch("/{uid}")
async def patch_uid(
    uid: str,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.catastro_v2),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __TMP(db=db)
        if meta.get(uid) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )
        data = await request.json()
        if meta.update(**data) is None:
            return __response.error(message="No se pudo actualizar el metadato")
        return __response.success(data=meta.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.post("/temporal/create")
async def post_temporal_metadatos(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.catastro_v2),
):
    data = await request.json()
    meta = __TMP(db=db)
    encargado = user.id
    if meta.create(**data, encargado=encargado) is None:
        return __response.error(
            message="Error procesando la solicitud",
            status_code=404,
        )

    return __response.success(data=meta.to_dict())


@metadatos.patch("/temporal/{id}")
async def patch_temporal_metadatos(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.catastro_v2),
):
    if isinstance(user, dict):
        return __response.error(**user)
    data = await request.json()
    meta = __TMP(db=db)
    encargado = user.id
    if meta.filter(id=id, encargado=encargado) is None:
        return __response.error(
            message="Error procesando la solicitud",
            status_code=404,
        )
    if meta.update(**data) is None:
        return __response.error(
            message="No se pudo actualizar el registro",
            status_code=409,
        )
    return __response.success(data=meta.to_dict())


@metadatos.get("/report/{uid}")
def get_file(
    uid: str,
    user=Depends(required),
    db: Session = Depends(database.catastro_v2),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        # __response = ReporteMetadatos(uid, db)
        # filename, path = __response.create()
        # return __response.send_file(filename=filename, path=path)
        ...
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.delete("temporal/{uid}")
async def delete_temporal_metadatos(
    uid: str,
    user=Depends(required),
    db: Session = Depends(database.catastro_v2),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __TMP(db=db)
        encargado = user.id
        if meta.filter(uid=uid, encargado=encargado) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )
        if meta.delete() is None:
            return __response.error(
                message="No se pudo eliminar el registro",
                status_code=409,
            )
        return __response.success(data=meta.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))
