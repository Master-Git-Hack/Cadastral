"""Handle all the routes related to the Municipios."""
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, Request

from ..middlewares.responses import Response as _Response
from ..models.municipios import Municipios

municipios_routes = APIRouter(
    prefix="/municipios",
    tags=["Municipios"],
    responses={404: {"description": "Not found"}},
)


@municipios_routes.get("/{id}")
async def get_by_id(id: int) -> Any:
    """Get all the Municipios."""
    response = _Response()
    data = await Municipios.read.by_id(id, to_dict=True)
    return response.success(data=data)


@municipios_routes.get("/{id}/{key}")
async def get_key_value(id: int, key: str) -> Any:
    """Get all the Municipios."""
    response = _Response()
    key = key.lower()
    data = await Municipios.read.by_id(id, to_dict=True)
    return response.success(data=data.get(key, None))


@municipios_routes.patch("/{id}")
async def update(id: int, request: Request) -> Any:
    """Update a Municipios."""
    response = _Response()
    data = await request.json()
    result, data = await Municipios.update(id, data, True)
    if not result:
        return response.error()
    return response.success(data=data)
