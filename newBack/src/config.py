# src/config.py
""" Configuration file for the backend """
# from datetime import timedelta
from datetime import timedelta
from os import getenv
from os.path import abspath, dirname, join
from typing import Dict

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

_root_path = getenv("ROOT_PATH", abspath(dirname(__file__)))
_ENV = getenv("ENV", "development")
_SECRET_KEY = getenv("SECRET_KEY", "secret")


class _Base:
    """Configuration class for the backend"""

    SERVER_HOST: str = getenv("SERVER_HOST", "localhost")
    PORT: int = int(getenv("PORT", "5000"))
    SECRET_KEY: str = _SECRET_KEY
    ALLOWED_ORIGINS = (
        getenv("ALLOWED_ORIGINS", "*")
        if _ENV == "production"
        else [
            "http://localhost",
            "http://localhost:3000",
            "https://localhost",
            "https://localhost:3000",
        ]
    )
    VERSION: str = getenv("VERSION", "2")
    API_URL: str = getenv("API_URL", f"/api/v{VERSION}")
    TITLE: str = getenv("TITLE", f"API {_ENV.upper()}")
    DESCRIPTION: str = getenv("DESCRIPTION", "API TEST")

    class Paths:
        """Class for paths"""

        _TEMPORARY: str = getenv("TEMPORARY_PATH", "tmp")
        _TEMPLATES: str = getenv("TEMPLATES_PATH", "templates")
        _DOCS: str = getenv("DOCS_PATH", "docs")
        _STATIC: str = getenv("STATIC_PATH", "static")
        _IMAGES: str = getenv("IMAGES_PATH", "images")
        _UPLOADS: str = getenv("UPLOADS_PATH", "uploads")
        STATIC: str = join(_root_path, _STATIC)
        TMP: str = join(_root_path, _TEMPORARY)
        TEMPLATES: str = join(STATIC, _TEMPLATES)
        DOCS: str = join(STATIC, _DOCS)
        IMAGES: str = join(STATIC, "images")
        UPLOADS: str = join(STATIC, _UPLOADS)


class _Production(_Base):
    """Production configuration
    Args:
        _Base (class): Base configuration
    """

    SQLALCHEMY_DATABASE_URL: str = getenv("DATABASE_URL", "")
    RELOAD = bool(getenv("RELOAD", None))


class _Development(_Base):
    """Development configuration
    Args:
        _Base (class): Base configuration
    """

    SQLALCHEMY_DATABASE_URL: str = getenv(
        "DATABASE_DEV_URL", f"sqlite:///{_root_path}/dev.db"
    )
    RELOAD = bool(getenv("RELOAD", "1"))


class _Test(_Base):
    """Test configuration
    Args:
        _Base (class): Base configuration
    """

    SQLALCHEMY_DATABASE_URL: str = getenv(
        "DATABASE_TEST_URL", f"sqlite:///{_root_path}/test.db"
    )
    RELOAD = bool(getenv("RELOAD", "1"))


class Config(dict(production=_Production, development=_Development, test=_Test)[_ENV]):
    """Configuration for the application
    Args:
        Environment (class): All the configuration for the environment
    """

    class Settings(BaseModel):
        """JWT configuration"""

        # access_token_expire_minutes: int = 30
        # algorithm: str = "HS256"
        authjwt_algorithm: str = "HS256"
        authjwt_secret_key: str = _SECRET_KEY
        authjwt_denylist_enabled: bool = True
        authjwt_denylist_token_checks: set = {"access", "refresh"}
        # authjwt_csrf_methods: Tuple = ("POST", "PUT", "PATCH", "DELETE")
        access_expires: int = timedelta(minutes=30)
        refresh_expires: int = timedelta(minutes=90)
