from difflib import get_close_matches

from flasgger.utils import swag_from
from flasgger_marshmallow import swagger_decorator
from flask import Blueprint

from .. import config
from ..models.municipios import Municipios
from ..utils.response import Responses

municipios_api: Blueprint = Blueprint("Municipios", __name__, url_prefix="/municipios")
__swagger: dict = config.API_MODELS.get("municipios", {})
municipios = {
    "Abasolo",
    "Acambaro",
    "San Miguel de Allende",
    "Apaseo el Alto",
    "Apaseo el Grande",
    "Atarjea",
    "Celaya",
    "Manuel Doblado",
    "Comonfort",
    "Coroneo",
    "Cortazar",
    "Cueramaro",
    "Doctor Mora",
    "Dolores Hidalgo",
    "Guanajuato",
    "Huanimaro",
    "Irapuato",
    "Jaral del Progreso",
    "Jerecuaro",
    "Leon",
    "Moroleon",
    "Ocampo",
    "Penjamo",
    "Pueblo Nuevo",
    "Purisima del Rincon",
    "Romita",
    "Salamanca",
    "Salvatierra",
    "San Diego de la Union",
    "San Felipe",
    "San Francisco del Rincon",
    "San Jose Iturbide",
    "San Luis de la Paz",
    "Santa Catarina",
    "Santa Cruz de Juventino Rosas",
    "Santiago Maravatio",
    "Silao",
    "Tarandacuao",
    "Tarimoro",
    "Tierra Blanca",
    "Uriangato",
    "Valle de Santiago",
    "Victoria",
    "Villagran",
    "Xichu",
    "Yuriria",
    "Fuera del Estado",
}


@municipios_api.get("/")
@swag_from(__swagger.get("get_municipios", {}))
def get_municipos(response: Responses = Responses()):
    municipios = Municipios()
    if municipios.all() is None:
        return response.error(status_code=404)
    return response.success(data=municipios.to_list(exclude=["geom"]))


@municipios_api.get("/<string:municipio>")
@swag_from(__swagger.get("get_municipio", {}))
def get_municipo(municipio: str, response: Responses = Responses()):
    __municipio = Municipios()
    nombre = get_close_matches(
        municipio.lower()
        .replace("á", "a")
        .replace("é", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ú", "u")
        .title(),
        municipios,
    )
    if len(nombre) == 0:
        return response.error(status_code=409)

    if __municipio.filter(nombre=nombre[0]) is None:
        return response.error(status_code=404)

    return response.success(data=__municipio.current.nombre_utf)
