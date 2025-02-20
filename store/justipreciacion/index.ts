/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "../api.config";
import {
	IJustipreciacionActions,
	IJustipreciacionState,
	TipoJustipreciacion,
	TipoJustipreciacionValue,
	defaultState,
} from "./interface";
const useJustipreciacion = create<
	IJustipreciacionState & IJustipreciacionActions
>()(
	persist((set, get) => ({ ...defaultState }), {
		name: "justipreciacion-storage",
		storage: createJSONStorage(() => localStorage),
	}),
);
export default useJustipreciacion;
