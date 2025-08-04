from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from .. import config, database, middlewares
from ..models.justipreciacion import Justipreciacion
from ..models.usuarios import Usuarios

__response = middlewares.RESPONSES()

required = Usuarios.required
obras_complementarias = APIRouter(
    prefix="/obras-complementarias",
    tags=["Obras Complementarias"],
    dependencies=[Depends(Usuarios.required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)


@obras_complementarias.get("/{justipreciacion_id}")
async def get_obras_complementarias(
    justipreciacion_id: int,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Obtiene los datos de obras complementarias para una justipreciación
    """
    try:
        # Verificar que existe la justipreciación
        justipreciacion = (
            db.query(Justipreciacion)
            .filter(Justipreciacion.id == justipreciacion_id)
            .first()
        )

        if not justipreciacion:
            raise HTTPException(
                status_code=404,
                detail=f"Justipreciación {justipreciacion_id} no encontrada",
            )

        # Obtener obras complementarias existentes o crear estructura inicial
        obras_data = _get_obras_complementarias_data(db, justipreciacion_id)

        if not obras_data:
            # Crear estructura inicial si no existe
            obras_data = _get_initial_obras_structure()

        return __response.success(
            {
                "justipreciacion_id": justipreciacion_id,
                "registro": justipreciacion.registro,
                "obras": obras_data["obras"],
                "totales": obras_data["totales"],
                "configuracion": obras_data["configuracion"],
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@obras_complementarias.post("/{justipreciacion_id}")
async def create_obras_complementarias(
    justipreciacion_id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Crea un nuevo registro de obras complementarias
    """
    try:
        body = await request.json()

        # Verificar que existe la justipreciación
        justipreciacion = (
            db.query(Justipreciacion)
            .filter(Justipreciacion.id == justipreciacion_id)
            .first()
        )

        if not justipreciacion:
            raise HTTPException(
                status_code=404,
                detail=f"Justipreciación {justipreciacion_id} no encontrada",
            )

        # Validar estructura de datos
        obras = body.get("obras", {})
        totales = body.get("totales", {})
        configuracion = body.get("configuracion", {})

        # Guardar en base de datos (aquí iría la lógica específica de BD)
        obras_id = _save_obras_complementarias(
            db, justipreciacion_id, obras, totales, configuracion, user["id"]
        )

        return __response.success(
            {
                "message": "Obras complementarias creadas exitosamente",
                "obras_id": obras_id,
                "justipreciacion_id": justipreciacion_id,
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@obras_complementarias.patch("/{justipreciacion_id}")
async def update_obras_complementarias(
    justipreciacion_id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Actualiza las obras complementarias existentes
    """
    try:
        body = await request.json()

        # Verificar que existe la justipreciación
        justipreciacion = (
            db.query(Justipreciacion)
            .filter(Justipreciacion.id == justipreciacion_id)
            .first()
        )

        if not justipreciacion:
            raise HTTPException(
                status_code=404,
                detail=f"Justipreciación {justipreciacion_id} no encontrada",
            )

        # Validar estructura de datos
        obras = body.get("obras", {})
        totales = body.get("totales", {})
        configuracion = body.get("configuracion", {})

        # Actualizar en base de datos
        _update_obras_complementarias(
            db, justipreciacion_id, obras, totales, configuracion, user["id"]
        )

        return __response.success(
            {
                "message": "Obras complementarias actualizadas exitosamente",
                "justipreciacion_id": justipreciacion_id,
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@obras_complementarias.get("/{justipreciacion_id}/catalogo")
async def get_obras_catalogo(
    justipreciacion_id: int,
    tipo_obra: Optional[str] = None,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Obtiene el catálogo de obras complementarias disponibles
    """
    try:
        catalogo = _get_obras_catalogo(db, tipo_obra)

        return __response.success({"catalogo": catalogo, "total": len(catalogo)})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


@obras_complementarias.get("/{justipreciacion_id}/reporte")
async def generate_obras_reporte(
    justipreciacion_id: int,
    formato: str = "json",
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Genera reporte de obras complementarias
    """
    try:
        # Verificar que existe la justipreciación
        justipreciacion = (
            db.query(Justipreciacion)
            .filter(Justipreciacion.id == justipreciacion_id)
            .first()
        )

        if not justipreciacion:
            raise HTTPException(
                status_code=404,
                detail=f"Justipreciación {justipreciacion_id} no encontrada",
            )

        # Obtener datos de obras complementarias
        obras_data = _get_obras_complementarias_data(db, justipreciacion_id)

        if not obras_data:
            raise HTTPException(
                status_code=404,
                detail="No se encontraron datos de obras complementarias",
            )

        # Generar reporte según el formato
        if formato.lower() == "pdf":
            # Generar PDF (implementación específica)
            pdf_url = _generate_obras_pdf_report(justipreciacion_id, obras_data)
            return __response.success(
                {
                    "formato": "pdf",
                    "url": pdf_url,
                    "mensaje": "Reporte PDF generado exitosamente",
                }
            )
        else:
            # Reporte en JSON con resumen
            resumen = _generate_obras_summary(obras_data)
            return __response.success(
                {
                    "formato": "json",
                    "datos": obras_data,
                    "resumen": resumen,
                    "justipreciacion": {
                        "id": justipreciacion_id,
                        "registro": justipreciacion.registro,
                    },
                }
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")


# Funciones auxiliares
def _get_obras_complementarias_data(
    db: Session, justipreciacion_id: int
) -> Optional[Dict]:
    """
    Obtiene los datos existentes de obras complementarias
    """
    # Aquí iría la consulta real a la base de datos
    # Por ahora retornamos datos de ejemplo
    return {
        "obras": {
            "pavimentacion": {
                "banquetas": {
                    "cantidad": 0,
                    "unidad": "m²",
                    "precio_unitario": 0,
                    "importe": 0,
                },
                "guarniciones": {
                    "cantidad": 0,
                    "unidad": "ml",
                    "precio_unitario": 0,
                    "importe": 0,
                },
            },
            "servicios": {
                "agua_potable": {
                    "cantidad": 0,
                    "unidad": "toma",
                    "precio_unitario": 0,
                    "importe": 0,
                },
                "drenaje": {
                    "cantidad": 0,
                    "unidad": "descarga",
                    "precio_unitario": 0,
                    "importe": 0,
                },
                "energia_electrica": {
                    "cantidad": 0,
                    "unidad": "acometida",
                    "precio_unitario": 0,
                    "importe": 0,
                },
            },
            "infraestructura": {
                "alumbrado_publico": {
                    "cantidad": 0,
                    "unidad": "punto",
                    "precio_unitario": 0,
                    "importe": 0,
                },
                "mobiliario_urbano": {
                    "cantidad": 0,
                    "unidad": "pza",
                    "precio_unitario": 0,
                    "importe": 0,
                },
            },
        },
        "totales": {"costo_total": 0, "costo_m2": 0, "superficie_beneficiada": 0},
        "configuracion": {
            "incluir_pavimentacion": True,
            "incluir_servicios": True,
            "incluir_infraestructura": True,
            "factor_contingencias": 0.10,
            "factor_indirectos": 0.15,
        },
    }


def _get_initial_obras_structure() -> Dict:
    """
    Retorna la estructura inicial para obras complementarias
    """
    return {
        "obras": {
            "pavimentacion": {
                "banquetas": {
                    "cantidad": 0,
                    "unidad": "m²",
                    "precio_unitario": 450.00,
                    "importe": 0,
                },
                "guarniciones": {
                    "cantidad": 0,
                    "unidad": "ml",
                    "precio_unitario": 285.00,
                    "importe": 0,
                },
                "pavimento_asfaltico": {
                    "cantidad": 0,
                    "unidad": "m²",
                    "precio_unitario": 320.00,
                    "importe": 0,
                },
            },
            "servicios": {
                "agua_potable": {
                    "cantidad": 0,
                    "unidad": "toma",
                    "precio_unitario": 8500.00,
                    "importe": 0,
                },
                "drenaje": {
                    "cantidad": 0,
                    "unidad": "descarga",
                    "precio_unitario": 12000.00,
                    "importe": 0,
                },
                "energia_electrica": {
                    "cantidad": 0,
                    "unidad": "acometida",
                    "precio_unitario": 15000.00,
                    "importe": 0,
                },
            },
            "infraestructura": {
                "alumbrado_publico": {
                    "cantidad": 0,
                    "unidad": "punto",
                    "precio_unitario": 25000.00,
                    "importe": 0,
                },
                "mobiliario_urbano": {
                    "cantidad": 0,
                    "unidad": "pza",
                    "precio_unitario": 5000.00,
                    "importe": 0,
                },
                "areas_verdes": {
                    "cantidad": 0,
                    "unidad": "m²",
                    "precio_unitario": 150.00,
                    "importe": 0,
                },
            },
        },
        "totales": {"costo_total": 0, "costo_m2": 0, "superficie_beneficiada": 100},
        "configuracion": {
            "incluir_pavimentacion": True,
            "incluir_servicios": True,
            "incluir_infraestructura": True,
            "factor_contingencias": 0.10,
            "factor_indirectos": 0.15,
        },
    }


def _save_obras_complementarias(
    db: Session,
    justipreciacion_id: int,
    obras: Dict,
    totales: Dict,
    configuracion: Dict,
    user_id: int,
) -> int:
    """
    Guarda nuevas obras complementarias en la base de datos
    """
    # Aquí iría la lógica de inserción real
    # Por ahora simulamos la creación
    return justipreciacion_id


def _update_obras_complementarias(
    db: Session,
    justipreciacion_id: int,
    obras: Dict,
    totales: Dict,
    configuracion: Dict,
    user_id: int,
):
    """
    Actualiza obras complementarias existentes
    """
    # Aquí iría la lógica de actualización real
    pass


def _get_obras_catalogo(db: Session, tipo_obra: Optional[str] = None) -> List[Dict]:
    """
    Obtiene el catálogo de obras complementarias
    """
    catalogo_completo = [
        {
            "id": 1,
            "codigo": "PAV-001",
            "descripcion": "Banqueta de concreto e=10cm",
            "unidad": "m²",
            "precio_unitario": 450.00,
            "categoria": "pavimentacion",
        },
        {
            "id": 2,
            "codigo": "PAV-002",
            "descripcion": "Guarnición de concreto precolado",
            "unidad": "ml",
            "precio_unitario": 285.00,
            "categoria": "pavimentacion",
        },
        {
            "id": 3,
            "codigo": "PAV-003",
            "descripcion": "Pavimento asfáltico e=5cm",
            "unidad": "m²",
            "precio_unitario": 320.00,
            "categoria": "pavimentacion",
        },
        {
            "id": 4,
            "codigo": "SER-001",
            "descripcion": "Toma domiciliaria de agua potable",
            "unidad": "toma",
            "precio_unitario": 8500.00,
            "categoria": "servicios",
        },
        {
            "id": 5,
            "codigo": "SER-002",
            "descripcion": "Descarga domiciliaria de drenaje",
            "unidad": "descarga",
            "precio_unitario": 12000.00,
            "categoria": "servicios",
        },
        {
            "id": 6,
            "codigo": "SER-003",
            "descripcion": "Acometida eléctrica domiciliaria",
            "unidad": "acometida",
            "precio_unitario": 15000.00,
            "categoria": "servicios",
        },
        {
            "id": 7,
            "codigo": "INF-001",
            "descripcion": "Luminaria LED para alumbrado público",
            "unidad": "punto",
            "precio_unitario": 25000.00,
            "categoria": "infraestructura",
        },
        {
            "id": 8,
            "codigo": "INF-002",
            "descripcion": "Mobiliario urbano (banca, bote basura)",
            "unidad": "pza",
            "precio_unitario": 5000.00,
            "categoria": "infraestructura",
        },
        {
            "id": 9,
            "codigo": "INF-003",
            "descripcion": "Jardinería y áreas verdes",
            "unidad": "m²",
            "precio_unitario": 150.00,
            "categoria": "infraestructura",
        },
    ]

    if tipo_obra:
        return [item for item in catalogo_completo if item["categoria"] == tipo_obra]

    return catalogo_completo


def _generate_obras_summary(obras_data: Dict) -> Dict:
    """
    Genera resumen ejecutivo de obras complementarias
    """
    obras = obras_data.get("obras", {})
    configuracion = obras_data.get("configuracion", {})

    # Calcular totales por categoría
    totales_categoria = {}
    total_general = 0

    for categoria, items in obras.items():
        total_categoria = sum(item.get("importe", 0) for item in items.values())
        totales_categoria[categoria] = total_categoria
        total_general += total_categoria

    # Aplicar factores
    contingencias = total_general * configuracion.get("factor_contingencias", 0)
    indirectos = total_general * configuracion.get("factor_indirectos", 0)
    total_final = total_general + contingencias + indirectos

    return {
        "totales_por_categoria": totales_categoria,
        "subtotal": total_general,
        "contingencias": contingencias,
        "indirectos": indirectos,
        "total_final": total_final,
        "factores_aplicados": {
            "contingencias": configuracion.get("factor_contingencias", 0),
            "indirectos": configuracion.get("factor_indirectos", 0),
        },
    }


def _generate_obras_pdf_report(justipreciacion_id: int, obras_data: Dict) -> str:
    """
    Genera reporte PDF de obras complementarias
    """
    # Aquí iría la lógica de generación de PDF
    # Por ahora retornamos una URL de ejemplo
    return f"/api/reports/obras-complementarias/{justipreciacion_id}.pdf"
