from Cadastral import app
import Cadastral.apps.homologation.views


@app.route("/", Methods=["GET"])
def index():
    return "Hello World", 418
