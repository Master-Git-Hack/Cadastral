from fastapi import Depends, Request
from fastapi.responses import RedirectResponse
from fastapi_jwt_auth.exceptions import AuthJWTException

from .. import app, config

# from ..middlewares.database import InstanceDB


@app.get("/")
@app.get("/api")
def redirect_root_to_docs():
    return RedirectResponse(url="/docs", status_code=303)


# from .auth import auth

# app.include_router(auth, prefix=config.API_URL_PREFIX)
