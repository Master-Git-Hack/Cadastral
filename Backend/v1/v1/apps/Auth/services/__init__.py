"""File to handle user services"""
from datetime import datetime
from typing import Dict, Tuple
from uuid import uuid4

from .... import db
from ..models import User


def save_new_user(data: Dict) -> Tuple[Dict, int]:
    """
    This method creates a new user
    Args:
        data (dict): from request, recovered from json
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    user = User.query.filter_by(email=data.get("email")).first()
    if not user:
        new_user = User(
            public_id=str(uuid4()),
            email=data["email"],
            username=data["username"],
            password=data["password"],
            registered_on=datetime.now(),
        )
        save_changes(new_user)
        return generate_token(new_user)
    else:
        response = {"status": "fail", "message": "User already exists. Please Sign in."}
        return response, 409


def get_all_users():
    """
    This method returns all users
    Returns:
        users (User): list of users
    """
    return User.query.all()


def get_user(public_id: str):
    """
    This method returns a user given its identifier\
    Args:
        public_id (str): public id of the user
    Returns:
        user (User): user object
    """
    return User.query.filter_by(public_id=public_id).first()


def generate_token(user: User) -> Tuple[Dict[str, str], int]:
    """
    This method generates a token for the user
    Args:
        user (User): user object
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    try:
        auth_token = user.encode_auth_token(user.id)
        response = {
            "status": "success",
            "message": "Successfully logged in.",
            "Authorization": auth_token,
        }
        return response, 201
    except Exception as e:
        print(e)
        response = {
            "status": "fail",
            "message": "Try again, something went wrong. Please try again.",
        }
        return response, 401


def save_changes(data: User) -> None:
    """
    This method saves the changes to the database
    """
    db.session.add(data)
    db.session.commit()
