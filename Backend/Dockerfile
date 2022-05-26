FROM python:3.8.2-alpine
LABEL version="1.0.0"
LABEL description="Backend Server's Image"
LABEL mantenier="Einar Jhordany Serna Valdivia<e.serna.1a.43@gmail.com>"
WORKDIR /usr/src/Backend
COPY . /usr/src/Backend
RUN apk --update add bash nano
RUN apk add --no-cache wkhtmltopdf xvfb ttf-dejavu ttf-droid ttf-freefont ttf-liberation gcc python3-dev jpeg-dev zlib-dev git freetype-dev
RUN apk add --no-cache --virtual .build-deps build-base linux-headers
RUN ln -s /usr/bin/wkhtmltopdf /usr/local/bin/wkhtmltopdf
RUN chmod +x /usr/local/bin/wkhtmltopdf
RUN python -m pip install --upgrade pip
RUN pip install reportlab psycopg2-binary
LABEL reference="at this repo: https://github.com/alpine-wheels/index"
RUN pip install --extra-index-url https://alpine-wheels.github.io/index pandas numpy
RUN pip install --no-cache-dir -r /usr/src/Backend/requirements.txt

EXPOSE 5000
CMD ["flask", "run"]