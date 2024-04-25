from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from .. import database, logger
from ..controllers.comparables_catcom import ComparablesCatComReport
from ..middlewares import Middlewares as __Middlewares
from ..middlewares.auth import required
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


@comparables.get("/cedulas")
async def get_cedulas(
    db: Session = Depends(database.valuaciones), user=Depends(required)
):
    """
    Get cedulas
    """
    if isinstance(user, dict):
        return __response.error(**user)
    cedula = CedulaMercado(db)
    if cedula.filter_group(usuario=user.usuario) is None:
        return __response.error(message="No se encontraron cedulas", status_code=404)

    return __response.success(
        data=[
            cedula.to_dict(data)
            for data in cedula.current
            if data.fecha + timedelta(days=180) > datetime.now()
        ]
    )


@comparables.get("/cedula/{id}")
async def get_cedula_by_id(
    id: int, db: Session = Depends(database.valuaciones), user=Depends(required)
):
    """
    Get cedula by id
    """
    if isinstance(user, dict):
        return __response.error(**user)
    cedula = CedulaMercado(db)
    if cedula.filter(id=id, usuario=user.usuario) is None:
        return __response.error(message="No se encontraron cedulas", status_code=404)
    return __response.success(data=cedula.to_dict())


@comparables.post("/cedula/{id}/reporte/{as_report}")
async def get_cedula_reporte_by_id(
    id: int,
    request: Request,
    as_report: str = "mercado",
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Get cedula by id
    """
    if isinstance(user, dict):
        return __response.error(**user)

    # data = await request.json()
    # print(data)
    cedula = CedulaMercado(db)
    if cedula.filter(id=id, usuario=user.usuario) is None:
        return __response.error(message="No se encontraron cedulas", status_code=404)
    print(cedula.current.__dict__)
    return __response.success(data=cedula.to_dict())


@comparables.post("/cedula/{registro}")
async def create_cedula(
    registro: str,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Create cedula
    """
    if isinstance(user, dict):
        return __response.error(**user)
    cedula = CedulaMercado(db)
    if cedula.create(registro=registro, usuario=user.usuario) is None:
        return __response.error(message="No se pudo crear la cedula", status_code=404)
    return __response.success(data=cedula.to_dict())


@comparables.patch("/cedula/{id}")
async def update_cedula(
    id: int,
    request: Request,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Update cedula
    """
    data = await request.json()
    if isinstance(user, dict):
        return __response.error(**user)
    cedula = CedulaMercado(db)
    if cedula.filter(id=id, usuario=user.usuario) is None:
        return __response.error(
            message="No se pudo encontrar la cedula", status_code=404
        )
    if cedula.update(**data) is None:
        return __response.error(
            message="No se pudo actualizar la cedula", status_code=404
        )
    return __response.success(data=cedula.to_dict())


@comparables.delete("/cedula/{id}")
async def delete_cedula(
    id: int,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Delete cedula
    """
    if isinstance(user, dict):
        return __response.error(**user)
    cedula = CedulaMercado(db)
    if cedula.filter(id=id, usuario=user.usuario) is None:
        return __response.error(
            message="No se pudo encontrar la cedula", status_code=404
        )
    if cedula.delete() is None:
        return __response.error(
            message="No se pudo eliminar la cedula", status_code=404
        )
    return __response.success(data=cedula.to_dict())


@comparables.get("/{cedula_mercado}")
async def get_comparables(
    cedula_mercado: int,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Get comparables
    """
    if isinstance(user, dict):
        return __response.error(**user)
    comp = CedulaComparables(db)
    if comp.filter_group(id_cedula_mercado=cedula_mercado) is None:
        return __response.error(
            message="No se encontraron comparables", status_code=404
        )
    return __response.success(data=comp.to_list())


@comparables.get("/comparable/{id}")
async def get_comparable_by_id(
    id: int,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Get comparable by id
    """
    if isinstance(user, dict):
        return __response.error(**user)
    comp = CedulaComparables(db)
    if comp.get(id) is None:
        return __response.error(
            message="No se encontraron comparables", status_code=404
        )
    return __response.success(data=comp.to_dict())


@comparables.post("/comparable/{cedula_mercado}/{tipo}/{comparable}")
async def create_comparable(
    cedula_mercado: int,
    tipo: str,
    comparable: int,
    request: Request,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Create comparable
    """
    if isinstance(user, dict):
        return __response.error(**user)
    data = await request.json()
    comp = CedulaComparables(db)
    if (
        comp.filter(
            id_cedula_mercado=cedula_mercado, id_comparable_catcom=comparable, tipo=tipo
        )
        is not None
    ):
        return __response.error(message="Ya existe el comparable", status_code=404)
    if (
        comp.create(
            tipo=tipo,
            id_cedula_mercado=cedula_mercado,
            id_comparable_catcom=comparable,
            **data
        )
        is None
    ):
        return __response.error(message="No se pudo crear la cedula", status_code=404)
    return __response.success(data=comp.to_dict())


@comparables.patch("/comparable/{id}")
async def update_comparable(
    id: int,
    request: Request,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Update comparable
    """
    data = await request.json()
    if isinstance(user, dict):
        return __response.error(**user)
    comp = CedulaComparables(db)
    if comp.get(id) is None:
        return __response.error(
            message="No se encontraron comparables", status_code=404
        )
    if comp.get(id) is None:
        return __response.error(
            message="No se encontraron comparables", status_code=404
        )
    if comp.update(**data) is None:
        return __response.error(
            message="No se pudo actualizar la cedula", status_code=404
        )
    return __response.success(data=comp.to_dict())


@comparables.delete("/comparable/{id}")
async def delete_comparable(
    id: int,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Delete comparable
    """
    if isinstance(user, dict):
        return __response.error(**user)
    comp = CedulaComparables(db)
    if comp.get(id) is None:
        return __response.error(
            message="No se encontraron comparables", status_code=404
        )
    if comp.delete(id) is None:
        return __response.error(
            message="No se pudo eliminar la cedula", status_code=404
        )
    return __response.success(data=comp.to_dict())


@comparables.post("/preview/{cedula_mercado}/{as_report}")
async def generate_preview(
    cedula_mercado: int,
    request: Request,
    as_report: str = "mercado",
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        data = await request.json()
    except Exception as e:
        logger.error(e)
        return __response.error(
            message="No se pudo obtener la información", status_code=404
        )
    # data = await request.json()
    # # print(data)
    # report = ComparablesCatComReport(db)
    # file = report.preview(
    #     cedula_mercado, as_report=as_report, comparable=comparable, tipo=tipo, **data
    # )

    # if file is None:
    #     return __response.error(
    #         message="Comparable no disponible, ya han transcurrido más de 6 meses.",
    #         status_code=404,
    #     )
    # if not file:
    #     return __response.error(
    #         message="No se pudo generar el reporte", status_code=421
    #     )
    # route = file.split("/")
    # # print("/".join(route[:-1]))
    # # print(route[-1])
    # return __response.send_file(filename=route[-1], path=file, delete=True)


# @comparables.get("/catatastrales_comerciales")
# async def get_comparables_catcom(
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Get comparables catrastrales/comerciales
#     """

#     if isinstance(user, dict):
#         return __response.error(**user)
#     comp = ComparablesCatCom(db)
#     if comp.all() is None:
#         return __response.error(
#             message="No se encontraron comparables", status_code=404
#         )
#     return __response.success(data=comp.to_list())


# @comparables.get("/catatastral_comercial/{id}")
# async def get_comparables_catcom_by_id(
#     id: int,
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Get comparables catrastrales/comerciales by id
#     """
#     if isinstance(user, dict):
#         return __response.error(**user)
#     comp = ComparablesCatCom(db)
#     if comp.get(id) is None:
#         return __response.error(
#             message="No se encontraron comparables", status_code=404
#         )
#     return __response.success(data=comp.to_dict())


# @comparables.post("/catastral_comercial/{cedula_type}/reporte")
# async def get_reporte_catastra_comercial(
#     request: Request,
#     cedula_type: str = "mercado",
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Get reporte comparables catrastrales/comerciales
#     """
#     if isinstance(user, dict):
#         return __response.error(**user)
#     # data = await request.json()
#     comp = ComparablesCatComReport(db)
#     # comp.create(type=cedula_type, *data.get("ids", []), **data.get("kwargs", {}))
#     # return __response.send_file(filename=comp.merge())
#     if cedula_type == "mercado":
#         query = {
#             "PRECIO_UNITARIO_APLICABLE",
#             "FOLIO",
#             "UBICACION_MANZANA",
#             "DIAS",
#             "CLASIFICACION_ECONOMICA",
#             "PRECIO_TOTAL_APLICABLE",
#             "NOMBRE_EDIFICIO",
#             "CALLE",
#             "TIPO_CONSUCCION",
#             "NUMERO_FRENTES",
#             "COORDENADAS_UTM_Y",
#             "CLASIFICACION_PERIFERICA",
#             "SUPERFICIE_CONSUCCION",
#             "ENE_CALLES",
#             "COLONIA",
#             "T_C",
#             "HOY",
#             "CADUCA_MESES",
#             "PRECIO_TOTAL_USD",
#             "EDAD",
#             "COORDENADAS_UTM_X",
#             "CALIDAD",
#             "FRENTE",
#             "UNIDADES_RENTABLES",
#             "EDO_CONSERVACION",
#             "DESCRIPCION_SERVICIOS",
#             "NIVELES",
#             "DESCRIPCION_ESPACIOS",
#             "SUPERFICIE_TERRENO",
#             "PROYECTO",
#         }
#     else:
#         query = {
#             "NOMBRE_VIALIDAD",
#             "COMERCIAL_FRENTE",
#             "COMPARABLE",
#             "SUPERFICIE",
#             "FRENTE_ML",
#             "NO_FRENTES",
#             "COORDENADA_X",
#             "ZONA_ECONOMICA",
#             "EDIFICIO_PREDIO_PROTOTIPO",
#             "PRECIO_USD",
#             "ENTRE_CALLES",
#             "INFRAESTRUCTURA",
#             "UBICACACION_MZA",
#             "ASENTAMIENTO",
#             "COORDENADA_Y",
#             "PERIFERIA",
#         }
#     comp.check(db=db)
#     return __response.success()


# @comparables.get("/cedulas/mercado")
# async def get_cedulas_mercado(
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Get cedulas
#     """
#     if isinstance(user, dict):
#         return __response.error(**user)

#     cedula = CedulaMercado(db)
#     if cedula.filter_group(usuario=str(user.id)) is None:
#         return __response.error(message="No se encontraron cedulas", status_code=404)
#     return __response.success(data=cedula.to_list())


# @comparables.get("/cedulas/comparable")
# async def get_cedulas_comparable(
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Get cedulas
#     """
#     if isinstance(user, dict):
#         return __response.error(**user)

#     cedula = CedulaComparables(db)

#     if cedula.all() is None:
#         return __response.error(message="No se encontraron cedulas", status_code=404)
#     return __response.success(data=cedula.to_list())


# @comparables.get("/cedula/mercado/{id}")
# async def get_cedula_mercado_by_id(
#     id: int,
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Get cedula by id
#     """
#     if isinstance(user, dict):
#         return __response.error(**user)

#     cedula = CedulaMercado(db)

#     if cedula.filter(id=id, usuario=user.id) is None:
#         return __response.error(message="No se encontraron cedulas", status_code=404)
#     return __response.success(data=cedula.to_dict())


# @comparables.get("/cedula/comparable/{id}")
# async def get_cedula_comparable_by_id(
#     id: int,
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Get cedula by id
#     """
#     if isinstance(user, dict):
#         return __response.error(**user)
#     cedula = CedulaComparables(db)
#     if cedula.get(id) is None:
#         return __response.error(message="No se encontraron cedulas", status_code=404)
#     return __response.success(data=cedula.to_dict())


# @comparables.post("/cedula/mercado")
# async def create_cedula_mercado(
#     request: Request,
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Create cedula
#     """
#     data = await request.json()
#     if isinstance(user, dict):
#         return __response.error(**user)
#     cedula = CedulaMercado(db)
#     if cedula.create(**data) is None:
#         return __response.error(message="No se pudo crear la cedula", status_code=404)
#     return __response.success(data=cedula.to_dict())


# @comparables.patch("/cedula/mercado/{id}")
# async def update_cedula_mercado(
#     id: int,
#     request: Request,
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Update cedula
#     """
#     data = await request.json()
#     if isinstance(user, dict):
#         return __response.error(**user)
#     cedula = CedulaMercado(db)
#     if cedula.update(id, **data) is None:
#         return __response.error(
#             message="No se pudo actualizar la cedula", status_code=404
#         )
#     return __response.success(data=cedula.to_dict())


# @comparables.delete("/cedula/mercado/{id}")
# async def delete_cedula_mercado(
#     id: int,
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     """
#     Delete cedula
#     """
#     if isinstance(user, dict):
#         return __response.error(**user)
#     cedula = CedulaMercado(db)
#     if cedula.delete(id) is None:
#         return __response.error(
#             message="No se pudo eliminar la cedula", status_code=404
#         )
#     return __response.success(data=cedula.to_dict())


# @comparables.post("/cedulas/mercado/{id}/preview/{comparable}")
# async def preview_cedulas(
#     request: Request,
#     id: int,
#     comparable: int,
#     db: Session = Depends(database.valuaciones),
#     user=Depends(required),
# ):
#     if isinstance(user, dict):
#         return __response.error(**user)
#     mercado = CedulaMercado(db)
#     cedula = CedulaComparables(db)
#     cat_com = ComparablesCatCom(db)
#     data = await request.json()
#     if mercado.filter(id=id, usuario=user.id) is None:
#         return __response.error(message="No se encontraron cedulas", status_code=404)
#     if cat_com.get(comparable) is None:
#         return __response.error(
#             message="No se encontraron comparables", status_code=404
#         )
#     if cedula.filter(id_cedula_mercado=id, id_comparable_catcom=comparable) is None:
#         if cedula.create(tipo=data.get("tipo", "TERRENO")) is None:
#             return __response.error(
#                 message="No se pudo crear la cedula", status_code=404
#             )
#     return
#     return
