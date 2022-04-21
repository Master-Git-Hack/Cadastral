from Cadastral import app
import Cadastral.apps.reports.views
import Cadastral.apps.homologation.views
import Cadastral.apps.homologation.views.obras_complementarias


@app.route("/", methods=["GET"])
def index():
    return "Hello World", 201
