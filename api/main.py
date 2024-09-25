from fastapi.responses import RedirectResponse

from . import create_app

app = create_app()


from .routes import *


@app.get("/")
@app.get("/api")
def redirect_root_to_docs():
    return RedirectResponse(url="/docs", status_code=303)


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
