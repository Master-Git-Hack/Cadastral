from json import load
from os.path import exists
from typing import Dict, List, Optional

from flask import jsonify
from flask import send_file as response_with_file

from .. import config


class Responses:
    """
    A class that provides methods to generate success and error response objects.

    Attributes:
        success (method): A response containing success elements to be included.\n
        error (method): A response containing error elements to be included.
    """

    __success_messages: dict = {}
    __errors_messages: dict = {}
    __path: str = config.PATHS.static

    def __init__(self) -> None:
        try:
            with open(f"{self.__path}/success.json", "r", encoding="utf-8") as file:
                self.__success_messages = load(file)
            with open(f"{self.__path}/errors.json", "r", encoding="utf-8") as file:
                self.__errors_messages = load(file)
        except FileNotFoundError:
            self.__success_messages = {}
            self.__errors_messages = {}

    def __make_response(
        self,
        content: Optional[Dict] = None,
        data: Optional[Dict or List] = None,
        status_code: int = 200,
        headers: Optional[Dict] = None,
        cookies: Optional[Dict] = None,
    ) -> jsonify:
        """
        Returns a response

        Args:
        content (dict, optional): all the data to send. Defaults to None.
        data (dict, optional): data inside of content to send. Defaults to None.
        status_code (int, optional): Status code. Defaults to 200.
        headers (dict, optional): Headers. Defaults to None.
        cookies (dict, optional): Cookies. Defaults to None.

        Returns:
        jsonify: Response
        status_code: int
        headers:Dict[str,Any]
        """
        if data is None:
            data: dict = dict()
        if content is None:
            content: dict = dict()
        if "data" not in content:
            content["data"] = data

        response = jsonify(content)
        response.status_code = status_code
        if headers:
            response.headers |= {key: value for key, value in headers.items()}
        if cookies:
            for key, value in cookies.items():
                response.set_cookie(key, value, secure=True)
        return response

    def success(
        self,
        content: Optional[Dict] = None,
        data: Optional[Dict or List] = None,
        message: Optional[str] = None,
        headers: Optional[Dict] = None,
        status_code: Optional[int] = 200,
        success_message: Optional[str] = None,
        cookies: Optional[Dict] = None,
    ) -> __make_response:
        """
        A method that returns a success response object.

        Example:
        >>> status_code -> 200 OK: Indicates that the request has succeeded and that the response contains the requested data.
        >>> status_code -> 201 Created: Indicates that a new resource has been successfully created.
        >>> status_code -> 204 No Content: Indicates that the request was successful, but there is no data to return.

        Args:
            content (Optional[Dict]): The response body as a dictionary. Defaults to None.
            data (Optional[Dict or List]): Additional data to include in the response. Defaults to None.
            headers (Optional[Dict]): A dictionary of additional headers to include in the response. Defaults to None.
            status_code (Optional[int]): The HTTP status code. Defaults to 400.
            error_message (Optional[str]): A key for an optional error message in a static json file. Defaults to None.

        Returns:
            A response object with the given parameters.
        """
        if not 200 <= status_code <= 299:
            raise ValueError("A success status__code must be between 200 and 299")
        if content is None:
            content: dict = {}
        if cookies is None:
            cookies: dict = {}
        if message is not None:
            content["message"] = message
        if success_message is not None:
            content["message"] = self.__success_messages.get(
                success_message, "Operation Successfully Completed!"
            )

        return self.__make_response(content, data, status_code, headers, cookies)

    def error(
        self,
        content: Optional[Dict] = None,
        data: Optional[Dict or List] = None,
        message: Optional[str] = None,
        headers: Optional[Dict] = None,
        status_code: Optional[int] = 400,
        error_message: Optional[str] = None,
        cookies: Optional[Dict] = None,
    ) -> __make_response:
        """
        A method that returns an error response object.

        Example:
        >>> status_code -> 400 Bad Request: Indicates that the request was malformed or invalid, and the server could not understand it.
        >>> status_code -> 401 Unauthorized: Indicates that authentication is required and has failed or has not been provided.
        >>> status_code -> 402 Payment Required: Indicates that the client must pay to access the requested resource.
        >>> status_code -> 403 Forbidden: Indicates that the server understood the request but refuses to authorize it.
        >>> status_code -> 404 Not Found: Indicates that the requested resource was not found on the server.
        >>> status_code -> 409 Conflict: Indicates that the request could not be completed due to a conflict with the current state of the resource.
        >>> status_code -> 422 Unprocessable Entity: Indicates that the server understands the content type of the request entity, but was unable to process the contained instructions.
        status_code -> 429 Too Many Requests: Indicates that the user has sent too many requests in a given amount of time.

        Args:
            content (Optional[Dict]): The response body as a dictionary. Defaults to None.
            data (Optional[Dict or List]): Additional data to include in the response. Defaults to None.
            headers (Optional[Dict]): A dictionary of additional headers to include in the response. Defaults to None.
            status_code (Optional[int]): The HTTP status code. Defaults to 400.
            error_message (Optional[str]): A key for an optional error message in a static json file. Defaults to None.

        Returns:
            A response object with the given parameters.
        """
        if not 400 <= status_code <= 499:
            raise ValueError("An error status__code must be between 400 and 499")
        if content is None:
            content: dict = {}
        if cookies is None:
            cookies: dict = {}
        if message is not None:
            content["message"] = message
        if error_message is not None:
            content["message"] = self.__errors_messages.get(
                error_message, "Operation Unexpectedly Failed!"
            )

        return self.__make_response(content, data, status_code, headers, cookies)

    def send_file(
        self,
        filename: str,
        mimetype: str = "application/pdf",
        path: Optional[str] = None,
    ):
        """
        Send a file as response
        Args:
            filename (str): name of the file to send
            mimetype (str, optional): mimetype of the file. Defaults to "application/pdf".
            path (str, optional): path of the file. Defaults to None.
        """
        if path is None:
            path = config.PATHS.tmp
        __file = f"{path}/{filename}"
        if not exists(__file):
            return self.error(
                message="No se pudo generar el reporte",
                status_code=409,
            )
        return response_with_file(
            __file,
            mimetype=mimetype,
            as_attachment=True,
            download_name=filename,
        )
