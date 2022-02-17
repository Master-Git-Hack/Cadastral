from flask import Flask
from flask_cors import CORS
from app.config import SECRET_KEY, corsSrc


app = Flask(__name__)
app.secret_key = SECRET_KEY
cors = CORS(app, resources = corsSrc)

from app import routes