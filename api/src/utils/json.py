"""Class to parse list or JSON as an Object and work with as in Javascript
"""


class ParseJSONasObject(object):
    """
    Class to parse list or JSON as an Object and work with as in Javascript
    """

    def __init__(self, data=None) -> None:
        """"""
        for key, val in dict(data).items():
            setattr(self, key, self.compute_attr_value(val))

    def compute_attr_value(self, value):
        """Received any value that \
        you need append to the main object, in case that the object will be an \
        instance of a list or a dict, it send it back in a recursive way, \
        until the function returns deepest value.

        Args:
            value (any): any data type that you have in the json
        Returns:
            the deepest value of the object
        """
        if isinstance(value, list):
            return [self.compute_attr_value(x) for x in value]
        elif isinstance(value, dict):
            return ParseJSONasObject(value)
        else:
            return value
