from os import getenv, getcwd
from dotenv import load_dotenv

load_dotenv()

if getenv("API_VERSION"):
    API_VERSION = f'v{getenv("API_VERSION")}'
else:
    API_VERSION = "v1"

if getenv("API_ENV"):
    API_ENV = getenv("API_ENV")
else:
    API_ENV = "development"

API_URL = f"/api/{API_VERSION}/"

if getenv("HOST"):
    HOST = getenv("HOST")
    CORSSRC = {f"{API_URL}*": {"origins": "*"}}
else:
    HOST = None
    CORSSRC = None

if getenv("DEBUG"):
    DEBUG = getenv("DEBUG")
else:
    DEBUG = None

if getenv("PORT"):
    PORT = getenv("PORT")
else:
    PORT = None

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
