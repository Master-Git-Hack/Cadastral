from typing import Union

from fastapi import Depends, Request
from sqlalchemy.orm import Session

from .. import database, logger
from ..models.justipreciacion import Justipreciacion


async def justipreciacion_required(
    justipreaciacion_id: int,
    request: Request,
    db: Session = Depends(database.valuaciones),
):
    data = await request.json()
    if justipreaciacion_id is None or not data["justipreciacion"]:
        return __response.error(message="No se encontró la justipreciacion")
    justi = Justipreciacion(db=db)
    if justi.get(id=justipreaciacion_id) is None:
        return __response.error(message="No se encontró la justipreciacion")
    return justi.current
