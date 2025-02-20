"""File to handle matrix upload"""
from difflib import get_close_matches
from distutils import extension
from os.path import join

from flask import request
from pandas import read_csv, read_excel
from werkzeug.utils import secure_filename

from .... import app
from ....utils.dbo import save_changes
from ....utils.response import Response
from .models.catastral import Catastral, catastral_schema

municipios = [
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
]


def get_extension(filename: str) -> str:
    """function to get the extension of the file"""
    return filename.rsplit(".", 1)[1].lower()


def allowed_file(filename: str) -> bool:
    """function to check if the file is allowed"""
    return "." in filename and get_extension(filename) in app.config.get(
        "ALLOWED_EXTENSIONS"
    )


def municipio_sanitized(municipio: str) -> str:
    """function to sanitize the municipio"""
    match = get_close_matches(municipio.title(), municipios)
    if len(match) > 0:
        return match[0]
    return (
        municipio.replace("á", "a")
        .replace("é", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ú", "u")
        .title()
    )


def matrix_insertion(new_request: request):
    if "file" not in new_request.files:
        return Response.error("No file part")

    file = new_request.files["file"]

    if file.filename == "":
        return Response.error("No selected file")

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        path = join(app.config.get("UPLOAD_FOLDER"), filename)
        file.save(path)
        ext = get_extension(filename)
        data = None
        if ext == "csv":
            data = read_csv(
                path,
                sep=r",\s+",
                delimiter=",",
                encoding="utf-8",
                skipinitialspace=True,
            )
        if ext == "xlsx" or ext == "xls":
            data = read_excel(
                path,
                sep=r",\s+",
                delimiter=",",
                encoding="utf-8",
                skipinitialspace=True,
            )

        if data is not None:
            data = data.apply(
                lambda cell: cell.str.strip() if cell.dtype == "object" else cell
            )
            data = data.replace(r"^\s*$", None, regex=True)
            data.insert(loc=0, column="estatus", value=1)
            data.insert(loc=0, column="usuario", value="admin")
            data["municipios"] = data["municipios"].apply(
                lambda municipio: municipio_sanitized(municipio.lower())
            )
            errors = []
            duplicated = []
            inserted = []
            for _, row in data.iterrows():
                record = Catastral.query.filter_by(cuenta=row["registro"]).first()
                if record is None:
                    new_record = Catastral(row.to_json())
                    if save_changes(new_record):
                        inserted.append(catastral_schema.dump(new_record))
                    else:
                        errors.append(catastral_schema.dump(new_record))
                else:
                    duplicated.append(catastral_schema.dump(record))
            return Response.success(
                data=dict(errors=errors, duplicated=duplicated, inserted=inserted)
            )
