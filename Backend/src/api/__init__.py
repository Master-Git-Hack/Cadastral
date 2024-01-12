from fastapi import Depends, Request
from fastapi.responses import RedirectResponse
from fastapi_jwt_auth.exceptions import AuthJWTException

from .. import app, config, logger

# from ..middlewares.database import InstanceDB
from ..middlewares.responses import Responses as __Responses


@app.exception_handler(AuthJWTException)
async def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    __response = __Responses()
    logger.bind(payload=await request.json()).debug(
        f"----------> Unexpected error:\n {str(exc)}"
    )
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


from .auth import auth

app.include_router(auth, prefix=config.API_URL_PREFIX)

from .checklist import checklist

app.include_router(checklist, prefix=config.API_URL_PREFIX)

from .db_info import db_info

app.include_router(db_info, prefix=config.API_URL_PREFIX)

from .metadatos import metadatos

app.include_router(metadatos, prefix=config.API_URL_PREFIX)

from .parser import parser

app.include_router(parser, prefix=config.API_URL_PREFIX)