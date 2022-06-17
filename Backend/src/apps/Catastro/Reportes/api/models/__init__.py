from flask_restx import Namespace, fields
from flask_restx.fields import Boolean, Float, Integer, List, Nested, String


class Reportes:
    ns = Namespace("CATASTRAL/Reportes", description="Catastro/Reportes")
    model = ns.model(
        "Reportes",
        dict(
            id=Integer(),
            files=List(fields.String()),
            limits=Nested(
                ns.model(
                    "Limits",
                    dict(
                        min=Integer(),
                        max=Integer(),
                    ),
                )
            ),
            collection=String(),
            year=Integer(),
            zoom=Float(),
            watermark=Boolean(),
            moreProperties=Nested(
                ns.model(
                    "More Properties",
                    dict(
                        pageSize=String(),
                        dpi=Integer(),
                        margins=Nested(
                            ns.model(
                                "Margins",
                                dict(
                                    top=Float(),
                                    bottom=Float(),
                                    left=Float(),
                                    right=Float(),
                                ),
                            )
                        ),
                    ),
                )
            ),
        ),
    )
