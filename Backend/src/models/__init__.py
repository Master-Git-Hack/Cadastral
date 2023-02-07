"""
Appends models into a single object and creates the models in the database.

"""
from sqladmin import ModelView

from ..middlewares.database import admin
from .catastral import Catastral as _Catastral
from .costos_construccion import CostosConstruccion as _CostosConstruccion
from .dep_solicitante import DepSolicitante as _DepSolicitante
from .homologacion import Homologation as _Homologation
from .indicadores_municipales import IndicadoresMunicipales as _IndicadoresMunicipales
from .justipreciacion import Justipreciacion as _Justipreciacion

# from .logged_actions import LoggedActions as _LoggedActions
from .municipios import Municipios as _Municipios
from .obras_complementarias import ObrasComplementarias as _ObrasComplementarias


class Models:
    """class Models is a container for all the models in the database.
    Attributes:
        Catastral (class): Catastral model.
        CostosConstruccion (class): CostosConstruccion model.
        DepSolicitante (class): DepSolicitante model.
        Homologacion (class): Homologacion model.
        IndicadoresMunicipales (class): IndicadoresMunicipales model.
        Municipios (class): Municipios model.
        ObrasComplementarias (class): ObrasComplementarias model.

    """

    Justipreciacion = _Justipreciacion
    Catastral = _Catastral
    CostosConstruccion = _CostosConstruccion
    DepSolicitante = _DepSolicitante
    Homologacion = _Homologation
    IndicadoresMunicipales = _IndicadoresMunicipales
    Municipios = _Municipios
    ObrasComplementarias = _ObrasComplementarias
    # LogeedActions = _LoggedActions


class _CatastralAdmin(ModelView, model=Models.Catastral.Table):
    pass


class _CostosConstruccionAdmin(ModelView, model=Models.CostosConstruccion.Table):
    pass


class _DepSolicitanteAdmin(ModelView, model=Models.DepSolicitante.Table):
    pass


class _HomologacionAdmin(ModelView, model=Models.Homologacion.Table):
    pass


class _IndicadoresMunicipalesAdmin(
    ModelView, model=Models.IndicadoresMunicipales.Table
):
    pass


class _MunicipiosAdmin(ModelView, model=Models.Municipios.Table):
    pass


class _ObrasComplementariasAdmin(ModelView, model=Models.ObrasComplementarias.Table):
    pass


# admin.add_view(_CatastralAdmin)
# admin.add_view(_CostosConstruccionAdmin)
# admin.add_view(_DepSolicitanteAdmin)
# admin.add_view(_HomologacionAdmin)
# admin.add_view(_IndicadoresMunicipalesAdmin)
# admin.add_view(_MunicipiosAdmin)
# admin.add_view(_ObrasComplementariasAdmin)
