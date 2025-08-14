# Sistema de Revisiones de Homologación

## Descripción General

Este sistema permite gestionar revisiones de registros de homologación (terrenos y rentas) de manera integrada con el módulo existente de justipreciaciones.

## Funcionalidades Principales

### ✅ Estados de Revisión
- **Sin Revisión**: Registro sin revisiones pendientes
- **En Revisión**: Revisión activa pendiente de aprobación/rechazo
- **Aprobado**: Revisión completada y aprobada
- **Rechazado**: Revisión rechazada con comentarios

### ✅ Acciones Disponibles
- **Crear Revisión**: Generar nueva revisión para un registro
- **Aprobar**: Aprobar una revisión existente con comentarios opcionales
- **Rechazar**: Rechazar una revisión con motivos obligatorios
- **Ver Historial**: Consultar historial completo de cambios
- **Ver Sugerencias**: Revisar sugerencias específicas de campos

### ✅ Integración con Backend
- Endpoints REST completos para CRUD de revisiones
- Validación automática de estados y transiciones
- Historial persistente de todas las acciones
- Sistema de permisos por usuario

## Componentes Principales

### 1. `useRevisionIntegration` Hook
Hook principal que maneja toda la lógica de integración con revisiones.

```typescript
const {
  revisionInfo,
  isLoading,
  error,
  refreshRevisionStatus,
  createRevision,
  approveRevision,
  rejectRevision,
  // ...
} = useRevisionIntegration({
  recordType: 'TERRENO', // o 'RENTA'
  recordId: 171,
  justipreciacionId: 388
});
```

### 2. `HomologacionRevisionControl` Componente
Componente UI completo para mostrar y controlar el estado de revisiones.

```jsx
<HomologacionRevisionControl
  recordType="TERRENO"
  recordId={171}
  justipreciacionId={388}
  enabled={true}
/>
```

### 3. `RevisionStatusControl` Componente
Control detallado para aprobar/rechazar revisiones con modales de confirmación.

```jsx
<RevisionStatusControl 
  revision={revisionData}
  onStatusChange={handleStatusChange}
/>
```

## Integración en Páginas Existentes

### Paso 1: Importar el Componente
```typescript
import HomologacionRevisionControl from '../components/HomologacionRevisionControl';
```

### Paso 2: Agregar al JSX
```jsx
function MiPaginaHomologacion() {
  const recordId = 171; // Obtener del contexto/params
  const justipreciacionId = 388; // Obtener del contexto/params
  
  return (
    <div>
      {/* Integrar al inicio de la página */}
      <HomologacionRevisionControl
        recordType="TERRENO"
        recordId={recordId}
        justipreciacionId={justipreciacionId}
      />
      
      {/* Resto del contenido existente */}
      <MiFormularioHomologacion />
    </div>
  );
}
```

## Endpoints del Backend

### Crear Revisión
```
POST /api/v1/revisiones/
{
  "homologacion_id": 171,
  "type": "TERRENO",
  "appraisal_purpose": "Revisión de terreno para justipreciación 388",
  "assigned_reviewer": "current_user"
}
```

### Consultar Estado
```
GET /api/v1/revisiones/status/homologacion/171?tipo=terreno
```

### Aprobar Revisión
```
POST /api/v1/revisiones/{revision_id}/aprobar
{
  "comentarios": "Aprobada según criterios técnicos",
  "usuario_revisor": "current_user"
}
```

### Rechazar Revisión
```
POST /api/v1/revisiones/{revision_id}/rechazar
{
  "comentarios": "Requiere correcciones en valores de mercado",
  "usuario_revisor": "current_user"
}
```

## Flujo de Trabajo Típico

### 1. Usuario accede a página de homologación
- El componente automáticamente verifica si hay revisiones
- Muestra el estado actual y acciones disponibles

### 2. Crear nueva revisión (si no existe)
- Usuario hace clic en "Crear Revisión"
- Sistema genera revisión en estado "PENDIENTE"
- Se actualiza la interfaz automáticamente

### 3. Revisar y aprobar/rechazar
- Usuario con permisos puede aprobar o rechazar
- Sistema solicita comentarios opcionales/obligatorios
- Estado se actualiza y se registra en historial

### 4. Consultar historial
- Ver todos los cambios y comentarios
- Rastrear quién hizo qué y cuándo
- Auditoría completa del proceso

## Estados Técnicos del Backend

```typescript
enum RevisionStatus {
  PENDIENTE = "PENDIENTE",
  EN_REVISION = "EN_REVISION", 
  APROBADA = "APROBADA",
  RECHAZADA = "RECHAZADA"
}
```

## Mapeo Frontend-Backend

| Frontend Status | Backend Status | Acciones Disponibles |
|----------------|----------------|---------------------|
| `sin_revision` | N/A | Crear |
| `en_revision` | `PENDIENTE`, `EN_REVISION` | Aprobar, Rechazar |
| `revisado` | `APROBADA` | Rechazar |
| `rechazado` | `RECHAZADA` | Aprobar |

## Ejemplo Completo de Uso

Ver el archivo: `examples/EjemploIntegracionHomologacion.tsx`

## Manejo de Errores

El sistema incluye manejo robusto de errores:
- Validación de campos requeridos
- Manejo de errores de red
- Mensajes de error específicos del backend
- Reintentos automáticos cuando sea apropiado

## Consideraciones de Rendimiento

- Consultas optimizadas que solo obtienen datos necesarios
- Actualización incremental del estado
- Debouncing automático para evitar llamadas excesivas
- Cache local de estados para mejorar UX

## TODO / Mejoras Futuras

- [ ] Integración con sistema de notificaciones
- [ ] Permisos granulares por tipo de usuario
- [ ] Configuración de flujos de aprobación multi-nivel
- [ ] Dashboard de métricas de revisiones
- [ ] Exportación de reportes de auditoría
