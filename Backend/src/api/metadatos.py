from dateparser import parse
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from .. import database, logger
from ..controllers.metadatos import ReporteMetadatos as __ReporteMetadatos
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
        # save data into json
        from json import dump

        with open("data.json", "w") as file:
            dump(meta.to_list(), file)
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

        if meta.filter_group(encargado=user.id) is None:
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
        meta = __Dataset(db=db)
        if meta.filter(uid=uid) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )

        return __response.success(data=meta.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.get("/temporal/{uid}")
async def get_temporal_id(
    uid: str, user=Depends(required), db: Session = Depends(database.catastro_v2)
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __TMP(db=db)
        if meta.filter(uid=uid) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )
        data = meta.to_dict()
        return __response.success(data=data.get("datos", data))
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
        meta = __Dataset(db=db)
        data = await request.json()
        data = {
            key: value
            for key, value in data.items()
            if value is not None or value != ""
        }

        data |= {
            key: parse(data[key])
            for key in {
                "datestamp",
                "date_creation",
                "date",
                "publication_date",
                "update_date",
                "data_last_update",
            }
        }
        if meta.create(**data, encargado=user.id) is None:
            return __response.error(message="No se pudo registrar el metadato")
        return __response.success(data=meta.to_dict())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.patch("/{id}")
async def patch_id(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.catastro_v2),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __Dataset(db=db)
        if meta.get(id) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )
        data = await request.json()

        if "geom" in data:
            del data["geom"]
        # for key in {"distance_res", "bearing_res", "altres", "depthres", "utm_zone"}:
        #     if key in data and (data[key] is None or data[key] == ""):
        #         data[key] = 91.0
        # if "bearing_uni" in data and (
        #     data["bearing_uni"] is None or data["bearing_uni"] == ""
        # ):
        #     data["distance_res"] = "grados"

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


@metadatos.patch("/temporal/{uid}")
async def patch_temporal_metadatos(
    uid: str,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.catastro_v2),
):
    if isinstance(user, dict):
        return __response.error(**user)
    data = await request.json()
    meta = __TMP(db=db)
    encargado = user.id
    if meta.filter(uid=uid, encargado=encargado) is None:
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
        response = __ReporteMetadatos(uid, db)
        filename, path = response.create()
        return __response.send_file(filename=filename, path=path)

    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.delete("/temporal/{uid}")
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
