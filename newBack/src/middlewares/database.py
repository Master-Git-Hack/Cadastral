"""Handle requeriments for database connection and session for sqlalchemy.
creates an engine.
creates and export a db.session.
creates and export a declarative base.
"""

from sqladmin import Admin
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

from .. import app, config

_engine = create_engine(
    config.SQLALCHEMY_DATABASE_URL,
    convert_unicode=True,
    echo=False,
    # isolation_level="READ COMMITTED",
)
Base = declarative_base()
Base.metadata.bind = _engine
admin = Admin(app, _engine)
