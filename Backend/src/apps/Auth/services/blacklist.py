from typing import Dict, Tuple

from .... import db
from ..models.blacklist import BlacklistToken


def save_token(token: str) -> Tuple[Dict, int]:
    """
    This method logs out the user
    Args:
        token (str): token to be blacklisted
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    blacklist_token = BlacklistToken(token=token)
    try:
        db.session.add(blacklist_token)
        db.session.commit()
        response = {"status": "success", "message": "Successfully logged out."}
        return response, 201
    except Exception as e:
        print(e)
        response = {"status": "fail", "message": f"Try again: {e}"}
        return response, 401
