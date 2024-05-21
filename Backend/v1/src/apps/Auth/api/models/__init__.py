"""File to append Models"""
from .auth import auth as auth_namespace
from .auth import model as auth_model
from .user import model as user_model
from .user import user as user_namespace


class Models:
    """Class to append Models"""

    auth = auth_model
    user = user_model


class Namespaces:
    """Class to append Namespaces"""

    auth = auth_namespace
    user = user_namespace
