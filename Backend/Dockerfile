FROM python:3.9.13-alpine3.14
LABEL version="1.0.0"
LABEL description="Backend Server's Image"
LABEL mantenier="Einar Jhordany Serna Valdivia<e.serna.1a.43@gmail.com>"
WORKDIR /usr/src/Backend
COPY . /usr/src/Backend
ENV MUSL_LOCPATH="/usr/share/i18n/locales/musl"
RUN apk --update add bash nano cmake make musl-dev gcc gettext-dev libintl
RUN apk add --no-cache wkhtmltopdf xvfb ttf-dejavu ttf-droid ttf-freefont ttf-liberation python3-dev jpeg-dev zlib-dev git freetype-dev libffi-dev musl-locales 

RUN apk add --no-cache --virtual .build-deps build-base linux-headers
RUN ln -s /usr/bin/wkhtmltopdf /usr/local/bin/wkhtmltopdf
RUN chmod +x /usr/local/bin/wkhtmltopdf
RUN python -m pip install --upgrade pip
RUN pip install reportlab psycopg2-binary
#LABEL reference="at this repo: https://github.com/alpine-wheels/index"
#RUN pip install --extra-index-url https://alpine-wheels.github.io/index pandas numpy
RUN pip install --no-cache-dir -r /usr/src/Backend/requirements.txt
ENV LANG=es_MX.UTF-8
ENV LC_ALL=es_MX.UTF-8
ENV FLASK_APP="wsgi.py"
ENV FLASK_RUN_HOST='0.0.0.0'
ENV FLASK_RUN_PORT=56733
ENV FLASK_ENV="production"
ENV DEBUG=False
ENV SECRET_KEY='#__ S3c de F&&nanzas, GOBIERNO de gt0 __#'
ENV VERSION=1
ENV API_URL=/api/v1/
ENV TITLE='API DEV'
ENV CORS="*"
ENV CORS_ORIGIN="*"
ENV TEMPORARY_PATH=tmp
ENV DATABASE_URL='postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432/valuaciones'

EXPOSE 56733
CMD ["flask", "run"]