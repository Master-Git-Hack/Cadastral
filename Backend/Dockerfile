FROM python:3.10.8-slim-buster
LABEL version='2.0.0'
LABEL description="Backend Server's Image"
LABEL mantenier='Einar Jhordany Serna Valdivia<eserna@guanajuato.gob.mx>'
WORKDIR /usr/src/Backend
COPY . /usr/src/Backend
RUN apt-get update --allow-releaseinfo-change && \
    apt-get install -y nano wget fontconfig libfreetype6 \
    libjpeg62-turbo libpng16-16 libx11-6 libxcb1 libxext6 \
    libxrender1 xfonts-75dpi xfonts-base \
    default-libmysqlclient-dev lighttpd && \
    service lighttpd start &&\
    python -m pip install --upgrade pip && \
    pip install --no-cache-dir -r /usr/src/Backend/requirements.txt
COPY  ./docs/_build/html/ /var/www/html/
RUN apt autoclean && apt autoremove && rm -rf /var/lib/apt/lists/*
RUN chmod +x run.sh

ENV SERVER_HOST="0.0.0.0"
ENV PORT=5000
ENV ENV=production
ENV DESCRIPTION="Backend Server's Image, version 2.0.0.\n API para apoyo del sistema principal de la Dirección de Recursos Materiales, Servicios Generales y Catastro de la Secretaría de Finanzas, Inversión y Administración."
ENV SECRET_KEY="~<[({#__ ¿¡Dirección de r3cUrZ0S MATERIALES, servicios G3ÑER4L3S &y& c4t4str0 d3 L4 S3cretaria de F&y&ñanz@$\, &i&nv3rs&i&ón y administración, GOBIERNO d3 GUANAJUATO!? %__#})]>~;"
ENV VERSION=2
ENV API_URL="/api/v2"
ENV TITLE="API DEV"
ENV ALLOWED_ORIGINS=["*"]
ENV TEMPORARY_PATH=tmp
ENV DATABASE_URL=postgresql://info-cat3:#jhgfye%rwA@172.31.113.151:5432/valuaciones
ENV DATABASE_DEV_URL=postgresql://postgres:root@localhost:5432/postgres
ENV DATABASE_TEST_URL=postgresql://postgres:root@localhost:5432/postgres

EXPOSE 5000 80
CMD ["sh", "./run.sh"]
