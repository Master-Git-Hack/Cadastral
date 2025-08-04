/** @format */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { api } from "../api.config";
import {
	type IHomologacionState,
	type IHomologacionActions,
	defaultState,
} from "./interface";
const useHomologacion = create<IHomologacionState & IHomologacionActions>()(
	persist(
		(set, get) => ({
			...defaultState,
			setJustipreciacion: (payload: Partial<IHomologacionState>) => {
				const state = get();
				if (payload === undefined) return;
				set({ ...state, ...payload });
			},
			clearJustipreciacion: () => {
				set(defaultState);
			},
			
			// Nuevas acciones para homologación v3
			getHomologacion: async (tipo: string, justipreciacionId: number) => {
				try {
					const response = await api.get(`/homologacion/${tipo}/${justipreciacionId}`);
					if (response.data?.success) {
						const { record, factors, documentation, status, message, errors } = response.data.data;
						set({
							...get(),
							...record,
							factors: factors || get().factors,
							documentation: documentation || get().documentation,
							status: status || 'success',
							message: message || '',
							errors: errors || []
						});
					}
					return response;
				} catch (error) {
					console.error('Error al obtener homologación:', error);
					throw error;
				}
			},

			saveHomologacion: async (justipreciacionId: number) => {
				const state = get();
				const payload = {
					factores: state.factors,
					resultado: state.documentation,
					registro: '', // Se completará según contexto
					valor_unitario: state.documentation.ReFactor?.isUsed 
						? state.documentation.SalesCost?.averageUnitCost?.adjustedValue
						: state.documentation.SalesCost?.averageUnitCost?.roundedValue,
					tipo: state.type?.toLowerCase(),
					tipo_servicio: state.appraisalPurpose
				};

				try {
					if (state.id === 0) {
						// Crear nuevo
						const response = await api.post(`/homologacion/${state.type}/${justipreciacionId}`, payload);
						if (response.data?.success) {
							set({ ...state, id: response.data.data.id });
						}
						return response;
					} else {
						// Actualizar existente
						return await api.patch(`/homologacion/${state.type}/${justipreciacionId}`, payload);
					}
				} catch (error) {
					console.error('Error al guardar homologación:', error);
					throw error;
				}
			},

			// Acciones para factores
			addRow: () => {
				const state = get();
				// Lógica específica para agregar filas
				console.log('Adding row to factors');
			},

			removeRow: () => {
				const state = get();
				// Lógica específica para remover filas
				console.log('Removing row from factors');
			},

			updateFactors: (key: string, value: any) => {
				const state = get();
				set({
					...state,
					factors: {
						...state.factors,
						[key]: value
					}
				});
			},

			// Acciones para documentación
			updateDocumentation: (key: string, value: any) => {
				const state = get();
				set({
					...state,
					documentation: {
						...state.documentation,
						[key]: value
					}
				});
			},

			getJustipreciacionById: async ({
				key,
				includes,
				excludes,
				isLegacy = false,
			}: any) => {
				const { id } = get();
				const response = await api.get(
					`/justipreciacion${isLegacy ? "/legacy" : ""}/${id}`,
					{ params: { key, includes, excludes } },
				);
				return response;
			},
			getJustipreciacionByRegistro: async (
				key,
				includes,
				excludes,
				isLegacy = false,
			) => {
				const { registro } = get();
				return await api.get(
					`/justipreciacion${isLegacy ? "/legacy" : ""}/registro/${registro}`,
					{ params: { key, includes, excludes } },
				);
			},
			patchJustipreciacion: async (isLegacy = false) => {
				const { id } = get();
				return await api.patch(
					`/justipreciacion${isLegacy ? "/legacy" : ""}/${id}`,
				);
			},
			flattenObject: (obj: Record<string, any>) => {
				const flattened: Record<string, any> = {};

				for (const key in obj) {
					if (typeof obj[key] === "object" && obj[key] !== null) {
						for (const subKey in obj[key]) {
							flattened[`${key}_${subKey}`] = obj[key][subKey];
						}
					} else {
						flattened[key] = obj[key];
					}
				}

				return flattened;
			},
		}),
		{
			name: "homologacion-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
export default useHomologacion;
