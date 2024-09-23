"""
Handle everything related to the Catastral model
Define the Catastral model.
Define the Catastral schema.
Define the Catastral crud.
Export the Catastral model.
"""

from datetime import datetime
from typing import Any, Dict

from sqlalchemy import BigInteger, Column, DateTime, Text, text

from .. import config, database
from ..middlewares.database import Template


class Model(database.BASE):
    """Model for LoggedActions.
    Example:
        >>> LoggedActions(data:dict)
        Base (sqlalchemy.ext.declarative.api.DeclarativeMeta): Base model.
    Base Attributes:
        __tablename__ (str): Name of the table.
        __table_args__ (tuple): Tuple of arguments for the table.
        query (sqlalchemy.orm.query.Query): Query object.
    Attributes:
        id (int): Primary key.

    """

    __tablename__ = "logged_actions"
    __table_args__ = {"schema": "audit"}
    schema_name = Column(Text, nullable=False)
    table_name = Column(Text, nullable=False)
    user_name = Column(Text)
    action_tstamp = Column(
        DateTime(True),
        nullable=False,
        index=True,
        server_default=text("CURRENT_TIMESTAMP"),
        primary_key=True,
    )
    action = Column(Text, nullable=False, index=True)
    original_data = Column(Text)
    new_data = Column(Text)
    query = Column(Text)
    client_addr = Column(Text)

    def __init__(self, **kwargs: dict) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


from typing import Optional

from pydantic import BaseModel


class Schema(BaseModel):
    """Schema for LoggedActions.
    Example:
        >>> LoggedActions(data:dict)
        Base (sqlalchemy.ext.declarative.api.DeclarativeMeta): Base model.
    Base Attributes:
        __tablename__ (str): Name of the table.
        __table_args__ (tuple): Tuple of arguments for the table.
        query (sqlalchemy.orm.query.Query): Query object.
    Attributes:
        id (int): Primary key.

    """

    schema_name: Optional[str]
    table_name: Optional[str]
    user_name: Optional[str]
    action_tstamp: Optional[datetime]
    action: Optional[str]
    original_data: Optional[str]
    new_data: Optional[str]
    query: Optional[str]
    client_addr: Optional[str]

    class Config:
        orm_mode = True


class LoggedActions(Template):
    def __init__(self, db) -> None:
        super().__init__(Model=Model, db=db, Schema=Schema)
