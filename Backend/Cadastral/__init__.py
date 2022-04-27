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
)


app = Flask(__name__)


app.config["JSON_AS_ASCII"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"{DBENGINE}://{DBUSER}:{DBPASSWORD}@{DBHOST}:{DBPORT}/{DBNAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


cors = CORS(app, resources=CORSSRC)
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app, prefix = API_URL,doc="/docs")


import Cadastral.routes
