from itertools import groupby
from typing import Any, Optional

from fastapi import APIRouter, Depends, Request, Query
from requests import get
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from enum import Enum

from .. import config, database, middlewares
from ..models.catastral import Catastrales
from ..models.usuarios import Usuarios
from sqlalchemy.orm import Session

__response = middlewares.RESPONSES()

required = Usuarios.required
meta = APIRouter(
    prefix="/metadatos",
    tags=["Metadatos"],
    # dependencies=[Depends(Usuarios.required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)

DBS = Enum(
    "DBS",
    {
        db.upper(): db
        for db in {
            "municipios",
            "pcm",
            "plan_ordenamiento_territorial",
            "valores_municipales",
        }
    },
)


@meta.get("/resources", response_model=None)
async def get_resources(
    user=Depends(required),
    db_name: DBS = "MUNICIPIOS",
    schema_name: Optional[str] = None,
    table_name: Optional[str] = None,
):
    if user is None:
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


@meta.get("/complete")
async def get_all_metadatos(
    user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    if user is None:
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
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@meta.get("/preview")
async def get_all_metadatos_preview(
    user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    if user is None:
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
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@meta.get("/temporal")
async def get_all_temporal_metadatos(
    user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    if user is None:
        return __response.error(**user)
    try:
        meta = __TMP(db=db)

        if meta.filter_group(username=user.nombre) is None:
            __response.success(data=[])
        return __response.success(data=meta.to_list())
    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@meta.get("/{uid}")
async def get_id(
    uid: str, user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    if user is None:
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
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@meta.get("/temporal/{uid}")
async def get_temporal_id(
    uid: str, user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    if user is None:
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
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


from pprint import pprint


@meta.post("/create")
async def create(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    if user is None:
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
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e), data={"status": "error"})


@meta.patch("/{id}")
async def patch_id(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    if user is None:
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
        if meta.update(**data) is None:
            return __response.error(message="No se pudo actualizar el metadato")
        return __response.success(data=meta.to_dict() | {"status": "success"})
    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e), data={"status": "error"})


@meta.post("/temporal/create")
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


@meta.patch("/temporal/{uid}")
async def patch_temporal_metadatos(
    uid: str,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    if user is None:
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


@meta.get("/report/{uid}")
def get_file(
    uid: str,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    if user is None:
        return __response.error(**user)
    try:
        response = __ReporteMetadatos(uid, db)
        filename, path = response.create()
        return __response.send_file(filename=filename, path=path)

    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@meta.delete("/temporal/{uid}")
async def delete_temporal_metadatos(
    uid: str,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    if user is None:
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
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))
