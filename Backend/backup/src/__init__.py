# from logging import DEBUG, ERROR, INFO, Formatter
from logging.config import dictConfig
from logging.handlers import SMTPHandler

import flask_monitoringdashboard as dashboard
from flasgger import Swagger
from flask import Flask, current_app
from flask_cors import CORS
from werkzeug.local import LocalProxy

from .config import Config

# dictConfig(
#     {
#         "version": 1,
#         "formatters": {
#             "default": {
#                 "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
#             }
#         },
#         "handlers": {
#             "wsgi": {
#                 "class": "logging.StreamHandler",
#                 "stream": "ext://flask.logging.wsgi_errors_stream",
#                 "formatter": "default",
#             }
#         },
#         "root": {"level": "INFO", "handlers": ["wsgi"]},
#     }
# )


config = Config()
cors = CORS()
db = config.db
ma = config.ma

# mail_handler = SMTPHandler(
#     mailhost=("smtp.gmail.com", 587),
#     fromaddr=config.MAIL_USERNAME,
#     toaddrs=[config.MAIL_USERNAME],
#     subject="Error en la aplicación",
#     credentials=(config.MAIL_USERNAME, config.MAIL_PASSWORD),
# )
# mail_handler.setLevel(DEBUG)
# mail_handler.setFormatter(
#     Formatter("[%(asctime)s] %(levelname)s in %(module)s: %(message)s")
# )


def init_app():
    context = Flask(__name__)
    context.config.from_object(config)
    config.bcrypt.init_app(context)
    # db.init_app(context)
    ma.init_app(context)
    # config.no_db.init_app(context)
    cors.init_app(context, **config.CORS_SRC)
    config.admin.init_app(context)
    config.auth_manager.init_app(context)
    return context


app: Flask = init_app()
dashboard.bind(app)
# with app.app_context():
#     from .models import Modelos

#     db.catastro_v2.create_models()
#     db.valuaciones.create_models()
#     # db.catastro_v2.close_session()
#     # db.valuaciones.close_session()
logger = LocalProxy(lambda: app.logger)

from .api import api

app.register_blueprint(api)
swagger = Swagger(app)


# app.logger.addHandler(mail_handler)
# if not app.debug:
#     ...
