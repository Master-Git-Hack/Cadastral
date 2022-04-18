from Cadastral import app
import Cadastral.apps.homologation.views


@app.route("/", methods=["GET"])
def index():
    return "Hello World", 201
