from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from .. import database, logger
from ..middlewares import Middlewares as __Middlewares
from ..models.cedula_comparables import CedulaComparables
from ..models.cedula_mercado import CedulaMercado

# from ..middlewares.auth import required
from ..models.comparables_catcom import ComparablesCatCom

__response = __Middlewares.Responses()
comparables = APIRouter(
    prefix="/comparables",
    tags=["Comparables Catastrales/Comerciales"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@comparables.get("/catatastrales_comerciales")
async def get_comparables_catcom(db: Session = Depends(database.valuaciones)):
    """
    Get comparables catrastrales/comerciales
    """
    comp = ComparablesCatCom(db)
    if comp.all() is None:
        return __response.error(
            message="No se encontraron comparables", status_code=404
        )
    return __response.success(data=comp.to_list())


@comparables.get("/catatastral_comercial/{id}")
async def get_comparables_catcom_by_id(
    id: int, db: Session = Depends(database.valuaciones)
):
    """
    Get comparables catrastrales/comerciales by id
    """
    comp = ComparablesCatCom(db)
    if comp.get(id) is None:
        return __response.error(
            message="No se encontraron comparables", status_code=404
        )
    return __response.success(data=comp.to_dict())


@comparables.get("/cedulas/{cedula_type}")
async def get_cedulas(
    cedula_type: str = "mercado", db: Session = Depends(database.valuaciones)
):
    """
    Get cedulas
    """
    if cedula_type == "mercado":
        cedula = CedulaMercado(db)
    else:
        cedula = CedulaComparables(db)
    if cedula.all() is None:
        return __response.error(message="No se encontraron cedulas", status_code=404)
    return __response.success(data=cedula.to_list())


@comparables.get("/cedula/{cedula_type}/{id}")
async def get_cedula_by_id(
    id: int, cedula_type: str = "mercado", db: Session = Depends(database.valuaciones)
):
    """
    Get cedula by id
    """
    if cedula_type == "mercado":
        cedula = CedulaMercado(db)
    else:
        cedula = CedulaComparables(db)
    if cedula.get(id) is None:
        return __response.error(message="No se encontraron cedulas", status_code=404)
    return __response.success(data=cedula.to_dict())
