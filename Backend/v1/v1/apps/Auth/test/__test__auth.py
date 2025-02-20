from json import dumps, loads
from unittest import main

from .... import db
from ....test import BaseTestCase
from ..models.blacklist import BlacklistToken


def register_user(self):
    """
    This method registers a user
    """
    return self.client.post(
        "/users/",
        data=dumps(
            dict(email="jhondoe@gmail.com", password="123456", username="jhonDoe")
        ),
        content_type="application/json",
    )


def login_user(self):
    """
    This method logs in a user
    """
    return self.client.post(
        "/auth/login",
        data=dumps(dict(email="jhondoe@gmail.com", password="123456")),
        content_type="application/json",
    )


class TestAuthBluepirnt(BaseTestCase):
    """
    This class tests the auth blueprint
    """

    def test_registration(self):
        """
        This method tests the registration
        """
        with self.client:
            response = register_user(self)
            data = loads(response.data.decode())
            self.assertTrue(data["status"] == "success")
            self.assertTrue(data["message"] == "Successfully registered.")
            self.assertTrue(data["Authorization"])
            self.assertTrue(response.content_type == "application/json")
            self.assertEqual(response.status_code, 201)

    def test_registered_with_already_registered_user(self):
        """
        This method tests if a user is already registered
        """
        register_user(self)
        with self.client:
            response = register_user(self)
            data = loads(response.data.decode())
            self.assertTrue(data["status"] == "fail")
            self.assertTrue(data["message"] == "User already exists. Please Sign in.")
            self.assertTrue(response.content_type == "application/json")
            self.assertEqual(response.status_code, 409)

    def test_registered_user_login(self) -> None:
        """
        This method tests the login of a registered user
        """
        with self.client:
            response = register_user(self)
            data = loads(response.data.decode())
            self.assertTrue(data["status"] == "success")
            self.assertTrue(data["message"] == "Successfully registered.")
            self.assertTrue(data["Authorization"])
            self.assertTrue(response.content_type == "application/json")
            self.assertEqual(response.status_code, 201)
            # registered user login
            response = login_user(self)
            data = loads(response.data.decode())
            self.assertTrue(data["status"] == "success")
            self.assertTrue(data["message"] == "Successfully logged in.")
            self.assertTrue(data["Authorization"])
            self.assertTrue(response.content_type == "application/json")
            self.assertEqual(response.status_code, 200)

    def test_non_registered_user_login(self) -> None:
        """
        This method tests the login of a non registered user
        """
        with self.client:
            response = login_user(self)
            data = loads(response.data.decode())
            self.assertTrue(data["status"] == "fail")
            print(data["message"])
            self.assertTrue(data["message"] == "email or password does not match.")
            self.assertTrue(response.content_type == "application/json")
            self.assertEqual(response.status_code, 401)

    def test_valid_logout(self) -> None:
        """
        This method tests the logout of a user
        """
        # user registration
        response = register_user(self)
        data = loads(response.data.decode())
        self.assertTrue(data["status"] == "success")
        self.assertTrue(data["message"] == "Successfully registered.")
        self.assertTrue(data["Authorization"])
        self.assertTrue(response.content_type == "application/json")
        self.assertEqual(response.status_code, 201)
        # user login
        response = login_user(self)
        data = loads(response.data.decode())
        self.assertTrue(data["status"] == "success")
        self.assertTrue(data["message"] == "Successfully logged in.")
        self.assertTrue(data["Authorization"])
        self.assertTrue(response.content_type == "application/json")
        self.assertEqual(response.status_code, 200)
        # valid token logout
        response = self.client.post(
            "/auth/logout",
            headers=dict(
                Authorization="Bearer " + loads(response.data.decode())["Authorization"]
            ),
        )
        data = loads(response.data.decode())
        self.assertTrue(data["status"] == "success")
        self.assertTrue(data["message"] == "Successfully logged out.")
        self.assertEqual(response.status_code, 200)

    def test_valid_blacklisted_token_logout(self):
        """
        This method tests the logout of a user with a blacklisted token
        """
        with self.client:
            # user registration
            response = register_user(self)
            data = loads(response.data.decode())
            self.assertTrue(data["status"] == "success")
            self.assertTrue(data["message"] == "Successfully registered.")
            self.assertTrue(data["Authorization"])
            self.assertTrue(response.content_type == "application/json")
            self.assertEqual(response.status_code, 201)
            # user login
            response = login_user(self)
            data = loads(response.data.decode())
            self.assertTrue(data["status"] == "success")
            self.assertTrue(data["message"] == "Successfully logged in.")
            self.assertTrue(data["Authorization"])
            self.assertTrue(response.content_type == "application/json")
            self.assertEqual(response.status_code, 200)
            # blacklist a valid token
            blacklist_token = BlacklistToken(
                token=loads(response.data.decode())["Authorization"]
            )
            db.session.add(blacklist_token)
            db.session.commit()
            # blacklisted valid token logout
            response = self.client.post(
                "/auth/logout",
                headers=dict(
                    Authorization="Bearer "
                    + loads(response.data.decode())["Authorization"]
                ),
            )
            data = loads(response.data.decode())
            self.assertTrue(data["status"] == "fail")
            self.assertTrue(
                data["message"] == "Token blacklisted. Please log in again."
            )
            self.assertEqual(response.status_code, 401)


if __name__ == "__main__":
    main()
