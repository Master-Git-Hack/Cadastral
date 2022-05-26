"""File to append Namespaces to the app"""
from .... import api
from .models import Namespaces
from .routes import *

api.add_namespace(Namespaces.auth)
api.add_namespace(Namespaces.user)
