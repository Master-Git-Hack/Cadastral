from .. import config
from ..main import app
from .oauth import oauth2
from .catastral import catastral

# from ..middlewares.database import InstanceDB


app.include_router(oauth2, prefix=config.API.get("url_prefix", "/api/v1"))
app.include_router(catastral, prefix=config.API.get("url_prefix", "/api/v1"))
