"""File to handle responses of user services"""
from typing import Dict, Optional, Tuple

from flask import make_response


class Response:
    """
    This class is a wrapper for success and error responses
    """

    @staticmethod
    def success(
        data: dict,
        message: Optional[str] = None,
        operation: str = None,
        status_code: Optional[int] = None,
    ) -> Tuple[Dict, int]:
        """
        This method returns a success response (200-299).
        Args:
            data (dict): data to be returned
            message (str, optional): message to be returned
            operation (str): Endpoint of the request, to recognize the operation at frontend.
            status_code (int, optional): status code of the response
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        status = "success"
        status_code = status_code or 201
        data_response = dict(
            status=status,
            message=message,
            operation=operation,
            data=data,
        )
        response = make_response(data_response)
        response.status_code = status_code
        response.headers = dict(
            status=status,
            message=message,
        )
        response.headers["Content-Type"] = "application/json"
        return response

    @staticmethod
    def bad_request(
        message: Optional[str] = None,
        operation: str = None,
        status_code: Optional[int] = None,
    ) -> Tuple[Dict, int]:
        """
        This method returns a bad request response (400-499)
        Args:
            message (str, optional): message to be returned
            operation (str): Endpoint of the request, to recognize the operation at frontend.
            status_code (int, optional): status code of the response
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        status = "fail"
        status_code = status_code or 401
        data_response = dict(
            status=status,
            message=message,
            operation=operation,
            data=None,
            status_code=status_code,
        )
        response = make_response(data_response)
        response.status_code = status_code
        response.headers = dict(
            status=status,
            message=message,
            status_code=status_code,
        )
        response.headers["Content-Type"] = "application/json"
        return response

    @staticmethod
    def error(
        message: Optional[str] = None,
        operation: str = None,
        status_code: Optional[int] = None,
    ) -> Tuple[Dict, int]:
        """
        This method returns an error response (500-599)
        Args:
            message (str, optional): message to be returned
            operation (str): Endpoint of the request, to recognize the operation at frontend.
            status_code (int, optional): status code of the response
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        status = "warning"
        status_code = status_code or 501
        data_response = dict(
            status=status,
            message=message,
            operation=operation,
            data=None,
        )
        response = make_response(data_response)
        response.status_code = status_code
        response.headers = dict(
            status=status,
            message=message,
        )
        response.headers["Content-Type"] = "application/json"
        return response

    @staticmethod
    def teapot() -> Tuple[Dict, int]:
        """
        418 Joke
        Because coffee is international,
        Returns:
            response (dict): response to the request
            status_code (int): 418 of the response
        """
        status = "418 I'm a teapot"
        message = "The requested entity body is short and stout."
        data_response = dict(
            status=status,
            message=message,
            data=None,
        )
        response = make_response(data_response)
        response.status_code = 418
        response.headers = dict(
            status=status,
            message=message,
        )
        response.headers["Content-Type"] = "application/json"
        return response
