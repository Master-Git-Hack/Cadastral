from json import dumps, loads
from typing import Any
from xml.etree.ElementTree import fromstring, parse

from flasgger import swag_from
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from xmltodict import unparse

from .. import config, logger
from ..utils.response import Responses

parse_files: Blueprint = Blueprint(
    "Conversor de Archivos", __name__, url_prefix="/parse"
)
__paths = config.PATHS
__swagger: dict = config.API_MODELS.get("parse_files", {})


@parse_files.post("/xml-to-json")
@swag_from(__swagger.get("xml_to_json", {}))
@jwt_required()
def xml_to_json(response=Responses()):
    if "file" not in (file := request.files):
        return response.error(
            message="No se ha enviado ningún archivo", status_code=400
        )

    file = file["file"]
    if file.filename == "":
        return response.error(
            message="No se ha enviado ningún archivo", status_code=400
        )
    if not file.filename.endswith(".xml"):
        return response.error(
            message="El archivo enviado no es un archivo XML", status_code=400
        )
    try:
        xml = file.read()

        root_xml = fromstring(xml)

        return response.success(
            data={
                element.tag.lower(): float(element.text)
                if element.text.isdigit()
                else element.text.strip().replace("\n", "")
                for element in root_xml.iter()
            }
        )
    except Exception as e:
        logger.error("Error al convertir el archivo XML a JSON: %s", e)
        return response.error(message=str(e), status_code=400)


@parse_files.post("/json-to-xml/<string:filename>")
@swag_from(__swagger.get("json_to_xml", {}))
@jwt_required()
def json_to_xml(filename: str, response=Responses()):
    data = request.get_json()
    if data is None:
        return response.error(
            message="No se ha enviado ningún archivo JSON", status_code=400
        )
    try:
        path = f"{__paths.tmp}/{filename}"
        with open(path, "w", encoding="utf-8") as file:
            file.write(unparse(loads(data)))
        return response.send_file(filename=filename, data=path)
    except Exception as e:
        logger.error("Error al convertir JSON a XML: %s", e)
        return response.error(message=str(e), status_code=400)
