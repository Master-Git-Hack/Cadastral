from typing import Optional

from dateparser import parse
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from .. import DBS, database, logger
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


@metadatos.get("/resources")
async def get_resources(
    user=Depends(required),
    db_name: Optional[DBS] = None,
    schema_name: Optional[str] = None,
    table_name: Optional[str] = None,
):
    if isinstance(user, dict):
        return __response.error(**user)
    data = database.group_by_db(db=db_name, schema=schema_name, table=table_name)
    if db_name is None:
        data = {
            db: schemas
            for db, schemas in data.items()
            if db
            in {
                "municipios",
                "pcm",
                "plan_ordenamiento_territorial",
                "valores_municipales",
            }
        }
    return __response.success(
        data=[
            {
                "key": db,
                "label": db.replace("_", " ").title(),
                "data": f"{db.capitalize()} Database",
                "icon": "pi pi-fw pi-database",
                "selectable": False,
                "leaf": True,
                "children": [
                    {
                        "key": f"{db}.{schema}",
                        "label": schema.replace("_", " ").title(),
                        "data": f"{schema.capitalize()} Schema",
                        "icon": "pi pi-fw pi-sitemap",
                        "selectable": False,
                        "leaf": True,
                        "children": [
                            {
                                "key": f"{db}.{schema}.{table}",
                                "label": table.replace("_", " ").title(),
                                "data": f"{table.capitalize()} Table",
                                "icon": "pi pi-fw pi-table",
                            }
                            for table in tables
                        ],
                    }
                    for schema, tables in schemas.items()
                ],
            }
            for db, schemas in data.items()
        ]
    )


@metadatos.get("/complete")
async def get_all_metadatos(
    user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
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
    user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
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
                    "db_name",
                    "table_name",
                    "schema_name",
                    "title",
                    "purpose",
                    "abstract",
                    "username",
                    "update_date",
                ]
            )
        )
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.get("/temporal")
async def get_all_temporal_metadatos(
    user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __TMP(db=db)

        if meta.filter_group(username=user.nombre) is None:
            __response.success(data=[])
        return __response.success(data=meta.to_list())
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@metadatos.get("/{uid}")
async def get_id(
    uid: str, user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
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
    uid: str, user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
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


from pprint import pprint


@metadatos.post("/create")
async def create(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
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
        uid = data.get("uid")
        if meta.create(**data, username=user.nombre) is None:
            return __response.error(message="No se pudo registrar el metadato")
        if uid is not None or uid != "":
            tmp = __TMP(db=db)
            logger.info(f"UUID: {uid}")
            if tmp.filter(uid=uid) is not None:
                logger.warning("Deleting temporal metadata")
                result = tmp.delete()
                logger.info("Result: ", result)

        return __response.success(data=meta.to_dict() | {"status": "success"})
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e), data={"status": "error"})


@metadatos.patch("/{id}")
async def patch_id(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
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
        data |= {"update_date": parse("hoy")}
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
        return __response.success(data=meta.to_dict() | {"status": "success"})
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e), data={"status": "error"})


@metadatos.post("/temporal/create")
async def post_temporal_metadatos(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    data = await request.json()
    meta = __TMP(db=db)
    if meta.create(**data, username=user.nombre) is None:
        return __response.error(
            message="Error procesando la solicitud",
            status_code=404,
            data={"status": "error"},
        )

    return __response.success(data=meta.to_dict() | {"status": "success"})


@metadatos.patch("/temporal/{uid}")
async def patch_temporal_metadatos(
    uid: str,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    if isinstance(user, dict):
        return __response.error(**user)
    data = await request.json()
    meta = __TMP(db=db)
    if meta.filter(uid=uid, username=user.nombre) is None:
        return __response.error(
            message="Error procesando la solicitud",
            status_code=404,
        )
    data |= {"update_date": parse("hoy")}
    if meta.update(**data) is None:
        return __response.error(
            message="No se pudo actualizar el registro",
            status_code=409,
            data={"status": "error"},
        )
    return __response.success(data=meta.to_dict() | {"status": "success"})


@metadatos.get("/report/{uid}")
def get_file(
    uid: str,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
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
    db: Session = Depends(database.CATASTRO_V2),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        meta = __TMP(db=db)
        encargado = user.id
        if meta.filter(uid=uid, username=user.nombre) is None:
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
