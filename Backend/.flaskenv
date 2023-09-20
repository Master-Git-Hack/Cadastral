FLASK_APP = "wsgi.py"
FLASK_RUN_HOST = "0.0.0.0"
FLASK_RUN_PORT = 5000
FLASK_ENV = "development"
SECRET_KEY = "{'#Pl4taformas G3omáticas C4tastrales':[{'@Dirección de Recursos Materiales, Servicios Generales y Catastro!':'($Secretaría de Fiñanzas, Inversión y Administración)%'}]}"
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
CORS_ALLOW_HEADERS = "Authorization"
CORS_EXPOSE_HEADERS = "Authorization"

# PATHS
TMP_FOLDERNAME = "tmp"
TEMPLATES_FOLDERNAME = "templates"
STATIC_FOLDERNAME = "static"
IMAGES_FOLDERNAME = "images"
FONTS_FOLDERNAME = "fonts"

# Production Database
MONGO_URI = "mongodb://root:toor@localhost:27017/Catastral"
PSQL_URI = "postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432/"


# Development Database
MONGO_URI_DEV = "mongodb://root:toor@localhost:27017/Catastral"
PSQL_URI_DEV = "postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432/"

# Testing Database
MONGO_URI_TEST = "mongodb://root:toor@localhost:27017/Catastral"
PSQL_URI_TEST = "postgresql://root:toor@localhost:5432/"

# Databases
BD_NAME1 = "valuaciones"
BD_NAME2 = "catastro_v2"
