from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from .. import database, logger
from ..middlewares import Middlewares as __Middlewares
from ..middlewares.auth import required

__query = "SELECT schema_name FROM information_schema.schemata;"
__response = __Middlewares.Responses()
db_info = APIRouter(
    prefix="/db-info",
    tags=["Información de la Base de Datos"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@db_info.get("/schemas")
async def get_schemas(user=Depends(required)):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        valuaciones = [
            schema[0] for schema in database.execute_query("valuaciones", __query)
        ]
        catastro_v2 = [
            schema[0] for schema in database.execute_query("catastro_v2", __query)
        ]
        return __response.success(
            data={"valuaciones": valuaciones, "catastro_v2": catastro_v2}
        )
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@db_info.get("/schemas/{schema}")
async def get_schemas_catastro(schema: str, user=Depends(required)):
    if isinstance(user, dict):
        return __response.error(**user)
    try:
        return __response.success(
            data=[schema[0] for schema in database.execute_query(schema, __query)]
        )
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))
