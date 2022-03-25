from app import app
import app.apps.cadastral.appraisal.views as appraisalViews
import app.apps.cadastral.homologations.views as homologationsViews


@app.route("/")
def index():
    return "Hello, World!", 418
