"""Handle all the routes related to the Justipreciacion."""
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, Request

from ..middlewares.responses import Response as _Response
from ..models.justipreciacion import Justipreciacion

justipreciacion_routes = APIRouter(
    prefix="/justipreciacion",
    tags=["Justipreciación"],
    responses={404: {"description": "Not found"}},
)


@justipreciacion_routes.get("/{id}")
async def get_by_id(id: int) -> Any:
    """Get all the Justipreciacion."""
    response = _Response()
    data = await Justipreciacion.read.by_id(id, to_dict=True)
    return response.success(data=data)


@justipreciacion_routes.get("/{id}/{key}")
async def get_key_value(id: int, key: str) -> Any:
    """Get all the Justipreciacion."""
    response = _Response()
    key = key.lower()
    data = await Justipreciacion.read.by_id(id, to_dict=True)
    return response.success(data=data["properties"].get(key, None))


@justipreciacion_routes.patch("/{id}")
async def update(id: int, request: Request) -> Any:
    """Update a Justipreciacion."""
    response = _Response()
    data = await request.json()
    result, data = await Justipreciacion.update(id, data, True)
    if not result:
        return response.error()
    return response.success(data=data)
