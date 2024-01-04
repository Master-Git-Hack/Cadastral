from flasgger import swag_from
from flask import Blueprint

from .. import config
from ..utils.response import Responses

db_info: Blueprint = Blueprint(
    "Información de la Base de Datos", __name__, url_prefix="/db-info"
)
__dbs = config.db
__swagger: dict = config.API_MODELS.get("db_info", {})


@db_info.get("/schemas")
@swag_from(__swagger.get("get_schemas", {}))
def get_schemas(response=Responses()):
    try:
        data = {"catastro_v2": [], "valuaciones": []}

        # Get the list of schema names from the database
        with __dbs.catastro_v2 as __db:
            data["catastro_v2"] = __db.get_schema_names()
        with __dbs.valuaciones as __db:
            data["valuaciones"] = __db.get_schema_names()
        # schema_catastro_v2 =__dbs.catastro_v2.get_schema_names()
        return response.success(data=data)
    except Exception as e:
        return response.error(message=str(e), status_code=422)


@db_info.get("/schemas/catastro")
@swag_from(__swagger.get("get_schemas", {}))
def get_schemas_catastro(response=Responses()):
    try:
        # Get the list of schema names from the database
        with __dbs.catastro_v2 as __db:
            return response.success(data=__db.get_complete_schema())
    except Exception as e:
        return response.error(message=str(e), status_code=422)


@db_info.get("<string:db>/schemas/<string:schema>/tables")
@swag_from(__swagger.get("get_tables_from_schema", {}))
def get_tables_from_schema(db: str, schema: str, response=Responses()):
    try:
        dbs = {
            "catastro_v2": __dbs.catastro_v2,
            "valuaciones": __dbs.valuaciones,
        }
        with dbs.get(db, __dbs.catastro_v2) as __db:
            data = __db.get_table_names(schema)
        return response.success(data=data)
    except Exception as e:
        return response.error(message=str(e), status_code=422)


@db_info.get("<string:db>/schemas")
@swag_from(__swagger.get("get_complete_schema", {}))
def get_complete_schema(db: str, response=Responses()):
    try:
        dbs = {
            "catastro_v2": __dbs.catastro_v2,
            "valuaciones": __dbs.valuaciones,
        }
        with dbs.get(db, __dbs.catastro_v2) as __db:
            data = __db.get_complete_schema()
        return response.success(data=data)
    except Exception as e:
        return response.error(message=str(e), status_code=422)
