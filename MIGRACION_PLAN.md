# Plan de Migración v1/v2 → v3 - **EN PROGRESO** 🔄

## 🎯 Objetivos
- Consolidar toda la funcionalidad en la arquitectura v3
- Mantener la funcionalidad del módulo de revisión ya implementado ✅
- Respetar los patrones arquitecturales establecidos en v3
- Migrar progresivamente sin afectar el funcionamiento actual

## 📋 **PROGRESO ACTUAL** 

### ✅ **COMPLETADO**
- [x] **Módulo de Revisión**: Completamente funcional con Redux + UI components
- [x] **Análisis Arquitectural**: Mapeo completo de v1, v2 y v3
- [x] **API Backend v3**: Todas las rutas migradas y funcionales (FastAPI + SQLModel)
- [x] **Página Justipreciación**: Creada estructura base (`/app/justipreciacion/page.tsx`)
- [x] **Página Comparables**: Creada estructura base (`/app/comparables/page.tsx`)
- [x] **Página Reportes**: Creada estructura base (`/app/reportes/page.tsx`)
- [x] **Store Comparables**: Zustand store completo (`/store/comparables/index.ts`)
- [x] **Store Reportes**: Zustand store completo (`/store/reportes/index.ts`)

### 🔄 **EN PROGRESO**
- [ ] **Store Justipreciación**: Extender store existente con costos construcción y obras complementarias
- [ ] **Componentes UI**: Migrar componentes de formularios desde v1/v2 a shadcn/ui
- [ ] **Configuración TypeScript**: Resolver errores de compilación JSX

### ⏳ **PENDIENTE** 
- [ ] **Componentes de Formularios**: Migrar desde RSuite/Flowbite a shadcn/ui
- [ ] **Tablas y Grids**: Migrar componentes de tabla complejos
- [ ] **Generación PDF**: Integrar sistema de reportes
- [ ] **Upload de archivos**: Migrar funcionalidad de carga/parseo
- [ ] **Navegación**: Integrar páginas al sistema de navegación

## 📋 Inventario de Componentes

### 🔐 Sistema de Autenticación
- **v1**: Flask-JWT (manual) → `Backend/v1/v1/apps/Auth/`
- **v2**: FastAPI-JWT-Auth → `Backend/v2/src/api/auth.py`
- **v3**: OAuth2 + SQLModel → `api/src/routes/oauth.py` ✅ **Ya migrado**

### 🏗️ Módulos de Negocio

#### Justipreciación
- **v1**: 
  - `Backend/v1/v1/apps/Justipreciacion/`
  - `Frontend/v1/src/modules/Justipreciacion/`
- **v2**: 
  - `Backend/v2/src/controllers/` (parcial)
- **v3**: 
  - `api/src/routes/justipreciacion.py` ✅
  - `api/src/routes/costos_construccion.py` ✅
  - `api/src/routes/homologacion.py` ✅
  - Frontend: **PENDIENTE** migrar desde v1/v2

#### Catastro/Reportes
- **v1**: 
  - `Backend/v1/v1/apps/Catastro/Reportes/`
  - `Frontend/v1/src/views/Catastral/`
- **v2**: 
  - `Backend/v2/src/controllers/reportes_catastrales.py`
- **v3**: 
  - `api/src/routes/catastral.py` ✅
  - Frontend: **PENDIENTE**

#### Comparables
- **v1**: 
  - `Backend/v1/v1/apps/Comparables/`
  - `Frontend/v1/src/views/Comparables/`
- **v2**: 
  - `Backend/v2/src/api/comparables.py`
  - `Frontend/v2/src/pages/Comparables/`
- **v3**: 
  - `api/src/routes/comparables.py` ✅
  - Frontend: **PENDIENTE**

#### Metadatos
- **v2**: 
  - `Backend/v2/src/api/metadatos.py`
  - `Frontend/v2/src/pages/Meta/`
- **v3**: 
  - `api/src/routes/metadatos.py` ✅
  - Frontend: **PENDIENTE**

#### Fotogrametría
- **v3**: 
  - `api/src/models/fotogrametria.py` ✅
  - `app/fotogrametria/` ✅ (estructura básica)
  - **PENDIENTE**: Completar funcionalidad

## 🚀 Plan de Ejecución

### Fase 1: Migración del Frontend Core (Prioridad Alta)
1. **Componentes UI Base**
   - Migrar componentes de formularios desde v1/v2
   - Adaptar a shadcn/ui y App Router de Next.js
   - Implementar navegación unificada

2. **Páginas Principales**
   - Justipreciación (Homologación, Costos Construcción, Obras Complementarias)
   - Catastro/Reportes
   - Comparables
   - Metadatos

### Fase 2: Unificación de Estado (Prioridad Alta)
1. **Store Global**
   - Migrar lógica de Redux v1 a Zustand (v3)
   - Adaptar hooks de React Hook Form (v2) a v3
   - Mantener el store de revisión existente

2. **API Integration**
   - Adaptar llamadas a la API v3
   - Implementar autenticación OAuth2
   - Manejar estados de carga/error

### Fase 3: Funcionalidades Específicas (Prioridad Media)
1. **Reportes y PDF**
   - Migrar generación de reportes
   - Adaptar templates y watermarks
   - Implementar descarga de archivos

2. **Upload y Parser**
   - Migrar funcionalidad de carga de archivos
   - Adaptar parsers XML/Excel
   - Implementar validaciones

