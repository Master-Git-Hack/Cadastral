from app import app
from app.config import API_URL, API_ENV, TEMPORARY_PATH, TEMPLATE_PATH
from flask import request, jsonify

@app.route(f"{API_URL}/HOMOLOGATION/j-appreciation/<int:id>", methods=['PATCH'])
def update_jAppreciation(id):
    data = request.get_json()
    type = data['type']
    value = data['value']
    

