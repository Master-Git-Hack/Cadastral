from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from .. import config, database, middlewares
from ..models.homologacion import Homologacion
from ..models.justipreciacion import Justipreciacion
from ..models.usuarios import Usuarios

__response = middlewares.RESPONSES()

required = Usuarios.required
homologacion = APIRouter(
    prefix="/homologacion",
    tags=["Homologación"],
    dependencies=[Depends(Usuarios.required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)


@homologacion.get("/{tipo}/{justipreciacion_id}")
async def get_homologacion(
    tipo: str,
    justipreciacion_id: int,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Obtiene los datos de homologación para un tipo específico y justipreciación
    """
    try:
        # Verificar que existe la justipreciación
        justipreciacion = Justipreciacion(db)
        if justipreciacion.get(justipreciacion_id) is None:
            return __response.error(
                message="No se encontró el registro de justipreciación", status_code=404
            )

        # Buscar homologación existente
        homolog = Homologacion(db)
        existing = homolog.filter_group(
            registro=justipreciacion.Current.registro, tipo=tipo.lower()
        )

        if existing is None:
            # Crear estructura inicial para nueva homologación
            initial_data = {
                "record": {
                    "id": 0,
                    "type": tipo.upper(),
                    "appraisalPurpose": "MERCADO",
                    "status": "newOne",
                },
                "factors": _get_initial_factors(tipo),
                "documentation": _get_initial_documentation(tipo),
                "status": "warning",
                "message": "Registro de homologación no encontrado. Se creará uno nuevo.",
                "errors": [],
            }
            return __response.success(data=initial_data)

        # Retornar datos existentes
        data = {
            "record": {
                "id": existing.id,
                "type": existing.tipo.upper(),
                "appraisalPurpose": existing.tipo_servicio or "MERCADO",
                "status": "exists",
            },
            "factors": existing.factores or _get_initial_factors(tipo),
            "documentation": existing.resultado or _get_initial_documentation(tipo),
            "status": "success",
            "message": "Registro de homologación encontrado exitosamente",
            "errors": [],
        }
        return __response.success(data=data)

    except Exception as e:
        return __response.error(
            message=f"Error al obtener homologación: {str(e)}", status_code=500
        )


@homologacion.post("/{tipo}/{justipreciacion_id}")
async def create_homologacion(
    tipo: str,
    justipreciacion_id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Crea una nueva homologación
    """
    try:
        data = await request.json()

        # Verificar justipreciación
        justipreciacion = Justipreciacion(db)
        if justipreciacion.get(justipreciacion_id) is None:
            return __response.error(
                message="No se encontró el registro de justipreciación", status_code=404
            )

        # Crear nueva homologación
        homolog = Homologacion(db)
        new_record = homolog.create(
            registro=data.get("registro", justipreciacion.Current.registro),
            tipo=data.get("tipo", tipo.lower()),
            tipo_servicio=data.get("tipo_servicio", "mercado"),
            factores=data.get("factores", {}),
            resultado=data.get("resultado", {}),
            valor_unitario=data.get("valor_unitario", 0),
        )

        return __response.success(
            data={"id": new_record.id, "message": "Homologación creada exitosamente"}
        )

    except Exception as e:
        return __response.error(
            message=f"Error al crear homologación: {str(e)}", status_code=500
        )


@homologacion.patch("/{tipo}/{justipreciacion_id}")
async def update_homologacion(
    tipo: str,
    justipreciacion_id: int,
    request: Request,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Actualiza una homologación existente
    """
    try:
        data = await request.json()

        # Verificar justipreciación
        justipreciacion = Justipreciacion(db)
        if justipreciacion.get(justipreciacion_id) is None:
            return __response.error(
                message="No se encontró el registro de justipreciación", status_code=404
            )

        # Buscar homologación existente
        homolog = Homologacion(db)
        existing = homolog.filter_group(
            registro=data.get("registro", justipreciacion.Current.registro),
            tipo=data.get("tipo", tipo.lower()),
        )

        if existing is None:
            return __response.error(
                message="No se encontró la homologación a actualizar", status_code=404
            )

        # Actualizar registro
        updated_data = {
            "factores": data.get("factores", existing.factores),
            "resultado": data.get("resultado", existing.resultado),
            "valor_unitario": data.get("valor_unitario", existing.valor_unitario),
            "tipo_servicio": data.get("tipo_servicio", existing.tipo_servicio),
        }

        homolog.Current = existing
        homolog.update(**updated_data)

        return __response.success(
            data={"id": existing.id, "message": "Homologación actualizada exitosamente"}
        )

    except Exception as e:
        return __response.error(
            message=f"Error al actualizar homologación: {str(e)}", status_code=500
        )


@homologacion.get("/justipreciacion/{tipo}/{justipreciacion_id}")
async def get_required_data_for_homologation(
    tipo: str,
    justipreciacion_id: int,
    user=Depends(required),
    db: Session = Depends(database.VALUACIONES),
):
    """
    Obtiene los datos requeridos para homologación desde justipreciación
    """
    try:
        justipreciacion = Justipreciacion(db)
        if justipreciacion.get(justipreciacion_id) is None:
            return __response.error(
                message="No se encontró el registro de justipreciación", status_code=404
            )

        # Obtener datos básicos de justipreciación
        data = justipreciacion.dict()

        # Agregar información de homologación si existe
        homolog = Homologacion(db)
        existing = homolog.filter_group(
            registro=justipreciacion.Current.registro, tipo=tipo.lower()
        )

        homologation_data = {}
        if existing:
            homologation_data = {
                "id": existing.id,
                "factores": existing.factores,
                "resultado": existing.resultado,
                "valor_unitario": existing.valor_unitario,
            }

        return __response.success(
            data={**data, "homologacion": homologation_data, "tipo": tipo.upper()}
        )

    except Exception as e:
        return __response.error(
            message=f"Error al obtener datos para homologación: {str(e)}",
            status_code=500,
        )


def _get_initial_factors(tipo: str) -> Dict[str, Any]:
    """
    Retorna la estructura inicial de factores según el tipo
    """
    base_factors = {
        "Location": {"subject": [], "data": []},
        "Zone": {"subject": [], "data": [], "results": []},
        "Surface": {"subject": {"value": 0}, "data": []},
        "Commercial": {"data": []},
        "Results": {"data": []},
    }

    if tipo.upper() == "TERRENO":
        return {
            **base_factors,
            "Classification": {"data": []},
            "Project": {"data": []},
            "Building": {"data": []},
            "Level": {"data": []},
            "Quality": {"data": []},
            "Age": {"subject": [], "data": []},
        }
    else:  # RENTA
        return {**base_factors, "Age": {"subject": [], "data": []}}


def _get_initial_documentation(tipo: str) -> Dict[str, Any]:
    """
    Retorna la estructura inicial de documentación según el tipo
    """
    return {
        "Area": {
            "subject": {"value": 0},
            "averageLotArea": {"value": 0, "surface": 0},
            "data": [],
        },
        "SalesCost": {
            "averageUnitCost": {
                "adjustedValue": 0,
                "roundedValue": 0,
                "roundedTo": {"enabled": False, "observations": ""},
                "roundedResult": {},
            }
        },
        "WeightingPercentage": {"data": [], "total": 0},
        "ReFactor": {
            "isUsed": False,
            "root": {"enabled": False, "observations": ""},
            "surface": {"value": 0},
            "form": {},
            "result": {"value": 0},
        },
        "observations": "",
        "Surface": {"root": {"enabled": False, "observations": ""}},
    }
