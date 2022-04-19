from regex import P
from Cadastral.apps.reports.models.catastral import (
    Catastral,
    manyCatastralSchema,
    session,
)
from Cadastral.apps.reports.models.dep_solicitante import DepSolicitante
from Cadastral.apps.reports.models.municipios import Municipios


def check(collection, begin, end, year):
    return manyCatastralSchema.dump(
        Catastral.query.filter(Catastral.estatus != 0)
        .filter(
            Catastral.registro.between(
                f"{collection}-{begin}_{year}", f"{collection}-{end}_{year}"
            )
        )
        .order_by(Catastral.registro)
        .all()
    )


def get(data):
    records = check(
        collection=data["collection"],
        begin=data["begin"],
        end=data["end"],
        year=data["year"],
    )
    for r in records:
        print(
            session.query(Catastral, DepSolicitante, Municipios)
            .join(DepSolicitante)
            .join(Municipios)
        )
    return get
