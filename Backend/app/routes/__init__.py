from app import app
import app.apps.cadastral.appraisal.views as appraisal_views
#from app.apps.cadastral.homologations import views
@app.route('/')
def index():
    return "Hello, World!", 418