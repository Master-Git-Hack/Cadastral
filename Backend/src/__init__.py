"""Principal File to handle the app"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware


from .config import Config
from .utils.password import Password

config = Config()
secure = Password()


def create_app() -> FastAPI:
    """Configure the app"""
    current_app = FastAPI(
        title=config.TITLE, version=config.VERSION, description=config.DESCRIPTION
    )
    current_app.add_middleware(
        CORSMiddleware,
        allow_origins=config.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["authorization", "token"],
    )
    current_app.add_middleware(
        DBSessionMiddleware, db_url=config.SQLALCHEMY_DATABASE_URL
    )
    return current_app


# Definition of the app
app = create_app()


from .api import *
