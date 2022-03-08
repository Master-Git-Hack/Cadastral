from app import app
from app.config import API_URL, API_ENV, TEMPORARY_PATH, TEMPLATE_PATH
from os.path import exists
from os import remove
from flask import after_this_request, request, send_file
from app.apps.cadastral.appraisal.controllers import Controller
@app.route(f"{API_URL}/APPRAISAL/report/collection", methods=['POST'])
def generate_report():
    data = request.get_json()
    appraisal = Controller(
        collection = data['collection'],
        year = data['year'],
        start = data['limits']['min'],
        end = data['limits']['max'],
        zoom = data['zoom'],
        page_size = data['moreProperties']['page_size'],
        margins = data['moreProperties']['margins'],
        dpi = data['moreProperties']['dpi']
    )
    file=f"{TEMPORARY_PATH}/{data['filename']}"
    appraisal.create_report(filename = file, withWatermark = data['watermark'])
    if exists(file):
        return send_file(file,  mimetype='application/pdf', as_attachment=True, attachment_filename = data['filename']), 200
    else:
        if API_ENV == 'development':
            print(f"Someting Failed with the report generation: {data['filename']}")
            return send_file(f"{TEMPLATE_PATH}/_blank.pdf",  mimetype='application/pdf', as_attachment=True, attachment_filename = "_blank.pdf"), 418
        else:
            return 404

@app.route(f"{API_URL}/APPRAISAL/report/merge", methods=['POST'])
def merge_reports():
    data = request.get_json()
    data = [f"{TEMPORARY_PATH}/{file}" for file in data['files']]
    appraisal = Controller()
    file = appraisal.merge_reports(collection=data)
    @after_this_request
    def cleanup(response):
        for _file in data:
            if exists(_file):
                remove(_file)
        remove(file)
        return response
    return send_file(file,  mimetype='application/pdf', as_attachment=True, attachment_filename = file.split(TEMPORARY_PATH)[1]), 200