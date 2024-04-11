from os import remove
from xml.etree.ElementTree import fromstring, parse

from fastapi import APIRouter, Depends, File, Request, UploadFile
from sqlalchemy.orm import Session
from xmltodict import unparse

from .. import config, database, logger
from ..middlewares import Middlewares as __Middlewares
from ..middlewares.auth import required
from ..models.checklist import Checklist as __Checklist
from ..models.revision_checklist import RevisionChecklist as __RevisionChecklist
from ..models.usuarios import Usuarios as __Usuarios
from ..utils.tmp import name_it

__response = __Middlewares.Responses()
parser = APIRouter(
    prefix="/parser",
    tags=["Parser"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@parser.post("/xml-to-json")
async def xml_to_json(
    file: UploadFile = File(...),
    user=Depends(required),
):
    if isinstance(user, dict):
        return __response.error(**user)
    if "xml" not in file.filename or file.filename == "":
        return __response.error(message="El archivo enviado no es un archivo XML")
    try:
        xml = await file.read()
        root_xml = fromstring(xml)
        return __response.success(
            data={
                element.tag.lower(): float(element.text)
                if element.text.isdigit()
                else element.text.strip().replace("\n", "")
                for element in root_xml.iter()
            }
        )
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


@parser.post("/json-to-xml/{filename}")
async def json_to_xml(
    request: Request,
    filename: str = name_it(extension="xml"),
    user=Depends(required),
):
    if isinstance(user, dict):
        return __response.error(**user)
    data = await request.json()
    if not data:
        return __response.error(message="No se ha enviado ningún archivo")
    if ".xml" not in filename:
        filename = f"{filename}.xml"
    try:
        path = f"{config.PATHS.tmp}/{filename}"
        with open(path, "w") as file:
            file.write(unparse({"root": data}))
        return __response.send_file(filename=filename, path=path)
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))
    finally:
        remove(path)
