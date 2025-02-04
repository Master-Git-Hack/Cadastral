from typing import Dict, List, Optional

from fastapi import APIRouter, Depends, Query
from requests import get
from sqlalchemy.orm import Session

from .. import config, database, middlewares
from ..models.catastral import Catastral
from ..models.usuarios import Usuarios

__response = middlewares.RESPONSES()


catastral = APIRouter(
    prefix="/catastral",
    tags=["Catastrales"],
    dependencies=[Depends(Usuarios.required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)


@catastral.get("/{id}")
async def get_catastral(
    id: int,
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    db: Session = Depends(database.VALUACIONES),
):
    try:
        cat = Catastral(db)
        if cat.get(id) is None:
            return __response.error(
                message="No se encontró el registro", status_code=404
            )
        data = cat.dict(includes, excludes)
        if key == "qr":
            url_base = "http://172.31.113.151/reportes_avaluos/qr_catastral.php?id"
            ext = "png"
            filename = f"{id}.{ext}"
            image_url = f"{url_base}={filename}"
            response = get(image_url)
            path = f"{config.PATHS.TMP}/{filename}"

            with open(path, "wb") as f:
                f.write(response.content)
            return __response.send_file(
                filename, path, media_type=f"image/{ext}", delete=True
            )
        return __response.success(data=data.get(key, data))
    except Exception as e:
        print(f"----------> Unexpected error on get_catastral:\n {str(e)}")
        return __response.error(message=str(e))


@catastral.get("/{registro}")
async def get_catastral_by_registro(
    registro: str,
    key: Optional[str] = None,
    includes: Optional[List[str]] = None,
    excludes: Optional[List[str]] = None,
    db: Session = Depends(database.VALUACIONES),
):
    try:
        cat = Catastral(db)
        if cat.filter(registro) is None:
            return __response.error(
                message="No se encontró el registro", status_code=404
            )
        data = cat.dict(includes=includes, excludes=excludes)
        return __response.success(data=data.get(key, data))
    except Exception as e:
        print(f"----------> Unexpected error on get_catastral_by_registro:\n {str(e)}")
        return __response.error(message=str(e))


@catastral.get("/legacy/registros", tags=["Legacy"], deprecated=True)
async def get_catastral_by_registro_legacy(
    year: Optional[str | int] = None,
    collection: Optional[str] = None,
    _from: Optional[str] = Query(None, alias="from"),
    _to: Optional[str] = Query(None, alias="to"),
    db: Session = Depends(database.VALUACIONES),
):
    try:
        path = f"{year}-{collection}-"
        cat = Catastral(db)
        registro = cat.Model.registro.between(f"{path}{_from}", f"{path}{_to}")
        if cat.filter_group(registro) is None:
            return __response.error(
                message="No se encontraron los registros", status_code=404
            )

        return __response.success(data=cat.list())
    except Exception as e:
        print(
            f"----------> Unexpected error on get_catastral_by_registro_legacy:\n {str(e)}"
        )
        return __response.error(message=str(e))


@catastral.get("/registros")
async def get_registros(
    year: Optional[str | int] = None,
    collection: Optional[str] = None,
    _from: Optional[str] = Query(None, alias="from"),
    _to: Optional[str] = Query(None, alias="to"),
    db: Session = Depends(database.VALUACIONES),
):
    try:
        path = f"CAT.{collection}-%s_{year}"
        cat = Catastral(db)
        registro = cat.Model.registro.between(path.format(_from), path.format(_to))
        if cat.filter_group(registro) is None:
            return __response.error(
                message="No se encontraron los registros", status_code=404
            )

        return __response.success(data=cat.list())
    except Exception as e:
        print(f"----------> Unexpected error on get_registros:\n {str(e)}")
        return __response.error(message=str(e))
