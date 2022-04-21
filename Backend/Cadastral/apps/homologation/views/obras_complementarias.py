from Cadastral import app
from Cadastral.config import API_URL
from flask import request, jsonify
from Cadastral.apps.homologation.controllers.obras_complementarias import (
    getByRegister,
    create,
    insert,
    update,
)


@app.route(f"{API_URL}/HOMOLOGATION/OC/<int:id>", methods=["GET"])
def getObrasComplementarias(id):
    response = create(id)
    if response is not None:
        return jsonify({"response": response}), 201
    else:
        return jsonify({"response": "failed"}), 401


@app.route(f"{API_URL}/HOMOLOGATION/OC/<int:id>", methods=["POST"])
def postObrasComplementarias(id):
    data = request.get_json()
    response = insert(id, data)
    if response is not None:
        return jsonify({"response": response}), 201
    else:
        return jsonify({"response": "failed"}), 401


@app.route(f"{API_URL}/HOMOLOGATION/OC/<int:id>", methods=["PATCH"])
def patchObrasComplementarias(id):
    data = request.get_json()
    response = update(id, data)
    if response is not None:
        return jsonify({"response": response}), 201
    else:
        return jsonify({"response": "failed"}), 401
