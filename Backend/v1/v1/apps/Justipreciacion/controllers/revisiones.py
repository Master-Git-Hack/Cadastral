from flask import Blueprint, request, jsonify
from flask_restx import Api, Resource, fields, Namespace
from marshmallow import ValidationError
from ..services.revisiones import RevisionService
from ..models.revisiones import (
    RevisionData,
    RevisionDataSchema,
    RevisionDataCreateSchema,
    RevisionDataUpdateSchema,
    RevisionHistorySchema,
    RevisionSuggestionsSchema,
    RevisionSuggestionsCreateSchema,
    RevisionPermissionsSchema,
    RevisionPermissionsCreateSchema,
)
from .... import db
from datetime import datetime

revision_bp = Blueprint("revisiones", __name__, url_prefix="/api/v1/revisiones")
revision_ns = Namespace("revisiones", description="Operaciones de Revisiones")

# Esquemas para documentación Swagger
revision_model = revision_ns.model(
    "RevisionData",
    {
        "id": fields.Integer(description="ID de la revisión"),
        "homologacion_id": fields.Integer(
            required=True, description="ID de la homologación"
        ),
        "type": fields.String(
            required=True, description="Tipo de revisión", enum=["TERRENO", "RENTA"]
        ),
        "appraisal_purpose": fields.String(
            required=True, description="Propósito de tasación"
        ),
        "status": fields.String(
            description="Estado",
            enum=["PENDIENTE", "EN_REVISION", "APROBADA", "RECHAZADA"],
        ),
        "assigned_reviewer": fields.String(description="Revisor asignado"),
        "created_at": fields.DateTime(description="Fecha de creación"),
        "updated_at": fields.DateTime(description="Fecha de actualización"),
    },
)


@revision_ns.route("/")
class RevisionList(Resource):
    @revision_ns.doc("list_revisions")
    @revision_ns.param(
        "homologacion_id", "ID de homologación", type="int", required=True
    )
    @revision_ns.param("type", "Tipo de revisión", type="str")
    @revision_ns.param("username", "Usuario actual", type="str")
    def get(self):
        """Obtener lista de revisiones"""
        try:
            homologacion_id = request.args.get("homologacion_id", type=int)
            revision_type = request.args.get("type")
            username = request.args.get("username")

            if not homologacion_id:
                return {"error": "homologacion_id es requerido"}, 400

            revisions = RevisionService.get_revisions_by_homologacion(
                homologacion_id, revision_type
            )

            schema = RevisionDataSchema(many=True)

            # Adicionar información adicional para cada revisión
            result = []
            for revision in revisions:
                revision_data = schema.dump(revision)
                # Agregar contadores de sugerencias
                revision_data["total_suggestions"] = len(revision.suggestions)
                revision_data["pending_suggestions"] = len(
                    [s for s in revision.suggestions if not s.is_converted]
                )
                revision_data["converted_suggestions"] = len(
                    [s for s in revision.suggestions if s.is_converted]
                )
                result.append(revision_data)

            return {"revisions": result, "total": len(result)}

        except Exception as e:
            return {"error": str(e)}, 500

    @revision_ns.doc("create_revision")
    @revision_ns.expect(revision_model)
    def post(self):
        """Crear nueva revisión"""
        try:
            schema = RevisionDataCreateSchema()
            data = schema.load(request.json)

            revision = RevisionService.create_revision(data)

            result_schema = RevisionDataSchema()
            return {
                "message": "Revisión creada exitosamente",
                "revision": result_schema.dump(revision),
            }, 201

        except ValidationError as e:
            return {"error": "Datos inválidos", "details": e.messages}, 400
        except ValueError as e:
            return {"error": str(e)}, 400
        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/<int:revision_id>")
class RevisionDetail(Resource):
    @revision_ns.doc("get_revision")
    @revision_ns.param("username", "Usuario actual", type="str")
    def get(self, revision_id):
        """Obtener detalles de revisión"""
        try:
            username = request.args.get("username")

            revision = RevisionService.get_revision(revision_id, username)
            if not revision:
                return {"error": "Revisión no encontrada"}, 404

            schema = RevisionDataSchema()
            return {"revision": schema.dump(revision)}

        except PermissionError as e:
            return {"error": str(e)}, 403
        except Exception as e:
            return {"error": str(e)}, 500

    @revision_ns.doc("update_revision")
    def put(self, revision_id):
        """Actualizar revisión"""
        try:
            username = request.json.get("username")
            if not username:
                return {"error": "username es requerido"}, 400

            schema = RevisionDataUpdateSchema()
            data = schema.load(request.json)
            data.pop("username", None)  # Remover username de los datos

            revision = RevisionService.update_revision(revision_id, data, username)

            result_schema = RevisionDataSchema()
            return {
                "message": "Revisión actualizada exitosamente",
                "revision": result_schema.dump(revision),
            }

        except ValidationError as e:
            return {"error": "Datos inválidos", "details": e.messages}, 400
        except ValueError as e:
            return {"error": str(e)}, 404
        except PermissionError as e:
            return {"error": str(e)}, 403
        except Exception as e:
            return {"error": str(e)}, 500

    @revision_ns.doc("delete_revision")
    def delete(self, revision_id):
        """Eliminar revisión"""
        try:
            username = request.json.get("username")
            if not username:
                return {"error": "username es requerido"}, 400

            RevisionService.delete_revision(revision_id, username)
            return {"message": "Revisión eliminada exitosamente"}

        except ValueError as e:
            return {"error": str(e)}, 404
        except PermissionError as e:
            return {"error": str(e)}, 403
        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/<int:revision_id>/historial")
