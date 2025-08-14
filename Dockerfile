# =========================================
# Stage 1 - Build Frontend
# =========================================
FROM node:24.5.0-alpine3.21 AS frontend-builder
WORKDIR /app

# Argumentos de build para variables de entorno
ARG NEXT_PUBLIC_API_URL=http://172.31.103.57:5000
ARG NEXT_PUBLIC_API_ENDPOINT=api
ARG NEXT_PUBLIC_API_VERSION=v3

# Configurar locale para frontend
RUN apk add --no-cache icu-data-full icu-libs gettext bash git python3 make g++ && \
    export LANG=es_MX.UTF-8  

COPY package.json ./
RUN yarn install

COPY . .

# Definir variables de entorno para el build
ENV NEXT_PUBLIC_API_URL=http://172.31.103.57:5000
ENV NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT
ENV NEXT_PUBLIC_API_VERSION=$NEXT_PUBLIC_API_VERSION

RUN yarn build

# =========================================
# Stage 2 - Backend + Nginx + Supervisor
# =========================================
FROM python:3.11-slim-bullseye AS backend

# Instalación de dependencias del sistema y configuración de locale
RUN apt-get update --allow-releaseinfo-change && \
    apt-get install -y nano wget fontconfig libfreetype6 \
    libjpeg62-turbo libpng16-16 libx11-6 libxcb1 libxext6 \
    libxrender1 xfonts-75dpi xfonts-base locales nginx supervisor openssl \
    libpq-dev gcc curl && \
    echo "es_MX.UTF-8 UTF-8" >> /etc/locale.gen && \
    locale-gen es_MX.UTF-8 && \
    update-locale LANG=es_MX.UTF-8 && \
    export LANG=es_MX.UTF-8

# Instalar Node.js para ejecutar Next.js standalone
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Generar certificado SSL autofirmado para desarrollo
RUN mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 \
    -subj "/C=MX/ST=CDMX/L=CDMX/O=Dev/OU=IT/CN=localhost" \
    -newkey rsa:2048 -keyout /etc/nginx/ssl/selfsigned.key \
    -out /etc/nginx/ssl/selfsigned.crt

# Instalar wkhtmltopdf
RUN wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.bullseye_amd64.deb && \
    dpkg -i wkhtmltox_0.12.6.1-2.bullseye_amd64.deb && \
    apt -f install -y && \
    rm wkhtmltox_0.12.6.1-2.bullseye_amd64.deb

# Actualizar pip e instalar dependencias Python
RUN python -m pip install --upgrade pip && \
    pip install reportlab psycopg2-binary pandas && \
    apt-get remove -y gcc libpq-dev curl && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY api/requirements.txt ./api/requirements.txt
RUN pip install --no-cache-dir -r api/requirements.txt

COPY api ./api
COPY --from=frontend-builder /app/.next ./frontend/.next
COPY --from=frontend-builder /app/public ./frontend/public
COPY --from=frontend-builder /app/next.config.js ./frontend/next.config.js
COPY --from=frontend-builder /app/package.json ./frontend/package.json

# Copiar node_modules solo los necesarios para standalone
RUN cp -R /app/frontend/.next/standalone/node_modules /app/frontend/ 2>/dev/null || echo "node_modules already in standalone"

# Dar permisos a www-data para acceder a los archivos del frontend
RUN chown -R www-data:www-data /app/frontend

# Configuración NGINX con reglas de seguridad, HTTPS forzado y SSL
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /var/log/nginx /var/cache/nginx /var/lib/nginx && \
    chown -R www-data:www-data /var/log/nginx /var/cache/nginx /var/lib/nginx && \
    echo "add_header X-Content-Type-Options nosniff;" >> /etc/nginx/conf.d/security.conf && \
    echo "add_header X-Frame-Options SAMEORIGIN;" >> /etc/nginx/conf.d/security.conf && \
    echo "add_header X-XSS-Protection \"1; mode=block\";" >> /etc/nginx/conf.d/security.conf && \
    echo "server_tokens off;" >> /etc/nginx/conf.d/security.conf && \
    echo "if ($scheme = http) { return 301 https://$host$request_uri; }" >> /etc/nginx/conf.d/https_redirect.conf && \
    echo "ssl_certificate /etc/nginx/ssl/selfsigned.crt;" >> /etc/nginx/conf.d/ssl.conf && \
    echo "ssl_certificate_key /etc/nginx/ssl/selfsigned.key;" >> /etc/nginx/conf.d/ssl.conf

# Configuración Supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copiar archivo de configuración
COPY .env .env

# Variables de entorno
ENV PYTHONUNBUFFERED=1 \
    FRONTEND_PORT=3000 \
    BACKEND_PORT=5000 \
    OUTPUT_PORT=80 \
    LANG=es_MX.UTF-8 \
    LC_ALL=es_MX.UTF-8

# Exponemos el puerto público y HTTPS
EXPOSE 80 443 3000 5000

# Comando de arranque
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
