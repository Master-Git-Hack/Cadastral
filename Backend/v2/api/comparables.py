from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from .. import database, logger
from ..controllers.comparables_catcom import ComparablesCatComReport
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


@comparables.post("/catastral_comercial/{cedula_type}/reporte")
async def get_reporte_catastra_comercial(
    request: Request,
    cedula_type: str = "mercado",
    db: Session = Depends(database.valuaciones),
):
    """
    Get reporte comparables catrastrales/comerciales
    """
    # data = await request.json()
    comp = ComparablesCatComReport(db)
    # comp.create(type=cedula_type, *data.get("ids", []), **data.get("kwargs", {}))
    # return __response.send_file(filename=comp.merge())
    if cedula_type == "mercado":
        query = {
            "PRECIO_UNITARIO_APLICABLE",
            "FOLIO",
            "UBICACION_MANZANA",
            "DIAS",
            "CLASIFICACION_ECONOMICA",
            "PRECIO_TOTAL_APLICABLE",
            "NOMBRE_EDIFICIO",
            "CALLE",
            "TIPO_CONSUCCION",
            "NUMERO_FRENTES",
            "COORDENADAS_UTM_Y",
            "CLASIFICACION_PERIFERICA",
            "SUPERFICIE_CONSUCCION",
            "ENE_CALLES",
            "COLONIA",
            "T_C",
            "HOY",
            "CADUCA_MESES",
            "PRECIO_TOTAL_USD",
            "EDAD",
            "COORDENADAS_UTM_X",
            "CALIDAD",
            "FRENTE",
            "UNIDADES_RENTABLES",
            "EDO_CONSERVACION",
            "DESCRIPCION_SERVICIOS",
            "NIVELES",
            "DESCRIPCION_ESPACIOS",
            "SUPERFICIE_TERRENO",
            "PROYECTO",
        }
    else:
        query = {
            "NOMBRE_VIALIDAD",
            "COMERCIAL_FRENTE",
            "COMPARABLE",
            "SUPERFICIE",
            "FRENTE_ML",
            "NO_FRENTES",
            "COORDENADA_X",
            "ZONA_ECONOMICA",
            "EDIFICIO_PREDIO_PROTOTIPO",
            "PRECIO_USD",
            "ENTRE_CALLES",
            "INFRAESTRUCTURA",
            "UBICACACION_MZA",
            "ASENTAMIENTO",
            "COORDENADA_Y",
            "PERIFERIA",
        }
    comp.check(db=db)
    return __response.success()


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
