""""Append methods to use between apps."""
from .Auth import admin_token_required, token_required

# from .Auth.api import *
from .Catastro.Reportes.api import *
from .Justipreciacion.api import *


class Required:
    """Class to access quickly to Auth methods"""

    @staticmethod
    def admin_token(f):
        """Check if user is admin."""
        return admin_token_required(f)

    @staticmethod
    def token(f):
        """Check if user is logged in."""
        return token_required(f)
