# Sistema de Revisiones - v3

## Descripción General

El **Sistema de Revisiones** es una funcionalidad completa migrada de v1 que permite crear, gestionar y resolver revisiones de homologaciones con comentarios, sugerencias y flujo de aprobación.

## Características Principales

### ✅ **Funcionalidades Migradas de v1**

1. **Modal de Revisión** (`RevisionModal`)
   - Formulario para agregar sugerencias
   - Selección de campos específicos
   - Comentarios por campo
   - Comentarios generales
   - Validación de formularios

2. **Historial de Revisiones** (`RevisionHistory`)
   - Lista completa de revisiones
   - Detalle de comentarios
   - Estados de comentarios (PENDING, RESOLVED, DISMISSED)
   - Acciones de resolución

3. **Panel de Estado** (`RevisionPanel`)
   - Estado actual de revisión
   - Estadísticas en tiempo real
   - Acciones rápidas
   - Indicadores visuales

### 🏗️ **Arquitectura v3**

#### **Store (Zustand)**
```typescript
// Store principal
const useRevisionesStore = create<RevisionStore>()

// Selectores específicos
const revisionData = useRevisionData()
const isReviewing = useIsReviewing()
const currentSuggestions = useCurrentSuggestions()
```

#### **Componentes**
```tsx
import { RevisionModal, RevisionHistory, RevisionPanel } from "@/components/revisiones"

// Uso básico
<RevisionModal />
<RevisionHistory />
<RevisionPanel />
```

#### **Hooks Personalizados**
```tsx
import { useRevisiones } from "@/hooks/useRevisiones"

// Hook completo
const revisiones = useRevisiones({
  homologacionId: 123,
  tipo: "TERRENO",
  tipoServicio: "ADQUISICION"
})

// Hook específico
const revisionesWithData = useRevisionesWithData(123, "TERRENO", "ADQUISICION")

// Hook UI solamente
const ui = useRevisionesUI()
```

## Tipos de Datos

### **RevisionComment**
```typescript
interface RevisionComment {
  id: string
  fieldPath: string
  fieldLabel: string
  page: number
  originalValue: any
  suggestedValue: any
  comment: string
  status: "PENDING" | "RESOLVED" | "DISMISSED"
  reviewer: string
  created_at: string
  resolved_at?: string
  resolved_by?: string
}
```

### **RevisionEntry**
```typescript
interface RevisionEntry {
  version: string
  created_by: string
  created_at: string
  status: "EN_REVISION" | "COMPLETADA" | "PENDIENTE_CORRECCION"
  comments: RevisionComment[]
  general_comments?: string
  summary: {
    total_comments: number
    pending_comments: number
    resolved_comments: number
    dismissed_comments: number
  }
}
```

### **RevisionData**
```typescript
interface RevisionData {
  homologacion_id: number
  tipo: "TERRENO" | "RENTA"
  tipo_servicio: string
  status: string
  current_version: string
  can_review: boolean
  revisiones: RevisionEntry[]
  stats: {
    total_revisiones: number
    comentarios_pendientes: number
    ultima_revision: string
  }
}
```

## API Endpoints

### **GET** `/api/revisiones/{homologacion_id}/{tipo}/{tipo_servicio}`
```typescript
// Obtener datos de revisión
const response = await fetch(`/api/revisiones/123/TERRENO/ADQUISICION`)
const data: RevisionData = await response.json()
```

### **POST** `/api/revisiones/{homologacion_id}`
```typescript
// Crear nueva revisión
const payload: CreateRevisionRequest = {
  suggestions: [...],
  generalComments: "...",
  homologacionId: 123,
  tipo: "TERRENO",
  tipoServicio: "ADQUISICION"
}

await fetch(`/api/revisiones/123`, {
  method: "POST",
  body: JSON.stringify(payload)
})
```

### **PATCH** `/api/revisiones/{homologacion_id}/comment/{comment_id}/resolve`
```typescript
// Resolver comentario
await fetch(`/api/revisiones/123/comment/456/resolve`, {
  method: "PATCH",
  body: JSON.stringify({ action: "resolve" })
})
```

