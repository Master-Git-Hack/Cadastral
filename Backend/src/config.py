from json import load
from os import environ
from os.path import abspath, dirname, join
from typing import Optional

from dotenv import load_dotenv
from flask_admin import Admin
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.ext.declarative import declarative_base

# from flask_mongoengine import MongoEngine
from sqlalchemy.orm import scoped_session, sessionmaker

load_dotenv()


class __Base(object):
    """
    Clase base de configuración. Define variables compartidas por todos los entornos.
    """

    HOST: str = environ.get("FLASK_RUN_HOST", "0.0.0.0")
    PORT: str = environ.get("FLASK_RUN_PORT", "5000")
    DEBUG: bool = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TESTING: bool = False
    CSRF_ENABLED: bool = True
    SECRET_KEY: str = environ.get("SECRET_KEY")
    API_VERSION: str = environ.get("API_VERSION", "1.0.0")
    API_URL_PREFIX: str = f"/api/v{API_VERSION[0]}"
    API_MODELS: dict = {}
    JSON_AS_ASCII = False
    CORS: str = environ.get("CORS", "*")
    CORS_ORIGIN: str = environ.get("CORS_ORIGIN", "*")
    CORS_ALLOW_METHODS: str = environ.get("CORS_ALLOW_METHODS", "*")
    CORS_ALLOW_HEADERS: str = environ.get("CORS_ALLOW_HEADERS", "*")
    CORS_EXPOSE_HEADERS: str = environ.get("CORS_EXPOSE_HEADERS", "*")
    MAIL_USERNAME = environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = environ.get("MAIL_PASSWORD")
    DBNAMES = [
        environ.get(f"BD_NAME{i}") for i in range(1, 3) if environ.get(f"BD_NAME{i}")
    ]

    class PATHS(object):
        """
        Objeto para acceder a los diferentes directorios utilizados en la aplicación.
        """

        __ROOT_DIR: str = abspath(dirname(__file__))
        __TMP_FOLDERNAME: str = environ.get("TEMPORARY_FOLDER", "tmp")
        __TEMPLATES_FOLDERNAME: str = environ.get("TEMPLATES_FOLDER", "templates")
        __STATIC_FOLDERNAME: str = environ.get("STATIC_FOLDER", "static")
        __IMAGES_FOLDERNAME: str = environ.get("IMAGES_FOLDER", "images")
        __FONTS_FOLDERNAME: str = environ.get("FONTS_FOLDER", "fonts")
        tmp: str = join(__ROOT_DIR, __TMP_FOLDERNAME)
        templates: str = join(__ROOT_DIR, __TEMPLATES_FOLDERNAME)
        static: str = join(__ROOT_DIR, __STATIC_FOLDERNAME)
        imgs: str = join(static, __IMAGES_FOLDERNAME)
        fonts: str = join(static, __FONTS_FOLDERNAME)


class __Production(__Base):
    """
    Configuración específica para el entorno de producción.
    """

    DEBUG: bool = False
    MONGO_URI: str = environ.get("MONGO_URI")
    SQLALCHEMY_VALUACIONES_URI: str
    SQLALCHEMY_CATASTRO_V2_URI: str

    def __init__(self):
        super().__init__()
        uri = environ.get("PSQL_URI")
        self.SQLALCHEMY_VALUACIONES_URI = uri + self.DBNAMES[0]
        self.SQLALCHEMY_CATASTRO_V2_URI = uri + self.DBNAMES[1]


class __Development(__Base):
    """
    Configuración específica para el entorno de desarrollo.
    """

    Development: bool = True
    DEBUG: bool = True
    MONGO_URI: str = environ.get(
        "MONGO_URI_DEV", "mongodb://root:toor@localhost:27017/Catastral"
    )
    SQLALCHEMY_VALUACIONES_URI: str
    SQLALCHEMY_CATASTRO_V2_URI: str

    def __init__(self):
        super().__init__()
        uri = environ.get("PSQL_URI_DEV")
        self.SQLALCHEMY_VALUACIONES_URI = (
            uri + self.DBNAMES[0]
            if uri
            else f"sqlite:///{abspath(dirname(__file__))}/db.sqlite"
        )
        self.SQLALCHEMY_CATASTRO_V2_URI = (
            uri + self.DBNAMES[1]
            if uri
            else f"sqlite:///{abspath(dirname(__file__))}/db.sqlite"
        )


