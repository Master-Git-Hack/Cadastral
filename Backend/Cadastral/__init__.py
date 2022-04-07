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
    IMAGES_PATH,
    TEMPLATE_PATH,
    TEMPORARY_PATH,
    API_URL,
)


app = Flask(__name__)

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"{DBENGINE}://{DBUSER}:{DBPASSWORD}@{DBHOST}:{DBPORT}/{DBNAME}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["IMAGES_PATH"] = join(app.root_path, IMAGES_PATH)
app.config["TEMPLATE_PATH"] = join(app.root_path, TEMPLATE_PATH)
app.config["TEMPORARY_PATH"] = join(app.root_path, TEMPORARY_PATH)
app.config["API_URL"] = API_URL

db = SQLAlchemy(app)
ma = Marshmallow(app)

import Cadastral.routes
