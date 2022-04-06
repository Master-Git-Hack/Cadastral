from app import app
from app.config import API_URL, API_ENV, TEMPORARY_PATH, TEMPLATE_PATH
from flask import request, jsonify
from json import dumps
from app.apps.cadastral.homologations.controllers import Controller


@app.route(f"{API_URL}/HOMOLOGATION/<string:type>/<int:id>", methods=["POST"])
def postRegular(id, type):
    data = request.get_json()
    with open(f"{id}-{type}.json", "w") as file:
        file.write(dumps(data, indent=4, sort_keys=True))
    control = Controller(id, type)

    exists = data["exists"]
    if exists:
        record = data["record"]
    else:
        record = None
    factors = data["factors"]
    result = data["homologation"]
    averageUnitCost = data["averageUnitCost"]
    registration = data["registration"]
    appraisalPurpose = data["appraisalPurpose"]
    response = control.patch(record, exists, factors, result, averageUnitCost, registration, appraisalPurpose)
    if response != -1:
        return jsonify({"response": response}), 200
    else:
        return jsonify({"response": response}), 400


@app.route(f"{API_URL}/HOMOLOGATION/<string:type>/<int:id>", methods=["GET"])
def getRegular(id, type):
    data = Controller(id, type)
    response = data.get()
    return jsonify({"response": response}), 200
