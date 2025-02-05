from enum import Enum
from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import config, database, middlewares
from ..models.usuarios import Usuarios

__response = middlewares.RESPONSES()

required = Usuarios.required
information = APIRouter(
    prefix="/resources",
    tags=["Database Resources"],
    # dependencies=[Depends(Usuarios.required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)

DBS = Enum(
    "DBS",
    {
        db.upper(): db
        for db in {
            "municipios",
            "pcm",
            "plan_ordenamiento_territorial",
            "valores_municipales",
        }
    },
)


@information.get("/tree", tags=["Metadatos"], response_model=None)
async def get_resources(
    user=Depends(required),
    db_name: Optional[DBS] = None,
    schema_name: Optional[str] = None,
    table_name: Optional[str] = None,
):
    data = database.group_by_db(db=db_name, schema=schema_name, table=table_name)
    if db_name is None:
        data = {
            db: schemas
            for db, schemas in data.items()
            if db
            in {
                "municipios",
                "pcm",
                "plan_ordenamiento_territorial",
                "valores_municipales",
            }
        }
    return __response.success(
        data=[
            {
                "key": db,
                "label": db.replace("_", " ").title(),
                "data": f"{db.capitalize()} Database",
                "icon": "pi pi-fw pi-database",
                "selectable": False,
                "leaf": True,
                "children": [
                    {
                        "key": f"{db}.{schema}",
                        "label": schema.replace("_", " ").title(),
                        "data": f"{schema.capitalize()} Schema",
                        "icon": "pi pi-fw pi-sitemap",
                        "selectable": False,
                        "leaf": True,
                        "children": [
                            {
                                "key": f"{db}.{schema}.{table}",
                                "label": table.replace("_", " ").title(),
                                "data": f"{table.capitalize()} Table",
                                "icon": "pi pi-fw pi-table",
                            }
                            for table in tables
                        ],
                    }
                    for schema, tables in schemas.items()
                ],
            }
            for db, schemas in data.items()
        ]
    )


@information.get("/schemas", response_model=None)
async def get_resources(
    user=Depends(required),
    db_name: Optional[config.SECRETS.DBS] = None,
    schema_name: Optional[str] = None,
    table_name: Optional[str] = None,
):
    try:
        data = database.group_by_db(db=db_name, schema=schema_name, table=table_name)
        if db_name is None:
            data = {db: schemas for db, schemas in data.items()}
        return __response.success(
            data=[
                {
                    "key": db,
                    "label": db.replace("_", " ").title(),
                    "children": [
                        {
                            "key": f"{db}.{schema}",
                            "label": schema.replace("_", " ").title(),
                            "children": [
                                {
                                    "key": f"{db}.{schema}.{table}",
                                    "label": table.replace("_", " ").title(),
                                }
                                for table in tables
                            ],
                        }
                        for schema, tables in schemas.items()
                    ],
                }
                for db, schemas in data.items()
            ]
        )
    except Exception as e:
        print(f"----------> Unexpected error on Database Resources:\n {str(e)}")
        return __response.error(message="Unexpected error on Database Resources")
