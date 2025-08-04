/** @format */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { api } from "../api.config";

// Tipos para Reportes Catastrales
interface ReporteConfig {
	id?: string;
	filename: string;
	collection: number;
	year: number;
	limits: {
		min: number;
		max: number;
	};
	watermark: boolean;
	zoom: number;
	moreProperties: {
		pageSize: string;
		dpi: number;
		margins: {
			top: number;
			bottom: number;
			left: number;
			right: number;
		};
	};
}

interface ReporteGenerated {
	id: string;
	filename: string;
	status: 'pending' | 'processing' | 'completed' | 'error';
	progress: number;
	downloadUrl?: string;
	createdAt: string;
	config: ReporteConfig;
	error?: string;
}

interface ReportesState {
	// Configuración actual
	currentConfig: ReporteConfig;
	
	// Reportes generados
	reportes: ReporteGenerated[];
	reporteActual: ReporteGenerated | null;
	
	// Estados de UI
	loading: {
		generation: boolean;
		download: boolean;
		preview: boolean;
	};
	
	// Vista previa
	preview: {
		visible: boolean;
		documents: string[];
		currentPage: number;
	};
	
	// Error
	error: string | null;
}

interface ReportesActions {
	// Configuración
	setConfig: (config: Partial<ReporteConfig>) => void;
	setLimits: (limits: Partial<ReporteConfig['limits']>) => void;
	setMargins: (margins: Partial<ReporteConfig['moreProperties']['margins']>) => void;
	setMoreProperties: (props: Partial<ReporteConfig['moreProperties']>) => void;
	resetConfig: () => void;
	
	// Generación de reportes
	generateReport: (action: 'GET' | 'MERGE') => Promise<any>;
	checkReportStatus: (reportId: string) => Promise<any>;
	downloadReport: (reportId: string) => Promise<any>;
	
	// Gestión de reportes
	getReportes: () => Promise<any>;
	deleteReporte: (reportId: string) => Promise<any>;
	setReporteActual: (reporte: ReporteGenerated | null) => void;
	
	// Vista previa
	showPreview: (documents: string[]) => void;
	hidePreview: () => void;
	setPreviewPage: (page: number) => void;
	
	// Estado
	setLoading: (key: keyof ReportesState['loading'], value: boolean) => void;
	setError: (error: string | null) => void;
	
	// Utilidades
	getDefaultFilename: () => string;
	validateConfig: () => { valid: boolean; errors: string[] };
	
	// Reset
	reset: () => void;
}

const defaultConfig: ReporteConfig = {
	filename: "",
	collection: 1,
	year: new Date().getFullYear(),
	limits: {
		min: 1,
		max: 100,
	},
	watermark: false,
	zoom: 1.0,
	moreProperties: {
		pageSize: "A4",
		dpi: 300,
		margins: {
			top: 2.0,
			bottom: 2.0,
			left: 2.0,
			right: 2.0,
		},
	},
};

const initialState: ReportesState = {
	currentConfig: { ...defaultConfig },
	reportes: [],
	reporteActual: null,
	loading: {
		generation: false,
		download: false,
		preview: false,
	},
	preview: {
		visible: false,
		documents: [],
		currentPage: 1,
	},
	error: null,
};

