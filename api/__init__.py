from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis import Redis
from slowapi import Limiter
from slowapi.util import get_remote_address

from .config import Config

config = Config()
from .middlewares import Middlewares

middlewares = Middlewares()

database = middlewares.INSTANCE()
cache = Redis(**config.REDIS)
limiter = Limiter(key_func=get_remote_address)


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
