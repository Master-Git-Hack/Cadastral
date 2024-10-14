from fastapi import Request
from fastapi.responses import RedirectResponse
from slowapi.errors import RateLimitExceeded
from starlette.responses import JSONResponse

from . import create_app

app = create_app()


from .routes import *


@app.get("/", include_in_schema=False)
@app.get("/api", include_in_schema=False)
def redirect_root_to_docs():
    return RedirectResponse(url="/docs", status_code=303)


@app.exception_handler(RateLimitExceeded)
async def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded. Try again later."},
    )


# def get_db(schema: str):
#     instance = Instance()
#     return next(instance.get_db(schema))


# def get_engine(schema: str):
#     instance = Instance()
#     return instance.ENGINES[schema]


# inst = Instance()


# @app.get("/usuarios")
# async def get_users(session=Depends(inst.valuaciones)):
#     with session:
#         users = session.exec(select(Usuario)).all()
#         return users


# @app.get("/usuarios")
# async def get_users(schema: str = "valuaciones", session=Depends(get_db)):
#     with session:
#         users = session.exec(select(Usuario)).all()
#         return users
