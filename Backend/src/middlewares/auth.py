from typing import Union

from fastapi import Depends
from fastapi.security import HTTPBasicCredentials, HTTPBearer
from fastapi_jwt_auth import AuthJWT
from sqlalchemy.orm import Session

from .. import database, logger
from ..models.usuarios import Usuarios

bearer = HTTPBearer()
__User = Usuarios

denylist = set()


def required(
    db: Session = Depends(database.valuaciones),
    authorize: AuthJWT = Depends(),
    _: HTTPBasicCredentials = Depends(bearer),
) -> Union[object, dict]:
    user = __User(db=db)
    try:
        authorize.jwt_required()
        if user.decode(authorize) is None:
            return dict(error_message="0002")

        return user.current
    except Exception as e:
        logger.bind(payload=str(e)).debug(f"----------> Unexpected error:\n {str(e)}")
        return dict(message=str(e), status_code=401)


@AuthJWT.token_in_denylist_loader
def check_if_token_in_denylist(decrypted_token: str) -> bool:
    """Check if token is in denylist
    Args:
        decrypted_token (str): decrypted token
    Returns:
        bool: True if token is in denylist
    """
    jti = decrypted_token["jti"]
    return jti in denylist
