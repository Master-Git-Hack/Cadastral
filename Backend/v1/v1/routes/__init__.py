"""File to append routes of the apps, or to create a new one."""
from flask import render_template
from json2html import *

from .. import app
from ..apps import __init__
from ..config import Paths
from ..utils.response import Response


@app.route("/teapot", methods=["GET"])
def teapot():
    """Just an easter's. egg as example of route"""
    respond, status_code = Response.teapot()
    return (
        json2html.convert(json=respond, table_attributes='class="table table-striped"')
        + "<iframe width = '75%' height='80%' src ='../static/images/teapot.png'></iframe>"
    ), status_code


@app.route("/docs", methods=["GET"])
def docs():
    """Just an easter's. egg as example of route"""
    template = Paths.docs.get_template("index.html")
    return render_template(template)