class __Testing(__Base):
    """
    Configuración específica para el entorno de pruebas.
    """

    TESTING: bool = True
    MONGO_URI: str = environ.get("MONGO_URI_TEST")
    SQLALCHEMY_VALUACIONES_URI: str
    SQLALCHEMY_CATASTRO_V2_URI: str

    def __init__(self):
        super().__init__()
        uri = environ.get("PSQL_URI_TEST")
        self.SQLALCHEMY_VALUACIONES_URI = (
            uri + self.DBNAMES[0]
            if uri
            else f"sqlite:///{abspath(dirname(__file__))}/db.sqlite"
        )
        self.SQLALCHEMY_CATASTRO_V2_URI = (
            uri + self.DBNAMES[1]
            if uri
            else f"sqlite:///{abspath(dirname(__file__))}/db.sqlite"
        )


def __get_config(env: Optional[str] = None) -> __Base:
    """
    Función para obtener la configuración en función del entorno.
    """
    if env is None:
        env = environ.get("ENV", "development")
    envs: dict = {
        "production": __Production,
        "testing": __Testing,
        "development": __Development,
    }
    current = envs[env.lower()]
    try:
        with open(
            f"{current.PATHS.static}/swagger.json", "r", encoding="utf-8"
        ) as file:
            current.API_MODELS = load(file)
    except FileNotFoundError:
        current.API_MODELS = {}
    return current


current_env = __get_config()


class DB:
    def __init__(self, url: str, **kwargs: dict) -> None:
        self.engine = create_engine(url, **kwargs)
        self.session_factory = sessionmaker(bind=self.engine)
        self.Session = scoped_session(self.session_factory)
        self.Model = declarative_base()

    def create_tables(self) -> None:
        self.Model.metadata.create_all(self.engine)

    def drop_tables(self) -> None:
        self.Model.metadata.drop_all(self.engine)

    def create_session(self) -> scoped_session:
        return self.Session()

    def close_session(self, session) -> None:
        session.close()

    def get_schema_names(
        self,
    ) -> list:
        query = text("SELECT schema_name FROM information_schema.schemata;")
        try:
            schemas = self.current_session.execute(query)
        except Exception as e:
            session = self.create_session()
            schemas = session.execute(query)
            self.close_session(session)
        finally:
            return [schema[0] for schema in schemas]

    def get_table_names(self, schema: str) -> list:
        tables = []
        try:
            inspector = inspect(self.current_session.connection())
            tables = inspector.get_table_names(schema=schema)
        except Exception as e:
            session = self.create_session()
            inspector = inspect(session.connection())
            tables = inspector.get_table_names(schema=schema)
            self.close_session(session)
        finally:
            return tables

    def get_complete_schema(self) -> dict:
        schemas = self.get_schema_names()
        return {
            "schemas": schemas,
            "tables": {schema: self.get_table_names(schema) for schema in schemas},
        }

    def __enter__(self):
        self.current_session = self.create_session()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close_session(self.current_session)


class Config(current_env):
    """
    Objeto con la configuración del entorno de ejecución.
    Attributes:
        API_VERSION: str
        API_URL_PREFIX: str
        PATHS: object
            (tmp | static | templates)
        bcrypt: Bcrypt
        no_db: MongoEngine
        db: SQLAlchemy
        ma: Marshmallow

    """

    MONGODB_SETTINGS: dict = dict(db=current_env.MONGO_URI)
    CORS_SRC: dict = {
        f"{current_env.API_URL_PREFIX}/{current_env.CORS}": {
            "origins": current_env.CORS_ORIGIN,
            "methods": current_env.CORS_ALLOW_METHODS,
            "allow_headers": current_env.CORS_ALLOW_HEADERS,
            "expose_headers": current_env.CORS_EXPOSE_HEADERS,
        }
    }
    SWAGGER: dict = {
        "title": "API de la Dirección General de Recursos Materiales, Servicios Generales y Catastro",
        "uiversion": 3,
        "version": current_env.API_VERSION,
        "specs_route": "/docs",
    }
    bcrypt: Bcrypt = Bcrypt()
    # no_db: MongoEngine = MongoEngine()

    ma: Marshmallow = Marshmallow()
    admin: Admin = Admin(name="Catastro", template_mode="bootstrap4")

    def __init__(self):
        super().__init__()

        class Obj(object):
            valuaciones = DB(self.SQLALCHEMY_VALUACIONES_URI)
            catastro_v2 = DB(self.SQLALCHEMY_CATASTRO_V2_URI)

        self.db = Obj()
