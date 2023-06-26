from flasgger import Swagger
from flask import Flask
from flask_cors import CORS

from .config import Config

config = Config()
cors = CORS()
db = config.db
ma = config.ma


def init_app():
    context = Flask(__name__)
    context.config.from_object(config)
    config.bcrypt.init_app(context)
    db.init_app(context)
    ma.init_app(context)
    # config.no_db.init_app(context)
    cors.init_app(context, **config.CORS_SRC)
    return context


app: Flask = init_app()
with app.app_context():
    from .models import Modelos

    db.create_all()

from .api import api

app.register_blueprint(api)
swagger = Swagger(app)
