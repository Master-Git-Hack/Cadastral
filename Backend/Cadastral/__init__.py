from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from os.path import join
from Cadastral.config import (
    DBENGINE,
    DBNAME,
    DBUSER,
    DBPASSWORD,
    DBHOST,
    DBPORT,
    CORSSRC,
)


app = Flask(__name__)

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"{DBENGINE}://{DBUSER}:{DBPASSWORD}@{DBHOST}:{DBPORT}/{DBNAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
cors = CORS(app, resources=CORSSRC)
db = SQLAlchemy(app)
ma = Marshmallow(app)

import Cadastral.routes
