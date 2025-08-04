# Sistema de Factores Avanzados - v3

## Descripción

Sistema completo de gestión de factores para evaluaciones de terrenos y rentas, migrado desde v1 con arquitectura moderna v3.

## Arquitectura

### Tecnologías Utilizadas
- **Frontend**: Next.js 14 con App Router
- **Estado**: Zustand con TypeScript
- **UI**: shadcn/ui con Tailwind CSS
- **Integración**: Hooks personalizados para v3

### Estructura del Módulo

```
store/factores/
├── types.ts          # Definiciones TypeScript
└── index.ts          # Store Zustand

components/factores/
├── common-factor.tsx    # Factores comunes (Clasificación, Uso, etc.)
├── age-factor.tsx       # Factor de edad para rentas
├── symbol-factor.tsx    # Factores de símbolos/zona
├── factor-selector.tsx  # Selector de factores habilitados
└── index.tsx           # Componentes principales

hooks/
└── useFactoresV3.tsx   # Hooks personalizados

app/factores/demo/
└── page.tsx           # Página de demostración
```

## Componentes Principales

### 1. CommonFactor
Maneja factores estándar como Clasificación, Tipo y Forma, Uso, Topografía, Edificación, Calidad, Nivel y Proyecto.

**Características:**
- Selector de sujeto con opciones predefinidas
- Tabla de comparativos con cálculos automáticos
- Indicador de posición en la evaluación
- Responsivo y accesible

### 2. AgeFactor
Factor específico para evaluaciones de renta basado en edad.

**Características:**
- Inputs numéricos para valores de edad
- Cálculo automático de factores
- Sujeto configurable
- Solo se muestra para tipo "RENTA"

### 3. SymbolFactor
Factores de ubicación y zona con múltiples columnas.

**Características:**
- Gestión dinámica de filas
- Múltiples columnas configurables
- Opciones específicas por tipo de símbolo
- Botones para agregar/remover filas

### 4. FactorSelector
Interfaz para habilitar/deshabilitar factores según el tipo de evaluación.

**Características:**
- Lista de factores disponibles por tipo
- Control de posición en la tabla
- Indicadores visuales de estado
- Restricciones por tipo (TERRENO/RENTA)

### 5. Compilation y AgeContainer
Contenedores organizados para mostrar factores en grupos lógicos.

**Características:**
- Layout responsivo con grid system
- Organización por categorías
- Adaptación automática según tipo
- Integración con todos los factores

## Store (Zustand)

### Estado Principal
```typescript
interface FactoresState {
  // Factores comunes
  Classification: CommonFactor;
  TypeForm: CommonFactor;
  Usage: CommonFactor;
  Topography: CommonFactor;
  Building: CommonFactor;
  Quality: CommonFactor;
  Level: CommonFactor;
  Project: CommonFactor;
  
  // Factor de edad
  Age: AgeFactor;
  
  // Factores de símbolos
  Location: SymbolFactor;
  Zone: SymbolFactor;
  
  // Control global
  loading: boolean;
  error: string | null;
  type: "TERRENO" | "RENTA";
}
```

### Acciones Principales
- `updateCommonSubject`: Actualizar sujeto de factor común
- `updateCommonData`: Actualizar datos de comparativos
- `setAgeSubject/setAgeData`: Gestión de factor de edad
- `updateSymbolsData`: Gestión de factores de símbolos
- `setEnabledFactors`: Control de factores habilitados
- `loadFactors/resetFactors`: Gestión de datos

### Selectores
- `getEnabledFactors`: Obtener factores activos
- `getFactorByName`: Obtener factor específico
- `getCalculatedResults`: Calcular resultados totales

## Hooks Personalizados

### useFactores()
Hook principal para acceso completo al sistema.
```typescript
const { factors, actions, selectors, loading, error, type } = useFactores();
```

### useFactor(name)
Hook para manejar un factor específico.
```typescript
const { factor, updateSubject, updateData, isEnabled, position } = useFactor('Classification');
```

### useFactorCalculations()
Hook para cálculos y resultados.
```typescript
const { enabledFactors, results, totalFactor, factorCount } = useFactorCalculations();
```

### useSymbolRows(factorName)
Hook para gestión de filas en factores de símbolos.
```typescript
const { rows, addRow, removeRow, canRemove, columns } = useSymbolRows('Location');
```

### useFactorSelectorHook()
Hook para el selector de factores.
```typescript
const { type, enabledFactors, availableFactors, toggleFactor } = useFactorSelectorHook();
```

## Tipos de Evaluación

### TERRENO
Factores habilitados:
- Classification, TypeForm, Location, Usage
- Topography, Building, Quality, Zone

### RENTA
Factores habilitados:
- Classification, TypeForm, Location, Usage
- Topography, Building, Age, Level, Project

## Integración con v1

### Exportación a v1
```typescript
const v1Data = integration.exportToV1Format();
// Retorna estructura compatible con Redux store v1
```

### Importación desde v1
```typescript
integration.importFromV1(v1Data);
// Configura store v3 con datos de v1
```

## Demostración

Accede a `/factores/demo` para ver:
- **Compilación**: Todos los factores organizados
- **Edad y Zona**: Factores específicos por tipo
- **Selector**: Configuración de factores activos
- **Resultados**: Cálculos y estadísticas

### Características de la Demo
- Estadísticas en tiempo real
- Cambio dinámico de tipo (TERRENO/RENTA)
- Visualización de resultados calculados
- Estado del sistema completo
- Botones de acción (reset, exportar, etc.)

## Migración desde v1

### Funcionalidades Migradas ✅
- [x] Factores comunes con selectores
- [x] Factor de edad con inputs numéricos
- [x] Factores de símbolos con filas dinámicas
- [x] Selector de factores habilitados
- [x] Cálculos automáticos
- [x] Tipos TERRENO y RENTA
- [x] Contenedores organizados
- [x] Integración completa

### Mejoras v3
- **UI Moderna**: shadcn/ui components
- **TypeScript**: Tipos estrictos en todo el sistema
- **Estado Predictible**: Zustand con devtools
- **Hooks Personalizados**: Reutilización y encapsulación
- **Responsivo**: Diseño móvil-primero
- **Accesibilidad**: Componentes accesibles
- **Rendimiento**: Optimizaciones modernas

## Próximos Pasos

1. **Pruebas**: Implementar tests unitarios y de integración
2. **API**: Conectar con endpoints reales de factores
3. **Validación**: Añadir validaciones de negocio
4. **Exportación**: Mejorar formatos de exportación
5. **Documentación**: Guías de usuario detalladas

## Uso en Producción

```typescript
// En un componente
import { Compilation, AgeContainer, FactorSelector } from '@/components/factores';
import { useFactores, useFactorCalculations } from '@/hooks/useFactoresV3';

function MyEvaluationPage() {
  const { actions, type } = useFactores();
  const { totalFactor, factorCount } = useFactorCalculations();
  
  return (
    <div>
      <Compilation type={type} />
      <AgeContainer type={type} />
      <FactorSelector />
      <div>Factor Total: {totalFactor}</div>
    </div>
  );
}
```

---

**Estado**: ✅ Completo y funcional
**Compatibilidad**: v1 ↔ v3 bidireccional
**Próxima Iteración**: Registros Especializados
