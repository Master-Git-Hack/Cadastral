from os import getenv, getcwd

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
    HOST = getenv("FLASK_RUN_HOST")
    CORSSRC = {f"{API_URL}*": {"origins": "*"}}
else:
    HOST = "localhost"
    CORSSRC = None

if getenv("FLASK_RUN_PORT"):
    PORT = getenv("FLASK_RUN_PORT")
else:
    PORT = 5000

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
if API_ENV == "production":
    if getenv("ROOT_PATH"):
        ROOT_PATH = getenv("ROOT_PATH")
    else:
        ROOT_PATH = getcwd()
else:
    ROOT_PATH = getcwd()


if getenv("TEMPORARY_PATH"):
    TEMPORARY_PATH = ROOT_PATH + getenv("TEMPORARY_PATH")
else:
    TEMPORARY_PATH = None

if getenv("TEMPLATES_PATH"):
    TEMPLATE_PATH = ROOT_PATH + getenv("TEMPLATES_PATH")
else:
    TEMPLATE_PATH = None

if getenv("IMAGES_PATH"):
    IMAGES_PATH = ROOT_PATH + getenv("IMAGES_PATH")
else:
    IMAGES_PATH = None

if getenv("APPRAISAL_PATH"):
    APPRAISAL_PATH = ROOT_PATH + getenv("APPRAISAL_PATH")
else:
    APPRAISAL_PATH = None

if getenv("HOMOLOGATIONS_PATH"):
    HOMOLOGATIONS_PATH = ROOT_PATH + getenv("HOMOLOGATIONS_PATH")
else:
    HOMOLOGATIONS_PATH = None

if getenv("MODELS_PATH"):
    MODELS_PATH = getenv("MODELS_PATH")
else:
    MODELS_PATH = None

if getenv("VIEWS_PATH"):
    VIEWS_PATH = getenv("VIEWS_PATH")
else:
    VIEWS_PATH = None

if getenv("FORMS_PATH"):
    FORMS_PATH = getenv("FORMS_PATH")
else:
    FORMS_PATH = None
