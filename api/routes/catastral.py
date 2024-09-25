from typing import Optional

from fastapi import APIRouter, Depends
from requests import get

from .. import config, database, middlewares
from ..models.catastral import Catastrales
from ..models.usuarios import Usuarios

response = middlewares.RESPONSES()


catastral = APIRouter(
    prefix="/catastral",
    tags=["Catastrales"],
    dependencies=[Depends(Usuarios.required), Depends(database.valuaciones)],
    responses={404: {"description": "Not found"}},
)


@catastral.get("/{id}", response_model=Catastrales.response_model)
def get_catastral(
    id: int,
    user=Depends(Usuarios.required),
    Session=Depends(database.valuaciones),
    key: Optional[str] = None,
):
    if user is None:
        return response.error(status_code=401, message="No autorizado")
    catastrales = Catastrales(Session)
    if catastrales.get(id) is None:
        return response.error(status_code=404, message="No encontrado")
    data = catastrales.dict()
    return response.success(data=data.get(key, data))


@catastral.get(
    "es/deprecated", deprecated=True, response_model=Catastrales.response_model
)
def get_deprecated_catastral(
    user=Depends(Usuarios.required),
    Session=Depends(database.valuaciones),
    year: Optional[int] = None,
    collection: Optional[str] = None,
    head: Optional[int] = None,
    tail: Optional[int] = None,
    since: Optional[str] = None,
    until: Optional[str] = None,
):
    if user is None:
        return response.error(status_code=401, message="No autorizado")
    if since is None and until is None:
        since = f"{year}-{collection}-{head}"
        until = f"{year}-{collection}-{tail}"
    if "None" in since or "None" in until:
        return response.error(status_code=422, message="Faltan datos")
    catastrales = Catastrales(Session)
    with Session as session:
        registro = catastrales.Model.registro.between(since, until)
        catastrales.Current = session.exec(catastrales.QUERY).filter(registro).all()

    return response.success(data=catastrales.list())


@catastral.get("/{id}/qr")
def get_catastral_qr(
    id: int,
    user=Depends(Usuarios.required),
):
    if user is None:
        return response.error(status_code=401, message="No autorizado")

    url_base = "http://172.31.113.151/reportes_avaluos/qr_catastral.php?id"
    ext = "png"
    filename = f"{id}.{ext}"
    image_url = f"{url_base}={filename}"
    try:
        img = get(image_url)
        # response.raise_for_status()
        with open((path := f"{config.PATHS.TMP}/{img}"), "wb") as f:
            f.write(img.content)

        return response.send_file(
            filename=filename, path=path, media_type=f"image/{ext}", delete=True
        )
    except Exception as e:
        return response.error(message="No se pudo descargar la imagen", status_code=404)
