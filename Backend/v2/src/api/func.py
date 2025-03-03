from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from .. import database, logger
from ..middlewares import Middlewares as __Middlewares

__response = __Middlewares.Responses()
custom_func = APIRouter(
    prefix="/functions",
    tags=["Custom Functions"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@custom_func.get("/tasa-capitalizacion")
async def get_tasa_capitalizacion(
    inmueble:str,
    edad:int, 
    db: Session = Depends(database.VALUACIONES)
):
    try:
        query = text("SELECT tasa_capitalizacion FROM tasa_capitalizacion(:inmueble, :edad)")
        result = db.execute(query, {"inmueble": inmueble, "edad": edad}).scalar_one_or_none()

        if result is None:
            return __response.error(message="No se encontró la tasa de capitalización")

        return __response.success(data={"tasa_capitalizacion": result})

    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return __response.error(message=str(e))
