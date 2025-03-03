from fastapi import APIRouter, Depends
from sqlmodel import Session, text

from .. import config, database, middlewares

__response = middlewares.RESPONSES()

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
        query = text("SELECT tasa_capitalizacion FROM tasa_capitalizacion(:inmueble, :edad);").bindparams(inmueble=inmueble, edad=edad)
        result = db.exec(query).scalar_one_or_none()

        if result is None:
            return __response.error(message="No se encontró la tasa de capitalización")

        return __response.success(data={"tasa_capitalizacion": result})

    except Exception as e:
        print(f"Error on custom function get_tasa_capitalizacion: {str(e)}")
        return __response.error(message=str(e))