class RevisionHistoryList(Resource):
    @revision_ns.doc("get_revision_history")
    @revision_ns.param("username", "Usuario actual", type="str")
    def get(self, revision_id):
        """Obtener historial de revisión"""
        try:
            username = request.args.get("username")

            history = RevisionService.get_revision_history(revision_id, username)

            schema = RevisionHistorySchema(many=True)
            return {"history": schema.dump(history), "total": len(history)}

        except PermissionError as e:
            return {"error": str(e)}, 403
        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/<int:revision_id>/sugerencias")
class RevisionSuggestionsList(Resource):
    @revision_ns.doc("get_revision_suggestions")
    @revision_ns.param("username", "Usuario actual", type="str")
    @revision_ns.param("is_converted", "Filtrar por convertidas", type="bool")
    def get(self, revision_id):
        """Obtener sugerencias de revisión"""
        try:
            username = request.args.get("username")
            is_converted = request.args.get("is_converted", type=bool)

            suggestions = RevisionService.get_suggestions(
                revision_id, username, is_converted
            )

            schema = RevisionSuggestionsSchema(many=True)
            return {"suggestions": schema.dump(suggestions), "total": len(suggestions)}

        except PermissionError as e:
            return {"error": str(e)}, 403
        except Exception as e:
            return {"error": str(e)}, 500

    @revision_ns.doc("create_suggestion")
    def post(self, revision_id):
        """Crear nueva sugerencia"""
        try:
            data = request.json.copy()
            data["revision_data_id"] = revision_id

            schema = RevisionSuggestionsCreateSchema()
            validated_data = schema.load(data)

            suggestion = RevisionService.create_suggestion(validated_data)

            result_schema = RevisionSuggestionsSchema()
            return {
                "message": "Sugerencia creada exitosamente",
                "suggestion": result_schema.dump(suggestion),
            }, 201

        except ValidationError as e:
            return {"error": "Datos inválidos", "details": e.messages}, 400
        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/sugerencias/<int:suggestion_id>/convertir")
class ConvertSuggestion(Resource):
    @revision_ns.doc("convert_suggestion")
    def put(self, suggestion_id):
        """Convertir sugerencia"""
        try:
            username = request.json.get("username")
            if not username:
                return {"error": "username es requerido"}, 400

            suggestion = RevisionService.convert_suggestion(suggestion_id, username)

            schema = RevisionSuggestionsSchema()
            return {
                "message": "Sugerencia convertida exitosamente",
                "suggestion": schema.dump(suggestion),
            }

        except ValueError as e:
            return {"error": str(e)}, 404
        except PermissionError as e:
            return {"error": str(e)}, 403
        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/<int:revision_id>/permisos")
class RevisionPermissionsList(Resource):
    @revision_ns.doc("get_revision_permissions")
    def get(self, revision_id):
        """Obtener permisos de revisión"""
        try:
            permissions = RevisionService.get_permissions(revision_id)

            schema = RevisionPermissionsSchema(many=True)
            return {"permissions": schema.dump(permissions), "total": len(permissions)}

        except Exception as e:
            return {"error": str(e)}, 500

    @revision_ns.doc("create_permission")
    def post(self, revision_id):
        """Crear nuevo permiso"""
        try:
            data = request.json.copy()
            data["revision_data_id"] = revision_id

            schema = RevisionPermissionsCreateSchema()
            validated_data = schema.load(data)

            permission = RevisionService.create_permission(validated_data)

            result_schema = RevisionPermissionsSchema()
            return {
                "message": "Permiso creado exitosamente",
                "permission": result_schema.dump(permission),
            }, 201

        except ValidationError as e:
            return {"error": "Datos inválidos", "details": e.messages}, 400
        except ValueError as e:
            return {"error": str(e)}, 400
        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/permisos/<int:permission_id>")
