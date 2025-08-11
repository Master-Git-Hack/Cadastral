import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import * as revisionActions from '../redux/justipreciacion/homologacion/revisiones/actions';
import { CreateRevisionPayload, CreateSuggestionPayload } from '../redux/justipreciacion/homologacion/revisiones/types';

export const useRevisiones = () => {
  const dispatch = useDispatch();
  
  const {
    revision_data,
    revision_history,
    revision_suggestions,
    revision_permissions,
    revision_checklist,
    loading,
    error,
    currentPage,
    totalPages
  } = useSelector((state: RootState) => state.Homologaciones.revisiones);

  // Actions
  const fetchRevision = (id: number) => {
    dispatch(revisionActions.fetchRevisionData(id) as any);
  };

  const createRevision = (payload: CreateRevisionPayload) => {
    return dispatch(revisionActions.createRevision(payload) as any);
  };

  const updateRevision = (id: number, payload: any) => {
    return dispatch(revisionActions.updateRevision({ id, ...payload }) as any);
  };

  const fetchHistory = (revisionId: number) => {
    dispatch(revisionActions.fetchRevisionHistory(revisionId) as any);
  };

  const fetchSuggestions = (revisionId: number) => {
    dispatch(revisionActions.fetchRevisionSuggestions(revisionId) as any);
  };

  const createSuggestion = (payload: CreateSuggestionPayload) => {
    return dispatch(revisionActions.createSuggestion(payload) as any);
  };

  const fetchPermissions = (revisionId: number) => {
    dispatch(revisionActions.fetchRevisionPermissions(revisionId) as any);
  };

  const fetchChecklist = (revisionId: number) => {
    dispatch(revisionActions.fetchRevisionChecklist(revisionId) as any);
  };

  const convertSuggestion = (suggestionId: number) => {
    return dispatch(revisionActions.convertSuggestion(suggestionId) as any);
  };

  const initRevisionModule = (params: any) => {
    return dispatch(revisionActions.initRevisionModule(params) as any);
  };

  const fetchRevisionsByHomologacion = (homologacionId: number, tipo?: string) => {
    return dispatch(revisionActions.fetchRevisionsByHomologacion({ homologacionId, tipo }) as any);
  };

  const createRevisionFromHomologacion = (homologacionId: number, payload: any) => {
    return dispatch(revisionActions.createRevisionFromHomologacion({ homologacionId, ...payload }) as any);
  };

  const createPermission = (revisionId: number, payload: any) => {
    return dispatch(revisionActions.createRevisionPermission({ revisionId, ...payload }) as any);
  };

  const updatePermission = (permissionId: number, payload: any) => {
    return dispatch(revisionActions.updateRevisionPermission({ permissionId, ...payload }) as any);
  };

  const deletePermission = (permissionId: number) => {
    return dispatch(revisionActions.deleteRevisionPermission(permissionId) as any);
  };

  return {
    // State
    revision_data,
    revision_history,
    revision_suggestions,
    revision_permissions,
    revision_checklist,
    loading,
    error,
    currentPage,
    totalPages,
    
    // Actions
    fetchRevision,
    createRevision,
    updateRevision,
    fetchHistory,
    fetchSuggestions,
    createSuggestion,
    fetchPermissions,
    fetchChecklist,
    convertSuggestion,
    initRevisionModule,
    fetchRevisionsByHomologacion,
    createRevisionFromHomologacion,
    createPermission,
    updatePermission,
    deletePermission,
  };
};