# src/config.py
""" Configuration file for the backend """
from datetime import timedelta
from os import environ
from os.path import abspath, dirname, join
from typing import Dict, List, Optional
from uuid import uuid4

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()
_root_path = environ.get("ROOT_PATH", abspath(dirname(__file__)))

SECRET_KEY: str = environ.get("SECRET_KEY", uuid4())


class __Base(object):
    """
    Clase base de configuración. Define variables compartidas por todos los entornos.
    """

    API_VERSION: str = environ.get("API_VERSION", "2.0.0")
    API_URL_PREFIX: str = f"/api/v{API_VERSION[0]}"
    uvicorn_params: Dict = dict(
        host=environ.get("SERVER_HOST", "localhost"),
        port=int(environ.get("SERVER_PORT", "5000")),
        log_level=environ.get("LOG_LEVEL", "info"),
        reload=bool(environ.get("RELOAD", True)),
        workers=int(environ.get("WORKERS", "3")),
        use_colors=bool(environ.get("USE_COLORS", True)),
    )
    fastapi_params: Dict = dict(
        title=environ.get(
            "TITLE",
            "API para la dirección general de catastro del estado de guanajuato",
        ),
        version=API_VERSION,
        description=environ.get(
            "DESCRIPTION",
            "API para la dirección general de catastro del estado de guanajuato",
        ),
    )
    cors_params: Dict = dict(
        allow_origins=environ.get("CORS_ORIGIN", "*").split(","),
        allow_credentials=environ.get("CORS_ALLOW_CREDENTIALS", "*").split(","),
        allow_methods=environ.get("CORS_ALLOW_METHODS", "*").split(","),
        allow_headers=environ.get("CORS_ALLOW_HEADERS", "*").split(","),
        expose_headers=environ.get("CORS_EXPOSE_HEADERS", "*").split(","),
    )

    SECRETS: Dict = dict(
        HOST=environ.get("HOST", "http://localhost:3000"),
        DB_NAMES=environ.get("DB_NAMES", "valuaciones,catastro_v2,fotogrametria").split(
            ","
        ),
    )

    class Settings(BaseModel):
        """JWT configuration"""

        authjwt_token_location: str = environ.get("AUTHJWT_TOKEN_LOCATION", ["headers"])
        authjwt_algorithm: str = environ.get("AUTHJWT_ALGORITHM", "HS512")
        authjwt_secret_key: str = str(SECRET_KEY).replace("'", '"')
        authjwt_denylist_enabled: bool = True
        # authjwt_denylist_token_checks: set = environ.get(
        #     "AUTHJWT_DENYLIST_TOKEN_CHECKS", ["access"]
        # )
        # authjwt_csrf_methods: Tuple = ("POST", "PUT", "PATCH", "DELETE")
        authjwt_access_token_expires = timedelta(hours=7)

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
        static: str = join(__ROOT_DIR, __STATIC_FOLDERNAME)
        tmp: str = join(__ROOT_DIR, __TMP_FOLDERNAME)
        templates: str = join(static, __TEMPLATES_FOLDERNAME)
        imgs: str = join(static, __IMAGES_FOLDERNAME)
        fonts: str = join(static, __FONTS_FOLDERNAME)
        docs: str = join(static, __DOCS_FOLDERNAME)

    class TEMPLATES(object):
        class METADATA(object):
            QGIS: str = "main.html"
            REPORT: str = "metadatos.html"


class __Production(__Base):
    """
    Configuración específica para el entorno de producción.
    """

    DEBUG: bool = bool(environ.get("DEBUG", False))
    RELOAD: bool = bool(environ.get("RELOAD", False))
    PSQL_URI = environ.get("PSQL_URI")


class __Development(__Base):
    """
    Configuración específica para el entorno de desarrollo.
    """

    Development: bool = True
    DEBUG: bool = True
    RELOAD: bool = True
    PSQL_URI = environ.get("PSQL_URI_DEV")


class __Testing(__Base):
    """
    Configuración específica para el entorno de pruebas.
    """

    TESTING: bool = True
    DEBUG: bool = True
    RELOAD: bool = True
    PSQL_URI = environ.get("PSQL_URI_TEST")


def __get_config(env: Optional[str] = None) -> __Base:
    """
    Función para obtener la configuración en función del entorno.
    """
    if env is None:
        env = environ.get("ENV", "development")
    envs: Dict = {
        "production": __Production,
        "testing": __Testing,
        "development": __Development,
    }

    return envs[env.lower()]


class Config(__get_config()):
    """
    Clase que contiene la configuración de la aplicación.
    """

    ...
