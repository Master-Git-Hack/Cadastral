from fastapi import Depends, Request
from fastapi.responses import RedirectResponse
from fastapi_jwt_auth.exceptions import AuthJWTException

from .. import app, config

# from ..middlewares.database import InstanceDB
from ..middlewares.responses import Responses as __Responses


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    __response = __Responses()
    return __response.error(
        status_code=exc.status_code,
        message=exc.message,
    )


# idb = InstanceDB()


@app.get("/")
def redirect_root_to_docs(
    # db=Depends(lambda db_name="catastro_v2": idb.get_db(db_name)),
):
    # print(
    #     idb.execute_query(
    #         "catastro_v2", "SELECT schema_name FROM information_schema.schemata;"
    #     )
    # )

    return RedirectResponse(url="/docs", status_code=303)


from .auth import api_auth

app.include_router(api_auth, prefix=config.API_URL_PREFIX)
