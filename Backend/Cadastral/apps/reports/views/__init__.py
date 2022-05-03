from os import remove
from os.path import exists

from Cadastral import api, app
from Cadastral.config import TEMPORARY_PATH
from Cadastral.utils.api_documentation import DictItem, getDocumentation
from flask import after_this_request, request, send_file
from flask_restx import Namespace, Resource, fields

from ..controllers import create, merge

ns = Namespace(
    "Reportes", description="API para la generación de reportes", path="/REPORTS"
)
api.add_namespace(ns)

expected = ns.model(
    "Reportes",
    {
        "id": fields.Integer(example=1),
        "files": fields.Raw(example=["file1.pdf", "file2.pdf"]),
        "limits": DictItem(attribute="calling_args", example={"min": 1, "max": 10}),
        "collection": fields.String(example="0000"),
        "year": fields.Integer(example=22),
        "zoom": fields.Integer(example=1),
        "watermark": fields.Boolean(example=True),
        "moreProperties": DictItem(
            attribute="calling_args",
            example={
                "pageSize": "A4",
                "dpi": 300,
                "margins": {"top": 0.5, "bottom": 0.5, "left": 0.5, "right": 0.5},
            },
        ),
    },
)


@ns.route(
    "/APPRAISAL/<string:type>/<string:filename>",
    doc=getDocumentation(
        {"type": "Accion a realizar", "filename": "Nombre del archivo"},
        "REPORTS/GET/example",
    ),
)
class APPRAISAL(Resource):
    """
    API para la generación de reportes
    """
    @ns.expect(expected)
    @ns.produces(["application/pdf"])
    def post(self, type: str, filename: str):
        """
        Genera un reporte de acuerdo a los parámetros enviados
        :param type: Tipo de acción a realizar
        :param filename: Nombre del archivo
        :return: Archivo PDF
        """
        data = request.get_json()
        file = None
        if type == "GET":
            data["filename"] = f"{app.root_path}{TEMPORARY_PATH}/{filename}"
            file = create(data)
            return handleSendFile(file, filename)
        if type == "MERGE":

            @after_this_request
            def cleanup(response):
                for _file in data:
                    _File = f"{app.root_path}{TEMPORARY_PATH}/{_file}"
                    if exists(_File):
                        remove(_File)
                    remove(file)
                return response

            file = merge(
                [
                    f"{app.root_path}{TEMPORARY_PATH}/{current}"
                    for current in data["files"]
                ]
            )
            return handleSendFile(file, filename)


def handleSendFile(file=None, filename=None):
    """
    Maneja el envío del archivo
    :param file: Archivo a enviar
    :param filename: Nombre del archivo
    :return: Archivo PDF
    """
    if file is not None:
        return send_file(
            file,
            mimetype="application/pdf",
            as_attachment=True,
            download_name=filename,
        )
    else:
        api.abort(401, "Something went wrong")
