"""Handle all the routes related to the Obras Complementarias."""
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, Request

from ..middlewares.responses import Response as _Response
from ..models.obras_complementarias import ObrasComplementarias

obras_complementarias_routes = APIRouter(
    prefix="/obras_complementarias",
    tags=["Obras Complementarias"],
    responses={404: {"description": "Not found"}},
)


@obras_complementarias_routes.get("/{id}")
async def get_by_id(id: int) -> Any:
    """Get all the Obras Complementarias."""
    response = _Response()
    data = await ObrasComplementarias.read.by_id(id, to_dict=True)
    return response.success(data=data)


@obras_complementarias_routes.get("/{id}/{key}")
async def get_key_value(id: int, key: str) -> Any:
    """Get all the Obras Complementarias."""
    response = _Response()
    key = key.lower()
    data = await ObrasComplementarias.read.by_id(id, to_dict=True)
    return response.success(data=data.get(key, None))


@obras_complementarias_routes.patch("/{id}")
async def update(id: int, request: Request) -> Any:
    """Update a Obras Complementarias."""
    response = _Response()
    data = await request.json()
    result, data = await ObrasComplementarias.update(id, data, True)
    if not result:
        return response.error()
    return response.success(data=data)
