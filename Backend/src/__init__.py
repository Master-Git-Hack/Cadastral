# from logging import DEBUG, ERROR, INFO, Formatter
from logging.handlers import SMTPHandler

from flasgger import Swagger
from flask import Flask
from flask_cors import CORS

from .config import Config

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
    db.init_app(context)
    ma.init_app(context)
    # config.no_db.init_app(context)
    cors.init_app(context, **config.CORS_SRC)
    config.admin.init_app(context)
    return context


app: Flask = init_app()

with app.app_context():
    from .models import Modelos

    db.create_all()


from .api import api

app.register_blueprint(api)
swagger = Swagger(app)


# app.logger.addHandler(mail_handler)
# if not app.debug:
#     ...
