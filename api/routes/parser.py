from typing import Any, Optional
from os import remove
from xml.etree.ElementTree import fromstring, parse
from fastapi import APIRouter, Depends, Request, Query
from enum import Enum
from dateparser import parse
from .. import config, database, middlewares
from ..models.usuarios import Usuarios
from sqlalchemy.orm import Session
from ..utils.temporary import name_it
from xmltodict import unparse
from fastapi import File, UploadFile

__response = middlewares.RESPONSES()

required = Usuarios.required
parser = APIRouter(
    prefix="/parser",
    tags=["Parseador"],
    # dependencies=[Depends(Usuarios.required), Depends(database.VALUACIONES)],
    responses={404: {"description": "Not found"}},
)


async def xml_to_json(file: UploadFile = File(...)):
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
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))


async def json_to_xml(request: Request, filename: str = name_it(extension="xml")):
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
        print(f"----------> Unexpected error:\n {str(e)}")
        return __response.error(message=str(e))
    finally:
        remove(path)


@parser.post("")
async def main(
    request: Request,
    user=Depends(required),
    from_: Optional[str] = Query(None, alias="from"),
    to: Optional[str] = Query(None),
    file: Optional[UploadFile] = File(...),
    filename: Optional[str] = name_it(extension="xml"),
):
    action = {
        "xml_to_json": xml_to_json,
        "json_to_xml": json_to_xml,
    }
    key = f"{from_}_to_{to}"
    if key not in action:
        return __response.error(message="La acción solicitada no es válida")
    args = {
        "xml_to_json": (file,),
        "json_to_xml": (request, filename),
    }
    return await action[key](*args[key])
