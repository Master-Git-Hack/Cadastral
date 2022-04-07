from Cadastral import app
from flask import request, jsonify
from json import dumps
from Cadastral.apps.homologation.controllers import create

API_URL = app.config.get('API_URL')

@app.route(f"{API_URL}/HOMOLOGATION/<string:type>/<int:id>", methods=['GET'])
