# Proyecto Catastral

## Índice

1. Descripción General
2. Estructura de Versiones
   - v3: Next.js + FastAPI
   - v2: Vite + React + FastAPI
   - v1: React + Flask (Python 3.11)
3. Estructura de Carpetas
4. Tecnologías y Dependencias
5. Despliegue y Ejecución
   - Cómo subir el proyecto
   - Cómo correr el proyecto
6. Notas Relevantes

---

## 1. Descripción General

El proyecto Catastral es una plataforma web para gestión de diversos modulos complementarios del area, compuesta por frontend y backend desacoplados, con diferentes stacks según la versión. Utiliza contenedores Docker para facilitar el despliegue y la integración de servicios como Nginx, Supervisor y bases de datos PostgreSQL.

---

## 2. Estructura de Versiones

### v3: Next.js + FastAPI

- **Frontend:** Next.js (SSR/CSR), TypeScript, React.
- **Backend:** FastAPI (Python 3.11).
- **Despliegue:** Docker multi-stage, Nginx como proxy reverso, Supervisor para gestión de procesos.
- **Ubicación:** Carpetas principales: `/app`, `/api`, `/Backend`.a

### v2: Vite + React + FastAPI

- **Frontend:** Vite, React, TypeScript.
- **Backend:** FastAPI (Python 3.11).
- **Despliegue:** Docker, Nginx.
- **Ubicación:** `/Frontend/v2`, `/api`.

### v1: React + Flask (Python 3.11)

- **Frontend:** React clásico.
- **Backend:** Flask (Python 3.11).
- **Despliegue:** Docker, Nginx.
- **Ubicación:** `/Frontend/v1`, `/Backend/v1`.

---

## 3. Estructura de Carpetas

- `/app`: Frontend Next.js (v3), páginas, componentes, estilos.
- `/api`: Backend FastAPI, middlewares, modelos, rutas.
- `/Frontend/v2`: Frontend Vite + React (v2).
- `/Frontend/v1`: Frontend React clásico (v1).
- `/Backend/v1`: Backend Flask (v1).
- `/Backend/v2`: Backend FastAPI (v2).
- `/Backend/source`: Documentación Sphinx.
- `/components`: Componentes compartidos.
- `/public`: Recursos estáticos.
- `/store`, `/utils`, `/hooks`: Lógica y utilidades compartidas.
- `/requirements`: Documentos y archivos de requerimientos.

---

## 4. Tecnologías y Dependencias

- **Frontend:** Next.js, React, Vite, TypeScript, PostCSS, ESLint.
- **Backend:** FastAPI, Flask, Python 3.11, PostgreSQL.
- **Infraestructura:** Docker, Nginx, Supervisor.
- **Documentación:** Sphinx (Python).
- **Otros:** Scripts de despliegue (`start.sh`, `deploy.sh`), configuración (`nginx.conf`, `supervisord.conf`).

---

## 5. Despliegue y Ejecución

### Cómo subir el proyecto

1. Clona el repositorio:
   ```sh
   git clone <URL-del-repo>
   cd Cadastral
   ```

2. Configura variables de entorno y archivos de configuración según el entorno (ver `README_REVISIONES.md` y archivos `.env.example` si existen).

3. Instala dependencias:
   - Frontend Next.js/Vite:
     ```sh
     cd app # o Frontend/v2
     npm install
     ```
   - Backend FastAPI/Flask:
     ```sh
     cd api # o Backend/v1
     pip install -r requirements.txt
     ```

### Cómo correr el proyecto

#### Usando Docker (recomendado)

1. Construye y levanta los servicios:
   ```sh
   docker compose up --build
   ```
   - Esto levanta frontend, backend, nginx y base de datos según los archivos `compose.yml` y `Dockerfile`.

2. Accede a la aplicación en el navegador:
   - Frontend: `http://localhost:3000` (Next.js) o el puerto configurado.
   - Backend: `http://localhost:8000` (FastAPI) o el puerto configurado.

#### Sin Docker (desarrollo local)

- **Frontend Next.js/Vite:**
  ```sh
  cd app # o Frontend/v2
  npm run dev
  ```
- **Backend FastAPI:**
  ```sh
  cd api
  uvicorn src.main:app --reload
  ```
- **Backend Flask:**
  ```sh
  cd Backend/v1
  python app.py
  ```

---

## 6. Notas Relevantes




## 7. Complementos y Mantenimiento

### Scripts de automatización

- `start.sh`: Arranca los servicios principales (frontend, backend, nginx, etc).
- `deploy.sh`: Automatiza el despliegue en producción.
- `run.sh` (en Frontend/v2 y Backend/v1): Ejecuta el entorno local o productivo según la versión.
- `.backend.sh`: Script para levantar el backend desde el frontend (Next.js).
- `test_revisiones.sh`: Ejecuta pruebas de integración de revisiones.

### Instalación de dependencias

- **Frontend Next.js/Vite:**
   ```sh
   npm install
   ```
- **Frontend Vite (v2):**
   ```sh
   cd Frontend/v2
   npm install
   ```
- **Backend FastAPI:**
   ```sh
   cd api
   pip install -r requirements.txt
   ```
- **Backend Flask (v1):**
   ```sh
   cd Backend/v1
   pip install -r requirements.v1.txt
   ```

### Archivos package.json y requirements.txt

- `package.json` (raíz, Frontend/v2, app/): Define scripts, dependencias y comandos útiles para desarrollo y producción.
- `requirements.txt` (api/): Lista de dependencias Python para FastAPI.
- `requirements.v1.txt` (Backend/v1): Lista de dependencias Python para Flask.

### Módulos complementarios

- **Justipreciación:**
   - Frontend: `/app/homologacion/[justipreciacion]/create/`, `/app/homologacion/[justipreciacion]/edit/`
   - Backend: `/api/src/models/justipreciacion.py`, `/api/src/routes/justipreciacion.py`
- **Fotogrametría:**
   - Frontend: `/app/fotogrametria/`, `/app/fotogrametria/[municipio]/`
   - Backend: `/api/src/models/fotogrametria.py`, `/api/src/routes/fotogrametria.py`
- **Metadatos:**
   - Frontend: `/app/metadatos/`, `/app/metadatos/create/`, `/app/metadatos/[uid]/view/`
   - Backend: `/api/src/models/metadatos.py`, `/api/src/routes/metadatos.py`
- **Revisión:**
   - Frontend: `/components/revision/`
   - Backend: `/api/src/models/revision_checklist.py`, `/api/src/routes/revisiones.py`

### Modificar modelos o endpoints

- **v3 (FastAPI):**
   - Modelos: `/api/src/models/`
   - Endpoints: `/api/src/routes/`
   - Ejemplo: Para modificar el modelo de justipreciación, edita `/api/src/models/justipreciacion.py`. Para modificar el endpoint, edita `/api/src/routes/justipreciacion.py`.

- **v2 (FastAPI):**
   - Igual que v3, pero puede haber diferencias en la estructura de carpetas.

- **v1 (Flask):**
   - Modelos y endpoints: `/Backend/v1/v1/` (puede estar en subcarpetas o archivos como `app.py`).
   - Ejemplo: Para modificar el modelo o endpoint de justipreciación, busca el archivo correspondiente en `/Backend/v1/v1/`.

- **Frontend:** Los módulos complementarios se encuentran en las rutas indicadas arriba, y puedes modificar componentes, hooks o páginas según la funcionalidad.
---

¿Necesitas agregar ejemplos de configuración, variables de entorno, o detalles de endpoints?
