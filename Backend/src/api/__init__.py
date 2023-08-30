from apscheduler.schedulers.background import BackgroundScheduler
from flask import Blueprint

from .. import config
from ..utils.tmp import delete_files

__static = config.PATHS.static
api: Blueprint = Blueprint("api", __name__, url_prefix=config.API_URL_PREFIX)

# from .module import module
# api.register_blueprint(module)
from .costos_construccion import costos_construccion_api as __cc_api
from .db_info import db_info as __dbi_api
from .homologacion import homologacion_api as __h_api
from .indicadores_municipales import indicadores_municipales_api as __im_api
from .justipreciacion import justipreciacion_api as __j_api
from .metadatos import metadatos_api as __me_api
from .municipios import municipios_api as __mu_api
from .obras_complementarias import obras_complementarias_api as __oc_api
from .parse import parse_files as __pf_api
from .reportes_catastrales import reportes_catastrales_api as __rc_api

api.register_blueprint(__cc_api)
api.register_blueprint(__h_api)
api.register_blueprint(__im_api)
api.register_blueprint(__j_api)
api.register_blueprint(__me_api)
api.register_blueprint(__mu_api)
api.register_blueprint(__oc_api)
api.register_blueprint(__rc_api)
api.register_blueprint(__pf_api)
api.register_blueprint(__dbi_api)


@api.before_app_request
def start_schedule():
    scheduler = BackgroundScheduler()
    scheduler.add_job(delete_files, "cron", hour=8)  # Programa la tarea para las 8 am
    scheduler.start()