class RevisionPermissionDetail(Resource):
    @revision_ns.doc("update_permission")
    def put(self, permission_id):
        """Actualizar permiso"""
        try:
            granted_by = request.json.get("granted_by")
            if not granted_by:
                return {"error": "granted_by es requerido"}, 400

            data = request.json.copy()
            data.pop("granted_by")

            permission = RevisionService.update_permission(
                permission_id, data, granted_by
            )

            schema = RevisionPermissionsSchema()
            return {
                "message": "Permiso actualizado exitosamente",
                "permission": schema.dump(permission),
            }

        except ValueError as e:
            return {"error": str(e)}, 404
        except Exception as e:
            return {"error": str(e)}, 500

    @revision_ns.doc("delete_permission")
    def delete(self, permission_id):
        """Eliminar permiso"""
        try:
            RevisionService.delete_permission(permission_id)
            return {"message": "Permiso eliminado exitosamente"}

        except ValueError as e:
            return {"error": str(e)}, 404
        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/homologacion/<int:homologacion_id>")
class RevisionByHomologacion(Resource):
    @revision_ns.doc("get_revisions_by_homologacion")
    @revision_ns.param("type", "Tipo de revisión", type="str")
    @revision_ns.param("username", "Usuario actual", type="str")
    def get(self, homologacion_id):
        """Obtener revisiones por homologación"""
        try:
            revision_type = request.args.get("type")
            username = request.args.get("username")

            revisions = RevisionService.get_revisions_by_homologacion(
                homologacion_id, revision_type
            )

            schema = RevisionDataSchema(many=True)
            return {"revisions": schema.dump(revisions), "total": len(revisions)}

        except Exception as e:
            return {"error": str(e)}, 500

    @revision_ns.doc("create_revision_from_homologacion")
    @revision_ns.expect(revision_model)
    def post(self, homologacion_id):
        """Crear revisión para homologación específica"""
        try:
            data = request.json.copy()
            data["homologacion_id"] = homologacion_id

            schema = RevisionDataCreateSchema()
            validated_data = schema.load(data)

            revision = RevisionService.create_revision(validated_data)

            result_schema = RevisionDataSchema()
            return {
                "message": "Revisión creada exitosamente",
                "revision": result_schema.dump(revision),
            }, 201

        except ValidationError as e:
            return {"error": "Datos inválidos", "details": e.messages}, 400
        except ValueError as e:
            return {"error": str(e)}, 400
        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/<int:revision_id>/checklist")
class RevisionChecklistList(Resource):
    @revision_ns.doc("get_revision_checklist")
    @revision_ns.param("username", "Usuario actual", type="str")
    def get(self, revision_id):
        """Obtener checklist de revisión"""
        try:
            username = request.args.get("username")

            # Por ahora retornamos una lista vacía ya que las tablas están vacías
            # En el futuro aquí se implementaría la lógica real
            return {"checklist": [], "total": 0}

        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/status/homologacion/<int:homologacion_id>")
class RevisionStatusByHomologacion(Resource):
    @revision_ns.doc("get_revision_status_by_homologacion")
    @revision_ns.param("tipo", "Tipo de revisión", type="str")
    def get(self, homologacion_id):
        """Obtener solo el estado de revisiones para una homologación (consulta rápida)"""
        try:
            revision_type = request.args.get("tipo")  # Cambiado de "type" a "tipo"

            # Consulta optimizada - solo los campos necesarios
            query = db.session.query(
                RevisionData.id,
                RevisionData.status,
                RevisionData.assigned_reviewer,
                RevisionData.created_at,
                RevisionData.updated_at,
            ).filter_by(homologacion_id=homologacion_id)

            if revision_type:
                query = query.filter_by(
                    type=revision_type.upper()
                )  # Convertir a mayúsculas

            revisions = query.order_by(RevisionData.created_at.desc()).limit(5).all()

            # Convertir a diccionarios
            revision_list = []
            for rev in revisions:
                revision_list.append(
                    {
                        "id": rev.id,
                        "status": rev.status,
                        "assigned_reviewer": rev.assigned_reviewer,
                        "created_at": (
                            rev.created_at.isoformat() if rev.created_at else None
                        ),
                        "updated_at": (
                            rev.updated_at.isoformat() if rev.updated_at else None
                        ),
                    }
                )

            return {
                "has_revisions": len(revision_list) > 0,
                "total_count": len(revision_list),
                "latest_status": revision_list[0]["status"] if revision_list else None,
                "can_create": len(revision_list) == 0,
                "revisions": revision_list,
            }

        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/init")
