"""Handle API endpoints.\n
Creates rules and endpoints required for the API.
Appends the endpoints to the API router.
"""
from fastapi import Request
from fastapi.responses import RedirectResponse

from .. import app, config
from ..middlewares.responses import Response as _Response
from ..models.catastral import Catastral


@app.route("/")
def index(request: Request):
    """Redirect the user to the App documentation.
    Args:
        request (Request): the request object to be handled
    Returns:
        response (RedirectResponse): the response object
    """
    _url = request.url
    return RedirectResponse(url=f"{_url.scheme}://{_url.hostname}:{_url.port}/docs")


from .catastral import catastral_routes as _catastral_routes
from .costos_construccion import (
    costos_construccion_routes as _costos_construccion_routes,
)
from .dep_solicitante import dep_solicitantes_routes as _dep_solicitantes_routes
from .homologacion import homologation_routes as _homologation_routes
from .indicadores_municipales import (
    indicadores_municipales_routes as _indicadores_municipales_routes,
)
from .justipreciacion import justipreciacion_routes as _justipreciacion_routes
from .logged_actions import logged_actions_routes as _logged_actions_routes
from .municipios import municipios_routes as _municipios_routes
from .obras_complementarias import (
    obras_complementarias_routes as _obras_complementarias_routes,
)

app.include_router(_catastral_routes, prefix=config.API_URL)
app.include_router(_costos_construccion_routes, prefix=config.API_URL)
app.include_router(_dep_solicitantes_routes, prefix=config.API_URL)
app.include_router(_homologation_routes, prefix=config.API_URL)
app.include_router(_indicadores_municipales_routes, prefix=config.API_URL)
app.include_router(_justipreciacion_routes, prefix=config.API_URL)
app.include_router(_logged_actions_routes, prefix=config.API_URL)
app.include_router(_municipios_routes, prefix=config.API_URL)
app.include_router(_obras_complementarias_routes, prefix=config.API_URL)
