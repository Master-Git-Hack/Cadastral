"""Handle all the routes related to the Departamentos Solicitantes."""
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, Request

from ..middlewares.responses import Response as _Response
from ..models.dep_solicitante import DepSolicitante

dep_solicitantes_routes = APIRouter(
    prefix="/dep_solicitantes",
    tags=[
        "Departamentos Solicitantes",
    ],
    responses={404: {"description": "Not found"}},
)


@dep_solicitantes_routes.get("/{id}")
async def get_by_id(id: int) -> Any:
    """Get all the Departamentos Solicitantes."""
    response = _Response()
    data = await DepSolicitante.read.by_id(id, to_dict=True, exclude=["estatus"])
    return response.success(data=data)


@dep_solicitantes_routes.get("/all")
async def get_all() -> Any:
    """Get all the Departamentos Solicitantes."""
    response = _Response()
    data = await DepSolicitante.read.all()
    return response.success(data=data)


@dep_solicitantes_routes.get("/{id}/{key}")
async def get_key_value(id: int, key: str) -> Any:
    """Get all the Departamentos Solicitantes."""
    response = _Response()
    key = key.lower()
    data = await DepSolicitante.read.by_id(id, to_dict=True)
    return response.success(data=data.get(key, None))


@dep_solicitantes_routes.patch("/{id}")
async def update(id: int, request: Request) -> Any:
    response = _Response()
    data = await request.json()
    result, data = await DepSolicitante.update(id, data, True)
    if not result:
        return response.error()
    return response.success(data=data)
