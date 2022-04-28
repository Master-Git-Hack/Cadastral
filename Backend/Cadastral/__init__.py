from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restx import Api
from flask_cors import CORS
from flask import Flask

from Cadastral.config import (
    DBENGINE,
    DBNAME,
    DBUSER,
    DBPASSWORD,
    DBHOST,
    DBPORT,
    CORSSRC,
    API_URL,
    TEMPLATE_PATH
)


app = Flask(__name__)
app.template_folder=f"{app.root_path}/{TEMPLATE_PATH}"

app.config["JSON_AS_ASCII"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"{DBENGINE}://{DBUSER}:{DBPASSWORD}@{DBHOST}:{DBPORT}/{DBNAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


cors = CORS(app, resources=CORSSRC)
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app, 
    prefix = API_URL,
    doc="/docs",
    title="Cadastral API",
    description="API para el manejo de datos de la aplicación de Catastro, para mayor información contacta a Einar Jhordany Serna Valdivia <eserna@guanajuato.gob.mx>",
    version="1.0.0.1",
    ordered=True,
    contact="Einar Jhordany Serna Valdivia <eserna@guanajuato.gob.mx>"
)

import Cadastral.routes
