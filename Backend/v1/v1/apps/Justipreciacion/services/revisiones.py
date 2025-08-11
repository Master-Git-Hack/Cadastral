from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import joinedload
from .... import db
from ..models.revisiones import (
    RevisionData,
    RevisionHistory,
    RevisionSuggestions,
    RevisionPermissions,
    RevisionChecklist,
)
from datetime import datetime
import json


class RevisionService:

    @staticmethod
    def create_revision(data):
        """Crear nueva revisión"""
        try:
            revision = RevisionData(**data)
            db.session.add(revision)
            db.session.flush()  # Para obtener el ID

            # Crear historial de creación
            RevisionService.add_history_entry(
                revision.id,
                "CREATED",
                None,
                data,
                data.get("assigned_reviewer", "system"),
                "Revisión creada",
            )

            db.session.commit()
            return revision
        except IntegrityError as e:
            db.session.rollback()
            raise ValueError(
                "Error de integridad: Posible duplicado o referencia inválida"
            )

    @staticmethod
    def get_revision(revision_id, user_id=None):
        """Obtener revisión por ID con verificación de permisos"""
        query = RevisionData.query.options(
            joinedload(RevisionData.history),
            joinedload(RevisionData.suggestions),
            joinedload(RevisionData.permissions),
        ).filter_by(id=revision_id)

        revision = query.first()
        if not revision:
            return None

        # Verificar permisos si se proporciona user_id
        if user_id:
            # Buscar si el usuario tiene permisos específicos
            permission = RevisionPermissions.query.filter_by(
                user_id=user_id, revision_data_id=revision_id
            ).first()

            # Si no tiene permisos específicos, verificar si es el revisor asignado
            if not permission and revision.assigned_reviewer != user_id:
                raise PermissionError("Sin permisos de lectura")

            # Si tiene permisos específicos, verificar can_read
            if permission and not permission.can_read:
                raise PermissionError("Sin permisos de lectura")

        return revision

    @staticmethod
    def get_revisions_by_homologacion(homologacion_id, revision_type=None):
        """Obtener revisiones por homologación"""
        query = RevisionData.query.filter_by(homologacion_id=homologacion_id)

        if revision_type:
            query = query.filter_by(type=revision_type)

        return query.order_by(RevisionData.created_at.desc()).all()

    @staticmethod
    def update_revision(revision_id, data, user_id):
        """Actualizar revisión"""
        revision = RevisionData.query.get(revision_id)
        if not revision:
            raise ValueError("Revisión no encontrada")

        # Verificar permisos
        permission = RevisionPermissions.query.filter_by(
            user_id=user_id, revision_data_id=revision_id
        ).first()

        # Si no hay permisos específicos, verificar si es el revisor asignado
        if not permission and revision.assigned_reviewer != user_id:
            raise PermissionError("Sin permisos de escritura")

        # Si hay permisos específicos, verificar can_write
        if permission and not permission.can_write:
            raise PermissionError("Sin permisos de escritura")

        # Guardar datos previos para historial
        previous_data = {
            "status": revision.status,
            "assigned_reviewer": revision.assigned_reviewer,
            "can_review": revision.can_review,
            "can_edit": revision.can_edit,
            "revisiones": revision.revisiones,
        }

        # Actualizar campos
        for key, value in data.items():
            if hasattr(revision, key):
                setattr(revision, key, value)

        revision.updated_at = datetime.utcnow()

        # Crear entrada de historial
        RevisionService.add_history_entry(
            revision_id, "UPDATED", previous_data, data, user_id, "Revisión actualizada"
        )

        db.session.commit()
        return revision

    @staticmethod
    def delete_revision(revision_id, user_id):
        """Eliminar revisión"""
        revision = RevisionData.query.get(revision_id)
        if not revision:
            raise ValueError("Revisión no encontrada")

        # Verificar permisos
        permission = RevisionPermissions.query.filter_by(
            user_id=user_id, revision_data_id=revision_id
        ).first()

        # Solo quien creó la revisión o tiene permisos específicos puede eliminar
        if not permission:
            raise PermissionError("Sin permisos de eliminación")

        if (
            not permission.can_approve
        ):  # Usamos can_approve como permiso de administrador
            raise PermissionError("Sin permisos de eliminación")

        db.session.delete(revision)
        db.session.commit()
        return True

    @staticmethod
    def add_history_entry(
        revision_id, action, previous_data, new_data, performed_by, description=None
    ):
        """Agregar entrada al historial"""
        history = RevisionHistory(
            revision_data_id=revision_id,
            action=action,
            previous_data=previous_data,
            new_data=new_data,
            performed_by=performed_by,
            description=description,
        )
        db.session.add(history)
        return history

    @staticmethod
    def get_revision_history(revision_id, user_id=None):
        """Obtener historial de revisión"""
        # Verificar permisos si se proporciona user_id
        if user_id:
            permission = RevisionPermissions.query.filter_by(
                user_id=user_id, revision_data_id=revision_id
            ).first()

            # Verificar si es el revisor asignado o tiene permisos específicos
            revision = RevisionData.query.get(revision_id)
            if not permission and (
                not revision or revision.assigned_reviewer != user_id
            ):
                raise PermissionError("Sin permisos de lectura")

            # Si tiene permisos específicos, verificar can_read
            if permission and not permission.can_read:
                raise PermissionError("Sin permisos de lectura")

        return (
            RevisionHistory.query.filter_by(revision_data_id=revision_id)
            .order_by(RevisionHistory.performed_at.desc())
            .all()
        )

    @staticmethod
    def create_suggestion(data):
        """Crear sugerencia"""
        suggestion = RevisionSuggestions(**data)
        db.session.add(suggestion)

        # Agregar al historial
        RevisionService.add_history_entry(
            data["revision_data_id"],
            "SUGGESTION_CREATED",
            None,
            data,
            data["reviewer"],
            f'Nueva sugerencia para {data["field_label"]}',
        )

        db.session.commit()
        return suggestion

    @staticmethod
    def get_suggestions(revision_id, user_id=None, is_converted=None):
        """Obtener sugerencias de revisión"""
        # Verificar permisos
        if user_id:
            permission = RevisionPermissions.query.filter_by(
                user_id=user_id, revision_data_id=revision_id
            ).first()

            # Verificar si es el revisor asignado o tiene permisos específicos
            revision = RevisionData.query.get(revision_id)
            if not permission and (
                not revision or revision.assigned_reviewer != user_id
            ):
                raise PermissionError("Sin permisos de lectura")

            # Si tiene permisos específicos, verificar can_read
            if permission and not permission.can_read:
                raise PermissionError("Sin permisos de lectura")

        query = RevisionSuggestions.query.filter_by(revision_data_id=revision_id)

        if is_converted is not None:
            query = query.filter_by(is_converted=is_converted)

        return query.order_by(RevisionSuggestions.created_at.desc()).all()

    @staticmethod
    def convert_suggestion(suggestion_id, user_id):
        """Convertir sugerencia"""
        suggestion = RevisionSuggestions.query.get(suggestion_id)
        if not suggestion:
            raise ValueError("Sugerencia no encontrada")

        # Verificar permisos
        permission = RevisionPermissions.query.filter_by(
            user_id=user_id, revision_data_id=suggestion.revision_data_id
        ).first()

        # Verificar si es el revisor asignado o tiene permisos específicos
        revision = RevisionData.query.get(suggestion.revision_data_id)
        if not permission and (not revision or revision.assigned_reviewer != user_id):
            raise PermissionError("Sin permisos de escritura")

        # Si tiene permisos específicos, verificar can_write
        if permission and not permission.can_write:
            raise PermissionError("Sin permisos de escritura")

        suggestion.is_converted = True

        # Agregar al historial
        RevisionService.add_history_entry(
            suggestion.revision_data_id,
            "SUGGESTION_CONVERTED",
            {"is_converted": False},
            {"is_converted": True, "field_path": suggestion.field_path},
            user_id,
            f"Sugerencia convertida para {suggestion.field_label}",
        )

        db.session.commit()
        return suggestion

    @staticmethod
    def create_permission(data):
        """Crear permiso"""
        try:
            permission = RevisionPermissions(**data)
            db.session.add(permission)
            db.session.commit()
            return permission
        except IntegrityError:
            db.session.rollback()
            raise ValueError("El usuario ya tiene permisos para esta revisión")

    @staticmethod
    def get_permissions(revision_id):
        """Obtener permisos de revisión"""
        return RevisionPermissions.query.filter_by(revision_data_id=revision_id).all()

    @staticmethod
    def update_permission(permission_id, data, granted_by):
        """Actualizar permiso"""
        permission = RevisionPermissions.query.get(permission_id)
        if not permission:
            raise ValueError("Permiso no encontrado")

        for key, value in data.items():
            if hasattr(permission, key):
                setattr(permission, key, value)

        permission.granted_by = granted_by
        permission.granted_at = datetime.utcnow()

        db.session.commit()
        return permission

    @staticmethod
    def delete_permission(permission_id):
        """Eliminar permiso"""
        permission = RevisionPermissions.query.get(permission_id)
        if not permission:
            raise ValueError("Permiso no encontrado")

        db.session.delete(permission)
        db.session.commit()
        return True

    @staticmethod
    def approve_revision(revision_id, username, comentarios=""):
        """Aprobar revisión"""
        revision = RevisionData.query.get(revision_id)
        if not revision:
            raise ValueError("Revisión no encontrada")

        old_status = revision.status
        revision.status = "APROBADA"
        revision.assigned_reviewer = username
        revision.updated_at = datetime.utcnow()

        # Crear entrada en el historial
        RevisionService.add_history_entry(
            revision_id,
            "APPROVED",
            old_status,
            {"status": "APROBADA", "comentarios": comentarios},
            username,
            f"Revisión aprobada: {comentarios}",
        )

        db.session.commit()
        return revision

    @staticmethod
    def reject_revision(revision_id, username, comentarios=""):
        """Rechazar revisión"""
        revision = RevisionData.query.get(revision_id)
        if not revision:
            raise ValueError("Revisión no encontrada")

        old_status = revision.status
        revision.status = "RECHAZADA"
        revision.assigned_reviewer = username
        revision.updated_at = datetime.utcnow()

        # Crear entrada en el historial
        RevisionService.add_history_entry(
            revision_id,
            "REJECTED",
            old_status,
            {"status": "RECHAZADA", "comentarios": comentarios},
            username,
            f"Revisión rechazada: {comentarios}",
        )

        db.session.commit()
        return revision

    @staticmethod
    def respond_to_suggestion(suggestion_id, respuesta, accion, usuario):
        """Responder a una sugerencia"""
        suggestion = RevisionSuggestions.query.get(suggestion_id)
        if not suggestion:
            raise ValueError("Sugerencia no encontrada")

        suggestion.response = respuesta
        suggestion.status = "APLICADA" if accion == "aplicar" else "RECHAZADA"
        suggestion.responded_by = usuario
        suggestion.responded_at = datetime.utcnow()

        # Crear entrada en el historial
        RevisionService.add_history_entry(
            suggestion.revision_data_id,
            "SUGGESTION_RESPONSE",
            None,
            {"suggestion_id": suggestion_id, "accion": accion, "respuesta": respuesta},
            usuario,
            f"Sugerencia {accion}da: {respuesta}",
        )

        db.session.commit()
        return suggestion
