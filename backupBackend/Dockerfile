FROM python:3.8.2-alpine
LABEL version="1.0.0"
LABEL description="Cadastral Backend Server's Image"
LABEL mantenier="Einar Jhordany Serna Valdivia<eserna@guanajuato.gob.mx>"
WORKDIR /usr/src/Backend
COPY . /usr/src/Backend
RUN apk --update add bash nano
RUN apk add --no-cache wkhtmltopdf xvfb ttf-dejavu ttf-droid ttf-freefont ttf-liberation gcc python3-dev jpeg-dev zlib-dev git freetype-dev
RUN apk add --no-cache --virtual .build-deps build-base linux-headers 
RUN ln -s /usr/bin/wkhtmltopdf /usr/local/bin/wkhtmltopdf
RUN chmod +x /usr/local/bin/wkhtmltopdf
RUN python -m pip install --upgrade pip
RUN pip install psycopg2-binary
RUN pip install reportlab
RUN pip install --no-cache-dir -r /usr/src/Backend/requirements.txt

EXPOSE 80
CMD ["flask", "run"]