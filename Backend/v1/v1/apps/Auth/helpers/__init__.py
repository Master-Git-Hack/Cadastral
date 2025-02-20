"""File used to initialize the Auth module, and handle decorators"""

from typing import Dict, Tuple

from ..models import User
from ..services.blacklist import save_token


class Auth:
    @staticmethod
    def login_user(data: Dict[str, str]) -> Tuple[Dict, int]:
        """
        This method login the user and return the access token
        """
        try:
            # fetch the user data
            user = User.query.filter_by(email=data.get("email")).first()
            if user and user.check_password(data.get("password")):
                auth_token = User.encode_auth_token(user.id)
                if auth_token:
                    response = {
                        "status": "success",
                        "message": "Successfully logged in.",
                        "Authorization": auth_token,
                    }
                    return response, 200
            else:
                response = {
                    "status": "fail",
                    "message": "email or password does not match.",
                }
                return response, 401

        except Exception as e:
            print(e)
            response = {"status": "fail", "message": "Try again"}
            return response, 500

    @staticmethod
    def logout_user(data: str) -> Tuple[Dict[str, str], int]:
        """
        This method logs out the user
        """
        if data:
            auth_token = data.split(".")[1]
        else:
            auth_token = ""
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                # mark the token as blacklisted
                return save_token(token=auth_token)
            else:
                response = {"status": "fail", "message": resp}
                return response, 401
        else:
            response = {"status": "fail", "message": "Provide a valid auth token."}
            return response, 403

    @staticmethod
    def get_logged_in_user(new_request):
        """
        This method gets the logged in user
        """
        auth_token = new_request.headers.get("Authorization")
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                response = {
                    "status": "success",
                    "data": {
                        "userId": user.id,
                        "email": user.email,
                        "admin": user.admin,
                        "registeredOn": str(user.registered_on),
                    },
                }
                return response, 200
            response = {"status": "fail", "message": resp}
            return response, 401
        else:
            response = {"status": "fail", "message": "Provide a valid auth token."}
            return response, 401
