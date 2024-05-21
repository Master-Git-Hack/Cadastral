"""Enpoints for the User app."""
from flask import request
from flask_restx import Resource

from ...controllers import get_all_users, get_user, save_new_user
from ..models import Models, Namespaces
from .auth import *
from .user import *


@Namespaces.user.route("/Auth")
class UserListAuth(Resource):
    """class to work with user"""

    @Namespaces.user.doc("list_of_registered_models")
    @Namespaces.user.marshal_list_with(Models.user, envelope="data")
    def get(self):
        """List all registered users"""
        return get_all_users()

    @Namespaces.user.response(201, "User successfully created.")
    @Namespaces.user.doc("create a new user")
    @Namespaces.user.expect(Models.user, validate=True)
    def post(self):
        """Creates a new User"""
        return save_new_user(data=request.json)


@Namespaces.user.route("/<string:public_id>")
@Namespaces.user.param("public_id", "The User identifier")
@Namespaces.user.response(404, "User not found.")
class UserAuth(Resource):
    """class to work with user"""

    @Namespaces.user.doc("get a user")
    @Namespaces.user.marshal_with(Models.user)
    def get(self, public_id):
        """get a user given its identifier"""
        user = get_user(public_id)
        if not user:
            Namespaces.user.abort(404)
        else:
            return user
