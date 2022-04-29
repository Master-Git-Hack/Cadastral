from flask import request, send_file, after_this_request
from flask_restx import Resource, Namespace, fields
from os.path import exists
from os import remove

from Cadastral.utils.api_documentation import getDocumentation, DictItem
from Cadastral.apps.reports.controllers import create, merge
from Cadastral.config import TEMPORARY_PATH, TEMPLATE_PATH
from Cadastral import app, api


ns = Namespace("Reportes", description="API para la generación de reportes", path="/REPORTS")
api.add_namespace(ns)

expected = ns.model("Reportes", {
    "id": fields.Integer(example=1),
    "files":fields.Raw(example=["file1.pdf","file2.pdf"]),
    "limits":DictItem(attribute="calling_args",example={"min":1,"max":10}),
    "collection":fields.String(example="0000"),
    "year":fields.Integer(example=22),
    "zoom":fields.Integer(example=1),
    "watermark":fields.Boolean(example=True),
    "moreProperties":DictItem(attribute="calling_args",example={"pageSize":"A4","dpi":300,"margins":{
        "top":0.5,
        "bottom":0.5,
        "left":0.5,
        "right":0.5
    }
    }),
})

@ns.route('/APPRAISAL/<string:type>/<string:filename>',doc=getDocumentation({
        "type":"Accion a realizar",
        "filename":"Nombre del archivo"
        }, 
        "REPORTS/GET/example"
    ))
class APPRAISAL(Resource):
    @ns.expect(expected)
    @ns.produces(["application/pdf"])
    def post(self, type, filename):
        data = request.get_json()
        file = None
        if(type == "GET"):
            data["filename"] = f"{app.root_path}{TEMPORARY_PATH}/{filename}"
            file = create(data)
        if type == "MERGE":
            @after_this_request
            def cleanup(response):
                for _file in data:
                    _File = f"{app.root_path}{TEMPORARY_PATH}/{_file}"
                    if exists(_File):
                        remove(_File)
                    remove(file)
                return response

            file = merge([f"{app.root_path}{TEMPORARY_PATH}/{current}" for current in data["files"]])

        if file is not None:
            return send_file(
                    file,
                    mimetype="application/pdf",
                    as_attachment=True,
                    download_name=filename,
                )
        else:
            path = f"{app.root_path}{TEMPLATE_PATH}"
            return send_file(
                    f"{path}/_blank.pdf",
                    mimetype="application/pdf",
                    as_attachment=True,
                    download_name="_blank.pdf",
                )
