from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    Text,
    Float,
    ForeignKey,
    CheckConstraint,
    Index,
)
from sqlalchemy.dialects.postgresql import JSONB, BIGINT
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .... import db
from enum import Enum


class RevisionStatus(Enum):
    PENDIENTE = "PENDIENTE"
    EN_REVISION = "EN_REVISION"
    APROBADA = "APROBADA"
    RECHAZADA = "RECHAZADA"


class RevisionData(db.Model):
    __tablename__ = "revision_data"
    __table_args__ = (
        CheckConstraint(
            "type IN ('TERRENO', 'RENTA')", name="revision_data_type_check"
        ),
        {"schema": "public"},
    )

    id = Column(BIGINT, primary_key=True, autoincrement=True)
    homologacion_id = Column(BIGINT, nullable=False)  # Temporalmente sin FK constraint
    type = Column(String(20), nullable=False)
    appraisal_purpose = Column(String(100), nullable=False)
    current_version = Column(String(10), default="v1")
    status = Column(String(20), default="PENDIENTE")
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(
        DateTime(timezone=True), default=func.now(), onupdate=func.now()
    )
    reviewed_at = Column(DateTime(timezone=True))
    can_review = Column(Boolean, default=True)
    can_edit = Column(Boolean, default=True)
    assigned_reviewer = Column(String(100))
    revisiones = Column(JSONB, default=list)

    # Relationships
    history = relationship(
        "RevisionHistory", back_populates="revision_data", cascade="all, delete-orphan"
    )
    suggestions = relationship(
        "RevisionSuggestions",
        back_populates="revision_data",
        cascade="all, delete-orphan",
    )
    permissions = relationship(
        "RevisionPermissions",
        back_populates="revision_data",
        cascade="all, delete-orphan",
    )


class RevisionHistory(db.Model):
    __tablename__ = "revision_history"
    __table_args__ = {"schema": "public"}

    id = Column(BIGINT, primary_key=True, autoincrement=True)
    revision_data_id = Column(
        BIGINT,
        ForeignKey("public.revision_data.id", ondelete="CASCADE"),
        nullable=False,
    )
    action = Column(String(100), nullable=False)
    previous_data = Column(JSONB)
    new_data = Column(JSONB)
    performed_by = Column(String(100), nullable=False)
    performed_at = Column(DateTime(timezone=True), default=func.now())
    description = Column(Text)

    # Relationships
    revision_data = relationship("RevisionData", back_populates="history")


class RevisionSuggestions(db.Model):
    __tablename__ = "revision_suggestions"
    __table_args__ = {"schema": "public"}

    id = Column(BIGINT, primary_key=True, autoincrement=True)
    revision_data_id = Column(
        BIGINT,
        ForeignKey("public.revision_data.id", ondelete="CASCADE"),
        nullable=False,
    )
    field_path = Column(String(500), nullable=False)
    current_value = Column(Text)
    suggested_value = Column(Text)
    comment = Column(Text, nullable=False)
    field_label = Column(String(200), nullable=False)
    page = Column(BIGINT, nullable=False)
    reviewer = Column(String(100), nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    is_converted = Column(Boolean, default=False)

    # Relationships
    revision_data = relationship("RevisionData", back_populates="suggestions")


class RevisionPermissions(db.Model):
    __tablename__ = "revision_permissions"
    __table_args__ = {"schema": "public"}

    id = Column(BIGINT, primary_key=True, autoincrement=True)
    user_id = Column(String(100), nullable=False)
    revision_data_id = Column(
        BIGINT,
        ForeignKey("public.revision_data.id", ondelete="CASCADE"),
        nullable=False,
    )
    can_read = Column(Boolean, default=True)
    can_write = Column(Boolean, default=False)
    can_approve = Column(Boolean, default=False)
    granted_by = Column(String(100), nullable=False)
    granted_at = Column(DateTime(timezone=True), default=func.now())

    # Relationships
    revision_data = relationship("RevisionData", back_populates="permissions")


class RevisionChecklist(db.Model):
    __tablename__ = "revision_checklist"
    __table_args__ = {"schema": "public"}

    id = Column(BIGINT, primary_key=True, autoincrement=True)
    checklist = Column(BIGINT, ForeignKey("public.checklist.id"))
    revisor = Column(BIGINT, ForeignKey("public.usuarios.id"))
    tipo_revisor = Column(String)
    fecha_creacion = Column(DateTime)
    requerimientos = Column(JSONB)
    observaciones = Column(String)
    total = Column(Float)
    estatus = Column(String)
    parent = Column(BIGINT, ForeignKey("public.revision_checklist.id"))


from marshmallow import Schema, fields, validate, post_load, ValidationError
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema


class RevisionDataSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = RevisionData
        load_instance = True
        include_fk = True

    type = fields.Str(validate=validate.OneOf(["TERRENO", "RENTA"]))
    status = fields.Str(
        validate=validate.OneOf(["PENDIENTE", "EN_REVISION", "APROBADA", "RECHAZADA"])
    )
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class RevisionDataCreateSchema(Schema):
    homologacion_id = fields.Integer(required=True)
    type = fields.Str(required=True, validate=validate.OneOf(["TERRENO", "RENTA"]))
    appraisal_purpose = fields.Str(required=True, validate=validate.Length(max=100))
    assigned_reviewer = fields.Str(validate=validate.Length(max=100))


class RevisionDataUpdateSchema(Schema):
    status = fields.Str(
        validate=validate.OneOf(["PENDIENTE", "EN_REVISION", "APROBADA", "RECHAZADA"])
    )
    reviewed_at = fields.DateTime()
    can_review = fields.Boolean()
    can_edit = fields.Boolean()
    assigned_reviewer = fields.Str(validate=validate.Length(max=100))
    revisiones = fields.List(fields.Dict())


class RevisionHistorySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = RevisionHistory
        load_instance = True
        include_fk = True

    performed_at = fields.DateTime(dump_only=True)


class RevisionHistoryCreateSchema(Schema):
    revision_data_id = fields.Integer(required=True)
    action = fields.Str(required=True, validate=validate.Length(max=100))
    previous_data = fields.Dict()
    new_data = fields.Dict()
    performed_by = fields.Str(required=True, validate=validate.Length(max=100))
    description = fields.Str()


class RevisionSuggestionsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = RevisionSuggestions
        load_instance = True
        include_fk = True

    created_at = fields.DateTime(dump_only=True)


class RevisionSuggestionsCreateSchema(Schema):
    revision_data_id = fields.Integer(required=True)
    field_path = fields.Str(required=True, validate=validate.Length(max=500))
    current_value = fields.Str()
    suggested_value = fields.Str()
    comment = fields.Str(required=True)
    field_label = fields.Str(required=True, validate=validate.Length(max=200))
    page = fields.Integer(required=True)
    reviewer = fields.Str(required=True, validate=validate.Length(max=100))


class RevisionPermissionsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = RevisionPermissions
        load_instance = True
        include_fk = True

    granted_at = fields.DateTime(dump_only=True)


class RevisionPermissionsCreateSchema(Schema):
    user_id = fields.Str(required=True, validate=validate.Length(max=100))
    revision_data_id = fields.Integer(required=True)
    can_read = fields.Boolean()
    can_write = fields.Boolean()
    can_approve = fields.Boolean()
    granted_by = fields.Str(required=True, validate=validate.Length(max=100))


class RevisionChecklistSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = RevisionChecklist
        load_instance = True
        include_fk = True
