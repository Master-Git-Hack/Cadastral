"""File to append routes of the apps, or to create a new one."""

from flask import render_template, request, jsonify
from json2html import *
from datetime import datetime

from .. import app
from ..apps import __init__
from ..config import Paths
from ..utils.response import Response

# Almacenamiento temporal para revisiones
revisiones_data = {}
historial_data = {}
sugerencias_data = {}


@app.route("/teapot", methods=["GET"])
def teapot():
    """Just an easter's. egg as example of route"""
    respond, status_code = Response.teapot()
    return (
        json2html.convert(json=respond, table_attributes='class="table table-striped"')
        + "<iframe width = '75%' height='80%' src ='../static/images/teapot.png'></iframe>"
    ), status_code


@app.route("/docs", methods=["GET"])
def docs():
    """Just an easter's. egg as example of route"""
    template = Paths.docs.get_template("index.html")
    return render_template(template)


# ===== ENDPOINTS DE REVISIONES =====


@app.route("/api/v1/revisiones/test", methods=["GET"])
def test_revisiones():
    """Endpoint de prueba para verificar que las rutas funcionan"""
    return Response.success(
        data={"message": "Revisiones API funcionando correctamente"}
    )


@app.route("/api/v1/revisiones/<int:revision_id>/status", methods=["GET"])
def get_revision_status(revision_id: int):
    """Obtiene el estado actual de una revisión"""
    try:
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

        return Response.success(data=revision)
    except Exception as e:
        return Response.error(
            message=f"Error al obtener estado: {str(e)}", status_code=500
        )


@app.route("/api/v1/revisiones/<int:revision_id>/aprobar", methods=["POST"])
def aprobar_revision(revision_id: int):
    """Aprueba una revisión"""
    try:
        data = request.get_json()
        comentarios = data.get("comentarios", "")
        usuario_revisor = data.get("usuario_revisor", "usuario_actual")

        # Actualizar estado
        revisiones_data[revision_id] = {
            "id": revision_id,
            "estado": "APROBADA",
            "comentarios": comentarios,
            "fecha_revision": datetime.now().isoformat(),
            "usuario_revisor": usuario_revisor,
        }

        # Agregar al historial
        historial_entry = {
            "id": len(historial_data.get(revision_id, [])) + 1,
            "revision_id": revision_id,
            "accion": "APROBADA",
            "comentarios": comentarios,
            "usuario": usuario_revisor,
            "fecha": datetime.now().isoformat(),
        }

        if revision_id not in historial_data:
            historial_data[revision_id] = []
        historial_data[revision_id].append(historial_entry)

        return Response.success(
            data=revisiones_data[revision_id], message="Revisión aprobada exitosamente"
        )
    except Exception as e:
        return Response.error(
            message=f"Error al aprobar revisión: {str(e)}", status_code=500
        )


@app.route("/api/v1/revisiones/<int:revision_id>/rechazar", methods=["POST"])
def rechazar_revision(revision_id: int):
    """Rechaza una revisión"""
    try:
        data = request.get_json()
        comentarios = data.get("comentarios", "")
        usuario_revisor = data.get("usuario_revisor", "usuario_actual")

        # Actualizar estado
        revisiones_data[revision_id] = {
            "id": revision_id,
            "estado": "RECHAZADA",
            "comentarios": comentarios,
            "fecha_revision": datetime.now().isoformat(),
            "usuario_revisor": usuario_revisor,
        }

        # Agregar al historial
        historial_entry = {
            "id": len(historial_data.get(revision_id, [])) + 1,
            "revision_id": revision_id,
            "accion": "RECHAZADA",
            "comentarios": comentarios,
            "usuario": usuario_revisor,
            "fecha": datetime.now().isoformat(),
        }

        if revision_id not in historial_data:
            historial_data[revision_id] = []
        historial_data[revision_id].append(historial_entry)

        return Response.success(
            data=revisiones_data[revision_id], message="Revisión rechazada exitosamente"
        )
    except Exception as e:
        return Response.error(
            message=f"Error al rechazar revisión: {str(e)}", status_code=500
        )


@app.route("/api/v1/revisiones/<int:revision_id>/sugerencias", methods=["POST"])
def crear_sugerencia(revision_id: int):
    """Crea una nueva sugerencia para una revisión"""
    try:
        data = request.get_json()
        comentarios = data.get("comentarios", "")
        usuario_revisor = data.get("usuario_revisor", "usuario_actual")

        # Validar que hay comentarios
        if not comentarios:
            return Response.error(
                message="Los comentarios son requeridos para crear una sugerencia",
                status_code=400,
            )

        # Actualizar estado a sugerencia
        revisiones_data[revision_id] = {
            "id": revision_id,
            "estado": "CON_SUGERENCIAS",
            "comentarios": comentarios,
            "fecha_revision": datetime.now().isoformat(),
            "usuario_revisor": usuario_revisor,
        }

        # Agregar sugerencia
        sugerencia_entry = {
            "id": len(sugerencias_data.get(revision_id, [])) + 1,
            "revision_id": revision_id,
            "comentarios": comentarios,
            "usuario": usuario_revisor,
            "fecha": datetime.now().isoformat(),
            "estado": "ACTIVA",
        }

        if revision_id not in sugerencias_data:
            sugerencias_data[revision_id] = []
        sugerencias_data[revision_id].append(sugerencia_entry)

        # Agregar al historial
        historial_entry = {
            "id": len(historial_data.get(revision_id, [])) + 1,
            "revision_id": revision_id,
            "accion": "SUGERENCIA_CREADA",
            "comentarios": comentarios,
            "usuario": usuario_revisor,
            "fecha": datetime.now().isoformat(),
        }

        if revision_id not in historial_data:
            historial_data[revision_id] = []
        historial_data[revision_id].append(historial_entry)

        return Response.success(
            data=sugerencia_entry, message="Sugerencia creada exitosamente"
        )
    except Exception as e:
        return Response.error(
            message=f"Error al crear sugerencia: {str(e)}", status_code=500
        )


@app.route("/api/v1/revisiones/<int:revision_id>/historial", methods=["GET"])
def get_historial_revision(revision_id: int):
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
                "fecha": datetime.now().isoformat(),
            }
            historial_data[revision_id] = [historial_inicial]
            historial = [historial_inicial]

        return Response.success(data=historial)
    except Exception as e:
        return Response.error(
            message=f"Error al obtener historial: {str(e)}", status_code=500
        )


@app.route("/api/v1/revisiones/<int:revision_id>/sugerencias", methods=["GET"])
def get_sugerencias_revision(revision_id: int):
    """Obtiene todas las sugerencias de una revisión"""
    try:
        sugerencias = sugerencias_data.get(revision_id, [])
        return Response.success(data=sugerencias)
    except Exception as e:
        return Response.error(
            message=f"Error al obtener sugerencias: {str(e)}", status_code=500
        )
