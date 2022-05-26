"""File for auth model and namespace"""
from flask_restx import Namespace
from flask_restx.fields import String

auth = Namespace("auth", description="auth related operations")
model = auth.model(
    "auth",
    dict(
        email=String(
            required=True,
            description="User Email Address",
            example="jhonDoe@domain.com",
        ),
        password=String(required=True, description="User Password"),
    ),
)
