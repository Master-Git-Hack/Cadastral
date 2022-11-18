"""Handle everything related to the request to the Statement endpoint.
creates a dict for error messages.
creates and export a class for Responses
"""
from typing import Dict, Optional

from fastapi.responses import JSONResponse

_messages = {
    "0000": "Unhandled exception",
    "0001": "Invalid username or password",
    "0002": "User doesn't exist",
    "0003": "The token is invalid",
    "0004": "Your session has expired",
    "0005": "User already exists",
    "0006": "User not created",
    "0007": "Your token is still valid, please check your email",
    "0008": "Your token is invalid",
    "0009": "Error sending email",
    "0010": "Password change needed",
    "0011": "Your password reset request has already been sended, please check your email",
    "0012": "Your password has no previous request, please verify your email",
    "0013": "Admin role is required",
    "0014": "Owner role is required",
}


class Response:
    """Class Response to handle response of the endpoints
    Example:
        >>> Response.success(data={"id": 1, "name": "John Doe"})
    Attributes:
        custom (method): Custom response.
        success (method): Success response.
        error (method): Error response.

    """

    @staticmethod
    def custom(
        content: Optional[Dict] = None,
        data: Optional[Dict] = None,
        status_code: int = 200,
        headers: Optional[Dict] = None,
    ) -> JSONResponse:
        """Returns a response
        Args:
            content (dict, optional): all the data to send. Defaults to None.
            data (dict, optional): data inside of content to send. Defaults to None.
            status_code (int, optional): Status code. Defaults to 200.
            message (str, optional): Message. Defaults to None.
            headers (dict, optional): Headers. Defaults to None.
            authorize (AuthJWT, optional): Authorization. Defaults to None.
        Returns:
            Tuple[Dict, int]: Response
        """
        if data is None:
            data = dict()
        if content is None:
            content = dict()
        if "data" not in content:
            content["data"] = data
        if "code" in content:
            content["message"] = _messages.get(content["code"], "Unknown error")
        return JSONResponse(status_code=status_code, content=content, headers=headers)

    @staticmethod
    def success(
        content: Optional[Dict] = None,
        data: Optional[Dict] = None,
        headers: Optional[Dict] = None,
    ) -> JSONResponse:
        """Returns a success response
        Args:
            content (dict, optional): all the data to send. Defaults to None.
            data (dict, optional): data inside of content to send. Defaults to None.
            headers (dict, optional): Headers. Defaults to None.
            authorize (AuthJWT, optional): Authorization. Defaults to None.
        Returns:
            Tuple[Dict, int]: Response
        """
        if data is None:
            data = dict()
        if content is None:
            content = dict()

        if "data" not in content:
            content["data"] = data

        if "message" not in content:
            content["message"] = "Successful Operation"
        return Response.custom(
            content=content, data=data, status_code=200, headers=headers
        )

    @staticmethod
    def error(
        content: Optional[Dict] = None,
        data: Optional[Dict] = None,
        status_code: Optional[int] = 400,
        headers: Optional[Dict] = None,
    ) -> JSONResponse:
        """Returns an error response
        Args:
            content (dict, optional): all the data to send. Defaults to None.
            data (dict, optional): data inside of content to send. Defaults to None.
            status_code (int, optional): Status code. Defaults to 400.
            headers (dict, optional): Headers. Defaults to None.
        Returns:
            None: Raises an exception
        """
        if data is None:
            data = dict()
        if content is None:
            content = dict()
        if "data" not in content:
            content["data"] = data
        if "code" in content:
            content["message"] = _messages.get(content["code"], "Unknown error")
        if "message" not in content:
            content["message"] = "Unsuccessful Operation"
        return Response.custom(
            content=content, data=data, status_code=status_code, headers=headers
        )
