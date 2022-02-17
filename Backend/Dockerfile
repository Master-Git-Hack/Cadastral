FROM python:3.8.2-alpine
LABEL version="1.0.0"
LABEL description="Cadastral Backend Server's Image"
LABEL mantenier="Einar Jhordany Serna Valdivia<eserna@guanajuato.gob.mx>"
WORKDIR /usr/src/Backend
COPY . /usr/src/Backend
ENV FLASK_APP=run.py
RUN apk --update add bash nano \ 
    && apk add --no-cache wkhtmltopdf xvfb ttf-dejavu ttf-droid ttf-freefont ttf-liberation gcc python3-dev jpeg-dev zlib-dev \
    && apk add --no-cache --virtual .build-deps build-base linux-headers \
    && ln -s /usr/bin/wkhtmltopdf /usr/local/bin/wkhtmltopdf \
    && chmod +x /usr/local/bin/wkhtmltopdf \
    && python -m pip install --upgrade pip \
    && pip install psycopg2-binary \
    && pip install reportlab \
    && pip install --no-cache-dir -r /usr/src/Backend/requirements.txt

EXPOSE 80
CMD ["flask", "run"]