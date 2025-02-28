/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "../api.config";
import {
	type IJustipreciacionActions,
	type IJustipreciacionState,
	defaultState,
} from "./interface";
const useJustipreciacion = create<
	IJustipreciacionState & IJustipreciacionActions
>()(
	persist((set, get) => ({ ...defaultState,
		setJustipreciacion:()=>{},
		clearJustipreciacion:()=>{},
		getJustipreciacionById:async(key,includes,excludes,isLegacy=false)=>{
			const {id} = get()
			const response= await api.get(`/justipreciacion${isLegacy?`/legacy`:""}/${id}`,{params:{key,includes,excludes}})
			return response
		},
		getJustipreciacionByRegistro:async(key,includes,excludes,isLegacy=false)=>{
			const {registro} = get()
			return await api.get(`/justipreciacion${isLegacy?`/legacy`:""}/registro/${registro}`,{params:{key,includes,excludes}})
		},
		patchJustipreciacion:async(isLegacy=false)=>{
			const {id} = get()
			return await api.patch(`/justipreciacion${isLegacy?`/legacy`:""}/${id}`)
		},
		flattenObject:(
			obj: Record<string, any>,
		) => {
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
		}
	}), {
		name: "justipreciacion-storage",
		storage: createJSONStorage(() => localStorage),
	}),
);
export default useJustipreciacion;
