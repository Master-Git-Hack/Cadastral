from ast import Not
from app.apps.cadastral.homologations.models import Homologation
from app.config import HOMOLOGATIONS_PATH, MODELS_PATH
from json import load
class Controller:
    def __init__(self,id,type):
        self.id = id
        self.type = type

    def get(self):
        homologation = Homologation(self.id,self.type)
        districtIndicators = homologation.getDistrictIndicators()
        districtIndicators = [{
            "id":district["id"],
            "district":district["municipio"],
            "totalPopulation":district["poblacion_total"],
            "percentage":district["porcentaje"],
            "populationDensity":district["densidad_poblacion"],
            "economicallyActivePopulation":district["pob_econom_activa"],
            "inhabitedDwellings":district["viviendas_habitadas"],
            "annualCensus":district["anualidad_censo"],

        } for district in districtIndicators]
        responseJustipreciacion = homologation.getJustipreciacion()
        registration = responseJustipreciacion[0]['registro']
        responseHomologation = homologation.getHomologation(registration)
        if(len(responseHomologation)>0):
            return {
                'exists':True,
                'record':responseHomologation[0]['id'],
                'type':responseHomologation[0]['tipo'],
                'factors':responseHomologation[0]['factores'],
                'homologation':responseHomologation[0]['resultado'],
                'averageUnitCost':responseHomologation[0]['valor_unitario'],
                'registration':responseHomologation[0]['registro'],
                'appraisalPurpose':responseHomologation[0]['tipo_servicio'],
                 'districtOptions':districtIndicators
               
            }
        else:
            data = {
                'exists':False,
                'type':self.type,
                'registration':registration,
                'districtOptions':districtIndicators,
                'areas':{
                    'subject':{
                        'value':responseJustipreciacion[0]['superficie'] if responseJustipreciacion[0]['superficie'] is not None else 1
                    }
                },

            }
            if self.type == "TERRENO":
                data['reFactor']={
                    'data': responseJustipreciacion[0]['factor'] if responseJustipreciacion[0]['factor'] is not None else 1
                }
            else:
                data['ages']={
                    'subject':{
                        'value': responseJustipreciacion[0]['edad'] if responseJustipreciacion[0]['edad'] is not None else 1
                    }
                }
            return data
    
    def patch(self,record, exists,factors,results,averageUnitCost,registration,appraisalPurpose):
        homologation = Homologation(self.id,self.type)
        if exists:
            response = homologation.patchHomologation(record,factors,results,averageUnitCost,registration,appraisalPurpose)
        else:
            response = homologation.insertHomologation(factors,results,averageUnitCost,registration,appraisalPurpose)
        if response != -1:
            response = homologation.updateJustipreciacion(averageUnitCost)
            if response != -1:
                return response
            else:
                return response
        else: 
            return response
        




