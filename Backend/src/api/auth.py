"""
Handle AUTH endpoints.
create a route object to handle the authentication endpoints.
exports a route object to be used in the main app.

Methods:
- sign_in: sign in a user in the system
- sign_up: sign up a user in the system
- sign_out: sign out a user in the system

Author: Einar Jhordany Serna Valdivia
Version: 1.0.0
Date: November 7th, 2022
"""
from fastapi import APIRouter, Depends, Request
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from ..middlewares import Middlewares as __Middlewares
from ..middlewares.auth import Auth as __Auth
from ..models import Models as __Models

__response = __Middlewares.Responses()

__auth = __Auth()
__User = __Models.User
api_auth = APIRouter(
    prefix="/auth",
    tags=["Auth"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

# Security dependency for basic authentication
security = HTTPBasic()


@api_auth.post("/sign-in")
async def sign_in(
    request: Request, credentials: HTTPBasicCredentials = Depends(security)
):
    # credentials = await request.json()
    if "username" not in credentials or "password" not in credentials:
        return __response.error(error_message="0004")

    return __auth.sign_in(username=credentials.username, password=credentials.password)


@api_auth.post("/sign-out")
async def sing_out(request: Request, user=Depends(__auth.required)):
    if isinstance(user, dict):
        return __response.error(**user)
    data = await request.json()
    return __auth.sign_out(**data)
