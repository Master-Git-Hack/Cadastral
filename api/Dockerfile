# Base image
FROM python:3.11-slim

LABEL description="Backend Server's Image"
LABEL maintainer="Einar Jhordany Serna Valdivia <eserna@guanajuato.gob.mx>"

# Set the working directory
WORKDIR /usr/src/v3

# Copy the project files
COPY . .

# Install necessary packages and dependencies
RUN apt-get update --allow-releaseinfo-change && \
    apt-get install -y --no-install-recommends \
    nano wget fontconfig libfreetype6 libjpeg62-turbo libpng16-16 \
    libx11-6 libxcb1 libxext6 libxrender1 xfonts-75dpi xfonts-base \
    python3-dev ipython3 build-essential libssl3 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install wkhtmltopdf (fixing missing dependencies)
RUN wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.bullseye_amd64.deb && \
    dpkg -i wkhtmltox_0.12.6.1-2.bullseye_amd64.deb || apt-get -f install -y && \
    rm -rf /var/lib/apt/lists/* wkhtmltox_0.12.6.1-2.bullseye_amd64.deb

# Upgrade pip and install Python dependencies
RUN python -m pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get autoclean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV LANG=es_MX.UTF-8 \
    LANGUAGE=es_MX.UTF-8 \
    LC_ALL=es_MX.UTF-8 \
    FLASK_APP="wsgi.py" \
    DEBUG=False \
    ENV=production \
    API_VERSION=3.0.0 \
    SERVER_HOST=0.0.0.0 \
    SERVER_PORT=5000 \
    LOG_LEVEL="info" \
    RELOAD=0 \
    WORKERS=3 \
    TEMPORARY_PATH="tmp" \
    STATIC_PATH="static" \
    TEMPLATES="templates" \
    IMAGES="images" \
    FONTS="fonts" \
    DOCS="docs"

# Sensitive information (moved to .env file)
# COPY .env /usr/src/v3/.env

# Expose the FastAPI port
EXPOSE 5001

# Healthcheck to monitor app status
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Run the FastAPI application with uvicorn
CMD ["python3", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "5000", "--log-level", "info", "--workers", "3"]
