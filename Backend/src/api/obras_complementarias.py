from flask import Blueprint, request

from ..utils.response import Responses

obras_complementarias_api: Blueprint = Blueprint(
    "Obreas Complementarias", __name__, url_prefix="/obras-complementarias"
)
