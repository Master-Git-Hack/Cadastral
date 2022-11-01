"""Main file with the app instance"""
from multiprocessing import cpu_count
from unittest import TestLoader, TextTestRunner

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy

from .config import config_API, config_by_name, cors_src, env

db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()

migrate = Migrate()


def create_app() -> Flask:
    """
    Create the app instance
    Returns:
    app (Flask): The app instance
    """
    context = Flask(__name__)
    context.config.from_object(config_by_name[env])
    db.init_app(context)
    ma.init_app(context)
    migrate.init_app(context, db)
    bcrypt.init_app(context)
    return context


app = create_app()
cors = CORS(app, resources=cors_src)
api = Api(
    app,
    prefix=config_API["prefix"],
    version=config_API["version"],
    title=config_API["title"],
    docs=config_API["docs_path"],
    description="API para el maenjo de datos del proyecto en curso, para mayor información contacta a: Einar Jhordany Serna Valdivia <eserna@guanajuato.gob.mx>",
    ordered=True,
    contact="Einar Jhordany Serna Valdivia",
)
app.app_context().push()


from .routes import *


@app.cli.command()
def run() -> None:
    """Run the application."""
    if __name__ == "__main__":
        app.run()


@app.cli.command()
def test() -> bool:
    """
    Run the unit tests.
    Returns:
        bool: True if all tests pass, False otherwise
    """
    tests = TestLoader().discover("src/test", pattern="__test__*.py")
    result = TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1
