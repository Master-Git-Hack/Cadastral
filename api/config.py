# config.py
""" Configuration file for the backend """
from datetime import timedelta
from os import environ
from os.path import abspath, dirname, join
from typing import Dict, List, Optional
from uuid import uuid4

from dotenv import load_dotenv

load_dotenv()
from fastapi.security import OAuth2PasswordBearer
from social_core.backends import facebook


class __Base(object):
    """
    Clase base de configuración. Define variables compartidas por todos los entornos.
    """

    API: Dict = dict(
        title=environ.get(
            "TITLE",
            "API para la dirección general de catastro del estado de guanajuato",
        ),
        version=(version := environ.get("API_VERSION", "1.0.0")),
        description=environ.get(
            "DESCRIPTION",
            "API para SAAS",
        ),
        url_prefix=(url_prefix := f"/api/v{version[0]}"),
    )
    OAUTH2 = OAuth2PasswordBearer(tokenUrl=f"{url_prefix}/oauth2/sign-in")
    CORS: Dict = dict(
        allow_origins=environ.get("CORS_ORIGIN", "*").split(","),
        allow_credentials=environ.get("CORS_ALLOW_CREDENTIALS", "*").split(","),
        allow_methods=environ.get("CORS_ALLOW_METHODS", "*").split(","),
        allow_headers=environ.get("CORS_ALLOW_HEADERS", "*").split(","),
        expose_headers=environ.get("CORS_EXPOSE_HEADERS", "*").split(","),
    )

    class SECRETS:
        CLIENT: str = environ.get("CLIENT")
        DB_URI: str = environ.get("DB_URL")
        DB_CLIENTS: List[str] = environ.get("DB_CLIENTS", "").split(",")
        EXPIRATION_TIME = timedelta(hours=int(environ.get("EXPIRATION_TIME", 24)))
        ALGORITHM: str = environ.get("ALGORITHM", "HS512")

        class STRIPE:
            API_KEY: str = environ.get("STRIPE_API_KEY")
            WEBHOOK_SECRET: str = environ.get("STRIPE_WEBHOOK_SECRET")

        KEY = environ.get("SECRET_KEY", uuid4())
        SCOPES: List[str] = environ.get("SCOPES", "").split(",")

    class PATHS(object):
        """
        Objeto para acceder a los diferentes directorios utilizados en la aplicación.
        """

        __ROOT_DIR: str = abspath(dirname(__file__))
        __TMP_FOLDERNAME: str = environ.get("TEMPORARY_PATH", "tmp")
        __STATIC_FOLDERNAME: str = environ.get("STATIC_PATH", "static")
        __TEMPLATES_FOLDERNAME: str = environ.get("TEMPLATES", "templates")
        __IMAGES_FOLDERNAME: str = environ.get("IMAGES", "images")
        __FONTS_FOLDERNAME: str = environ.get("FONTS", "fonts")
        __DOCS_FOLDERNAME: str = environ.get("DOCS", "docs")
        STATIC: str = join(__ROOT_DIR, __STATIC_FOLDERNAME)
        TMP: str = join(__ROOT_DIR, __TMP_FOLDERNAME)
        TEMPLATES: str = join(STATIC, __TEMPLATES_FOLDERNAME)
        IMAGES: str = join(STATIC, __IMAGES_FOLDERNAME)
        FONTS: str = join(STATIC, __FONTS_FOLDERNAME)
        DOCS: str = join(STATIC, __DOCS_FOLDERNAME)


class Config(__Base):
    """
    Clase de configuración para el entorno de producción.
    """

    DEBUG: bool = False
    RELOAD: bool = False
    Development: bool = True

    def __init__(self, env: Optional[str] = "development") -> None:
        """
        Obtener la configuración en función del entorno.
        """
        if env is None:
            env = environ.get("ENV", "development")
        env = env.lower()
        if env == "development" or env == "testing":
            self.DEBUG = True
            self.RELOAD = True
            if env != "testing":
                self.Development = True
