FROM python:3.11.9-slim-bullseye
LABEL description="Backend Server's Image"
LABEL mantenier='Einar Jhordany Serna Valdivia<eserna@guanajuato.gob.mx>'
WORKDIR /usr/src/v3
COPY . /usr/src/v3
# RUN echo "deb http://security.debian.org/debian-security bullseye-security main contrib non-free" > /etc/apt/sources.list
RUN apt-get update --allow-releaseinfo-change && \
    apt-get install -y nano wget fontconfig libfreetype6 \
    libjpeg62-turbo libpng16-16 libx11-6 libxcb1 libxext6 \
    libxrender1 xfonts-75dpi xfonts-base ipython3 build-essential python-dev python3-dev

RUN wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.bullseye_amd64.deb && \
    dpkg -i wkhtmltox_0.12.6.1-2.bullseye_amd64.deb && \ 
    apt -f install -y && \
    rm wkhtmltox_0.12.6.1-2.bullseye_amd64.deb

RUN python -m pip install --upgrade pip && \
    pip install --no-cache-dir reportlab psycopg2-binary pandas && \
    pip install --no-cache-dir -r /usr/src/v2/requirements.txt 

RUN apt autoclean && apt autoremove && rm -rf /var/lib/apt/lists/*

ENV LANG=es_MX.UTF-8
ENV LC_ALL=es_MX.UTF-8FLASK_APP="wsgi.py"
ENV DEBUG=False
ENV SECRET_KEY="~<[({#__ ¿¡S3cretaria de F&&ñanz@$\, GOBIERNO d|3 GUANAJUATO!? %__#})]>~"
ENV API_VERSION=3.0.0
ENV ENV=production
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=5000
ENV LOG_LEVEL="info"
ENV RELOAD=0
ENV WORKERS=3
ENV TITLE="API para uso de plataformas geomaticas"
ENV DESCRIPTION="PI desarrollada para apoyar la gestión de la Dirección General de Recursos Materiales, Servicios Generales y Catastro, a traves de modulos propios y complementos para el sistema de valuaciones creada por el departamento de Plataformas Geomáticas Catastrales."
ENV HEADER_SIGNATURE=X-Cadastral-Signature
ENV SCOPES="email,profile,openid"
ENV CLIENT=http://172.31.103.53:3000
ENV SFTP_HOST=sftp://geo_share@172.31.113.173/home/geo_share/
ENV SFTP_USER=geo_share
ENV SFTP_PASSWORD=cart0grafic0
ENV CORS_ORIGINS="*"
ENV CORS_ALLOW_CREDENTIALS="*"
ENV CORS_ALLOW_METHODS="*"
ENV CORS_ALLOW_HEADERS=Authorization
ENV CORS_EXPOSE_HEADERS=Authorization
ENV HOST="http://172.31.103.53:82"
ENV DB_NAMES="valuaciones,catastro_v2,fotogrametria,valores_municipales,municipios,pcm,plan_ordenamiento_territorial"
ENV AUTHJWT_ALGORITHM="HS512"
ENV TEMPORARY_PATH="tmp"
ENV STATIC_PATH="static"
ENV TEMPLATES="templates"
ENV IMAGES="images"
ENV FONTS="fonts"
ENV DOCS="docs"
ENV PSQL_URI="postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432"
ENV PSQL_URI_DEV="postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432"
ENV PSQL_URI_TEST="postgresql://root:toor@localhost:5432"

EXPOSE 5000 
CMD ["python3", "-m", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "5000", "--workers","65", "--log-level", "info", "--use-colors"]
