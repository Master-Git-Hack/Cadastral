"""
Handle password hashing and checking based on the functionality of Flask-Bcrypt.
This is a modified version of the original Flask-Bcrypt module to work without flask.
For more information, see
https://flask-bcrypt.readthedocs.io/
"""
from hashlib import sha256
from hmac import compare_digest
from typing import Optional

from bcrypt import gensalt, hashpw


class Password:
    """class Password
    Based on flask bcrypt.
    Credits to Max Countryman.\n
    Example:
        >>> Password(rounds=12, prefix=b"2b", as_long_passwords=True)
        >>> Password().generate_password_hash("password")
        >>> Password().check_password_hash("hash", "password")
    Attributes:
        _rounds (int): The number of rounds to use for the salt.
        _prefix (str): The prefix to use for the salt.
        _as_long_passwords (bool): Whether to use long passwords.
        _unicode_to_bytes (method): Converts a unicode string into a byte object.
        generate_password_hash (method): Generates a password hash using bcrypt.
        check_password_hash (method): Check the given hash with some string.
    """

    _rounds = 10
    _prefix = "2a"
    _as_long_passwords = False

    def __init__(
        self, rounds: int = None, prefix: str = None, as_long_passwords: bool = None
    ):
        if rounds is not None:
            self._rounds = rounds
        if prefix is not None:
            self._prefix = prefix
        if as_long_passwords is not None:
            self._as_long_passwords = as_long_passwords

    def _unicode_to_bytes(self, unicode: str) -> bytes:
        """Converts a unicode string into a byte object.
        Args:
            unicode (str): The unicode string to convert.
        Returns:
            bytes: The byte object.
        """
        _bytes = unicode
        if isinstance(unicode, str):
            _bytes = bytes(unicode, "utf-8")
        return _bytes

    def generate_password_hash(
        self, password: str, rounds: Optional[int] = None, prefix: Optional[str] = None
    ) -> hashpw:
        """Generates a password hash using bcrypt.
        Args:
            password (str): The password to be hashed.
            rounds (int, optional): The optional number of rounds.
            prefix (str, optional): The algorithm version to use.
        Returns:
            hashpw: The hashed password.
        """

        if not password:
            raise ValueError("Password empty")

        if rounds is None:
            rounds = self._rounds
        if prefix is None:
            prefix = self._prefix

        # Python 3 unicode strings must be encoded as bytes before hashing.
        password = self._unicode_to_bytes(password)
        prefix = self._unicode_to_bytes(prefix)

        if self._as_long_passwords:
            password = sha256(password).hexdigest()
            password = self._unicode_to_bytes(password)

        salt = gensalt(rounds=rounds, prefix=prefix)
        return hashpw(password, salt)

    def check_password_hash(self, _hash: str, password: str) -> bool:
        """Check the given hash with some string.
        Args:
            hash (str): The hashed password.
            password (str): The password to be checked.
        Returns:
            bool: True if the password is correct, False otherwise.
        """

        # Python 3 unicode strings must be encoded as bytes before hashing.
        _hash = self._unicode_to_bytes(_hash)
        password = self._unicode_to_bytes(password)

        if self._as_long_passwords:
            password = sha256(password).hexdigest()
            password = self._unicode_to_bytes(password)

        return compare_digest(hashpw(password, _hash), _hash)
