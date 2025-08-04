/** @format */

export interface RevisionComment {
  id: string;
  fieldPath: string;
  fieldLabel: string;
  page: number;
  originalValue: any;
  suggestedValue: any;
  comment: string;
  status: "PENDING" | "RESOLVED" | "DISMISSED";
  reviewer: string;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
}

export interface RevisionSuggestion {
  fieldPath: string;
  fieldLabel: string;
  page: number;
  currentValue: any;
  suggestedValue: any;
  comment: string;
  reviewer: string;
}

export interface RevisionEntry {
  version: string;
  created_by: string;
  created_at: string;
  status: "EN_REVISION" | "COMPLETADA" | "PENDIENTE_CORRECCION";
  comments: RevisionComment[];
  general_comments?: string;
  summary: {
    total_comments: number;
    pending_comments: number;
    resolved_comments: number;
    dismissed_comments: number;
  };
}

export interface RevisionData {
  homologacion_id: number;
  tipo: "TERRENO" | "RENTA";
  tipo_servicio: string;
  status: "PENDIENTE" | "EN_REVISION" | "REVISADO_CON_ERRORES" | "REVISADO_APROBADO" | "RECHAZADO" | "OBSOLETO";
  current_version: string;
  can_review: boolean;
  revisiones: RevisionEntry[];
  stats: {
    total_revisiones: number;
    comentarios_pendientes: number;
    ultima_revision: string;
  };
}

export interface FieldMeta {
  path: string;
  label: string;
  page: number;
  type: "text" | "number" | "boolean" | "object" | "array";
  description?: string;
  required?: boolean;
}

export interface RevisionState {
  // Datos del servidor
  revisionData: RevisionData | null;
  
  // Estado de revisión activa
  isReviewing: boolean;
  activeRevision: RevisionEntry | null;
  currentSuggestions: RevisionSuggestion[];
  
  // UI State
  showRevisionModal: boolean;
  showRevisionHistory: boolean;
  availableFields: FieldMeta[];
  
  // Estados de carga y errores
  loading: boolean;
  saving: boolean;
  error: string | null;
  message: string | null;
  
  // Configuración
  pendingChanges: boolean;
  selectedRevision: RevisionEntry | null;
}

export interface CreateRevisionRequest {
  suggestions: RevisionSuggestion[];
  generalComments?: string;
  homologacionId: number;
  tipo: "TERRENO" | "RENTA";
  tipoServicio: string;
}

export interface ResolveCommentRequest {
  revisionVersion: string;
  commentId: string;
  action: "resolve" | "dismiss";
}

export interface RevisionActions {
  loadRevisionData: (homologacionId: number, tipo: string, tipoServicio: string) => Promise<void>;
  startRevision: (reviewer: string) => void;
  cancelRevision: () => void;
  addSuggestion: (suggestion: RevisionSuggestion) => void;
  removeSuggestion: (fieldPath: string) => void;
  updateSuggestion: (fieldPath: string, updates: Partial<RevisionSuggestion>) => void;
  submitRevision: (generalComments?: string) => Promise<void>;
  resolveComment: (revisionVersion: string, commentId: string) => Promise<void>;
  dismissComment: (revisionVersion: string, commentId: string) => Promise<void>;
  showRevisionModal: () => void;
  hideRevisionModal: () => void;
  showRevisionHistory: () => void;
  hideRevisionHistory: () => void;
  setSelectedRevision: (revision: RevisionEntry | null) => void;
  clearSuggestions: () => void;
  setAvailableFields: (fields: FieldMeta[]) => void;
}
