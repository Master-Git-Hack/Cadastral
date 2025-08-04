# -*- coding: utf-8 -*-
"""
Modelos para el sistema de revisiones
"""

from typing import List, Optional
from sqlmodel import SQLModel, Field
from datetime import datetime


class RevisionCommentBase(SQLModel):
    field_path: str = Field(description="Ruta del campo en la estructura de datos")
    field_label: str = Field(description="Etiqueta amigable del campo")
    page: int = Field(description="Número de página donde se encuentra el campo")
    original_value: Optional[str] = Field(
        default=None, description="Valor original del campo"
    )
    suggested_value: Optional[str] = Field(default=None, description="Valor sugerido")
    comment: str = Field(description="Comentario de la revisión")
    status: str = Field(
        default="PENDING",
        description="Estado del comentario: PENDING, RESOLVED, DISMISSED",
    )


class RevisionComment(RevisionCommentBase, table=True):
    __tablename__ = "revision_comments"

    id: Optional[int] = Field(default=None, primary_key=True)
    revision_id: int = Field(foreign_key="revisions.id")
    reviewer: str = Field(description="Usuario que hizo la revisión")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    resolved_at: Optional[datetime] = Field(default=None)
    resolved_by: Optional[str] = Field(default=None)


class RevisionBase(SQLModel):
    homologacion_id: int = Field(description="ID de la homologación")
    tipo: str = Field(description="Tipo de homologación: TERRENO o RENTA")
    tipo_servicio: str = Field(description="Tipo de servicio")
    version: str = Field(description="Versión de la revisión")
    status: str = Field(default="EN_REVISION", description="Estado de la revisión")
    general_comments: Optional[str] = Field(
        default=None, description="Comentarios generales"
    )


class Revision(RevisionBase, table=True):
    __tablename__ = "revisions"

    id: Optional[int] = Field(default=None, primary_key=True)
    created_by: str = Field(description="Usuario que creó la revisión")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = Field(default=None)


class RevisionCommentCreate(RevisionCommentBase):
    pass


class RevisionCommentResponse(RevisionCommentBase):
    id: int
    reviewer: str
    created_at: datetime
    resolved_at: Optional[datetime] = None
    resolved_by: Optional[str] = None


class RevisionCreate(RevisionBase):
    comments: List[RevisionCommentCreate] = Field(default=[])


class RevisionResponse(RevisionBase):
    id: int
    created_by: str
    created_at: datetime
    completed_at: Optional[datetime] = None
    comments: List[RevisionCommentResponse] = Field(default=[])
    summary: dict = Field(default={})


class RevisionData(SQLModel):
    homologacion_id: int
    tipo: str
    tipo_servicio: str
    status: str
    current_version: str
    can_review: bool
    revisiones: List[RevisionResponse] = Field(default=[])
    stats: dict = Field(default={})


class CreateRevisionRequest(SQLModel):
    suggestions: List[RevisionCommentCreate] = Field(description="Lista de sugerencias")
    generalComments: Optional[str] = Field(
        default=None, description="Comentarios generales"
    )
    homologacionId: int = Field(description="ID de la homologación")
    tipo: str = Field(description="Tipo de homologación")
    tipoServicio: str = Field(description="Tipo de servicio")


class ResolveCommentRequest(SQLModel):
    revisionVersion: str = Field(description="Versión de la revisión")
    commentId: str = Field(description="ID del comentario")
    action: str = Field(description="Acción: resolve o dismiss")
