from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from .. import database, logger
from ..middlewares import Middlewares as __Middlewares
from ..middlewares.auth import required
from ..models.costos_construccion import CostosConstruccion as __CostosConstruccion

__response = __Middlewares.Responses()
costos_construccion = APIRouter(
    prefix="/costos-construccion",
    tags=["Costos de construcción"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)
