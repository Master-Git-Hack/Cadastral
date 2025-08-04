/** @format */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { api } from "../api.config";

// Tipos para Comparables
interface ComparableItem {
	id?: number;
	tipo: "Terreno" | "Construcción";
	id_cedula_mercado: number;
	id_comparable_catcom: string;
	valor_unitario?: number;
	superficie?: number;
	valor_total?: number;
	observaciones?: string;
	fecha_registro?: string;
	estatus?: number;
}

interface CedulaMercado {
	id: number;
	nombre: string;
	municipio: string;
	tipo_bien: string;
	fecha_creacion: string;
	usuario: string;
	estatus: number;
	comparables?: ComparableItem[];
}

interface ComparablesState {
	// Estado principal
	cedulas: CedulaMercado[];
	cedulaActual: CedulaMercado | null;
	comparables: ComparableItem[];
	comparableActual: ComparableItem | null;
	
	// Estados de UI
	loading: {
		cedulas: boolean;
		comparables: boolean;
		creation: boolean;
		deletion: boolean;
	};
	
	// Filtros y búsqueda
	filtros: {
		municipio?: string;
		tipo_bien?: string;
		usuario?: string;
		fecha_desde?: string;
		fecha_hasta?: string;
	};
	
	// Paginación
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
	
	// Errores
	error: string | null;
}

interface ComparablesActions {
	// Cédulas de Mercado
	getCedulas: (username?: string) => Promise<any>;
	getCedulaById: (id: number) => Promise<any>;
	createCedula: (cedula: Partial<CedulaMercado>) => Promise<any>;
	updateCedula: (id: number, cedula: Partial<CedulaMercado>) => Promise<any>;
	deleteCedula: (id: number) => Promise<any>;
	
	// Comparables
	getComparables: (cedulaId: number) => Promise<any>;
	createComparable: (comparable: Partial<ComparableItem>) => Promise<any>;
	updateComparable: (id: number, comparable: Partial<ComparableItem>) => Promise<any>;
	deleteComparable: (id: number) => Promise<any>;
	
	// Reports y Downloads
	generateReport: (cedulaId: number, options?: any) => Promise<any>;
	downloadReport: (cedulaId: number, format: 'pdf' | 'excel') => Promise<any>;
	previewReport: (cedulaId: number) => Promise<any>;
	
	// Estado local
	setCedulaActual: (cedula: CedulaMercado | null) => void;
	setComparableActual: (comparable: ComparableItem | null) => void;
	setFiltros: (filtros: Partial<ComparablesState['filtros']>) => void;
	setPagination: (pagination: Partial<ComparablesState['pagination']>) => void;
	setLoading: (key: keyof ComparablesState['loading'], value: boolean) => void;
	setError: (error: string | null) => void;
	
	// Utilidades
	calculateStatistics: (comparables: ComparableItem[]) => {
		promedio: number;
		mediana: number;
		minimo: number;
		maximo: number;
		desviacion: number;
	};
	
	// Reset
	reset: () => void;
}

const initialState: ComparablesState = {
	cedulas: [],
	cedulaActual: null,
	comparables: [],
	comparableActual: null,
	loading: {
		cedulas: false,
		comparables: false,
		creation: false,
		deletion: false,
	},
	filtros: {},
	pagination: {
		page: 1,
		limit: 10,
		total: 0,
		totalPages: 0,
	},
	error: null,
};

