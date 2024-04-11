FROM python:3.9.14-slim
LABEL version="1.0.0"
LABEL description="Backend Server's Image"
LABEL mantenier="Einar Jhordany Serna Valdivia<e.serna.1a.43@gmail.com>"
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
    pip install --no-cache-dir -r /usr/src/Backend/requirements.txt

ENV LANG=es_MX.UTF-8
ENV LC_ALL=es_MX.UTF-8
ENV FLASK_APP="wsgi.py"
ENV FLASK_RUN_HOST='0.0.0.0'
ENV FLASK_RUN_PORT=56733
ENV FLASK_ENV="production"
ENV DEBUG=False
ENV SECRET_KEY='~<[({#__ ¿¡S3cretaria de F&&ñanz@$\, GOBIERNO d|3 GUANAJUATO!? %__#})]>~;'
ENV VERSION=1
ENV API_URL=/api/v1/
ENV TITLE='API DEV'
ENV CORS="*"
ENV CORS_ORIGIN="*"
ENV TEMPORARY_PATH=tmp
ENV DATABASE_URL='postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432/valuaciones'

EXPOSE 56733
CMD ["flask", "run"]