from Cadastral.config import DBENGINE, DBNAME, DBUSER, DBPASSWORD, DBHOST, DBPORT
from psycopg2 import connect, DatabaseError, extensions
from psycopg2.extras import RealDictCursor


def checkPollStatus(connection):
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


def get(query):
    try:
        with connect(
            host=DBHOST, port=DBPORT, dbname=DBNAME, user=DBUSER, password=DBPASSWORD
        ) as connection:
            if connection is not None:
                with connection.cursor(cursor_factory=RealDictCursor) as cursor:
                    cursor.execute(query)
                    return cursor.fetchall(), checkPollStatus(connection)
            else:
                return None
    except (Exception, DatabaseError) as e:
        connection = None
        print(e, f"get failed with query: {query}")
    finally:
        if connection is not None:
            connection.close()


def set(query):
    try:
        with connect(
            host=DBHOST, port=DBPORT, dbname=DBNAME, user=DBUSER, password=DBPASSWORD
        ) as connection:
            if connection is not None:
                with connection.cursor(cursor_factory=RealDictCursor) as cursor:
                    cursor.execute(query)
                    connection.commit()
                    return checkPollStatus(connection)
            else:
                return None
    except (Exception, DatabaseError) as e:
        connection = None
        print(e, f"set failed with query: {query}")
    finally:
        if connection is not None:
            connection.close()