const useReportes = create<ReportesState & ReportesActions>()(
	persist(
		(set, get) => ({
			...initialState,

			// Configuración
			setConfig: (config) => {
				set((state) => ({
					currentConfig: { ...state.currentConfig, ...config },
				}));
			},

			setLimits: (limits) => {
				set((state) => ({
					currentConfig: {
						...state.currentConfig,
						limits: { ...state.currentConfig.limits, ...limits },
					},
				}));
			},

			setMargins: (margins) => {
				set((state) => ({
					currentConfig: {
						...state.currentConfig,
						moreProperties: {
							...state.currentConfig.moreProperties,
							margins: {
								...state.currentConfig.moreProperties.margins,
								...margins,
							},
						},
					},
				}));
			},

			setMoreProperties: (props) => {
				set((state) => ({
					currentConfig: {
						...state.currentConfig,
						moreProperties: {
							...state.currentConfig.moreProperties,
							...props,
						},
					},
				}));
			},

			resetConfig: () => {
				set({ currentConfig: { ...defaultConfig } });
			},

			// Generación de reportes
			generateReport: async (action) => {
				const { currentConfig } = get();
				const { valid, errors } = get().validateConfig();
				
				if (!valid) {
					set({ error: `Configuración inválida: ${errors.join(', ')}` });
					throw new Error(`Configuración inválida: ${errors.join(', ')}`);
				}

				set({ loading: { ...get().loading, generation: true }, error: null });
				
				try {
					const filename = currentConfig.filename || get().getDefaultFilename();
					const response = await api.post(`/catastral/reportes/${action}/${filename}`, {
						...currentConfig,
						filename,
					});
					
					// Crear registro del reporte
					const newReporte: ReporteGenerated = {
						id: response.data.id || Date.now().toString(),
						filename,
						status: 'processing',
						progress: 0,
						createdAt: new Date().toISOString(),
						config: { ...currentConfig, filename },
					};
					
					set({
						reportes: [newReporte, ...get().reportes],
						reporteActual: newReporte,
						loading: { ...get().loading, generation: false },
					});
					
					return response;
				} catch (error: any) {
					set({
						error: error?.response?.data?.message || 'Error al generar reporte',
						loading: { ...get().loading, generation: false },
					});
					throw error;
				}
			},

			checkReportStatus: async (reportId) => {
				try {
					const response = await api.get(`/catastral/reportes/status/${reportId}`);
					
					// Actualizar estado del reporte
					set({
						reportes: get().reportes.map(r => 
							r.id === reportId 
								? { 
									...r, 
									status: response.data.status,
									progress: response.data.progress || r.progress,
									downloadUrl: response.data.downloadUrl || r.downloadUrl,
									error: response.data.error || r.error,
								}
								: r
						),
					});
					
					return response;
				} catch (error: any) {
					set({ error: error?.response?.data?.message || 'Error al verificar estado' });
					throw error;
				}
			},

			downloadReport: async (reportId) => {
				set({ loading: { ...get().loading, download: true }, error: null });
				
				try {
					const reporte = get().reportes.find(r => r.id === reportId);
					if (!reporte) throw new Error('Reporte no encontrado');
					
					const response = await api.get(`/catastral/reportes/download/${reportId}`, {
						responseType: 'blob'
					});
					
					// Crear link de descarga
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', reporte.filename);
					document.body.appendChild(link);
					link.click();
					link.remove();
					window.URL.revokeObjectURL(url);
					
					set({ loading: { ...get().loading, download: false } });
					return response;
				} catch (error: any) {
					set({
						error: error?.response?.data?.message || 'Error al descargar reporte',
						loading: { ...get().loading, download: false },
					});
					throw error;
				}
			},

			// Gestión de reportes
			getReportes: async () => {
				try {
					const response = await api.get('/catastral/reportes');
					set({ reportes: response.data.data || [] });
					return response;
				} catch (error: any) {
					set({ error: error?.response?.data?.message || 'Error al cargar reportes' });
					throw error;
				}
			},

			deleteReporte: async (reportId) => {
				try {
					const response = await api.delete(`/catastral/reportes/${reportId}`);
					
					set({
						reportes: get().reportes.filter(r => r.id !== reportId),
						reporteActual: get().reporteActual?.id === reportId ? null : get().reporteActual,
					});
					
					return response;
				} catch (error: any) {
					set({ error: error?.response?.data?.message || 'Error al eliminar reporte' });
					throw error;
				}
			},

			setReporteActual: (reporte) => set({ reporteActual: reporte }),

			// Vista previa
			showPreview: (documents) => {
				set({
					preview: {
						visible: true,
						documents,
						currentPage: 1,
					},
				});
			},

			hidePreview: () => {
				set({
					preview: {
						visible: false,
						documents: [],
						currentPage: 1,
					},
				});
			},

			setPreviewPage: (page) => {
				set((state) => ({
					preview: { ...state.preview, currentPage: page },
				}));
			},

			// Estado
			setLoading: (key, value) => {
				set({ loading: { ...get().loading, [key]: value } });
			},

			setError: (error) => set({ error }),

			// Utilidades
			getDefaultFilename: () => {
				const { collection, year, limits } = get().currentConfig;
				const now = new Date();
				const timestamp = now.toISOString().slice(0, 10).replace(/-/g, '');
				return `reporte_${collection}_${year}_${limits.min}-${limits.max}_${timestamp}.pdf`;
			},

			validateConfig: () => {
				const { collection, year, limits, moreProperties } = get().currentConfig;
				const errors: string[] = [];
				
				if (!collection || collection < 1) {
					errors.push('La colección debe ser mayor a 0');
				}
				
				if (!year || year < 2000 || year > new Date().getFullYear() + 1) {
					errors.push('El año debe estar entre 2000 y el año actual');
				}
				
				if (!limits.min || limits.min < 1) {
					errors.push('El límite mínimo debe ser mayor a 0');
				}
				
				if (!limits.max || limits.max < limits.min) {
					errors.push('El límite máximo debe ser mayor al mínimo');
				}
				
				if (moreProperties.dpi < 72 || moreProperties.dpi > 600) {
					errors.push('El DPI debe estar entre 72 y 600');
				}
				
				return {
					valid: errors.length === 0,
					errors,
				};
			},

			// Reset
			reset: () => set(initialState),
		}),
		{
			name: "reportes-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				currentConfig: state.currentConfig,
				reportes: state.reportes.slice(0, 50), // Mantener solo los últimos 50 reportes
			}),
		}
	)
);

export default useReportes;
export type { ReportesState, ReportesActions, ReporteConfig, ReporteGenerated };
