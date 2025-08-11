import { useEffect, useState, useCallback } from "react";

// Tipos para el sistema de revisiones
export type RevisionStatus =
	| "sin_revision"
	| "en_revision"
	| "revisado"
	| "rechazado";

export interface RevisionInfo {
	id?: number;
	status: RevisionStatus;
	hasRevisions: boolean;
	pendingCount: number;
	completedCount: number;
	rejectedCount: number;
	lastReviewDate?: string;
	reviewer?: string;
}

interface UseRevisionIntegrationParams {
	recordType: "terreno" | "renta"; // tipo de homologación
	recordId: number; // ID del registro de homologación
	enabled?: boolean; // controla si debe ejecutarse la verificación
}

interface UseRevisionIntegrationReturn {
	revisionInfo: RevisionInfo | null;
	isLoading: boolean;
	error: string | null;
	refreshRevisionStatus: () => Promise<void>;
	createRevision: () => Promise<void>;
	hasPermissionToReview: boolean;
}

/**
 * Hook para integrar el sistema de revisiones con homologaciones existentes
 * Este hook se encarga de verificar automáticamente si un registro de homologación
 * tiene revisiones asociadas y proporciona métodos para gestionarlas
 */
export function useRevisionIntegration({
	recordType,
	recordId,
	enabled = true,
}: UseRevisionIntegrationParams): UseRevisionIntegrationReturn {
	const [revisionInfo, setRevisionInfo] = useState<RevisionInfo | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [hasPermissionToReview, setHasPermissionToReview] = useState(false);

	// Función para verificar el estado de revisiones del registro
	const checkRevisionStatus = useCallback(async () => {
		if (!enabled || !recordId || recordId === 0) {
			setRevisionInfo({
				status: "sin_revision",
				hasRevisions: false,
				pendingCount: 0,
				completedCount: 0,
				rejectedCount: 0,
			});
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			// Llamada al endpoint de verificación de estado
			const response = await fetch(
				`http://172.31.103.57:56733/api/v1/revisiones/status/homologacion/${recordId}?tipo=${recordType}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				if (response.status === 404) {
					// No hay revisiones para este registro
					setRevisionInfo({
						status: "sin_revision",
						hasRevisions: false,
						pendingCount: 0,
						completedCount: 0,
						rejectedCount: 0,
					});
					return;
				}
				throw new Error(`Error HTTP: ${response.status}`);
			}

			const data = await response.json();
			console.log("🔍 Datos del API de revisiones:", data);

			// Mapear el estado del backend al frontend
			const mapBackendStatus = (
				backendStatus: string | null,
			): RevisionStatus => {
				console.log("🔄 Mapeando estado:", backendStatus);
				switch (backendStatus) {
					case "PENDIENTE":
						return "en_revision";
					case "APROBADA":
						return "revisado";
					case "RECHAZADA":
						return "rechazado";
					case "EN_REVISION":
						return "en_revision";
					default:
						return "sin_revision";
				}
			};

			// Contar revisiones por estado
			const revisions = data.revisions || [];
			const pendingCount = revisions.filter(
				(r: any) => r.status === "PENDIENTE" || r.status === "EN_REVISION",
			).length;
			const completedCount = revisions.filter(
				(r: any) => r.status === "APROBADA",
			).length;
			const rejectedCount = revisions.filter(
				(r: any) => r.status === "RECHAZADA",
			).length;

			const mappedStatus = mapBackendStatus(data.latest_status);
			console.log("📊 Estado mapeado:", mappedStatus);

			const revisionInfo = {
				id: revisions[0]?.id,
				status: mappedStatus,
				hasRevisions: data.has_revisions,
				pendingCount,
				completedCount,
				rejectedCount,
				lastReviewDate: revisions[0]?.updated_at,
				reviewer: revisions[0]?.assigned_reviewer,
			};

			console.log("💾 Guardando info de revisión:", revisionInfo);
			setRevisionInfo(revisionInfo);

			setHasPermissionToReview(!data.can_create); // Si no puede crear, significa que ya hay revisiones
		} catch (err) {
			console.error("Error verificando estado de revisiones:", err);
			setError(err instanceof Error ? err.message : "Error desconocido");

			// En caso de error, asumir sin revisiones
			setRevisionInfo({
				status: "sin_revision",
				hasRevisions: false,
				pendingCount: 0,
				completedCount: 0,
				rejectedCount: 0,
			});
		} finally {
			setIsLoading(false);
		}
	}, [recordType, recordId, enabled]);

	// Función para refrescar el estado
	const refreshRevisionStatus = useCallback(async () => {
		await checkRevisionStatus();
	}, [checkRevisionStatus]);

	// Función para crear una nueva revisión
	const createRevision = useCallback(async () => {
		if (!recordId || recordId === 0) {
			throw new Error("ID de registro inválido");
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"http://172.31.103.57:56733/api/v1/revisiones/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						key: `homologacion_${recordType}_${recordId}`,
						tipo: recordType,
						id: recordId,
						username: "current_user", // Obtener del contexto de usuario
						descripcion: `Revisión para ${recordType} ${recordId}`,
						metadatos: {
							record_type: recordType,
							record_id: recordId,
							created_from: "homologacion_module",
						},
					}),
				},
			);

			if (!response.ok) {
				throw new Error(`Error creando revisión: ${response.status}`);
			}

			const newRevision = await response.json();

			// Refrescar el estado después de crear
			await refreshRevisionStatus();

			return newRevision;
		} catch (err) {
			console.error("Error creando revisión:", err);
			setError(err instanceof Error ? err.message : "Error creando revisión");
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, [recordType, recordId, refreshRevisionStatus]);

	// Verificar estado al montar el componente o cambiar parámetros
	useEffect(() => {
		checkRevisionStatus();
	}, [checkRevisionStatus]);

	return {
		revisionInfo,
		isLoading,
		error,
		refreshRevisionStatus,
		createRevision,
		hasPermissionToReview,
	};
}

export default useRevisionIntegration;
