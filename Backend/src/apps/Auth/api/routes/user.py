from typing import Dict, Tuple

from flask import request
from flask_restx import Resource

from ... import admin_token_required
from ...services import get_all_users, get_user, save_new_user
from ..models import Models, Namespaces


@Namespaces.user.route("/")
class UserList(Resource):
    """
    User List Resource Endpoint
    """

    @Namespaces.user.doc("list_of_registered_users")
    @admin_token_required
    @Namespaces.user.marshal_list_with(Models.user, envelope="data")
    def get(self) -> Tuple[Dict, int]:
        """
        Returns list of registered users
        """
        return get_all_users()

    @Namespaces.user.expect(Models.user, validate=True)
    @Namespaces.user.response(201, "User successfully created.")
    @Namespaces.user.doc("create a new user")
    def post(self) -> Tuple[Dict, int]:
        """
        Creates a new user
        """
        return save_new_user(data=request.json)


@Namespaces.user.route("/<string:public_id>")
class User(Resource):
    """
    User Resource
    """

    @Namespaces.user.doc("get a user")
    @Namespaces.user.marshal_with(Models.user)
    def get(self, public_id: str) -> Tuple[Dict, int]:
        """
        Returns a user given its identifier
        """
        response = get_user(public_id)
        if not response:
            Namespaces.user.abort(404, f"User {public_id} doesn't exist")
        else:
            return response
