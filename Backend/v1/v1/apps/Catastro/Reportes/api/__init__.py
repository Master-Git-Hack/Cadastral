"""File to append Namespaces to the app"""
from ..... import api
from .models import Reportes
from .routes import *

api.add_namespace(Reportes.ns)
