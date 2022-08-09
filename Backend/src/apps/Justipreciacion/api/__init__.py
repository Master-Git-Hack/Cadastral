"""File to append Namespaces to the app"""
from .... import api
from .models import Namespaces
from .routes import *

api.add_namespace(homologacion)
api.add_namespace(js)
api.add_namespace(Namespaces.costos_construccion)
