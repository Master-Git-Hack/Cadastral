FROM python:3.11.9-slim-bullseye
LABEL version='2.0.0'
LABEL description="Backend Server's Image"
LABEL mantenier='Einar Jhordany Serna Valdivia<eserna@guanajuato.gob.mx>'
WORKDIR /usr/src/Backend
COPY . /usr/src/Backend
RUN apt-get update --allow-releaseinfo-change && \
    apt-get install -y nano wget fontconfig libfreetype6 \
    libjpeg62-turbo libpng16-16 libx11-6 libxcb1 libxext6 \
    libxrender1 xfonts-75dpi xfonts-base

RUN wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.bullseye_amd64.deb && \
    dpkg -i wkhtmltox_0.12.6.1-2.bullseye_amd64.deb && \ 
    apt -f install -y && \
    rm wkhtmltox_0.12.6.1-2.bullseye_amd64.deb

RUN python -m pip install --upgrade pip && \
    pip install reportlab psycopg2-binary==2.9.3 pandas && \
    pip install --no-cache-dir -r /usr/src/Backend/requirements.v1.txt &&\
    pip install --no-cache-dir -r /usr/src/Backend/requirements.v2.txt 

RUN apt autoclean && apt autoremove && rm -rf /var/lib/apt/lists/*
RUN chmod +x start.sh

ENV LANG=es_MX.UTF-8
ENV LC_ALL=es_MX.UTF-8FLASK_APP="wsgi.py"
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=56733
ENV VERSION=1
ENV API_URL="/api/v1/"
ENV TITLE="API DEV"
ENV DEBUG=False
ENV CORS="*"
ENV CORS_ORIGIN="*"
ENV DATABASE_URL_DEV="postgresql://postgres:root@localhost:5432/postgres"
ENV DATABASE_URL_TEST="postgresql://postgres:root@localhost:5432/postgres"
ENV DATABASE_URL="postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432/valuaciones"
ENV SECRET_KEY="~<[({#__ ¿¡S3cretaria de F&&ñanz@$\, GOBIERNO d|3 GUANAJUATO!? %__#})]>~"
ENV API_VERSION=2.0.0
ENV ENV=production
ENV FLASK_ENV=production
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=5000
ENV LOG_LEVEL="info"
ENV RELOAD=0
ENV WORKERS=3
ENV TITLE="API para uso de plataformas geomaticas"
ENV DESCRIPTION="API para la dirección general de catastro del estado de guanajuato"
ENV CORS_ORIGINS="*"
ENV CORS_ALLOW_CREDENTIALS="*"
ENV CORS_ALLOW_METHODS="*"
ENV CORS_ALLOW_HEADERS=Authorization
ENV CORS_EXPOSE_HEADERS=Authorization
ENV HOST="http://172.31.103.46:3000"
ENV DB_NAMES="valuaciones,catastro_v2"
ENV AUTHJWT_TOKEN_LOCATION="headers"
ENV AUTHJWT_ALGORITHM="HS512"
ENV AUTHJWT_DENYLIST_TOKEN_CHECKS="access"
ENV TEMPORARY_PATH="tmp"
ENV STATIC_PATH="static"
ENV TEMPLATES="templates"
ENV IMAGES="images"
ENV FONTS="fonts"
ENV DOCS="docs"
ENV PSQL_URI="postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432"
ENV PSQL_URI_DEV="postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432"
ENV PSQL_URI_TEST="postgresql://root:toor@localhost:5432"

EXPOSE 5000 56733
CMD ["sh", "./run.dev.sh"]