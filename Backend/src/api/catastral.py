"""Handle all the routes related to the Catastral"""
from datetime import datetime
from typing import Any

from fastapi import APIRouter, Depends, Request

from ..middlewares.responses import Response as _Response
from ..models.catastral import Catastral

catastral_routes = APIRouter(
    prefix="/catastral",
    tags=["Catastral"],
    responses={404: {"description": "Not found"}},
)


@catastral_routes.get("/{page}/{limit}")
async def get_all(page: int, limit: int) -> Any:
    """Get all the Catastral."""
    response = _Response()
    data = await Catastral.read.all_paged(page=page, limit=limit, to_list=True)
    return response.success(data=data)


@catastral_routes.get("/{id}")
async def get_by_id(id: int) -> Any:
    """Get all the Catastral"""
    response = _Response()
    data = await Catastral.read.by_id(id, to_dict=True)
    return response.success(data=data)


@catastral_routes.get("/{id}/{key}")
async def get_key_value(id: int, key: str) -> Any:
    """Get all the Catastral"""
    response = _Response()
    key = key.lower()
    data = await Catastral.read.by_id(id, to_dict=True)
    return response.success(data=data["properties"].get(key, None))


@catastral_routes.patch("/{id}")
async def update(id: int, request: Request) -> Any:
    """Update a Catastral"""
    response = _Response()
    data = await request.json()
    result, data = await Catastral.update(id, data, True)
    if not result:
        return response.error()
    return response.success(data=data)
