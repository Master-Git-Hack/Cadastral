"""File with the Blacklist class."""
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String

from .... import db


class BlacklistToken(db.Model):
    """
    Token Model for storing JWT tokens
    """

    __tablename__ = "blacklist_tokens"

    id = Column(Integer, primary_key=True, autoincrement=True)
    token = Column(String(500), unique=True, nullable=False)
    blacklisted_on = Column(DateTime, nullable=False)

    def __init__(self, token: str) -> None:
        """
        Constructor
        Args:
            token (str): The token to be blacklisted

        """
        self.token = token
        self.blacklisted_on = datetime.now()

    def __repr__(self):
        """
        Representation
        Returns:
            str: Representation of the object
        """
        return f"<id: token: {self.token}>"

    @staticmethod
    def check_blacklist(auth_token: str) -> bool:
        """
        Check whether the token has been blacklisted
        Args:
            auth_token (str): token to be checked
        Returns:
            bool: Is token blacklisted or not
        """
        response = BlacklistToken.query.filter_by(token=str(auth_token)).first()
        if response:
            return True
        else:
            return False


db.create_all()
