"""Handle all the routes related to the Logged Actions."""
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, Request

from ..middlewares.responses import Response as _Response


# from ..models.logged_actions import LoggedActions
class LoggedActions:
    pass


logged_actions_routes = APIRouter(
    prefix="/logged_actions",
    tags=["Auditoria"],
    responses={404: {"description": "Not found"}},
)


@logged_actions_routes.get("/{id}")
async def get_by_id(id: int) -> Any:
    """Get all the Logged Actions."""
    response = _Response()
    data = await LoggedActions.read.by_id(id, to_dict=True)
    return response.success(data=data)


@logged_actions_routes.get("/{id}/{key}")
async def get_key_value(id: int, key: str) -> Any:
    """Get all the Logged Actions."""
    response = _Response()
    key = key.lower()
    data = await LoggedActions.read.by_id(id, to_dict=True)
    return response.success(data=data.get(key, None))
