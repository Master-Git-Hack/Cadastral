"""Handle the auth methods for the API."""
from typing import Dict, Tuple, Union

from fastapi import Depends
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasicCredentials, HTTPBearer
from fastapi_jwt_auth import AuthJWT

from ..models import Models
from .responses import Responses as __Responses

LoginLog = Models.LoginLog
User = Models.User
__denylist = set()
bearer = HTTPBearer()
response = __Responses()

from .. import logger


@AuthJWT.token_in_denylist_loader
def check_if_token_in_denylist(decrypted_token: str) -> bool:
    """Check if token is in denylist
    Args:
        decrypted_token (str): decrypted token
    Returns:
        bool: True if token is in denylist
    """
    jti = decrypted_token["jti"]
    return jti in __denylist


class Auth:
    """Class to handle authentication of the endpoints"""

    __user = User()
    __login_log = LoginLog()

    def sign_in(self, username: str, password: str):
        """This method sign in the _user and return the access token
        Args:
            data (dict): data to sign in
        Returns:
            tuple: user information and status code
        """
        try:
            if self.__user.filter(username=username) is None:
                return response.error(error_message="0001")
            if not self.__user.check_password(password=password):
                return response.error(error_message="0001")
            token = self.__user.encode()
            log = self.__login_log.create(user_name=username)
            if token is None and log is None:
                return response.error(error_message="0008")

            return response.success(
                data=dict(
                    username=self.__user.current.username,
                    name=self.__user.current.name,
                    reviewer=self.__user.current.reviewer,
                    group=self.__user.current.group,
                ),
                headers=dict(Authorization=token),
            )

        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            return response.error(message=str(e))

    def required(
        self,
        authorize: AuthJWT = Depends(),
        _: HTTPBasicCredentials = Depends(bearer),
    ) -> Union[object, dict]:
        """full protected function to verify token with jwt required
        Args:
            request (Request): request object received
            Authorize (AuthJWT): Authorization. Defaults to Depends().
        Returns:
            Dict or None: response
        """
        try:
            authorize.jwt_required()
            if self.__user.decode(authorize) is None:
                return dict(error_message="0002")

            return self.__user.current
        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            return dict(message=str(e), status_code=401)

    def sign_out(
        self,
        is_idle: bool = False,
        authorize: AuthJWT = Depends(),
        _: HTTPBasicCredentials = Depends(bearer),
    ) -> Tuple[Dict, int]:
        """This method sign out the user and return a message"""

        try:
            authorize.jwt_required()
            __token = authorize.get_raw_jwt()["jti"]
            __denylist.add(__token)
            if not __token in __denylist:
                return response.error(error_message="0003")
            message = "Successfully logged out"
            if is_idle:
                message = "The session is closed due to inactivity"
            return response.success(message=message)
        except Exception as e:
            logger.bind(payload=str(e)).debug(
                f"----------> Unexpected error:\n {str(e)}"
            )
            return response.error(message=str(e))
