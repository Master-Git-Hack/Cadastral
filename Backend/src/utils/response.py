"""File to handle responses of user services"""
from typing import Dict, Optional, Tuple


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
        return (
            dict(
                status="success",
                message=message,
                operation=operation,
                data=data,
            ),
            status_code or 201,
        )

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
        return (
            dict(
                status="fail",
                message=message,
                operation=operation,
            ),
            status_code or 401,
        )

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
        return (
            dict(
                status="fail",
                message=message,
                operation=operation,
            ),
            status_code or 500,
        )

    @staticmethod
    def teapot() -> Tuple[Dict, int]:
        """
        418 Joke
        Because coffee is international,
        Returns:
            response (dict): response to the request
            status_code (int): 418 of the response
        """
        return (
            dict(
                status="418 I'm a teapot",
                message="The requested entity body is short and stout.",
            ),
            418,
        )
