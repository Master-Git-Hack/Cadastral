"""Handle all the routes related to the Indicadores Municipales."""
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, Request

from ..middlewares.responses import Response as _Response
from ..models.indicadores_municipales import IndicadoresMunicipales

indicadores_municipales_routes = APIRouter(
    prefix="/indicadores_municipales",
    tags=["Indicadores Municipales"],
    responses={404: {"description": "Not found"}},
)


@indicadores_municipales_routes.get("/{id}")
async def get_by_id(id: int) -> Any:
    """Get all the Indicadores Municipales."""
    response = _Response()
    data = await IndicadoresMunicipales.read.by_id(id, to_dict=True)
    return response.success(data=data)


@indicadores_municipales_routes.get("/{id}/{key}")
async def get_key_value(id: int, key: str) -> Any:
    """Get all the Indicadores Municipales."""
    response = _Response()
    key = key.lower()
    data = await IndicadoresMunicipales.read.by_id(id, to_dict=True)
    return response.success(data=data.get(key, None))


@indicadores_municipales_routes.patch("/{id}")
async def update(id: int, request: Request) -> Any:
    """Update a Indicadores Municipales."""
    response = _Response()
    data = await request.json()
    result, data = await IndicadoresMunicipales.update(id, data, True)
    if not result:
        return response.error()
    return response.success(data=data)
