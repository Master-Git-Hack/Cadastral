"""File to append routes of the apps, or to create a new one."""
from json2html import *

from .. import app
from ..apps import __init__
from ..utils.response import Response


@app.route("/teapot", methods=["GET"])
def teapot():
    """Just an easter's. egg as example of route"""
    respond, status_code = Response.teapot()
    return (
        json2html.convert(json=respond, table_attributes='class="table table-striped"')
        + "<iframe width = '75%' height='80%' src ='../static/images/teapot.png'></iframe>"
    ), status_code
