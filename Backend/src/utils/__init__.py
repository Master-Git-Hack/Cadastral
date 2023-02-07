"""Handle all the utilities for the application."""
from .decimals import DecimalParser as _DecimalParser
from .password import Password as _Password


class Utils:
    """class Utils to handle all the utilities for the application.
    Attributes:
        Password (class): Password class.
        DecimalEncoder (class): DecimalEncoder class.
    """

    DecimalParser = _DecimalParser
    Password = _Password
