/** @format */

import { useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../../redux";
import { 
	getRevisionData,
	getIsReviewing,
	getActiveRevision,
	getCurrentSuggestions,
	getRevisionStatus,
	getPendingChanges,
	getShowRevisionModal,
	startRevision,
	cancelRevision,
	addSuggestion,
	submitRevision,
	resolveComment,
	dismissComment,
	showRevisionModal,
	hideRevisionModal,
	get as getRevisionDataAction,
	post as postRevisionAction,
	patch as patchRevisionAction
} from "../../../../redux/justipreciacion/homologacion/revisiones";
import { getHomologaciones } from "../../../../redux/justipreciacion/homologacion";
import { RevisionSuggestion } from "../../../../redux/justipreciacion/homologacion/revisiones/revisiones.interface";

export const useRevisiones = () => {
	const dispatch = useAppDispatch();
	
	// Selectores
	const revisionData = useAppSelector(getRevisionData);
	const isReviewing = useAppSelector(getIsReviewing);
	const activeRevision = useAppSelector(getActiveRevision);
	const currentSuggestions = useAppSelector(getCurrentSuggestions);
	const revisionStatus = useAppSelector(getRevisionStatus);
	const pendingChanges = useAppSelector(getPendingChanges);
	const showModal = useAppSelector(getShowRevisionModal);
	const { record } = useAppSelector(getHomologaciones);

	// Acciones envueltas
	const loadRevisionData = useCallback(() => {
		if (record.id && record.status === "exists" && record.type && record.appraisalPurpose) {
			dispatch(getRevisionDataAction({ 
				url: `REVISION/${record.id}/${record.type}/${record.appraisalPurpose}` 
			}));
		}
	}, [dispatch, record.id, record.status, record.type, record.appraisalPurpose]);

	const startNewRevision = useCallback((reviewer: string = "Usuario") => {
		const version = `v${Date.now()}`;
		dispatch(startRevision({ reviewer, version }));
	}, [dispatch]);

	const cancelCurrentRevision = useCallback(() => {
		dispatch(cancelRevision());
	}, [dispatch]);

	const addFieldSuggestion = useCallback((suggestion: RevisionSuggestion) => {
		dispatch(addSuggestion(suggestion));
	}, [dispatch]);

	const submitCurrentRevision = useCallback((generalComments?: string) => {
		if (record.id && record.type && record.appraisalPurpose) {
			const payload = {
				suggestions: currentSuggestions,
				generalComments,
				homologacionId: record.id,
				tipo: record.type,
				tipoServicio: record.appraisalPurpose
			};

			dispatch(postRevisionAction({
				url: `REVISION/${record.id}/${record.type}/${record.appraisalPurpose}`,
				payload,
				responseType: "json"
			}));
		}
	}, [dispatch, record.id, record.type, record.appraisalPurpose, currentSuggestions]);

	const resolveFieldComment = useCallback((revisionVersion: string, commentId: string) => {
		dispatch(resolveComment({ revisionVersion, commentId }));
		
		// También enviar al servidor
		if (record.id) {
			dispatch(patchRevisionAction({
				url: `REVISION/${record.id}/resolve/${commentId}`,
				payload: { revisionVersion },
				responseType: "json"
			}));
		}
	}, [dispatch, record.id]);

	const dismissFieldComment = useCallback((revisionVersion: string, commentId: string) => {
		dispatch(dismissComment({ revisionVersion, commentId }));
		
		// También enviar al servidor
		if (record.id) {
			dispatch(patchRevisionAction({
				url: `REVISION/${record.id}/dismiss/${commentId}`,
				payload: { revisionVersion },
				responseType: "json"
			}));
		}
	}, [dispatch, record.id]);

	const openRevisionModal = useCallback(() => {
		dispatch(showRevisionModal());
	}, [dispatch]);

	const closeRevisionModal = useCallback(() => {
		dispatch(hideRevisionModal());
	}, [dispatch]);

	// Auto-cargar datos cuando esté disponible
	useEffect(() => {
		loadRevisionData();
	}, [loadRevisionData]);

	// Estado computado
	const canReview = revisionData?.can_review ?? false;
	const canEdit = revisionData?.can_edit ?? false;
	const hasActiveRevision = activeRevision !== null;
	const hasPendingChanges = pendingChanges || currentSuggestions.length > 0;

	return {
		// Estado
		revisionData,
		isReviewing,
		activeRevision,
		currentSuggestions,
		revisionStatus,
		pendingChanges,
		showModal,
		record,
		
		// Estados computados
		canReview,
		canEdit,
		hasActiveRevision,
		hasPendingChanges,
		
		// Acciones
		loadRevisionData,
		startNewRevision,
		cancelCurrentRevision,
		addFieldSuggestion,
		submitCurrentRevision,
		resolveFieldComment,
		dismissFieldComment,
		openRevisionModal,
		closeRevisionModal
	};
};