class RevisionInit(Resource):
    @revision_ns.doc("init_revision_module")
    @revision_ns.param("key", "Clave de acceso", type="str", required=True)
    @revision_ns.param("tipo", "Tipo (terreno/renta)", type="str", required=True)
    @revision_ns.param("id", "ID de homologación", type="int", required=True)
    @revision_ns.param("sp1_superficie", "Superficie", type="float")
    @revision_ns.param("sp1_factor", "Factor", type="float")
    @revision_ns.param("tipo_servicio", "Tipo de servicio", type="str")
    @revision_ns.param("username", "Usuario", type="str", required=True)
    def get(self):
        """Inicializar módulo de revisiones con parámetros URL"""
        try:
            # Obtener parámetros
            key = request.args.get("key")
            tipo = request.args.get("tipo")
            homologacion_id = request.args.get("id", type=int)
            sp1_superficie = request.args.get("sp1_superficie", type=float)
            sp1_factor = request.args.get("sp1_factor", type=float)
            tipo_servicio = request.args.get("tipo_servicio")
            username = request.args.get("username")

            if not all([key, tipo, homologacion_id, username]):
                return {"error": "Parámetros requeridos: key, tipo, id, username"}, 400

            # Verificar si existe una revisión para esta homologación
            existing_revisions = RevisionService.get_revisions_by_homologacion(
                homologacion_id, tipo.upper()
            )

            # Si no existe, crear una nueva
            if not existing_revisions:
                revision_data = {
                    "homologacion_id": homologacion_id,
                    "type": tipo.upper(),
                    "appraisal_purpose": f"Revisión {tipo_servicio or 'justipreciacion'}",
                    "assigned_reviewer": username,
                }

                revision = RevisionService.create_revision(revision_data)

                # Crear permisos básicos para el usuario
                permission_data = {
                    "user_id": username,
                    "revision_data_id": revision.id,
                    "can_read": True,
                    "can_write": True,
                    "can_approve": True,
                    "granted_by": username,
                }
                RevisionService.create_permission(permission_data)

                schema = RevisionDataSchema()
                return {
                    "message": "Módulo inicializado con nueva revisión",
                    "revision": schema.dump(revision),
                    "parameters": {
                        "tipo": tipo,
                        "homologacion_id": homologacion_id,
                        "superficie": sp1_superficie,
                        "factor": sp1_factor,
                        "tipo_servicio": tipo_servicio,
                        "username": username,
                    },
                }, 201
            else:
                # Usar la revisión existente
                schema = RevisionDataSchema(many=True)
                return {
                    "message": "Módulo inicializado con revisión existente",
                    "revisions": schema.dump(existing_revisions),
                    "parameters": {
                        "tipo": tipo,
                        "homologacion_id": homologacion_id,
                        "superficie": sp1_superficie,
                        "factor": sp1_factor,
                        "tipo_servicio": tipo_servicio,
                        "username": username,
                    },
                }

        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/<int:revision_id>/aprobar")
class ApproveRevision(Resource):
    @revision_ns.doc("approve_revision")
    def post(self, revision_id):
        """Aprobar revisión"""
        try:
            username = request.json.get("usuario_revisor")
            comentarios = request.json.get("comentarios", "")

            if not username:
                return {"error": "Usuario revisor es requerido"}, 400

            revision = RevisionService.approve_revision(
                revision_id, username, comentarios
            )

            schema = RevisionDataSchema()
            return {
                "message": "Revisión aprobada exitosamente",
                "revision": schema.dump(revision),
            }

        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/<int:revision_id>/rechazar")
class RejectRevision(Resource):
    @revision_ns.doc("reject_revision")
    def post(self, revision_id):
        """Rechazar revisión"""
        try:
            username = request.json.get("usuario_revisor")
            comentarios = request.json.get("comentarios", "")

            if not username:
                return {"error": "Usuario revisor es requerido"}, 400

            revision = RevisionService.reject_revision(
                revision_id, username, comentarios
            )

            schema = RevisionDataSchema()
            return {
                "message": "Revisión rechazada exitosamente",
                "revision": schema.dump(revision),
            }

        except Exception as e:
            return {"error": str(e)}, 500


@revision_ns.route("/sugerencias/<int:suggestion_id>/responder")
class RespondSuggestion(Resource):
    @revision_ns.doc("respond_suggestion")
    def post(self, suggestion_id):
        """Responder a una sugerencia"""
        try:
            respuesta = request.json.get("respuesta")
            accion = request.json.get("accion")  # 'aplicar' o 'rechazar'
            usuario = request.json.get("usuario")

            if not respuesta or not accion or not usuario:
                return {"error": "Respuesta, acción y usuario son requeridos"}, 400

            result = RevisionService.respond_to_suggestion(
                suggestion_id, respuesta, accion, usuario
            )

            return {"message": f"Sugerencia {accion}da exitosamente", "result": result}

        except Exception as e:
            return {"error": str(e)}, 500