### Fase 4: Optimización y Limpieza (Prioridad Baja)
1. **Performance**
   - Implementar lazy loading
   - Optimizar queries SQLModel
   - Cache y memoización

2. **Cleanup**
   - Remover v1 y v2 tras verificar migración
   - Actualizar documentación
   - Tests finales

## 📁 Estructura Objetivo v3

```
/app                          # Next.js App Router
├── sign-in/                  # Autenticación ✅
├── home/                     # Dashboard ✅
├── fotogrametria/            # ✅ (básico)
├── homologacion/             # ⚠️ MIGRAR desde v1/v2
├── metadatos/                # ⚠️ MIGRAR desde v2
├── justipreciacion/          # ⚠️ CREAR (nuevo módulo)
├── comparables/              # ⚠️ MIGRAR desde v1/v2
└── reportes/                 # ⚠️ MIGRAR desde v1

/api/src                      # FastAPI + SQLModel
├── routes/                   # ✅ API endpoints completos
├── models/                   # ✅ SQLModel definidos  
├── middlewares/              # ✅ Auth + Database
└── controllers/              # ⚠️ MIGRAR lógica desde v2

/store                        # Zustand State Management
├── homologacion/             # ✅ (con revisión)
├── justipreciacion/          # ⚠️ CREAR
├── metadatos/                # ⚠️ MIGRAR
├── fotogrametria/            # ✅
└── user/                     # ✅

/components                   # shadcn/ui + customs
├── ui/                       # ✅ shadcn/ui
├── forms/                    # ⚠️ MIGRAR desde v1/v2
├── tables/                   # ⚠️ MIGRAR desde v1/v2
└── charts/                   # ⚠️ MIGRAR desde v1/v2
```

## 🔄 Comandos de Migración

### Backend (Solo si hay lógica faltante)
```bash
# Revisar diferencias en controladores v2 vs v3
diff -r Backend/v2/src/controllers/ api/src/routes/

# Migrar lógica específica si es necesaria
```

### Frontend (Migración principal)
```bash
# 1. Crear páginas faltantes
mkdir -p app/{justipreciacion,comparables,reportes}

# 2. Migrar componentes
cp -r Frontend/v1/src/modules/* components/
cp -r Frontend/v2/src/components/* components/

# 3. Adaptar a Next.js App Router
# (Manual: convertir React Router a App Router)

# 4. Migrar stores
cp -r Frontend/v1/src/redux/* store/
# (Manual: convertir Redux a Zustand)
```

## ✅ Criterios de Éxito

- [ ] Todas las funcionalidades de v1/v2 disponibles en v3
- [ ] Frontend completamente migrado a Next.js
- [ ] Store unificado en Zustand
- [ ] API v3 funcional al 100%
- [ ] Autenticación OAuth2 funcionando
- [ ] Generación de reportes PDF
- [ ] Tests pasando
- [ ] Documentación actualizada
- [ ] v1 y v2 removidos

## 🚨 Riesgos y Mitigaciones

### Riesgos
1. **Pérdida de funcionalidad** durante migración
2. **Incompatibilidades** entre versiones de librerías
3. **Estados inconsistentes** entre Redux y Zustand
4. **Rutas API diferentes** entre versiones

### Mitigaciones
1. **Migración incremental** por módulos
2. **Tests de regresión** en cada fase
3. **Backup completo** antes de empezar
4. **Rollback plan** por si hay problemas
5. **Documentación detallada** de cambios

## 📝 Notas de Implementación

### Patrones v3 a Seguir
- **SQLModel**: Para todos los modelos de datos
- **OAuth2**: Para autenticación
- **App Router**: Para rutas del frontend
- **Zustand**: Para manejo de estado
- **shadcn/ui**: Para componentes UI
- **TypeScript**: Tipado estricto
- **Container Pattern**: Para deployment

### Convenciones de Código
- Nombres en inglés para archivos/funciones
- Interfaces TypeScript para props
- Async/await para llamadas API
- Error boundaries para componentes
- Loading states consistentes

## 📊 Estado Actual del Progreso

### ✅ Completado
- [x] ✅ **Análisis arquitectural completo** - Mapeo de v1/v2 a v3
- [x] ✅ **Migración plan documentado** - Estrategia y cronograma
- [x] ✅ **Páginas base creadas** - justipreciacion, comparables, reportes
- [x] ✅ **Stores Zustand implementados** - comparables, reportes
- [x] ✅ **Configuración TypeScript reparada** - React 18 instalado
- [x] ✅ **Componentes de migración** - Biblioteca temporal para v1/v2
- [x] ✅ **Página de prueba funcional** - Validación de componentes

### 🔄 En Progreso
- [ ] 🔄 **Migración de páginas v1/v2** - Usando componentes de migración
- [ ] 🔄 **Integración con backend API** - Validación de endpoints
- [ ] 🔄 **Testing de componentes** - Verificación de funcionalidad

### ⏳ Pendiente
- [ ] ⏳ **Migración completa de RSuite a shadcn/ui**
- [ ] ⏳ **Optimización de rendimiento**
- [ ] ⏳ **Documentación de API migrada**
- [ ] ⏳ **Testing end-to-end**
- [ ] ⏳ **Cleanup de v1/v2**

---

> **Próximos pasos:** Comenzar migración práctica de páginas v1/v2 usando los componentes de migración creados y los stores implementados.
