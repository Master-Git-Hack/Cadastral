"""
config file for the project
"""
from os import getenv
from os.path import abspath, dirname, join

from jinja2 import Environment, FileSystemLoader

root_path = abspath(dirname(__file__))


class Config:
    """Base configuration."""

    SECRET_KEY = getenv("SECRET_KEY") or "secret-key"
    ENV = getenv("FLASK_ENV") or "production"
    VERSION = getenv("VERSION") or "1"
    API_URL = getenv("API_URL") or f"/api/v{VERSION}/"
    TITLE = getenv("TITLE") or "API DEV"
    CORS = getenv("CORS") or "*"
    CORS_ORIGIN = getenv("CORS_ORIGIN") or "*"
    TEMPORARY_PATH = getenv("TEMPORARY_PATH") or "tmp"
    STATIC_PATH = getenv("STATIC_PATH") or "static"
    JINJA_ENV = Environment(
        loader=FileSystemLoader(join(root_path.split("/src")[0], "_build/html")),
        autoescape=False,
    )
    ALLOWED_EXTENSIONS = {"csv", "xlsx", "xls"}


class Paths:
    """Paths configuration."""

    tmp = join(root_path, Config.TEMPORARY_PATH)
    static = join(root_path, Config.STATIC_PATH)
    templates = join(static, "templates")
    images = join(static, "images")
    fonts = join(static, "fonts")
    docs = Config.JINJA_ENV


class DevelopmentConfig:
    """Development configuration."""

    UPLOAD_FOLDER = Paths.tmp
    DEBUG = True
    JSON_AS_ASCII = False
    SQLALCHEMY_DATABASE_URI = (
        getenv("DATABASE_URL_DEV") or f"sqlite:///{root_path}/db.sqlite"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    """Testing configuration."""

    DEBUG = True
    JSON_AS_ASCII = False
    TESTING = True
    SQLALCHEMY_DATABASE_URI = (
        getenv("DATABASE_URL_TEST") or f"sqlite:///{root_path}/db.sqlite"
    )
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    """Production configuration."""

    DEBUG = False
    JSON_AS_ASCII = False
    SQLALCHEMY_DATABASE_URI = getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


config_by_name = dict(
    development=DevelopmentConfig, testing=TestingConfig, production=ProductionConfig
)
config_API = dict(
    title=Config.TITLE,
    version=Config.VERSION,
    prefix=Config.API_URL,
    authorizations=dict(
        api_key={"type": "api_key", "in": "header", "name": "Authorization"}
    ),
    docs_path="/docs",
)
key = Config.SECRET_KEY
env = Config.ENV
cors_src = {f"{Config.API_URL}{Config.CORS}": dict(origin=Config.CORS_ORIGIN)}
