from flask_restx import Resource, Namespace
from flask import request, jsonify

from Cadastral import api
from Cadastral.utils.api_documentation import getDocumentation
from Cadastral.apps.homologation.controllers import create, insert, update

ns = Namespace(
    "Homologacón",
    description="API para la homologación de Terreno y Rentas",
    path="/HOMOLOGATION",
)
api.add_namespace(ns)


@ns.route(
    "/<string:type>/<int:id>",
    doc=getDocumentation(
        {"type": "Tipo de homologación", "id": "Id del registro de Justipreciación"},
        "HOMOLOGATION/TERRENO/188",
    ),
)
class HOMOLOGATION(Resource):
    def get(self, type, id):
        response = create(id, type.lower())
        if response is not None:
            return jsonify({"response": response})
        else:
            ns.abort(401, "Something went wrong")

    def post(self, type, id):
        data = request.get_json()
        response = insert(id, type.lower(), data)
        if response is not None:
            return jsonify({"response": response})
        else:
            api.abort(401, "Something went wrong")

    def patch(self, type, id):
        data = request.get_json()
        response = update(id, type.lower(), data)
        if response is not None:
            return jsonify({"response": response})
        else:
            api.abort(401, "Something went wrong")
