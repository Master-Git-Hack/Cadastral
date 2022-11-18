"""Handle decimal encoding and decoding."""
from decimal import Decimal
from json import JSONEncoder


class DecimalParser(JSONEncoder):
    """class DecimalParser to parse Decimal objects to JSON
    Args:
        JSONEncoder (json.JSONEncoder): JSONEncoder class
    Attributes:
        default (method): method to parse Decimal objects to JSON
    """

    def default(self, o) -> JSONEncoder:
        """method to parse Decimal objects to JSON
        Args:
            o (object): object to be parsed
        Returns:
            response (JSONEncoder.default): JSONEncoder.default response object\
 with Decimal objects parsed
        """
        if isinstance(o, Decimal):
            return str(o)
        return JSONEncoder.default(self, o)
