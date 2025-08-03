# Módulo de Revisiones - Homologación

## 📋 Resumen

El módulo de revisiones permite a los usuarios revisar y sugerir cambios en las homologaciones de justipreciación sin afectar los cálculos originales. Implementa un flujo completo de revisión colaborativa con trazabilidad completa.

## 🏗️ Arquitectura

### Redux Store
- **Slice**: `HomologacionRevisiones`
- **Namespace**: `REVISION`
- **API**: Integrado con el sistema de consumo existente (`api()`)

### Estructura de Archivos
```
Revisiones/
├── index.ts                    # Exportaciones principales
├── useRevisiones.ts           # Hook personalizado
├── revisionUtils.ts           # Utilidades de integración
├── RevisionModal.tsx          # Modal para iniciar revisiones
├── RevisionPanel.tsx          # Panel flotante durante revisión
├── RevisionHistory.tsx        # Historial de revisiones
└── redux/
    ├── revisiones.interface.ts    # Interfaces TypeScript
    ├── revisiones.initialState.ts # Estado inicial
    ├── revisiones.actions.ts      # Lógica de negocio
    ├── revisiones.reducer.ts      # Reducers Redux
    └── index.ts                   # Configuración del slice
```

## 🎯 Funcionalidades

### Para Revisores
- ✅ Iniciar nueva revisión con comentarios generales
- ✅ Agregar sugerencias específicas por campo
- ✅ Vista en tiempo real de sugerencias pendientes
- ✅ Envío de revisión completa al valorador

### Para Valoradores
- ✅ Ver historial completo de revisiones
- ✅ Revisar comentarios detallados con valores originales/sugeridos
- ✅ Resolver o descartar comentarios individualmente
- ✅ Aplicar cambios sugeridos al registro

## 🔧 Uso

### Hook Personalizado
```typescript
import { useRevisiones } from './Revisiones';

const MyComponent = () => {
  const {
    revisionData,
    isReviewing,
    currentSuggestions,
    canReview,
    startNewRevision,
    addFieldSuggestion,
    submitCurrentRevision
  } = useRevisiones();
  
  // Tu lógica aquí
};
```

### Utilidades
```typescript
import { RevisionUtils } from './Revisiones';

// Obtener valor actual de un campo
const currentValue = RevisionUtils.getCurrentFieldValue(
  homologacionData, 
  'factors.Age.data.0.value'
);

// Validar sugerencia
const { isValid, errors } = RevisionUtils.validateRevisionSuggestion(
  homologacionData,
  fieldPath,
  suggestedValue,
  availableFields
);
```

## 🌐 API Endpoints

### GET
- `REVISION/{id}/{type}/{appraisalPurpose}` - Obtener datos de revisión

### POST
- `REVISION/{id}/{type}/{appraisalPurpose}` - Crear nueva revisión

### PATCH
- `REVISION/{id}/resolve/{commentId}` - Resolver comentario
- `REVISION/{id}/dismiss/{commentId}` - Descartar comentario
- `REVISION/{id}` - Actualizar revisión

## 📊 Estructura de Datos

### RevisionSuggestion
```typescript
interface RevisionSuggestion {
  fieldPath: string;        // "factors.Age.data.0.value"
  currentValue: any;        // Valor actual
  suggestedValue: any;      // Valor sugerido
  comment: string;          // Comentario del revisor
  fieldLabel: string;       // "Edad del Inmueble"
  page: number;            // Página donde está el campo
}
```

### RevisionData
```typescript
interface RevisionData {
  id: string;
  homologacionId: string;
  status: string;
  can_review: boolean;
  can_edit: boolean;
  revisiones: RevisionEntry[];
  created_at: string;
  updated_at: string;
}
```

## 🎨 Componentes UI

### RevisionModal
Modal para iniciar nuevas revisiones con comentarios generales.

### RevisionPanel
Panel flotante que aparece durante una revisión activa, mostrando las sugerencias pendientes.

### RevisionHistory
Componente completo para mostrar el historial de revisiones con posibilidad de resolver/descartar comentarios.

## 🔒 Permisos

- **can_review**: Puede iniciar nuevas revisiones
- **can_edit**: Puede resolver/descartar comentarios y aplicar cambios

## 🚀 Integración

El módulo se integra automáticamente cuando:
1. El registro de homologación existe (`record.status === "exists"`)
2. Se tienen los permisos necesarios
3. Los datos se cargan automáticamente al montar los componentes

### En el Componente Principal
```typescript
// Los botones aparecen automáticamente cuando hay permisos
{id !== 0 && record.status === "exists" && (
  <>
    <Button onClick={() => setShowRevisionHistory(true)}>
      Ver Revisiones
    </Button>
    
    {revisionData?.can_review && (
      <Button onClick={() => dispatch(showRevisionModal())}>
        Iniciar Revisión
      </Button>
    )}
  </>
)}
```

## 🔄 Estados

- `loading`: Cargando datos
- `success`: Operación exitosa
- `error`: Error en operación
- `idle`: Estado inicial

## 📝 Validaciones

- Los campos deben existir en `availableFields`
- Los valores sugeridos deben ser diferentes a los actuales
- Se mantiene la consistencia de tipos de datos
- Se valida la existencia de rutas de campos

## 🎯 Características Clave

1. **No Intrusivo**: No afecta los cálculos existentes
2. **Type Safe**: TypeScript estricto en toda la implementación
3. **Modular**: Completamente separado y reutilizable
4. **Trazable**: Registro completo de cambios y autores
5. **Colaborativo**: Flujo de trabajo revisor/valorador
6. **Persistente**: Integración completa con backend
