from itertools import groupby
from typing import Any, Optional

from fastapi import APIRouter, Depends, Request, Query
from requests import get
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from enum import Enum

from .. import config, database, middlewares
from ..models.dataset import Dataset as __Dataset
from ..models.metadatos import MetadatosTemporales as __TMP
from ..models.usuarios import Usuarios
from ..controllers.metadatos import ReporteMetadatos as __ReporteMetadatos
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
    db_name: Optional[DBS] = None,
    schema_name: Optional[str] = None,
    table_name: Optional[str] = None,
):
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
    try:
        meta = __Dataset(db)
        if meta.filter_group(is_latest=True) is None:
            return __response.success(data=[])
        # # save data into json
        # from json import dump

        # with open("data.json", "w") as file:
        #     dump(meta.list(), file)
        return __response.success(data=meta.list())
    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@meta.get("/preview")
async def get_all_metadatos_preview(
    user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    try:
        meta = __Dataset(db)
        if meta.filter_group(is_latest=True) is None:
            return __response.success(data=[])

        return __response.success(
            data=meta.list(
                includes=[
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
    try:
        meta = __TMP(db)

        if meta.filter_group(username=user.nombre) is None:
            __response.success(data=[])
        return __response.success(data=meta.list())
    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@meta.get("/{uid}")
async def get_id(
    uid: str, user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    try:
        meta = __Dataset(db)
        if meta.filter(uid=uid) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )
        return __response.success(data=meta.dict())
    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@meta.get("/temporal/{uid}")
async def get_temporal_id(
    uid: str, user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    try:
        meta = __TMP(db)
        if meta.filter(uid=uid) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )
        data = meta.dict()
        return __response.success(data=data.get("datos", data))
    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@meta.post("/create")
async def create(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    try:
        meta = __Dataset(db)
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
            tmp = __TMP(db)
            print(f"UUID: {uid}")
            if tmp.filter(uid=uid) is not None:
                logger.warning("Deleting temporal metadata")
                result = tmp.delete()
                print("Result: ", result)

        return __response.success(data=meta.dict() | {"status": "success"})
    except Exception as e:
        print(f"----------> Unexpected error on metadata create:\n {str(e)}")
        return __response.error(message=str(e), data={"status": "error"})


@meta.post("/version/create")
async def create_version(
    id: int, user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    try:
        meta = __Dataset(db)
        if meta.get(id) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )
        new_version = meta.dict(excludes=["id", "uid"])
        new_version["parent_id"] = meta.Current.id
        new_version["version"] = meta.Current.version + 1
        if meta.update(is_latest=False) is None:
            return __response.error(
                message=f"Error cambiando la version del registro {meta.Current.id}",
                status_code=500,
            )
        if meta.create(**new_version) is None:
            return __response.error(
                message=f"Error creando la nueva version del registro {meta.Current.id}",
                status_code=500,
            )
        return __response.success(data=meta.dict() | {"status": "success"})
    except Exception as e:
        print(f"----------> Unexpected error on version create:\n {str(e)}")
        return __response.error(message=str(e), data={"status": "error"})


@meta.get("/version/previous")
async def previous_version(
    id: int, user=Depends(required), db: Session = Depends(database.CATASTRO_V2)
):
    try:
        meta = __Dataset(db)
        if meta.get(id) is None:
            return __response.error(
                message="Error procesando la solicitud",
                status_code=404,
            )
        if meta.Current.version == 1:
            return __response.success(data=[])
        versions = []
        parent_id = meta.Current.parent_id
        for i in range(meta.Current.version - 1):
            if meta.get(parent_id):
                parent_id = meta.Current.parent_id
                versions.append(meta.dict())
        return __response.success(data=versions)
    except Exception as e:
        print(f"----------> Unexpected error on version create:\n {str(e)}")
        return __response.error(message=str(e), data={"status": "error"})


@meta.patch("/{id}")
async def patch_id(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    try:
        meta = __Dataset(db)
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
        return __response.success(data=meta.dict() | {"status": "success"})
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
    meta = __TMP(db)
    if meta.create(**data, username=user.nombre) is None:
        return __response.error(
            message="Error procesando la solicitud",
            status_code=404,
            data={"status": "error"},
        )

    return __response.success(data=meta.dict() | {"status": "success"})


@meta.patch("/temporal/{uid}")
async def patch_temporal_metadatos(
    uid: str,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    data = await request.json()
    meta = __TMP(db)
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
    return __response.success(data=meta.dict() | {"status": "success"})


@meta.get("/report/{uid}")
def get_file(
    uid: str,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.CATASTRO_V2),
):
    headers = dict(request.headers)
    print(f"Headers: {headers}")

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
    try:
        meta = __TMP(db)
        username = user.id
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
        return __response.success(data=meta.dict())
    except Exception as e:
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))
