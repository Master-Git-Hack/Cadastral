import axios from 'axios';
import { CreateRevisionPayload, CreateSuggestionPayload, UpdateRevisionPayload } from '../redux/justipreciacion/homologacion/revisiones/types';

const API_BASE_URL = process.env.REACT_APP_DEV_API_URL || 'http://172.31.103.57:56733/api/v1';

export class RevisionService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Revision Data endpoints
  async getRevision(id: number) {
    return this.api.get(`/revisiones/${id}`);
  }

  async createRevision(payload: CreateRevisionPayload) {
    return this.api.post('/revisiones', payload);
  }

  async updateRevision(id: number, payload: Partial<UpdateRevisionPayload>) {
    return this.api.put(`/revisiones/${id}`, payload);
  }

  async deleteRevision(id: number) {
    return this.api.delete(`/revisiones/${id}`);
  }

  // Revision History endpoints
  async getRevisionHistory(revisionId: number) {
    return this.api.get(`/revisiones/${revisionId}/historial`);
  }

  // Revision Suggestions endpoints
  async getRevisionSuggestions(revisionId: number) {
    return this.api.get(`/revisiones/${revisionId}/sugerencias`);
  }

  async createSuggestion(revisionId: number, payload: Omit<CreateSuggestionPayload, 'revision_data_id'>) {
    return this.api.post(`/revisiones/${revisionId}/sugerencias`, payload);
  }

  async convertSuggestion(suggestionId: number) {
    return this.api.put(`/revisiones/sugerencias/${suggestionId}/convertir`);
  }

  // Revision Permissions endpoints
  async getRevisionPermissions(revisionId: number) {
    return this.api.get(`/revisiones/${revisionId}/permisos`);
  }

  async createPermission(revisionId: number, payload: any) {
    return this.api.post(`/revisiones/${revisionId}/permisos`, payload);
  }

  async updatePermission(permissionId: number, payload: any) {
    return this.api.put(`/revisiones/permisos/${permissionId}`, payload);
  }

  async deletePermission(permissionId: number) {
    return this.api.delete(`/revisiones/permisos/${permissionId}`);
  }

  // Revision Checklist endpoints
  async getRevisionChecklist(revisionId: number) {
    return this.api.get(`/revisiones/${revisionId}/checklist`);
  }

  async updateChecklist(checklistId: number, payload: any) {
    return this.api.put(`/revisiones/checklist/${checklistId}`, payload);
  }

  // Homologación specific endpoints
  async getRevisionsByHomologacion(homologacionId: number, tipo?: string) {
    const params: any = {};
    if (tipo) params.type = tipo;
    
    return this.api.get(`/revisiones/homologacion/${homologacionId}`, { params });
  }

  async createRevisionFromHomologacion(homologacionId: number, payload: Omit<CreateRevisionPayload, 'homologacion_id'>) {
    return this.api.post(`/revisiones/homologacion/${homologacionId}`, payload);
  }

  // Initialization endpoint
  async initRevisionModule(params: {
    key: string;
    tipo: string;
    id: number;
    sp1_superficie?: number;
    sp1_factor?: number;
    tipo_servicio?: string;
    username: string;
  }) {
    return this.api.get('/revisiones/init', { params });
  }
}

export const revisionService = new RevisionService();