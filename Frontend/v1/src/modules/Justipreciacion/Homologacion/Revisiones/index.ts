/** @format */

// Exportar todos los componentes del módulo de revisiones
export { RevisionModal } from "./RevisionModal";
export { RevisionPanel } from "./RevisionPanel";
export { RevisionHistory } from "./RevisionHistory";

// Exportar hook personalizado
export { useRevisiones } from "./useRevisiones";

// Exportar utilidades
export * as RevisionUtils from "./revisionUtils";

// Re-exportar tipos útiles para otros módulos
export type {
	RevisionSuggestion,
	RevisionComment,
	RevisionEntry,
	RevisionData,
	FieldMeta
} from "../../../../redux/justipreciacion/homologacion/revisiones/revisiones.interface";

// Re-exportar acciones principales
export {
	showRevisionModal,
	hideRevisionModal,
	startRevision,
	cancelRevision,
	addSuggestion,
	submitRevision,
	resolveComment,
	dismissComment,
	applyAllSuggestions
} from "../../../../redux/justipreciacion/homologacion/revisiones";
