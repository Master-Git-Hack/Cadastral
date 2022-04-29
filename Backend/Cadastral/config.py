from os import getenv

if getenv("API_VERSION"):
    API_VERSION = f'v{getenv("API_VERSION")}'
else:
    API_VERSION = "v1"

if getenv("FLASK_ENV"):
    API_ENV = getenv("FLASK_ENV")
else:
    API_ENV = "development"

API_URL = f"/api/{API_VERSION}/"

if getenv("FLASK_RUN_HOST"):
    CORSSRC = {f"{API_URL}*": {"origins": "*"}}
else:
    CORSSRC = None


if getenv("SECRET_KEY") and getenv("SECRET_KEY") != "":
    SECRET_KEY = getenv("SECRET_KEY")
else:
    SECRETKEY = None

if getenv("DBNAME"):
    DBNAME = getenv("DBNAME")
else:
    DBNAME = None

if getenv("DBUSER"):
    DBUSER = getenv("DBUSER")
else:
    DBUSER = None

if getenv("DBPASSWORD"):
    DBPASSWORD = getenv("DBPASSWORD")
else:
    DBPASSWORD = None

if getenv("DBHOST"):
    DBHOST = getenv("DBHOST")
else:
    DBHOST = None

if getenv("DBPORT"):
    DBPORT = getenv("DBPORT")
else:
    DBPORT = None

if getenv("DBENGINE"):
    DBENGINE = getenv("DBENGINE")
else:
    DBENGINE = None

if getenv("TEMPORARY_PATH"):
    TEMPORARY_PATH = getenv("TEMPORARY_PATH")
else:
    TEMPORARY_PATH = None

if getenv("TEMPLATES_PATH"):
    TEMPLATE_PATH = getenv("TEMPLATES_PATH")
else:
    TEMPLATE_PATH = None

if getenv("IMAGES_PATH"):
    IMAGES_PATH = getenv("IMAGES_PATH")
else:
    IMAGES_PATH = None

if getenv("DOCS_PATH"):
    DOCS_PATH = getenv("DOCS_PATH")
else:
    DOCS_PATH = None

if getenv("CSS_PATH"):
    CSS_PATH = getenv("CSS_PATH")
else:
    CSS_PATH = None
