"""Handle all the routes related to the Costos Construccion."""
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, Request

from ..middlewares.responses import Response as _Response
from ..models.costos_construccion import CostosConstruccion

costos_construccion_routes = APIRouter(
    prefix="/costos_construccion",
    tags=["Costos Construcción"],
    responses={404: {"description": "Not found"}},
)


@costos_construccion_routes.get("/{id}")
async def get_by_id(id: int) -> Any:
    """Get all the Costos Construccion."""
    response = _Response()
    data = await CostosConstruccion.read.by_id(id, to_dict=True)
    return response.success(data=data)


@costos_construccion_routes.get("/{id}/{key}")
async def get_key_valuue(id: int, key: str) -> Any:
    """Get all the Costos Construccion."""
    response = _Response()
    key = key.lower()
    data = await CostosConstruccion.read.by_id(id, to_dict=True)
    return response.success(data=data["properties"].get(key, None))


@costos_construccion_routes.patch("/{id}")
async def update(id: int, request: Request) -> Any:
    """Update a Costos Construccion."""
    response = _Response()
    data = await request.json()
    result, data = await CostosConstruccion.update(id, data, True)
    if not result:
        return response.error()
    return response.success(data=data)
