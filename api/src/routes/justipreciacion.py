from os import remove
from typing import Any, List, Optional

from fastapi import APIRouter, Depends, File, Query, Request
from sqlalchemy.orm import Session

from .. import config, database, middlewares
from ..models.justipreciacion import Justipreciacion
from ..models.homologacion import Homologacion
from ..models.usuarios import Usuarios
from ..utils.temporary import name_it

__response = middlewares.RESPONSES()

required = Usuarios.required
justi = APIRouter(
    prefix="/justipreciacion",
    tags=["Justipreciación", "Homologación", "Costos de Construcción"],
    # dependencies=[Depends(Usuarios.required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)


def has_homologation(db: Session, registro: str):
    homologacion = Homologacion(db)
    if homologacion.filter_group(registro=registro) is None:
        return {
            "exists": {
                0: False,
                1: False,
            },
        }
    return {
        "exists": {
            "0" if h.tipo == "terreno" else "1": False if h.tipo is None else True
            for h in homologacion.Current
        }
    }


@justi.get("/{id}")
async def get_justi(
    id: int,
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    justipreciacion = Justipreciacion(db)
    if justipreciacion.get(id) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    data = justipreciacion.dict(includes=includes, excludes=excludes)
    # if excludes is None:
    #     excludes = ["geom", "fecha_solicitud"]
    return __response.success(
        data=data.get(key, data)
        | has_homologation(db, justipreciacion.Current.registro)
    )


@justi.get("/legacy/{id}", tags=["Legacy"], deprecated=True)
async def get_justi_legacy(
    id: int,
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    db: Session = Depends(database.VALUACIONES),
):
    justipreciacion = Justipreciacion(db)
    if justipreciacion.get(id) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    # if excludes is None:
    #     excludes = ["geom", "fecha_solicitud"]
    data = justipreciacion.dict(includes=includes, excludes=excludes)
    print(
        {
            **data.get(key, data),
            **has_homologation(db, justipreciacion.Current.registro),
        }
    )
    return __response.success(
        data={
            **data.get(key, data),
            **has_homologation(db, justipreciacion.Current.registro),
        }
    )


#
@justi.get("/{registro}")
async def get_justi_registro(
    registro: str,
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    justipreciacion = Justipreciacion(db)
    if justipreciacion.filter(registro=registro) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    data = justipreciacion.dict(includes=includes, excludes=excludes)

    return __response.success(
        data=data.get(key, data)
        | has_homologation(db, justipreciacion.Current.registro)
    )


@justi.get("/legacy/{registro}", tags=["Legacy"], deprecated=True)
async def get_justi_legacy_registro(
    registro: str,
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    db: Session = Depends(database.VALUACIONES),
):
    justipreciacion = Justipreciacion(db)
    if justipreciacion.filter(registro=registro) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    data = justipreciacion.dict(includes=includes, excludes=excludes)

    return __response.success(
        data=data.get(key, data)
        | has_homologation(db, justipreciacion.Current.registro)
    )


#


@justi.patch("/{id}")
async def update_justi(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    justipreciacion = Justipreciacion(db)
    if justipreciacion.get(id) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    data = await request.json()
    justipreciacion.update(**data)
    return __response.success(data=justipreciacion.dict())


@justi.patch("/legacy/{id}", tags=["Legacy"], deprecated=True)
async def update_justi(
    id: int,
    request: Request,
    db: Session = Depends(database.VALUACIONES),
):
    justipreciacion = Justipreciacion(db)
    if justipreciacion.get(id) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    data = await request.json()
    justipreciacion.update(**data)
    return __response.success(data=justipreciacion.dict())
