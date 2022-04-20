from Cadastral import app
from Cadastral.config import API_URL
from flask import request, jsonify
from Cadastral.apps.reports.controllers import check, get


@app.route(f"{API_URL}/REPORTS/APPRAISAL", methods=["GET"])
def getAppraisal():
    get({"collection": "0003", "begin": "01", "end": "03", "year": "22"})
    return jsonify({"response": check("0003", "01", "03", "22")}), 201