const useComparables = create<ComparablesState & ComparablesActions>()(
	persist(
		(set, get) => ({
			...initialState,

			// Cédulas de Mercado
			getCedulas: async (username) => {
				set({ loading: { ...get().loading, cedulas: true }, error: null });
				try {
					const response = await api.get('/comparables/cedulas', {
						params: { username, ...get().filtros }
					});
					
					set({
						cedulas: response.data.data || [],
						pagination: {
							...get().pagination,
							total: response.data.total || 0,
							totalPages: response.data.totalPages || 0,
						},
						loading: { ...get().loading, cedulas: false },
					});
					
					return response;
				} catch (error: any) {
					set({
						error: error?.response?.data?.message || 'Error al cargar cédulas',
						loading: { ...get().loading, cedulas: false },
					});
					throw error;
				}
			},

			getCedulaById: async (id) => {
				try {
					const response = await api.get(`/comparables/cedulas/${id}`);
					set({ cedulaActual: response.data.data });
					return response;
				} catch (error: any) {
					set({ error: error?.response?.data?.message || 'Error al cargar cédula' });
					throw error;
				}
			},

			createCedula: async (cedula) => {
				set({ loading: { ...get().loading, creation: true }, error: null });
				try {
					const response = await api.post('/comparables/cedulas', cedula);
					
					// Actualizar lista local
					const newCedula = response.data.data;
					set({
						cedulas: [...get().cedulas, newCedula],
						loading: { ...get().loading, creation: false },
					});
					
					return response;
				} catch (error: any) {
					set({
						error: error?.response?.data?.message || 'Error al crear cédula',
						loading: { ...get().loading, creation: false },
					});
					throw error;
				}
			},

			updateCedula: async (id, cedula) => {
				try {
					const response = await api.patch(`/comparables/cedulas/${id}`, cedula);
					
					// Actualizar en lista local
					set({
						cedulas: get().cedulas.map(c => 
							c.id === id ? { ...c, ...response.data.data } : c
						),
						cedulaActual: get().cedulaActual?.id === id 
							? { ...get().cedulaActual, ...response.data.data }
							: get().cedulaActual,
					});
					
					return response;
				} catch (error: any) {
					set({ error: error?.response?.data?.message || 'Error al actualizar cédula' });
					throw error;
				}
			},

			deleteCedula: async (id) => {
				set({ loading: { ...get().loading, deletion: true }, error: null });
				try {
					const response = await api.delete(`/comparables/cedulas/${id}`);
					
					// Remover de lista local
					set({
						cedulas: get().cedulas.filter(c => c.id !== id),
						cedulaActual: get().cedulaActual?.id === id ? null : get().cedulaActual,
						loading: { ...get().loading, deletion: false },
					});
					
					return response;
				} catch (error: any) {
					set({
						error: error?.response?.data?.message || 'Error al eliminar cédula',
						loading: { ...get().loading, deletion: false },
					});
					throw error;
				}
			},

			// Comparables
			getComparables: async (cedulaId) => {
				set({ loading: { ...get().loading, comparables: true }, error: null });
				try {
					const response = await api.get(`/comparables/cedulas/${cedulaId}/comparables`);
					
					set({
						comparables: response.data.data || [],
						loading: { ...get().loading, comparables: false },
					});
					
					return response;
				} catch (error: any) {
					set({
						error: error?.response?.data?.message || 'Error al cargar comparables',
						loading: { ...get().loading, comparables: false },
					});
					throw error;
				}
			},

			createComparable: async (comparable) => {
				set({ loading: { ...get().loading, creation: true }, error: null });
				try {
					const response = await api.post('/comparables', comparable);
					
					// Actualizar lista local
					const newComparable = response.data.data;
					set({
						comparables: [...get().comparables, newComparable],
						loading: { ...get().loading, creation: false },
					});
					
					return response;
				} catch (error: any) {
					set({
						error: error?.response?.data?.message || 'Error al crear comparable',
						loading: { ...get().loading, creation: false },
					});
					throw error;
				}
			},

			updateComparable: async (id, comparable) => {
				try {
					const response = await api.patch(`/comparables/${id}`, comparable);
					
					// Actualizar en lista local
					set({
						comparables: get().comparables.map(c => 
							c.id === id ? { ...c, ...response.data.data } : c
						),
						comparableActual: get().comparableActual?.id === id 
							? { ...get().comparableActual, ...response.data.data }
							: get().comparableActual,
					});
					
					return response;
				} catch (error: any) {
					set({ error: error?.response?.data?.message || 'Error al actualizar comparable' });
					throw error;
				}
			},

			deleteComparable: async (id) => {
				set({ loading: { ...get().loading, deletion: true }, error: null });
				try {
					const response = await api.delete(`/comparables/${id}`);
					
					// Remover de lista local
					set({
						comparables: get().comparables.filter(c => c.id !== id),
						comparableActual: get().comparableActual?.id === id ? null : get().comparableActual,
						loading: { ...get().loading, deletion: false },
					});
					
					return response;
				} catch (error: any) {
					set({
						error: error?.response?.data?.message || 'Error al eliminar comparable',
						loading: { ...get().loading, deletion: false },
					});
					throw error;
				}
			},

			// Reports
			generateReport: async (cedulaId, options = {}) => {
				try {
					const response = await api.post(`/comparables/cedulas/${cedulaId}/report`, options);
					return response;
				} catch (error: any) {
					set({ error: error?.response?.data?.message || 'Error al generar reporte' });
					throw error;
				}
			},

			downloadReport: async (cedulaId, format) => {
				try {
					const response = await api.get(
						`/comparables/cedulas/${cedulaId}/download`, 
						{ 
							params: { format },
							responseType: 'blob'
						}
					);
					
					// Crear link de descarga
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', `cedula_${cedulaId}.${format}`);
					document.body.appendChild(link);
					link.click();
					link.remove();
					window.URL.revokeObjectURL(url);
					
					return response;
				} catch (error: any) {
					set({ error: error?.response?.data?.message || 'Error al descargar reporte' });
					throw error;
				}
			},

			previewReport: async (cedulaId) => {
				try {
					const response = await api.get(`/comparables/cedulas/${cedulaId}/preview`);
					return response;
				} catch (error: any) {
					set({ error: error?.response?.data?.message || 'Error al previsualizar reporte' });
					throw error;
				}
			},

			// Estado local
			setCedulaActual: (cedula) => set({ cedulaActual: cedula }),
			setComparableActual: (comparable) => set({ comparableActual: comparable }),
			setFiltros: (filtros) => set({ filtros: { ...get().filtros, ...filtros } }),
			setPagination: (pagination) => set({ pagination: { ...get().pagination, ...pagination } }),
			setLoading: (key, value) => set({ loading: { ...get().loading, [key]: value } }),
			setError: (error) => set({ error }),

			// Utilidades
			calculateStatistics: (comparables) => {
				if (!comparables.length) {
					return { promedio: 0, mediana: 0, minimo: 0, maximo: 0, desviacion: 0 };
				}

				const valores = comparables
					.filter(c => c.valor_unitario && c.valor_unitario > 0)
					.map(c => c.valor_unitario!);

				if (!valores.length) {
					return { promedio: 0, mediana: 0, minimo: 0, maximo: 0, desviacion: 0 };
				}

				const promedio = valores.reduce((sum, val) => sum + val, 0) / valores.length;
				const valoresOrdenados = [...valores].sort((a, b) => a - b);
				const mediana = valores.length % 2 === 0
					? (valoresOrdenados[valores.length / 2 - 1] + valoresOrdenados[valores.length / 2]) / 2
					: valoresOrdenados[Math.floor(valores.length / 2)];
				const minimo = Math.min(...valores);
				const maximo = Math.max(...valores);
				const varianza = valores.reduce((sum, val) => sum + Math.pow(val - promedio, 2), 0) / valores.length;
				const desviacion = Math.sqrt(varianza);

				return { promedio, mediana, minimo, maximo, desviacion };
			},

			// Reset
			reset: () => set(initialState),
		}),
		{
			name: "comparables-storage",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				filtros: state.filtros,
				pagination: state.pagination,
			}),
		}
	)
);

export default useComparables;
export type { ComparablesState, ComparablesActions, ComparableItem, CedulaMercado };
