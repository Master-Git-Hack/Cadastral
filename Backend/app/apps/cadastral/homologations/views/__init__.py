from app import app
from app.config import API_URL, API_ENV, TEMPORARY_PATH, TEMPLATE_PATH
from flask import request, jsonify
from json import dumps
from app.apps.cadastral.homologations.controllers import Controller
@app.route(f"{API_URL}/HOMOLOGATION/j-appreciation/<string:type>/<int:id>", methods=['PATCH'])
def update_jAppreciation(id,type):
    data = request.get_json()
    with open(f'{id}-{type}.json','w') as file:
        file.write(dumps(data,indent=4,sort_keys=True))
    control = Controller(id,type);
    
    factors = data['factors']
    homologation = data['homologation']
    averageUnitCost = data['averageUnitCost']
    print(data)
    return jsonify({"response":True}), 200
    


@app.route(f"{API_URL}/HOMOLOGATION/j-appreciation/<string:type>/<int:id>", methods=['GET'])
def get_jAppreciation(id,type):
    data = Controller(id,type);
    response = data.get()
    return jsonify({"response":response}), 200