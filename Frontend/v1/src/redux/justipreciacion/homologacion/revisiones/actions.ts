import { createAsyncThunk } from '@reduxjs/toolkit';
import { revisionService } from '../../../services/revisionService';
import { CreateRevisionPayload, CreateSuggestionPayload, UpdateRevisionPayload } from './types';

// Obtener revisión por ID
export const fetchRevisionData = createAsyncThunk(
  'revisiones/fetchRevisionData',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await revisionService.getRevision(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener la revisión');
    }
  }
);

// Crear nueva revisión
export const createRevision = createAsyncThunk(
  'revisiones/createRevision',
  async (payload: CreateRevisionPayload, { rejectWithValue }) => {
    try {
      const response = await revisionService.createRevision(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear la revisión');
    }
  }
);

// Actualizar revisión
export const updateRevision = createAsyncThunk(
  'revisiones/updateRevision',
  async (payload: UpdateRevisionPayload, { rejectWithValue }) => {
    try {
      const response = await revisionService.updateRevision(payload.id, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar la revisión');
    }
  }
);

// Obtener historial de revisiones
export const fetchRevisionHistory = createAsyncThunk(
  'revisiones/fetchRevisionHistory',
  async (revisionId: number, { rejectWithValue }) => {
    try {
      const response = await revisionService.getRevisionHistory(revisionId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener el historial');
    }
  }
);

// Obtener sugerencias de revisión
export const fetchRevisionSuggestions = createAsyncThunk(
  'revisiones/fetchRevisionSuggestions',
  async (revisionId: number, { rejectWithValue }) => {
    try {
      const response = await revisionService.getRevisionSuggestions(revisionId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener las sugerencias');
    }
  }
);

// Crear nueva sugerencia
export const createSuggestion = createAsyncThunk(
  'revisiones/createSuggestion',
  async (payload: CreateSuggestionPayload, { rejectWithValue }) => {
    try {
      const { revision_data_id, ...suggestionData } = payload;
      const response = await revisionService.createSuggestion(revision_data_id, suggestionData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear la sugerencia');
    }
  }
);

// Obtener permisos de revisión
export const fetchRevisionPermissions = createAsyncThunk(
  'revisiones/fetchRevisionPermissions',
  async (revisionId: number, { rejectWithValue }) => {
    try {
      const response = await revisionService.getRevisionPermissions(revisionId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener los permisos');
    }
  }
);

// Obtener checklist de revisión
export const fetchRevisionChecklist = createAsyncThunk(
  'revisiones/fetchRevisionChecklist',
  async (revisionId: number, { rejectWithValue }) => {
    try {
      const response = await revisionService.getRevisionChecklist(revisionId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener el checklist');
    }
  }
);

// Convertir sugerencia
export const convertSuggestion = createAsyncThunk(
  'revisiones/convertSuggestion',
  async (suggestionId: number, { rejectWithValue }) => {
    try {
      const response = await revisionService.convertSuggestion(suggestionId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al convertir la sugerencia');
    }
  }
);

// Inicializar módulo de revisiones
export const initRevisionModule = createAsyncThunk(
  'revisiones/initRevisionModule',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await revisionService.initRevisionModule(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al inicializar el módulo');
    }
  }
);

// Obtener revisiones por homologación
export const fetchRevisionsByHomologacion = createAsyncThunk(
  'revisiones/fetchRevisionsByHomologacion',
  async ({ homologacionId, tipo }: { homologacionId: number, tipo?: string }, { rejectWithValue }) => {
    try {
      const response = await revisionService.getRevisionsByHomologacion(homologacionId, tipo);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener las revisiones');
    }
  }
);

// Crear revisión desde homologación
export const createRevisionFromHomologacion = createAsyncThunk(
  'revisiones/createRevisionFromHomologacion',
  async ({ homologacionId, ...payload }: any, { rejectWithValue }) => {
    try {
      const response = await revisionService.createRevisionFromHomologacion(homologacionId, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear la revisión');
    }
  }
);

// Crear permiso de revisión
export const createRevisionPermission = createAsyncThunk(
  'revisiones/createRevisionPermission',
  async ({ revisionId, ...payload }: any, { rejectWithValue }) => {
    try {
      const response = await revisionService.createPermission(revisionId, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear el permiso');
    }
  }
);

// Actualizar permiso de revisión
export const updateRevisionPermission = createAsyncThunk(
  'revisiones/updateRevisionPermission',
  async ({ permissionId, ...payload }: any, { rejectWithValue }) => {
    try {
      const response = await revisionService.updatePermission(permissionId, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar el permiso');
    }
  }
);

// Eliminar permiso de revisión
export const deleteRevisionPermission = createAsyncThunk(
  'revisiones/deleteRevisionPermission',
  async (permissionId: number, { rejectWithValue }) => {
    try {
      const response = await revisionService.deletePermission(permissionId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar el permiso');
    }
  }
);