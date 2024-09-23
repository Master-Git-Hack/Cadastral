"""
Handle password hashing and checking based on the functionality of Flask-Bcrypt.
This is a modified version of the original Flask-Bcrypt module to work without flask.
For more information, see
https://flask-bcrypt.readthedocs.io/
"""

from hashlib import sha512
from hmac import compare_digest
from typing import Optional

from bcrypt import gensalt, hashpw
from fastapi import Depends

from .. import database


class Security:
    """class Security
    Based on flask bcrypt.
    Credits to Max Countryman.\n
    Example:
        >>> Password(rounds=12, prefix=b"2b", as_long_passwords=True)
        >>> Password().generate_password_hash("password")
        >>> Password().check_password_hash("hash", "password")
    Attributes:
        __rounds (int): The number of rounds to use for the salt.
        __prefix (str): The prefix to use for the salt.
        __as_long_passwords (bool): Whether to use long passwords.
        _unicode_to__bytes (method): Converts a unicode string into a byte object.
        generate_password_hash (method): Generates a password hash using bcrypt.
        check_password_hash (method): Check the given hash with some string.
    """

    __rounds = 10
    __prefix = "2a"
    __as_long_passwords = False

    def __init__(self, **kwargs):
        __rounds = kwargs.get("rounds")
        __prefix = kwargs.get("prefix")
        __as_long_passwords = kwargs.get("as_long_passwords")
        if __rounds is not None:
            self.__rounds = __rounds
        if __prefix is not None:
            self.__prefix = __prefix
        if __as_long_passwords is not None:
            self.__as_long_passwords = __as_long_passwords

    def __unicode_to_bytes(self, unicode: str) -> bytes:
        """Converts a unicode string into a byte object.
        Args:
            unicode (str): The unicode string to convert.
        Returns:
            bytes: The byte object.
        """
        __bytes = unicode
        if isinstance(unicode, str):
            __bytes = bytes(unicode, "utf-8")
        return __bytes

    def generate_password_hash(self, **kwargs) -> hashpw:
        """Generates a password hash using bcrypt.
        Args:
            password (str): The password to be hashed.
            rounds (int, optional): The optional number of rounds.
            prefix (str, optional): The algorithm version to use.
        Returns:
            hashpw: The hashed password.
        """
        __password: str = kwargs.get("password")
        if not __password:
            raise ValueError("Password empty")

        __rounds: Optional[int] = kwargs.get("rounds", self.__rounds)
        __prefix: Optional[str] = kwargs.get("prefix", self.__prefix)

        # Python 3 unicode strings must be encoded as bytes before hashing.
        __password = self.__unicode_to_bytes(__password)
        __prefix = self.__unicode_to_bytes(__prefix)

        if self.__as_long_passwords:
            __password = sha512(__password).hexdigest()
            __password = self.__unicode_to_bytes(__password)

        __salt = gensalt(rounds=__rounds, prefix=__prefix)
        return hashpw(__password, __salt)

    def check_password_hash(self, **kwargs) -> bool:
        """Check the given hash with some string.
        Args:
            hash (str): The hashed password.
            password (str): The password to be checked.
        Returns:
            bool: True if the password is correct, False otherwise.
        """
        __hash = kwargs.get("hash")
        __password = kwargs.get("password")
        # Python 3 unicode strings must be encoded as bytes before hashing.
        __hash = self.__unicode_to_bytes(__hash)
        __password = self.__unicode_to_bytes(__password)

        if self.__as_long_passwords:
            __password = sha512(__password).hexdigest()
            __password = self.__unicode_to_bytes(__password)

        return compare_digest(hashpw(__password, __hash), __hash)
