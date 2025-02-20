from flask_testing import TestCase

from .. import app, db


class BaseTestCase(TestCase):
    """Class to generate test cases"""

    def create_app(self):
        """
        Create the app instance

        Returns:
            app: The app instance
        """
        app.config.from_object("src.config.TestingConfig")
        return app

    def set_up(self) -> None:
        """
        This method is called before each test
        """
        db.create_all()
        db.session.commit()

    def tear_down(self) -> None:
        """
        This method is called after each test
        """
        db.session.remove()
        db.drop_all()
