from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any, List, Optional
from pydantic import BaseModel
from datetime import datetime

from .. import database, middlewares
from ..models.usuarios import Usuarios


# Modelos Pydantic para request/response
class SugerenciaRequest(BaseModel):
    comentarios: str
    usuario_revisor: str


class RevisionData(BaseModel):
    id: int
    estado: str
    comentarios: Optional[str] = None
    fecha_revision: Optional[datetime] = None
    usuario_revisor: Optional[str] = None


class HistorialRevision(BaseModel):
    id: int
    revision_id: int
    accion: str
    comentarios: Optional[str] = None
    usuario: str
    fecha: datetime


__response = middlewares.RESPONSES()
required = Usuarios.required

revisiones = APIRouter(
    prefix="/revisiones",
    tags=["Revisiones"],
    responses={404: {"description": "Not found"}},
)

# Datos temporales para pruebas (en producción usar base de datos)
revisiones_data = {}
historial_data = {}
sugerencias_data = {}


@revisiones.get("/test")
async def test_revisiones():
    """Endpoint de prueba para verificar que las rutas funcionan"""
    return __response.success(
        data={"message": "Revisiones API funcionando correctamente"}
    )


@revisiones.get("/{revision_id}/status")
async def get_revision_status(
    revision_id: int, db: Session = Depends(database.VALUACIONES)
):
    """Obtiene el estado actual de una revisión"""
    try:
        # Por ahora devolvemos datos de prueba
        # En producción, consultar la base de datos
        revision = revisiones_data.get(
            revision_id,
            {
                "id": revision_id,
                "estado": "PENDIENTE",
                "comentarios": None,
                "fecha_revision": None,
                "usuario_revisor": None,
            },
        )

        return __response.success(data=revision)
    except Exception as e:
        return __response.error(
            message=f"Error al obtener estado: {str(e)}", status_code=500
        )


@revisiones.post("/{revision_id}/aprobar")
async def aprobar_revision(
    revision_id: int,
    request: SugerenciaRequest,
    db: Session = Depends(database.VALUACIONES),
):
    """Aprueba una revisión"""
    try:
        # Actualizar estado
        revisiones_data[revision_id] = {
            "id": revision_id,
            "estado": "APROBADA",
            "comentarios": request.comentarios,
            "fecha_revision": datetime.now(),
            "usuario_revisor": request.usuario_revisor,
        }

        # Agregar al historial
        historial_entry = {
            "id": len(historial_data) + 1,
            "revision_id": revision_id,
            "accion": "APROBADA",
            "comentarios": request.comentarios,
            "usuario": request.usuario_revisor,
            "fecha": datetime.now(),
        }

        if revision_id not in historial_data:
            historial_data[revision_id] = []
        historial_data[revision_id].append(historial_entry)

        return __response.success(
            data=revisiones_data[revision_id], message="Revisión aprobada exitosamente"
        )
    except Exception as e:
        return __response.error(
            message=f"Error al aprobar revisión: {str(e)}", status_code=500
        )


@revisiones.post("/{revision_id}/rechazar")
async def rechazar_revision(
    revision_id: int,
    request: SugerenciaRequest,
    db: Session = Depends(database.VALUACIONES),
):
    """Rechaza una revisión"""
    try:
        # Actualizar estado
        revisiones_data[revision_id] = {
            "id": revision_id,
            "estado": "RECHAZADA",
            "comentarios": request.comentarios,
            "fecha_revision": datetime.now(),
            "usuario_revisor": request.usuario_revisor,
        }

        # Agregar al historial
        historial_entry = {
            "id": len(historial_data) + 1,
            "revision_id": revision_id,
            "accion": "RECHAZADA",
            "comentarios": request.comentarios,
            "usuario": request.usuario_revisor,
            "fecha": datetime.now(),
        }

        if revision_id not in historial_data:
            historial_data[revision_id] = []
        historial_data[revision_id].append(historial_entry)

        return __response.success(
            data=revisiones_data[revision_id], message="Revisión rechazada exitosamente"
        )
    except Exception as e:
        return __response.error(
            message=f"Error al rechazar revisión: {str(e)}", status_code=500
        )


