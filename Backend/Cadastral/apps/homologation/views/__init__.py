from Cadastral import app
from Cadastral.config import API_URL
from flask import request, jsonify
from json import dumps
from Cadastral.apps.homologation.controllers import create, insert, update


@app.route(f"{API_URL}/HOMOLOGATION/<string:type>/<int:id>", methods=["GET"])
def getHomologation(id, type):
    response = create(id, type.lower())
    if response is not None:
        return jsonify({"response": response}), 201
    else:
        return jsonify({"response": "failed"}), 401


@app.route(f"{API_URL}/HOMOLOGATION/<string:type>/<int:id>", methods=["POST"])
def postHomologation(id, type):
    data = request.get_json()
    response = insert(id, type.lower(), data)
    if response is not None:
        return jsonify({"response": 1}), 201
    else:
        return jsonify({"response": "failed"}), 401


@app.route(f"{API_URL}/HOMOLOGATION/<string:type>/<int:id>", methods=["PATCH"])
def patchHomologation(id, type):
    data = request.get_json()
    response = update(id, type.lower(), data)
    if response is not None:
        return jsonify({"response": 1}), 201
    else:
        return jsonify({"response": "failed"}), 401
