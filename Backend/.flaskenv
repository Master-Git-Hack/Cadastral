FLASK_APP = "wsgi.py"
FLASK_RUN_HOST = "0.0.0.0"
FLASK_RUN_PORT = 5000
FLASK_ENV = "development"
SECRET_KEY = "secret"
DEGUG = True
# API
API_URL = "/api/v2/"
API_VERSION = 2
# MAIL
MAIL_SERVER = "smtp.gmail.com"
MAIL_USERNAME = "eserna@guanajuato.gob.mx"
MAIL_PASSWORD = "#V0ngolaX_gob"
# CORS
CORS = "*"
CORS_ORIGIN = "*"
CORS_ALLOW_METHODS = "*"
CORS_ALLOW_HEADERS = "*"
CORS_EXPOSE_HEADERS = "*"

# PATHS
TMP_FOLDERNAME = "tmp"
TEMPLATES_FOLDERNAME = "templates"
STATIC_FOLDERNAME = "static"
IMAGES_FOLDERNAME = "images"
FONTS_FOLDERNAME = "fonts"

# Production Database
MONGO_URI = "mongodb://root:toor@localhost:27017/Catastral"
PSQL_URI = "postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432/valuaciones"

# Development Database
MONGO_URI_DEV = "mongodb://root:toor@localhost:27017/Catastral"
PSQL_URI_DEV = "postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432/valuaciones"

# Testing Database
MONGO_URI_TEST = "mongodb://root:toor@localhost:27017/Catastral"
PSQL_URI_TEST = "postgresql://root:toor@localhost:5432/root"
