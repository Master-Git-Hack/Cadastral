from app.config import HOMOLOGATIONS_PATH, MODELS_PATH, DBNAME, DBPASSWORD, DBUSER, DBHOST, DBPORT
from psycopg2 import connect, DatabaseError, extensions
from psycopg2.extras import RealDictCursor
from jinja2 import Template
from json import dumps
class Homologation():
    def __init__(self,id, type):
        self.id = id
        self.type = type

    def checkPollStatus(self, connection):
        """
            extensions.POLL_ERROR == -1
            extensions.POLL_OK == 0
            extensions.POLL_READ == 1
            extensions.POLL_WRITE == 2
        """
        if connection.poll() == extensions.POLL_OK:
            return 0
        if connection.poll() == extensions.POLL_READ:
            return 1
        if connection.poll() == extensions.POLL_WRITE:
            return 2
        if connection.poll() == extensions.POLL_ERROR:
            return -1
    
    def query(self, query, insert = False):
        if DBHOST is not None and DBUSER is not None and DBPASSWORD is not None and DBPASSWORD is not None:
            try:
                with connect(host=DBHOST, port=DBPORT, dbname=DBNAME, user=DBUSER, password=DBPASSWORD) as connection:
                    if connection is not None:
                        with connection.cursor(cursor_factory = RealDictCursor) as cursor:
                            cursor.execute(query)
                            if insert:
                                connection.commit()
                                response = self.checkPollStatus(connection)
                                return response
                            else:
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
        query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/getHomologation.sql").read()).render(REGISTRATION=registration, TYPE=self.type.lower())
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

    def insertHomologation(self,factors,result,averageUnitCost,registration,appraisalPurpose):
        query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/postHomologation.sql").read()).render(
            TIPO=self.type,
            FACTORES=dumps(factors),
            RESULTADO=dumps(result),
            VALOR_UNITARIO=averageUnitCost,
            REGISTRO = registration,
            TIPO_SERVICIO = appraisalPurpose
            )
        return self.query(query,True)

    def patchHomologation(self,id,factors,result,averageUnitCost,registration,appraisalPurpose):
        
        query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/patchHomologation.sql").read()).render(
        ID=id,
        TIPO=self.type.lower(),
        FACTORES=dumps(factors),
        RESULTADO=dumps(result),
        VALOR_UNITARIO=averageUnitCost,
        REGISTRO = registration,
        TIPO_SERVICIO = appraisalPurpose
        )
        return self.query(query,True)

    def updateJustipreciacion(self,averageUnitCost):
        averageUnitCost = averageUnitCost if averageUnitCost is not None else 0
        if(self.type =="TERRENO"):
            query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/patchJustipreciacionTerreno.sql").read()).render(
                ID=self.id,
                VALOR_UNITARIO=averageUnitCost 
            )
        else:
            query = Template(open(f"{HOMOLOGATIONS_PATH}{MODELS_PATH}/patchJustiPreciacionRenta.sql").read()).render(
                ID=self.id,
                COMPARATIVO_MERCADO=averageUnitCost
            )
        return self.query(query,True)
