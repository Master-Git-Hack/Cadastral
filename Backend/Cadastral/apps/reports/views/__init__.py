from Cadastral import app
from Cadastral.config import API_URL, TEMPORARY_PATH, TEMPLATE_PATH
from flask import request, send_file, after_this_request
from Cadastral.apps.reports.controllers import create, merge
from os.path import exists
from os import remove


@app.route(f"{API_URL}/REPORTS/APPRAISAL/<string:filename>", methods=["POST"])
def getAppraisal(filename):
    data = request.get_json()
    data["filename"] = f"{app.root_path}{TEMPORARY_PATH}/{filename}"
    response = create(data)

    if response is not None:
        return (
            send_file(
                response,
                mimetype="application/pdf",
                as_attachment=True,
                attachment_filename=filename,
            ),
            201,
        )
    else:
        path = f"{app.root_path}{TEMPLATE_PATH}"
        return (
            send_file(
                f"{path}/_blank.pdf",
                mimetype="application/pdf",
                as_attachment=True,
                attachment_filename=filename,
            ),
            401,
        )


@app.route(f"{API_URL}/REPORTS/APPRAISAL/MERGE", methods=["POST"])
def mergeReports():
    @after_this_request
    def cleanup(response):
        for _file in data:
            _File = f"{app.root_path}{TEMPORARY_PATH}/{_file}"
            if exists(_File):
                remove(_File)
            remove(file)
        return response

    data = request.get_json()
    files = []
    for current in data["files"]:
        files.append(f"{app.root_path}{TEMPORARY_PATH}/{current}")

    file = merge(files)

    if file is not None:
        return (
            send_file(
                file,
                mimetype="application/pdf",
                as_attachment=True,
                attachment_filename="merge.pdf",
            ),
            201,
        )
    else:
        path = f"{app.root_path}{TEMPLATE_PATH}"
        return (
            send_file(
                f"{path}/_blank.pdf",
                mimetype="application/pdf",
                as_attachment=True,
                attachment_filename="merge.pdf",
            ),
            401,
        )
