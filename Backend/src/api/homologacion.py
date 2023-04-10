"""Handle all the routes related to the Homologation."""
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, Request

from ..middlewares.responses import Response as _Response
from ..models.homologacion import Homologation

homologation_routes = APIRouter(
    prefix="/homologacion",
    tags=["Homologación"],
    responses={404: {"description": "Not found"}},
)


@homologation_routes.get("/{id}")
async def get_by_id(id: int) -> Any:
    """Get all the Homologation."""
    response = _Response()
    data = await Homologation.read.by_id(id, to_dict=True)
    return response.success(data=data)


@homologation_routes.post("/")
async def post_homologacion(request: Request):
    response = _Response()
    data = await request.json()
    result, data = await Homologation.create(data, to_dict=True)
    if not result:
        return response.error()
    return response.success(data=data)


@homologation_routes.get("/{registro}/{tipo_homologacion}")
async def get_registro_by_tipo_homologacion(registro: str, tipo_homologacion):
    response = _Response()
    tipo = tipo_homologacion.lower()
    data = await Homologation.read.by_registro(
        registro=registro, tipo=tipo, to_dict=True
    )
    if data is None:
        return response.error()
    return response.success(data=data)


@homologation_routes.get("/{id}/{key}")
async def get_key_value(id: int, key: str) -> Any:
    """Get all the Homologation."""
    response = _Response()
    key = key.lower()
    data = await Homologation.read.by_id(id, to_dict=True)
    return response.success(data=data.get(key, None))


@homologation_routes.patch("/{id}")
async def update(id: int, request: Request) -> Any:
    """Update a Homologation."""
    response = _Response()
    data = await request.json()
    result, data = await Homologation.update(id, data, True)
    if not result:
        return response.error()
    return response.success(data=data)
