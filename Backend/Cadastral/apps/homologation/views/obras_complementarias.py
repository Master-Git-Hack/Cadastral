from flask_restx import Resource, Namespace, fields
from flask import request, jsonify

from Cadastral import api
from Cadastral.apps.homologation.controllers.obras_complementarias import (
    create,
    insert,
    update,
)
from Cadastral.utils.api_documentation import getDocumentation, DictItem

ns = Namespace(
    "Obras Complementarias",
    description="Submodulo de la API para la homologación, enfocada al manejo de obras complementarias",
    path="/HOMOLOGATION/OC",
)

api.add_namespace(ns)

datos = {
    "age": {"factor": 0.1, "value": 1},
    "description": "descripción",
    "id": 1,
    "quantity": {"unity": "unidad", "value": 1.1},
    "stateOfConservationFactor": {"id": 3, "type": "estado", "value": 0.1},
    "type": "Tipo de Análisis",
    "unitCost": {"net": 1.1, "result": 1.1, "value": 1},
    "vut": 1,
}
records = {
    "id": 1,
    "type": "Si el registro es nuevo o existente (requerido solamente en caso de que sea necesario actualizar)",
    "register": "dato obtenido del registro de justipreciacion para identificar la correspondencia",
}
expected = ns.model(
    "Obras Complementarias",
    {
        "record": DictItem(attribute="calling_args", example=records),
        "valor_unitario": fields.Float(example=100.01),
        "datos": fields.List(
            DictItem(attribute="calling_args", example=datos), example=[datos]
        ),
    },
)


@ns.route(
    "/<int:id>",
    doc=getDocumentation(
        {"id": "Id del registro de Justipreciación"}, "HOMOLOGATION/OC/188"
    ),
)
class ObrasComplementarias(Resource):
    @ns.response(201, "Success", expected)
    def get(self, id):
        response = create(id)
        if response is not None:
            return jsonify({"response": response})
        else:
            api.abort(401, "Something went wrong")

    @ns.expect(expected)
    def post(self, id):
        data = request.get_json()
        response = insert(id, data)
        if response is not None:
            return jsonify({"response": response})
        else:
            api.abort(401, "Something went wrong")

    @ns.expect(expected)
    def patch(self, id):
        data = request.get_json()
        response = update(id, data)
        if response is not None:
            return jsonify({"response": response})
        else:
            api.abort(401, "Something went wrong")
