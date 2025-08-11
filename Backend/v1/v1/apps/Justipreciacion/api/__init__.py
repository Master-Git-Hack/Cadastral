"""File to append Namespaces to the app"""

from .... import api
from .models import Namespaces
from .routes import *
from ..controllers.revisiones import revision_ns

api.add_namespace(homologacion)
api.add_namespace(js)
api.add_namespace(Namespaces.costos_construccion)
api.add_namespace(revision_ns)