@revisiones.post("/{revision_id}/sugerencias")
async def crear_sugerencia(
    revision_id: int,
    request: SugerenciaRequest,
    db: Session = Depends(database.VALUACIONES),
):
    """Crea una nueva sugerencia para una revisión"""
    try:
        # Actualizar estado a sugerencia
        revisiones_data[revision_id] = {
            "id": revision_id,
            "estado": "CON_SUGERENCIAS",
            "comentarios": request.comentarios,
            "fecha_revision": datetime.now(),
            "usuario_revisor": request.usuario_revisor,
        }

        # Agregar sugerencia
        sugerencia_entry = {
            "id": len(sugerencias_data) + 1,
            "revision_id": revision_id,
            "comentarios": request.comentarios,
            "usuario": request.usuario_revisor,
            "fecha": datetime.now(),
            "estado": "ACTIVA",
        }

        if revision_id not in sugerencias_data:
            sugerencias_data[revision_id] = []
        sugerencias_data[revision_id].append(sugerencia_entry)

        # Agregar al historial
        historial_entry = {
            "id": len(historial_data) + 1,
            "revision_id": revision_id,
            "accion": "SUGERENCIA_CREADA",
            "comentarios": request.comentarios,
            "usuario": request.usuario_revisor,
            "fecha": datetime.now(),
        }

        if revision_id not in historial_data:
            historial_data[revision_id] = []
        historial_data[revision_id].append(historial_entry)

        return __response.success(
            data=sugerencia_entry, message="Sugerencia creada exitosamente"
        )
    except Exception as e:
        return __response.error(
            message=f"Error al crear sugerencia: {str(e)}", status_code=500
        )


@revisiones.get("/{revision_id}/historial")
async def get_historial_revision(
    revision_id: int, db: Session = Depends(database.VALUACIONES)
):
    """Obtiene el historial completo de una revisión"""
    try:
        historial = historial_data.get(revision_id, [])

        # Si no hay historial, crear entrada inicial
        if not historial:
            historial_inicial = {
                "id": 1,
                "revision_id": revision_id,
                "accion": "CREADA",
                "comentarios": "Revisión creada",
                "usuario": "sistema",
                "fecha": datetime.now(),
            }
            historial_data[revision_id] = [historial_inicial]
            historial = [historial_inicial]

        return __response.success(data=historial)
    except Exception as e:
        return __response.error(
            message=f"Error al obtener historial: {str(e)}", status_code=500
        )


@revisiones.get("/{revision_id}/sugerencias")
async def get_sugerencias_revision(
    revision_id: int, db: Session = Depends(database.VALUACIONES)
):
    """Obtiene todas las sugerencias de una revisión"""
    try:
        sugerencias = sugerencias_data.get(revision_id, [])
        return __response.success(data=sugerencias)
    except Exception as e:
        return __response.error(
            message=f"Error al obtener sugerencias: {str(e)}", status_code=500
        )


@revisiones.post("/")
async def crear_revision(
    request: Dict[str, Any], db: Session = Depends(database.VALUACIONES)
):
    """Crea una nueva revisión"""
    try:
        revision_id = len(revisiones_data) + 1

        nueva_revision = {
            "id": revision_id,
            "estado": "PENDIENTE",
            "comentarios": None,
            "fecha_revision": None,
            "usuario_revisor": None,
            "fecha_creacion": datetime.now(),
            **request,
        }

        revisiones_data[revision_id] = nueva_revision

        # Crear entrada inicial en historial
        historial_entry = {
            "id": 1,
            "revision_id": revision_id,
            "accion": "CREADA",
            "comentarios": "Revisión creada",
            "usuario": request.get("usuario_creador", "sistema"),
            "fecha": datetime.now(),
        }

        historial_data[revision_id] = [historial_entry]

        return __response.success(
            data=nueva_revision, message="Revisión creada exitosamente"
        )
    except Exception as e:
        return __response.error(
            message=f"Error al crear revisión: {str(e)}", status_code=500
        )