## Uso Práctico

### **1. Integración Básica**
```tsx
import { RevisionModal, RevisionPanel } from "@/components/revisiones"
import { useRevisiones } from "@/hooks/useRevisiones"

function HomologacionPage() {
  const {
    revisionData,
    isReviewing,
    ui,
    startNewRevision,
    stats
  } = useRevisiones({
    homologacionId: 123,
    tipo: "TERRENO",
    tipoServicio: "ADQUISICION"
  })

  return (
    <div>
      {/* Panel flotante */}
      {isReviewing && (
        <div className="fixed top-4 right-4 z-50">
          <RevisionPanel />
        </div>
      )}

      {/* Botón para iniciar revisión */}
      <Button onClick={() => startNewRevision()}>
        Nueva Revisión
      </Button>

      {/* Modal automático */}
      <RevisionModal />
    </div>
  )
}
```

### **2. Historial de Revisiones**
```tsx
import { RevisionHistory } from "@/components/revisiones"

function RevisionHistoryPage() {
  return (
    <div className="container">
      <h1>Historial de Revisiones</h1>
      <RevisionHistory />
    </div>
  )
}
```

### **3. Gestión Avanzada**
```tsx
const {
  addFieldSuggestion,
  resolveFieldComment,
  dismissFieldComment,
  submitCurrentRevision
} = useRevisiones()

// Agregar sugerencia programáticamente
addFieldSuggestion({
  fieldPath: "factors.zone",
  fieldLabel: "Factor de Zona",
  page: 1,
  currentValue: 1.0,
  suggestedValue: 1.2,
  comment: "El factor debería ser mayor"
})

// Resolver comentario
await resolveFieldComment("v20250103_143022", "comment-123")

// Enviar revisión
await submitCurrentRevision("Revisión completada")
```

## Estados y Flujo

### **Estados de Revisión**
- `PENDIENTE` - Sin revisiones
- `EN_REVISION` - Revisión activa
- `REVISADO_CON_ERRORES` - Tiene comentarios pendientes
- `REVISADO_APROBADO` - Todo resuelto
- `RECHAZADO` - Revisión rechazada
- `OBSOLETO` - Versión obsoleta

### **Estados de Comentarios**
- `PENDING` - Comentario pendiente
- `RESOLVED` - Comentario resuelto
- `DISMISSED` - Comentario descartado

### **Flujo de Trabajo**
1. **Inicio**: Usuario inicia nueva revisión
2. **Agregar**: Usuario agrega sugerencias por campo
3. **Envío**: Usuario envía revisión completa
4. **Revisión**: Otro usuario revisa comentarios
5. **Resolución**: Comentarios se resuelven o descartan
6. **Cierre**: Revisión se marca como completada

## Migración desde v1

### **Cambios Principales**

1. **Redux → Zustand**: Store simplificado
2. **RSuite → shadcn/ui**: Componentes modernos
3. **Flask → FastAPI**: API más robusta
4. **Hooks personalizados**: Lógica reutilizable

### **Compatibilidad**

- ✅ Todas las funcionalidades de v1 migradas
- ✅ Misma estructura de datos
- ✅ Flujo de trabajo preservado
- ✅ Tipos TypeScript completos

### **Mejoras en v3**

- 🚀 Rendimiento mejorado con Zustand
- 🎨 UI moderna con shadcn/ui
- 📱 Responsive design
- 🔧 TypeScript completo
- 🧪 Hooks testeable
- 📦 Bundle size optimizado

## Demo

Visita `/revisiones/demo` para ver el sistema completo en funcionamiento con datos simulados.

## Próximos Pasos

1. **Integración con Auth**: Conectar con sistema de autenticación
2. **Notificaciones**: Sistema de notificaciones en tiempo real
3. **Métricas**: Dashboard de métricas de revisiones
4. **Export**: Exportar reportes de revisiones
5. **Templates**: Plantillas de revisiones frecuentes
