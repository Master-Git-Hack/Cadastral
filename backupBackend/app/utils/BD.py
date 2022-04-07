from app.config import (
    DBNAME as dbname,
    DBPASSWORD as password,
    DBUSER as user,
    DBHOST as host,
    DBPORT as port,
)
from psycopg2 import connect, DatabaseError, extensions
from psycopg2.extras import RealDictCursor as cursor_factory


class DBOperations:
    """
    class for postgres database operations \n
    methods: \n
        get(query) -> response: query result \n
        set(query) -> response: status \n
    """

    def __init__(self):
        self.validate = host is not None and port is not None
        self.validate = self.validate and password is not None
        self.validate = self.validate and dbname is not None
        self.validate = self.validate and user is not None

    def checkPollStatus(self, connection):
        """
        extensions.POLL_ERROR == -1 \n
        extensions.POLL_OK == 0 \n
        extensions.POLL_READ == 1 \n
        extensions.POLL_WRITE == 2 \n
        """
        if connection.poll() == extensions.POLL_OK:
            return 0
        if connection.poll() == extensions.POLL_READ:
            return 1
        if connection.poll() == extensions.POLL_WRITE:
            return 2
        if connection.poll() == extensions.POLL_ERROR:
            return -1

    def get(self, query):
        if self.validate:
            try:
                with connect(
                    host,
                    port,
                    dbname,
                    user,
                    password,
                ) as connection:
                    if connection is not None:
                        with connection.cursor(cursor_factory) as cursor:
                            cursor.execute(query)
                            return cursor.fetchall(), self.checkPollStatus(connection)
                    else:
                        return None
            except (Exception, DatabaseError) as e:
                connection = None
                print(e, f"get failed with query: {query}")
            finally:
                if connection is not None:
                    connection.close()

    def set(self, query):
        if self.validate:
            try:
                with connect(
                    host,
                    port,
                    dbname,
                    user,
                    password,
                ) as connection:
                    if connection is not None:
                        with connection.cursor(cursor_factory) as cursor:
                            cursor.execute(query)
                            connection.commit()
                            return self.checkPollStatus(connection)
                    else:
                        return None
            except (Exception, DatabaseError) as e:
                connection = None
                print(e, f"set failed with query: {query}")
            finally:
                if connection is not None:
                    connection.close()
