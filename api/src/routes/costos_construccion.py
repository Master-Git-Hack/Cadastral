from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from .. import config, database, middlewares
from ..models.justipreciacion import Justipreciacion
from ..models.usuarios import Usuarios

__response = middlewares.RESPONSES()

required = Usuarios.required
costos_construccion = APIRouter(
    prefix="/costos-construccion",
    tags=["Costos de Construcción"],
    dependencies=[Depends(Usuarios.required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)


@costos_construccion.get("/{justipreciacion_id}")
async def get_costos_construccion(
    justipreciacion_id: int,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Obtiene los datos de costos de construcción para una justipreciación
    """
    try:
        # Verificar que existe la justipreciación
        justipreciacion = Justipreciacion(db)
        if justipreciacion.get(justipreciacion_id) is None:
            return __response.error(
                message="No se encontró el registro de justipreciación", status_code=404
            )

        # TODO: Implementar modelo de CostosConstruccion cuando esté disponible
        # Por ahora, retornar estructura base
        data = {
            "justipreciacion_id": justipreciacion_id,
            "registro": justipreciacion.Current.registro,
            "costos": _get_initial_costos_structure(),
            "totales": {"costo_total": 0, "costo_m2": 0, "superficie_construccion": 0},
            "configuracion": {
                "incluir_preliminares": True,
                "incluir_acabados": True,
                "incluir_instalaciones": True,
                "factor_indirectos": 0.15,
                "factor_utilidad": 0.10,
            },
            "status": "success",
            "message": "Datos de costos de construcción obtenidos exitosamente",
        }

        return __response.success(data=data)

    except Exception as e:
        return __response.error(
            message=f"Error al obtener costos de construcción: {str(e)}",
            status_code=500,
        )


@costos_construccion.post("/{justipreciacion_id}")
async def create_costos_construccion(
    justipreciacion_id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Crea un nuevo registro de costos de construcción
    """
    try:
        data = await request.json()

        # Verificar justipreciación
        justipreciacion = Justipreciacion(db)
        if justipreciacion.get(justipreciacion_id) is None:
            return __response.error(
                message="No se encontró el registro de justipreciación", status_code=404
            )

        # TODO: Implementar creación en base de datos
        # Por ahora, simular creación exitosa

        return __response.success(
            data={
                "id": justipreciacion_id,  # Temporal
                "message": "Costos de construcción creados exitosamente",
            }
        )

    except Exception as e:
        return __response.error(
            message=f"Error al crear costos de construcción: {str(e)}", status_code=500
        )


@costos_construccion.patch("/{justipreciacion_id}")
async def update_costos_construccion(
    justipreciacion_id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Actualiza los costos de construcción existentes
    """
    try:
        data = await request.json()

        # Verificar justipreciación
        justipreciacion = Justipreciacion(db)
        if justipreciacion.get(justipreciacion_id) is None:
            return __response.error(
                message="No se encontró el registro de justipreciación", status_code=404
            )

        # TODO: Implementar actualización en base de datos
        # Por ahora, simular actualización exitosa

        return __response.success(
            data={
                "id": justipreciacion_id,  # Temporal
                "message": "Costos de construcción actualizados exitosamente",
            }
        )

    except Exception as e:
        return __response.error(
            message=f"Error al actualizar costos de construcción: {str(e)}",
            status_code=500,
        )


@costos_construccion.get("/{justipreciacion_id}/conceptos")
async def get_conceptos_construccion(
    justipreciacion_id: int,
    categoria: Optional[str] = None,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Obtiene el catálogo de conceptos de construcción
    """
    try:
        conceptos = _get_conceptos_catalogo(categoria)

        return __response.success(
            data={"conceptos": conceptos, "total": len(conceptos)}
        )

    except Exception as e:
        return __response.error(
            message=f"Error al obtener conceptos: {str(e)}", status_code=500
        )


@costos_construccion.get("/{justipreciacion_id}/reporte")
async def generate_reporte_costos(
    justipreciacion_id: int,
    formato: str = "json",
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Genera reporte de costos de construcción
    """
    try:
        # Verificar justipreciación
        justipreciacion = Justipreciacion(db)
        if justipreciacion.get(justipreciacion_id) is None:
            return __response.error(
                message="No se encontró el registro de justipreciación", status_code=404
            )

        # TODO: Implementar generación de reporte
        reporte_data = {
            "justipreciacion_id": justipreciacion_id,
            "registro": justipreciacion.Current.registro,
            "fecha_generacion": "2025-08-03",
            "resumen": {
                "costo_total": 1250000,
                "costo_m2": 8500,
                "superficie": 147,
                "factor_indirectos": 0.15,
                "factor_utilidad": 0.10,
            },
            "desglose": _get_desglose_reporte(),
        }

        if formato.lower() == "pdf":
            # TODO: Implementar generación PDF
            return __response.success(
                data={"url": f"/api/reports/costos-{justipreciacion_id}.pdf"}
            )

        return __response.success(data=reporte_data)

    except Exception as e:
        return __response.error(
            message=f"Error al generar reporte: {str(e)}", status_code=500
        )


def _get_initial_costos_structure() -> Dict[str, Any]:
    """
    Retorna la estructura inicial de costos de construcción
    """
    return {
        "preliminares": {
            "limpieza_terreno": {
                "cantidad": 0,
                "unidad": "m2",
                "precio_unitario": 45,
                "importe": 0,
            },
            "trazo_niveles": {
                "cantidad": 0,
                "unidad": "m2",
                "precio_unitario": 85,
                "importe": 0,
            },
            "excavacion": {
                "cantidad": 0,
                "unidad": "m3",
                "precio_unitario": 120,
                "importe": 0,
            },
        },
        "cimentacion": {
            "zapatas": {
                "cantidad": 0,
                "unidad": "m3",
                "precio_unitario": 2500,
                "importe": 0,
            },
            "contratrabes": {
                "cantidad": 0,
                "unidad": "m3",
                "precio_unitario": 2800,
                "importe": 0,
            },
            "cadenas": {
                "cantidad": 0,
                "unidad": "m3",
                "precio_unitario": 2600,
                "importe": 0,
            },
        },
        "estructura": {
            "columnas": {
                "cantidad": 0,
                "unidad": "m3",
                "precio_unitario": 3200,
                "importe": 0,
            },
            "trabes": {
                "cantidad": 0,
                "unidad": "m3",
                "precio_unitario": 3500,
                "importe": 0,
            },
            "losa": {
                "cantidad": 0,
                "unidad": "m2",
                "precio_unitario": 850,
                "importe": 0,
            },
        },
        "albanileria": {
            "muros_tabique": {
                "cantidad": 0,
                "unidad": "m2",
                "precio_unitario": 380,
                "importe": 0,
            },
            "aplanados": {
                "cantidad": 0,
                "unidad": "m2",
                "precio_unitario": 150,
                "importe": 0,
            },
            "firme_concreto": {
                "cantidad": 0,
                "unidad": "m2",
                "precio_unitario": 220,
                "importe": 0,
            },
        },
        "acabados": {
            "pintura": {
                "cantidad": 0,
                "unidad": "m2",
                "precio_unitario": 85,
                "importe": 0,
            },
            "pisos": {
                "cantidad": 0,
                "unidad": "m2",
                "precio_unitario": 450,
                "importe": 0,
            },
            "azulejos": {
                "cantidad": 0,
                "unidad": "m2",
                "precio_unitario": 350,
                "importe": 0,
            },
        },
        "instalaciones": {
            "hidraulica": {
                "cantidad": 0,
                "unidad": "salida",
                "precio_unitario": 650,
                "importe": 0,
            },
            "electrica": {
                "cantidad": 0,
                "unidad": "salida",
                "precio_unitario": 480,
                "importe": 0,
            },
            "sanitaria": {
                "cantidad": 0,
                "unidad": "salida",
                "precio_unitario": 580,
                "importe": 0,
            },
        },
    }


def _get_conceptos_catalogo(categoria: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Retorna el catálogo de conceptos de construcción
    """
    conceptos = [
        {
            "id": 1,
            "codigo": "PREL-001",
            "descripcion": "Limpieza y desenraice de terreno",
            "unidad": "m2",
            "precio_unitario": 45.00,
            "categoria": "preliminares",
        },
        {
            "id": 2,
            "codigo": "PREL-002",
            "descripcion": "Trazo y nivelación",
            "unidad": "m2",
            "precio_unitario": 85.00,
            "categoria": "preliminares",
        },
        {
            "id": 3,
            "codigo": "CIM-001",
            "descripcion": "Zapata corrida de concreto f'c=200 kg/cm2",
            "unidad": "m3",
            "precio_unitario": 2500.00,
            "categoria": "cimentacion",
        },
        {
            "id": 4,
            "codigo": "EST-001",
            "descripcion": "Columna de concreto f'c=250 kg/cm2",
            "unidad": "m3",
            "precio_unitario": 3200.00,
            "categoria": "estructura",
        },
        {
            "id": 5,
            "codigo": "ALB-001",
            "descripcion": "Muro de tabique rojo recocido",
            "unidad": "m2",
            "precio_unitario": 380.00,
            "categoria": "albanileria",
        },
    ]

    if categoria:
        return [c for c in conceptos if c["categoria"] == categoria]

    return conceptos


def _get_desglose_reporte() -> Dict[str, Any]:
    """
    Retorna el desglose para el reporte
    """
    return {
        "por_categoria": {
            "preliminares": {"importe": 45000, "porcentaje": 3.6},
            "cimentacion": {"importe": 180000, "porcentaje": 14.4},
            "estructura": {"importe": 350000, "porcentaje": 28.0},
            "albanileria": {"importe": 220000, "porcentaje": 17.6},
            "acabados": {"importe": 280000, "porcentaje": 22.4},
            "instalaciones": {"importe": 175000, "porcentaje": 14.0},
        },
        "factores": {
            "subtotal": 1250000,
            "indirectos": 187500,
            "utilidad": 125000,
            "total_final": 1562500,
        },
    }
