"""Endpoints for Auth"""
from typing import Dict, Tuple

from flask import request
from flask_restx import Resource

from ...helpers import Auth
from ..models import Models, Namespaces


@Namespaces.auth.route("/signin")
class UserLogin(Resource):
    """
    User Login Resource
    """

    @Namespaces.auth.doc("user login")
    @Namespaces.auth.expect(Models.auth)
    def post(self) -> Tuple[Dict, int]:
        """
        User Login Post Method
        """
        return Auth.login_user(data=request.json)


@Namespaces.auth.route("/signout")
class LogoutAPI(Resource):
    """
    Logout Resource
    """

    @Namespaces.auth.doc("logout a user")
    def post(self) -> Tuple[Dict[str, str], int]:
        # get auth token
        return Auth.logout_user(data=request.headers.get("Authorization"))
