from typing import Optional

from fastapi import APIRouter, Depends

from .. import database, middlewares
from ..models.usuarios import Usuarios

__response = middlewares.RESPONSES()

required = Usuarios.required
actions = APIRouter(
    prefix="/log",
    tags=["log"],  # "logs", "auditoria"],
    dependencies=[Depends(required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)


@actions.get("")
async def all(
    limit: int = 20,
    schema_name: Optional[str] = None,
    table_name: Optional[str] = None,
    user_name: Optional[str] = None,
    action: Optional[str] = None,
):
    return __response.success(
        data=database.logged_actions(limit, schema_name, table_name, user_name, action)
    )
