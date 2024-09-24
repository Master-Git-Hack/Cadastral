from . import create_app

app = create_app()


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
