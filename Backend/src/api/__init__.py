from flask import Blueprint

from .. import config

api: Blueprint = Blueprint("api", __name__, url_prefix=config.API_URL_PREFIX)

# from .module import module
# api.register_blueprint(module)
from .costos_construccion import costos_construccion_api as __cc_api
from .homologacion import homologacion_api as __h_api
from .indicadores_municipales import indicadores_municipales_api as __im_api
from .justipreciacion import justipreciacion_api as __j_api
from .obras_complementarias import obras_complementarias_api as __oc_api
from .reportes_catastrales import reportes_catastrales_api as __rc_api

api.register_blueprint(__cc_api)
api.register_blueprint(__h_api)
api.register_blueprint(__im_api)
api.register_blueprint(__j_api)
api.register_blueprint(__oc_api)
api.register_blueprint(__rc_api)
