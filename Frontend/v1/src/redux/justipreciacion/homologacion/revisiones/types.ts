export interface RevisionData {
  id: number;
  homologacion_id: number;
  type: 'TERRENO' | 'RENTA';
  appraisal_purpose: string;
  current_version: string;
  status: 'PENDIENTE' | 'EN_REVISION' | 'APROBADA' | 'RECHAZADA';
  created_at: string;
  updated_at: string;
  reviewed_at?: string;
  can_review: boolean;
  can_edit: boolean;
  assigned_reviewer?: string;
  revisiones: any[];
}

export interface RevisionHistory {
  id: number;
  revision_data_id: number;
  action: string;
  previous_data?: any;
  new_data?: any;
  performed_by: string;
  performed_at: string;
  description?: string;
}

export interface RevisionSuggestion {
  id: number;
  revision_data_id: number;
  field_path: string;
  current_value?: string;
  suggested_value?: string;
  comment: string;
  field_label: string;
  page: number;
  reviewer: string;
  created_at: string;
  is_converted: boolean;
}

export interface RevisionPermissions {
  id: number;
  user_id: string;
  revision_data_id: number;
  can_read: boolean;
  can_write: boolean;
  can_approve: boolean;
  granted_by: string;
  granted_at: string;
}

export interface RevisionChecklist {
  id: number;
  checklist: number;
  revisor: number;
  tipo_revisor: string;
  fecha_creacion: string;
  requerimientos?: any;
  observaciones?: string;
  total?: number;
  estatus: string;
  parent?: number;
}

export interface RevisionState {
  revision_data: RevisionData | null;
  revision_history: RevisionHistory[];
  revision_suggestions: RevisionSuggestion[];
  revision_permissions: RevisionPermissions[];
  revision_checklist: RevisionChecklist[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

export interface CreateRevisionPayload {
  homologacion_id: number;
  type: 'TERRENO' | 'RENTA';
  appraisal_purpose: string;
  assigned_reviewer?: string;
}

export interface CreateSuggestionPayload {
  revision_data_id: number;
  field_path: string;
  current_value?: string;
  suggested_value?: string;
  comment: string;
  field_label: string;
  page: number;
  reviewer: string;
}

export interface UpdateRevisionPayload {
  id: number;
  status?: 'PENDIENTE' | 'EN_REVISION' | 'APROBADA' | 'RECHAZADA';
  assigned_reviewer?: string;
  revisiones?: any[];
}