"""controller methods to work with the auth model"""
from datetime import datetime
from typing import Tuple
from uuid import uuid4

from .... import db
from ..models import User


def save_new_user(data: dict) -> Tuple[dict, int]:
    """Save New User Method

    Args:
        data (dict): from request, recovered from json

    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        new_user = User(
            public_id=str(uuid4()),
            email=data["email"],
            username=data["username"],
            password=data["password"],
            registered_on=datetime.utcnow(),
        )
        save_changes(new_user)
        response = {"status": "success", "message": "Successfully registered."}
        return response, 201
    else:
        response = {
            "status": "fail",
            "message": "User already exists. Please Sign in.",
        }
        return response, 409


def get_all_users():
    """Get All Users Method

    Returns:
        users (User): list of users
    """
    return User.query.all()


def get_user(public_id: str):
    """Get User by Public Id Method
    Args:
        public_id (str): public id of the user

    Returns:
        user (User): user object
    """
    return User.query.filter_by(public_id=public_id).first()


def save_changes(data: User) -> None:
    """Save Changes Method
    Args:
        data (User): user object
    """
    db.session.add(data)
    db.session.commit()
