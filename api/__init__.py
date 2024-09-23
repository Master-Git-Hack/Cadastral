from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import Config

config = Config()
from .middlewares import Middlewares

middlewares = Middlewares()

database = middlewares.INSTANCE()


def create_app() -> FastAPI:
    """Configure the app"""

    current_app = FastAPI(
        **config.API,
    )
    current_app.add_middleware(
        CORSMiddleware,
        **config.CORS,
    )

    return current_app
