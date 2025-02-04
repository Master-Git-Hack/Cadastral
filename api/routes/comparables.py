from enum import Enum
from typing import Dict, List, Optional

from fastapi import APIRouter, Depends, Query, Request
from requests import get
from sqlalchemy.orm import Session

from .. import config, database, middlewares
from ..models.catastral import Catastral
from ..models.usuarios import Usuarios

__response = middlewares.RESPONSES()

required = Usuarios.required
comparables = APIRouter(
    prefix="/comparables",
    tags=["Comparables Catastral y Comercial"],
    dependencies=[Depends(Usuarios.required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)

ReportTypes = Enum(
    "ReportTypes",
    {
        "MERCADO": "mercado",
        "CATASTRAL": "catastral",
        "COMERCIAL": "comercial",
    },
)


@comparables.get("/legacy/cedulas", tags=["Legacy"], deprecated=True)
async def get_cedulas_legacy(db: Session = Depends(database.VALUACIONES)): ...


@comparables.get("/cedulas")
async def get_cedulas(
    user=Depends(required), db: Session = Depends(database.VALUACIONES)
): ...


@comparables.get("/legacy/cedula", tags=["Legacy"], deprecated=True)
async def get_cedula_legacy(
    id: int,
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    as_report: bool = False,
    report_type: Optional[ReportTypes] = ReportTypes.MERCADO,
    db: Session = Depends(database.VALUACIONES),
): ...
@comparables.get("/cedula")
async def get_cedula(
    id: int,
    user=Depends(required),
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    as_report: bool = False,
    report_type: Optional[ReportTypes] = ReportTypes.MERCADO,
    db: Session = Depends(database.VALUACIONES),
): ...


@comparables.post("/legacy/cedula", tags=["Legacy"], deprecated=True)
async def post_cedula_legacy(
    request: Request,
    db: Session = Depends(database.VALUACIONES),
):
    data = await request.json()


@comparables.post("/cedula")
async def post_cedula(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    data = await request.json()


@comparables.patch("/legacy/cedula", tags=["Legacy"], deprecated=True)
async def patch_cedula_legacy(
    id: int,
    request: Request,
    db: Session = Depends(database.VALUACIONES),
):
    data = await request.json()


@comparables.patch("/cedula")
async def patch_cedula(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    data = await request.json()


@comparables.delete("/legacy/cedula", tags=["Legacy"], deprecated=True)
async def delete_cedula_legacy(
    id: int,
    db: Session = Depends(database.VALUACIONES),
): ...


@comparables.delete("/cedula")
async def delete_cedula(
    id: int,
    db: Session = Depends(database.VALUACIONES),
): ...


@comparables.get("/legacy/comparable", tags=["Legacy"], deprecated=True)
async def get_comparable_legacy(
    id: Optional[int] = None,
    cedula_mercado: Optional[int] = None,
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    as_report: bool = False,
    report_type: Optional[ReportTypes] = ReportTypes.MERCADO,
    db: Session = Depends(database.VALUACIONES),
):
    comparable = None
    if id is None and cedula_mercado is None:
        return __response.error(message="Se requiere un id o cedula_mercado")
    if id is not None and comparable.get(id) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    elif cedula_mercado is not None and comparable.filter(cedula_mercado) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    data = comparable.dict(includes=includes, excludes=excludes)
    return __response.success(data=data.get(key, data))


@comparables.get("/comparable")
async def get_comparable(
    id: Optional[int] = None,
    cedula_mercado: Optional[int] = None,
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    as_report: bool = False,
    report_type: Optional[ReportTypes] = ReportTypes.MERCADO,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    comparable = None
    if id is None and cedula_mercado is None:
        return __response.error(message="Se requiere un id o cedula_mercado")
    if id is not None and comparable.get(id) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    elif cedula_mercado is not None and comparable.filter(cedula_mercado) is None:
        return __response.error(message="No se encontró el registro", status_code=404)
    data = comparable.dict(includes=includes, excludes=excludes)
    return __response.success(data=data.get(key, data))


@comparables.post("/legacy/comparable", tags=["Legacy"], deprecated=True)
async def post_comparable_legacy(
    request: Request,
    db: Session = Depends(database.VALUACIONES),
):
    data = await request.json()


@comparables.post("/comparable")
async def post_comparable(
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    data = await request.json()


@comparables.patch("/legacy/comparable", tags=["Legacy"], deprecated=True)
async def patch_comparable_legacy(
    id: int,
    request: Request,
    db: Session = Depends(database.VALUACIONES),
):
    data = await request.json()


@comparables.patch("/comparable")
async def patch_comparable(
    id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    data = await request.json()


@comparables.delete("/legacy/comparable", tags=["Legacy"], deprecated=True)
async def delete_comparable_legacy(
    id: int,
    db: Session = Depends(database.VALUACIONES),
): ...


@comparables.delete("/comparable")
async def delete_comparable(
    id: int,
    user¿=Depends(required),
    db: Session = Depends(database.VALUACIONES),
): ...
