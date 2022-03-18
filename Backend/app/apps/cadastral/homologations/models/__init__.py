from app.config import HOMOLOGATIONS_PATH, MODELS_PATH, DBNAME, DBPASSWORD, DBUSER, DBHOST, DBPORT
from psycopg2 import connect, DatabaseError
from psycopg2.extras import RealDictCursor
from jinja2 import Template
from json import dumps
class Homologation():
    def __init__(self,id, type):
        self.id = id
        self.type = type
    
    def query(self, query):
        if DBHOST is not None and DBUSER is not None and DBPASSWORD is not None and DBPASSWORD is not None:
            try:
                with connect(host=DBHOST, port=DBPORT, dbname=DBNAME, user=DBUSER, password=DBPASSWORD) as connection:
                    if connection is not None:
                        with connection.cursor(cursor_factory = RealDictCursor) as cursor:
                            cursor.execute(query)

                            return cursor.fetchall()
                    else:
                        return None
            except(Exception, DatabaseError) as e:
                connection = None
                print(e,'fallo collection')
            finally:
                if connection is not None:
                    connection.close()
    def getDistrictIndicators(self):
        query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/getIndicadoresMunicipales.sql").read()).render()
        return self.query(query)

    def getJustipreciacion(self):
        if self.type== "RENTA":
            query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/getJustipreciacionRenta.sql").read()).render(ID=self.id)
        else:
            query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/getJustipreciacionTerreno.sql").read()).render(ID=self.id)
        return self.query(query)
    
    def getHomologation(self,registration):
        query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/getHomologation.sql").read()).render(REGISTRATION=registration, TYPE=self.type)
        return self.query(query)

    def insert(self,factors,homologation,averageUnitCost,registration,appraisalPurpose):
        query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/postHomologation.sql").read()).render(
            ID=self.id,
            TIPO=type,
            FACTORES=factors,
            RESULTADO=homologation,
            VALOR_UNITARIO=averageUnitCost,
            REGISTRO = registration,
            TIPO_SERVICIO = appraisalPurpose
            )
        return self.query(query)

    def updateJustipreciacion(self,averageUnitCost):
        if(self.type =="TERRENO"):
            query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/updateJustipreciacionTerreno.sql").read()).render(
                ID=self.id,
                VALOR_UNITARIO=averageUnitCost
            )
        else:
            query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/updateJustipreciacionRenta.sql").read()).render(
                ID=self.id,
                COMPARATIVO_MERCADO=averageUnitCost
            )
        return self.query(query)
