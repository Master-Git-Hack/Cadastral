"""Handle elements that require base64 encoding and decoding"""
from base64 import b64decode
from typing import Tuple

from fastapi.security.utils import get_authorization_scheme_param


def get_authorization(data: dict) -> Tuple[str, str]:
    """Get the authorization header.
        Read authorization_scheme and decode it.
    Args:
        data (dict): Data to be parsed
    Returns:
        Tuple[str, str]: Authorization header
    """
    _, param = get_authorization_scheme_param(data)
    decoded = b64decode(param).decode("ascii")
    username, _, password = decoded.partition(":")
    return username, password
