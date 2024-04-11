"""Principal File to handle the app"""
import logging
import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_jwt_auth import AuthJWT

# from fastapi_pagination import add_pagination
from loguru import logger

from .config import Config

# from fastapi_sqlalchemy import DBSessionMiddleware


config = Config()

from .middlewares import Middlewares

Instance = Middlewares.Database.Instance
database = Instance()
logs = Middlewares.Logs


def create_app() -> FastAPI:
    """Configure the app"""
    current_app = FastAPI(
        **config.fastapi_params,
    )
    current_app.add_middleware(
        CORSMiddleware,
        **config.cors_params,
    )
    # current_app.add_middleware(
    #     DBSessionMiddleware, db_url=config.SQLALCHEMY_DATABASE_URL
    # )
    # add_pagination(current_app)
    return current_app


# Definition of the app
app = create_app()
# set loguru format for root logger
logging.getLogger().handlers = [logs.InterceptHandler()]

# set format
logger.configure(
    handlers=[
        {"sink": sys.stdout, "level": logging.DEBUG, "format": logs.format_record}
    ]
)

# Also set loguru handler for uvicorn loger.
# Default format:
# INFO:     127.0.0.1:35238 - "GET / HTTP/1.1" 200 OK
#
# New format:
# 2020-04-18 16:33:49.728 | INFO     | uvicorn.protocols.http.httptools_impl:send:447 - 127.0.0.1:35942 - "GET / HTTP/1.1" 200

# uvicorn loggers: .error .access .asgi
# https://github.com/encode/uvicorn/blob/master/uvicorn/config.py#L243
logging.getLogger("uvicorn.access").handlers = [logs.InterceptHandler()]


@AuthJWT.load_config
def get_config():
    """Load configuration"""
    return config.Settings()


from .api import *
from .middlewares.warnings import *
