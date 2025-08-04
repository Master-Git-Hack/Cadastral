/** @format */

// Exportar componentes de revisiones
export { RevisionModal } from "./revision-modal";
export { RevisionHistory } from "./revision-history";
export { RevisionPanel } from "./revision-panel";

// Re-exportar tipos y store para facilitar el uso
export type {
  RevisionComment,
  RevisionSuggestion,
  RevisionEntry,
  RevisionData,
  FieldMeta,
  RevisionState,
  CreateRevisionRequest,
  ResolveCommentRequest
} from "@/store/revisiones/types";

export {
  useRevisionesStore,
  useRevisionData,
  useIsReviewing,
  useActiveRevision,
  useCurrentSuggestions,
  useRevisionStatus,
  usePendingChanges,
  useShowRevisionModal,
  useShowRevisionHistory,
  useAvailableFields,
  useRevisionLoading,
  useRevisionSaving,
  useRevisionError,
  useRevisionMessage,
  useSelectedRevision
} from "@/store/revisiones";
