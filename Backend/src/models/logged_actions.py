"""
Handle everything related to the Catastral model
Define the Catastral model.
Define the Catastral schema.
Define the Catastral crud.
Export the Catastral model.
"""
from typing import Any, Dict

from .. import config
from . import Base

__db = config.db

from sqlalchemy import BigInteger, Column, DateTime, Text, text


class Model(__db.Model):
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


class LoggedActions(Base):
    def __init__(self) -> None:
        super().__init__(Model)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
