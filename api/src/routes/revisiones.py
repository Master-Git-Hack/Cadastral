# -*- coding: utf-8 -*-
"""
Rutas para el sistema de revisiones
"""

from typing import Optional, List
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from datetime import datetime

from ...database import get_db
from ..models.revisiones import (
    Revision,
    RevisionComment,
    RevisionCreate,
    RevisionResponse,
    RevisionCommentResponse,
    RevisionData,
    CreateRevisionRequest,
    ResolveCommentRequest,
)

router = APIRouter(prefix="/revisiones", tags=["Revisiones"])


@router.get("/{homologacion_id}/{tipo}/{tipo_servicio}", response_model=RevisionData)
async def get_revision_data(
    homologacion_id: int, tipo: str, tipo_servicio: str, db: Session = Depends(get_db)
):
    """
    Obtener datos de revisión para una homologación específica
    """
    try:
        # Buscar todas las revisiones para esta homologación
        revisiones = (
            db.query(Revision)
            .filter(
                Revision.homologacion_id == homologacion_id,
                Revision.tipo == tipo.upper(),
                Revision.tipo_servicio == tipo_servicio,
            )
            .order_by(Revision.created_at.desc())
            .all()
        )

        # Calcular estadísticas
        total_revisiones = len(revisiones)
        comentarios_pendientes = 0
        ultima_revision = ""

        if revisiones:
            ultima_revision = revisiones[0].version
            # Contar comentarios pendientes
            for revision in revisiones:
                comments = (
                    db.query(RevisionComment)
                    .filter(
                        RevisionComment.revision_id == revision.id,
                        RevisionComment.status == "PENDING",
                    )
                    .count()
                )
                comentarios_pendientes += comments

        # Construir respuesta
        revision_responses = []
        for revision in revisiones:
            comments = (
                db.query(RevisionComment)
                .filter(RevisionComment.revision_id == revision.id)
                .all()
            )

            # Calcular resumen de comentarios
            summary = {
                "total_comments": len(comments),
                "pending_comments": len([c for c in comments if c.status == "PENDING"]),
                "resolved_comments": len(
                    [c for c in comments if c.status == "RESOLVED"]
                ),
                "dismissed_comments": len(
                    [c for c in comments if c.status == "DISMISSED"]
                ),
            }

            revision_response = RevisionResponse(
                **revision.dict(),
                comments=[
                    RevisionCommentResponse(**comment.dict()) for comment in comments
                ],
                summary=summary,
            )
            revision_responses.append(revision_response)

        # Determinar estado actual
        current_status = "PENDIENTE"
        if revisiones:
            if comentarios_pendientes > 0:
                current_status = "REVISADO_CON_ERRORES"
            elif total_revisiones > 0:
                current_status = "REVISADO_APROBADO"

        return RevisionData(
            homologacion_id=homologacion_id,
            tipo=tipo.upper(),
            tipo_servicio=tipo_servicio,
            status=current_status,
            current_version=ultima_revision or "v1.0",
            can_review=True,  # TODO: Implementar lógica de permisos
            revisiones=revision_responses,
            stats={
                "total_revisiones": total_revisiones,
                "comentarios_pendientes": comentarios_pendientes,
                "ultima_revision": ultima_revision,
            },
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener datos de revisión: {str(e)}",
        )


@router.post("/{homologacion_id}")
async def create_revision(
    homologacion_id: int, request: CreateRevisionRequest, db: Session = Depends(get_db)
):
    """
    Crear una nueva revisión
    """
    try:
        # Crear la revisión
        revision = Revision(
            homologacion_id=homologacion_id,
            tipo=request.tipo.upper(),
            tipo_servicio=request.tipoServicio,
            version=f"v{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}",
            status="COMPLETADA",
            general_comments=request.generalComments,
            created_by="Usuario Actual",  # TODO: Obtener del contexto de auth
            created_at=datetime.utcnow(),
            completed_at=datetime.utcnow(),
        )

        db.add(revision)
        db.flush()  # Para obtener el ID

        # Crear los comentarios
        for suggestion in request.suggestions:
            comment = RevisionComment(
                revision_id=revision.id,
                field_path=suggestion.field_path,
                field_label=suggestion.field_label,
                page=suggestion.page,
                original_value=(
                    str(suggestion.original_value)
                    if suggestion.original_value
                    else None
                ),
                suggested_value=(
                    str(suggestion.suggested_value)
                    if suggestion.suggested_value
                    else None
                ),
                comment=suggestion.comment,
                status="PENDING",
                reviewer="Usuario Actual",  # TODO: Obtener del contexto de auth
                created_at=datetime.utcnow(),
            )
            db.add(comment)

        db.commit()

        return {
            "message": "Revisión creada exitosamente",
            "revision_id": revision.id,
            "version": revision.version,
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear revisión: {str(e)}",
        )


@router.patch("/{homologacion_id}/comment/{comment_id}/resolve")
async def resolve_comment(
    homologacion_id: int,
    comment_id: int,
    request: ResolveCommentRequest,
    db: Session = Depends(get_db),
):
    """
    Resolver un comentario de revisión
    """
    try:
        comment = (
            db.query(RevisionComment).filter(RevisionComment.id == comment_id).first()
        )

        if not comment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Comentario no encontrado"
            )

        # Actualizar estado del comentario
        comment.status = "RESOLVED" if request.action == "resolve" else "DISMISSED"
        comment.resolved_at = datetime.utcnow()
        comment.resolved_by = "Usuario Actual"  # TODO: Obtener del contexto de auth

        db.commit()

        return {
            "message": f"Comentario {'resuelto' if request.action == 'resolve' else 'descartado'} exitosamente"
        }

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al resolver comentario: {str(e)}",
        )


@router.patch("/{homologacion_id}/comment/{comment_id}/dismiss")
async def dismiss_comment(
    homologacion_id: int,
    comment_id: int,
    request: ResolveCommentRequest,
    db: Session = Depends(get_db),
):
    """
    Descartar un comentario de revisión
    """
    return await resolve_comment(homologacion_id, comment_id, request, db)
