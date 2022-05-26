from datetime import datetime, timedelta
from typing import Union

from flask_restx import fields
from jwt import ExpiredSignatureError, InvalidTokenError, decode, encode
from sqlalchemy import Boolean, Column, DateTime, Integer, String

from .... import bcrypt, db
from ....config import key
from .blacklist import BlacklistToken


class User(db.Model):
    """User Model for storing user related details"""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    registered_on = Column(DateTime, nullable=False)
    admin = Column(Boolean, nullable=False, default=False)
    public_id = Column(String(100), unique=True)
    username = Column(String(50), unique=True)
    password_hash = Column(String(255))

    @property
    def password(self) -> None:
        """Raise error when trying to read password"""
        raise AttributeError("password: write-only field")

    @password.setter
    def password(self, password: str) -> None:
        """Set password"""
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password: str) -> bool:
        """Check password
        Args:
            password (str): password to check
        Returns:
            bool: True if password is correct, False otherwise
        """
        return bcrypt.check_password_hash(self.password_hash, password)

    @staticmethod
    def encode_auth_token(user_id: int) -> bytes:
        """Encode the auth token

        Args:
            user_id (int): User's id

        Returns:
            bytes: encoded auth token
        """
        try:
            payload = {
                "exp": datetime.utcnow() + timedelta(days=1, seconds=5),
                "iat": datetime.utcnow(),
                "sub": user_id,
            }
            return encode(payload, key, algorithm="HS256")
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token: str) -> Union[str, int]:
        """Decode the auth token

        Args:
            auth_token (str): Auth token

        Returns:
            Union[str, int]: _description_
        """
        try:
            payload = decode(auth_token, key)
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return "Token blacklisted. Please log in again."
            else:
                return payload["sub"]
        except ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except InvalidTokenError:
            return "Invalid token. Please log in again."

    def __repr__(self) -> str:
        """Representation
        Returns:
            str: Representation of the object
        """
        return f"<User '{self.username}'>"


db.create_all()
