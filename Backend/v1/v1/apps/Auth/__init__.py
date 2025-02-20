from functools import wraps
from typing import Callable

from flask import request

from .helpers import Auth


def token_required(f) -> Callable:
    """decorator to protect routes

    Args:
        f (_type_): function to decorate

    Returns:
        Callable: decorated function
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        data, status = Auth.get_logged_in_user(request)
        token = data.get("data")

        if not token:
            return data, status

        return f(*args, **kwargs)

    return decorated


def admin_token_required(f) -> Callable:
    """decorator to protect routes for admin
    Args:
        f (_type_): function to decorate with admin validation

    Returns:
        Callable: decorated function
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        data, status = Auth.get_logged_in_user(request)
        token = data.get("data")
        if not token:
            return data, status
        admin = token.get("admin")
        if not admin:
            response_object = {"status": "fail", "message": "admin token required"}
            return response_object, 401

        return f(*args, **kwargs)

    return decorated
