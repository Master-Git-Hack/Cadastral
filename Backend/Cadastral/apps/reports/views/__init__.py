from Cadastral import app
from Cadastral.config import API_URL, TEMPORARY_PATH, TEMPLATE_PATH
from flask import request, jsonify, send_file
from Cadastral.apps.reports.controllers import create


@app.route(f"{API_URL}/REPORTS/APPRAISAL/<string:filename>", methods=["GET"])
def getAppraisal(filename):
    response = create(
        {
            "collection": "0003",
            "limits": {"min": "01", "max": "03"},
            "year": "22",
            "zoom": 1,
            "moreProperties": {
                "pageSize": "A4",
                "margins": {"top": 10, "bottom": 10, "left": 10, "right": 10},
                "dpi": 300,
            },
            "watermark": False,
            "filename": f"{app.root_path}{TEMPORARY_PATH}/{filename}",
        }
    )

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
    data = request.get_json()
    response = create(data)
    if response is not None:
        return (
            send_file(
                response,
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
