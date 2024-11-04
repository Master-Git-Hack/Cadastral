from itertools import groupby
from typing import Any, Optional

from fastapi import APIRouter, Depends
from requests import get
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from .. import config, database, middlewares
from ..models.catastral import Catastrales
from ..models.usuarios import Usuarios

response = middlewares.RESPONSES()


meta = APIRouter(
    prefix="/meta",
    tags=["Metadatos"],
    dependencies=[Depends(Usuarios.required), Depends(database.valuaciones)],
    responses={404: {"description": "Not found"}},
)
DBS = {"municipios", "pcm", "plan_ordenamiento_territorial", "valores_municipales"}


@meta.get(
    "/",
)
def get_meta(): ...
def add_keys_to_dict_levels(d):
    # Si el valor es un diccionario, es necesario procesarlo
    if isinstance(d, dict):
        # Añadimos la clave 'keys' que contiene todas las claves de este nivel
        d["keys"] = list(d.keys())

        # Llamada recursiva en cada valor del diccionario
        for key, value in d.items():
            # Solo continuar si el valor es un diccionario
            if isinstance(value, dict):
                add_keys_to_dict_levels(value)
    # Si el valor es una lista o de otro tipo, no hace nada
    return d


@meta.get(
    "/origin",
)
def get_dbs(
    user=Depends(Usuarios.required),
    db_name: Optional[str] = None,
    schema_name: Optional[str] = None,
    table_name: Optional[str] = None,
):
    if user is None:
        return response.error(status_code=401, message="No autorizado")
    db_list = [db_name] if db_name else DBS
    data = {}

    for db in db_list:
        local_session = database.SESSIONS.get(db)
        if local_session is None:
            continue
        session = local_session()
        try:

            query = """
                SELECT table_schema, table_name
                FROM information_schema.tables
                WHERE table_type = 'BASE TABLE'
            """
            if schema_name:
                query += " AND table_schema = :schema_name"
            if table_name:
                query += " AND table_name = :table_name"
            query += " ORDER BY table_schema, table_name;"

            result = session.execute(
                text(query), {"schema_name": schema_name, "table_name": table_name}
            ).fetchall()

            data[db] = {
                schema: [table for _, table in tables]
                for schema, tables in groupby(result, lambda x: x[0])
            }
        finally:
            session.close()
    return add_keys_to_dict_levels(data)


@meta.get(
    "/origin/records",
)
async def get_records(
    db_name: str,
    schema_name: str,
    table_name: str,
    user=Depends(Usuarios.required),
    limit: Optional[int] = 100,
):
    if user is None:
        return response.error(status_code=401, message="No autorizado")
    if db_name not in DBS:
        return response.error(status_code=404, message="Base de datos no encontrada")
    local_session = database.SESSIONS.get(db_name)
    if local_session is None:
        return response.error(status_code=404, message="Base de datos no encontrada")
    session = local_session()
    try:
        query = text(f"SELECT * FROM {schema_name}.{table_name} LIMIT {limit};")
        result = session.execute(query).fetchall()
        return response.success(data=[dict(row) for row in result])
    except SQLAlchemyError as e:
        # Manejo de errores en caso de una excepción en la consulta
        return response.error(
            status_code=500, message=f"Error al ejecutar la consulta: {str(e)}"
        )
    finally:
        session.close()


@meta.get(
    "/origin/record",
)
async def get_records(
    db_name: str,
    schema_name: str,
    table_name: str,
    column_name: str,
    value: Any,
    user=Depends(Usuarios.required),
):
    if user is None:
        return response.error(status_code=401, message="No autorizado")
    if db_name not in DBS:
        return response.error(status_code=404, message="Base de datos no encontrada")
    local_session = database.SESSIONS.get(db_name)
    if local_session is None:
        return response.error(status_code=404, message="Base de datos no encontrada")
    session = local_session()
    try:
        value = f"'{value}'" if isinstance(value, str) else value
        query = text(
            f"SELECT * FROM {schema_name}.{table_name} WHERE {column_name} = {value};"
        )
        result = session.execute(query).fetchall()
        return response.success(data=[dict(row) for row in result])
    except SQLAlchemyError as e:
        # Manejo de errores en caso de una excepción en la consulta
        return response.error(
            status_code=500, message=f"Error al ejecutar la consulta: {str(e)}"
        )
    finally:
        session.close()
