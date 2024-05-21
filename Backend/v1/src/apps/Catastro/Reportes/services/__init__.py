"""File lo handle services at the routes"""
from flask import send_file

from .....config import Paths
from .....utils.response import Response
from ..controllers import create, merge


def get_report(data: dict, filename: str) -> send_file or list:
    """
    Recive the data to work with and render it into a pdf template
    Args:
        data (dict): parameters and the data to fill into report
        filename (str): name of the file to created
    return:
        file (send_file | error response): file created to send it back
    """
    data["filename"] = f"{Paths.tmp}/{filename}"
    return handle_send_file(create(data), filename)


def merge_reports(data: dict, filename: str) -> send_file or list:
    """_summary_
    In case of previous request you can merge your files requested using its filename

    Args:
        data (dict): list of filenames to merge
        filename (str): name of the file to created

    Returns:
        file (send_file | error response): file merged
    """
    return handle_send_file(
        merge([f"{Paths.tmp}/{file}" for file in data["files"]]), filename
    )


def handle_send_file(path: str = None, filename: str = None) -> send_file or list:
    """_summary_

    Args:
        path (str, optional): _description_. Defaults to None.
        filename (str, optional): _description_. Defaults to None.

    Returns:
        send_file | error response: _description_
    """
    if path is not None:
        return send_file(
            path,
            mimetype="application/pdf",
            as_attachment=True,
            download_name=filename,
        )
    else:
        return Response.error(
            message="No se pudo generar el reporte", operation="//", status_code=200
        )
