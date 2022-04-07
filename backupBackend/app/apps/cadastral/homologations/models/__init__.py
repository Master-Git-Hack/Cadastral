from app.config import HOMOLOGATIONS_PATH, MODELS_PATH
from app.utils.BD import DBOperations as DBO
from jinja2 import Template
from json import dumps


class Homologation:
    def __init__(self, id, type):
        self.id = id
        self.type = type.lower()
        self.dbo = DBO()
        self.path = f"{HOMOLOGATIONS_PATH}{MODELS_PATH}"

    def getDistrictIndicators(self):
        template = open(f"{self.path}/getIndicadoresMunicipales.sql")
        query = Template(template.read())
        return self.dbo.get(query.render())

    def getJustipreciacion(self):
        if self.type == "RENTA":
            template = open(f"{self.path}/getJustipreciacionRenta.sql")
        else:
            template = open(f"{self.path}/getJustipreciacionTerreno.sql")
        query = Template(template.read())
        return self.dbo.get(query.render(ID=self.id))

    def getHomologation(self, registration):
        template = open(f"{self.path}/getHomologation.sql").read()
        template = Template(template)
        query = template.render(REGISTRATION=registration, TYPE=self.type)
        return self.dbo.get(query)

    def insert(self, factors, homologation, averageUnitCost, registration, appraisalPurpose):
        template = open(f"{self.path}/postHomologation.sql").read()
        query = Template(template).render(
            ID=self.id,
            TIPO=self.type,
            FACTORES=factors,
            RESULTADO=homologation,
            VALOR_UNITARIO=averageUnitCost,
            REGISTRO=registration,
            TIPO_SERVICIO=appraisalPurpose,
        )
        return self.dbo.set(query)

    def insertHomologation(self, factors, result, averageUnitCost, registration, appraisalPurpose):
        template = open(f"{self.path}/postHomologation.sql").read()
        query = Template(template).render(
            TIPO=self.type,
            FACTORES=dumps(factors),
            RESULTADO=dumps(result),
            VALOR_UNITARIO=averageUnitCost,
            REGISTRO=registration,
            TIPO_SERVICIO=appraisalPurpose,
        )
        return self.dbo.set(query)

    def patchHomologation(self, id, factors, result, averageUnitCost, registration, appraisalPurpose):
        template = open(f"{self.path}/patchHomologation.sql").read()
        query = Template(template).render(
            ID=id,
            TIPO=self.type,
            FACTORES=dumps(factors),
            RESULTADO=dumps(result),
            VALOR_UNITARIO=averageUnitCost,
            REGISTRO=registration,
            TIPO_SERVICIO=appraisalPurpose,
        )
        return self.dbo.set(query)

    def updateJustipreciacion(self, averageUnitCost):
        averageUnitCost = averageUnitCost if averageUnitCost is not None else 0
        if self.type == "TERRENO":
            template = open(f"{self.path}/patchJustipreciacionTerreno.sql")
            template = Template(template.read())
            query = template.render(ID=self.id, VALOR_UNITARIO=averageUnitCost)
        else:
            template = open(f"{self.path}/patchJustiPreciacionRenta.sql")
            template = Template(template.read())
            query = template.render(ID=self.id, COMPARATIVO_MERCADO=averageUnitCost)
        return self.dbo.set(query)
