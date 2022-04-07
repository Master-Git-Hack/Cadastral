from Cadastral.apps.homologation.models.justipreciacion import (
    Justipreciacion,
    justipreciacionSchema,
)


def getJustipreciacion(id):
    return Justipreciacion.query.get(id)


def patchJustipreciacion(id):
    return justipreciacionSchema.dump(Justipreciacion.query.get(id))
