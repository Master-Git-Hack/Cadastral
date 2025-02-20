from flask_restx import Namespace
from flask_restx.fields import String

user = Namespace("user", description="auth related operations")
model = user.model(
    "user",
    dict(
        email=String(
            required=True,
            description="User Email Address",
            example="jhonDoe@domain.com",
        ),
        username=String(required=True, description="User Username"),
        password=String(required=True, description="User Password"),
        publicId=String(description="User Public Id"),
    ),
)
