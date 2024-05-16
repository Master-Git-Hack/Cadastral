from base64 import b64encode
from datetime import datetime, timedelta
from os import remove

from dateparser import parse
from fastapi import APIRouter, Depends, Request
from num2words import num2words
from openpyxl import Workbook
from openpyxl.drawing.image import Image
from openpyxl.styles import Border, Font, PatternFill, Side
from requests import get
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from .. import config, database, logger
from ..middlewares import Middlewares as __Middlewares
from ..middlewares.auth import required
from ..models.catastral import Catastral

__response = __Middlewares.Responses()
catastrales = APIRouter(
    prefix="/catastrales",
    tags=["Catastrales"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@catastrales.get("/{id}")
async def get_catastro(
    id: int, db: Session = Depends(database.valuaciones), user=Depends(required)
):
    """
    Get
    """
    if isinstance(user, dict):
        return __response.error(**user)
    catastro = Catastral(db)
    if catastro.get(id) is None:
        return __response.error(message="No se encontraron resultados", status_code=404)
    return __response.success(data=catastro.to_dict())


@catastrales.get("/{id}/field/{field}")
async def get_catastro_field(
    id: int,
    field: str,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Get
    """
    if isinstance(user, dict):
        return __response.error(**user)
    catastro = Catastral(db)
    if catastro.get(id) is None:
        return __response.error(message="No se encontraron resultados", status_code=404)
    data = catastro.to_dict()
    return __response.success(data=data.get(field, data))


@catastrales.get("/registro/{registro}")
async def get_by_registro(
    registro: str, db: Session = Depends(database.valuaciones), user=Depends(required)
):
    """
    Get
    """
    if isinstance(user, dict):
        return __response.error(**user)
    catastro = Catastral(db)
    if catastro.filter(registro=registro) is None:
        return __response.error(message="No se encontraron resultados", status_code=404)
    return __response.success(data=catastro.to_dict())


@catastrales.get("/registros/old/{year}/{collection}/{begin}/{end}", deprecated=True)
async def get_collections_old_by_registros(
    year: int,
    collection: str,
    begin: int,
    end: int,
    db: Session = Depends(database.valuaciones),
    user=Depends(required),
):
    """
    Get
    """
    # if isinstance(user, dict):
    #     return __response.error(**user)
    catastro = Catastral(db)
    registro = catastro.model.registro.between(
        f"{year}-{collection}-{begin}", f"{year}-{collection}-{end}"
    )
    data = db.query(catastro.model).filter(registro).all()

    if len(data) == 0:
        return __response.error(message="No se encontraron resultados", status_code=404)

    return __response.success(data=catastro.to_list_raw(data))


@catastrales.get("/registros/{year}/{collection}/{begin}/{end}")
async def get_collections_by_registros(
    year: int,
    collection: str,
    begin: int,
    end: int,
    db: Session = Depends(database.valuaciones),
    # user=Depends(required),
):
    """
    Get CAT.170-1_23
    """
    # if isinstance(user, dict):
    #     return __response.error(**user)
    catastro = Catastral(db)
    registro = catastro.model.registro.between(
        f"CAT.{collection}-{begin}_{year}", f"CAT.{collection}-{end}_{year}"
    )
    data = db.query(catastro.model).filter(registro).all()
    # CAT.70-1_24' AND 'CAT.70-67_24'

    if len(data) == 0:
        return __response.error(message="No se encontraron resultados", status_code=404)

    return __response.success(data=catastro.to_list_raw(data))

@catastrales.get("/qr/{id}")
async def handle_images(
    id: int,
    
    # user=Depends(required),
):
    # if isinstance(user, dict):
    #     return __response.error(**user)
    if id is None:
        return __response.error("No se encontró la imagen", status_code=404)
    # download image an save on config.paths.tmp and send as a response.send_file
    url_base = "http://172.31.113.151/reportes_avaluos/qr_catastral.php?id"
    ext ="png"
    filename = f"{id}.{ext}"
    image_url = f"{url_base}={filename}"

    try:
        response = get(image_url)
        # response.raise_for_status()
        path = f"{config.PATHS.tmp}/{filename}"

        with open(path, "wb") as f:
            f.write(response.content)
        

        return __response.send_file(
            filename=filename, path=path, media_type=f"image/{ext}", delete=True
        )
    except Exception as e:
        return __response.error(
            message="No se pudo descargar la imagen", status_code=404
        )
