from .. import config
from ..main import app
from .catastral import catastral
from .fotogrametria import fotogrametria
from .oauth import oauth2

# from ..middlewares.database import InstanceDB


app.include_router(oauth2, prefix=config.API.get("url_prefix", "/api/v1"))
app.include_router(catastral, prefix=config.API.get("url_prefix", "/api/v1"))
app.include_router(fotogrametria, prefix=config.API.get("url_prefix", "/api/v1"))
