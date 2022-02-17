from app.config import APPRAISAL_PATH, MODELS_PATH, DBNAME, DBUSER, DBPASSWORD, DBHOST, DBPORT
from psycopg2 import connect, DatabaseError
from psycopg2.extras import RealDictCursor
from jinja2 import Template
from json import dumps

class Cadastral():
    
    def __init__(self, collection = None, year = None, start = None, end = None):
        self.collection = collection
        self.year = year
        self.start = start
        self.end = end

    def query(self, query):
        connection = None
        if DBHOST is not None and DBNAME is not None and DBUSER is not None and DBPASSWORD is not None and DBPORT is not None:
            try:
                with connect(host=DBHOST, port=DBPORT, dbname=DBNAME, user=DBUSER, password=DBPASSWORD) as connection:
                    if connection is not None:
                        with connection.cursor(cursor_factory = RealDictCursor) as cursor:
                            cursor.execute(query)
                            return cursor.fetchall()
                    else:
                        return None
            except(Exception, DatabaseError) as e:
                connection = None
                print(e,'fallo collection')
            finally:
                if connection is not None:
                    connection.close()
        else:
            return None
    def define_collection(self):
        query = Template(open(f"{APPRAISAL_PATH}{MODELS_PATH}/Collection2Ids.sql").read()).render(COLLECTION=self.collection, YEAR=self.year, START=self.start, END=self.end)
        self.collection = [id['id'] for id in self.query(query)]

    def consolidate_collection(self):
        data = []
        if len(self.collection) > 1 and self.collection != None:
            for id in self.collection:
                query = Template(open(f"{APPRAISAL_PATH}{MODELS_PATH}/Justipreciacion.sql").read()).render(ID=id)
                data.append([row for row in self.query(query)])
        elif len(self.collection) == 1 and self.collection != None:
            query = Template(open(f"{APPRAISAL_PATH}{MODELS_PATH}/Justipreciacion.sql").read()).render(ID=self.collection[0])
            data.append([row for row in self.query(query)])
        else:
            data = None
        return data
