import { sortFactorsStorage } from "./sortFactorsHandler";
const initialState = (type: string): sortFactorsStorage => ({
    available: Array.from({ length: 10 }, (v, i) => i + (!type.includes("TERRENO") ? 3 : 2)),
    taken: [],
})
export const sortFactorsHandler = {
    initialState,
    addFactor: (state: sortFactorsStorage) => {
        state.available = [...state.available, state.taken[0]];
        state.taken = state.taken.slice(1);
        return state;
    },
    removeFactor: (state:sortFactorsStorage) => {
		state.taken = [...state.taken, state.available[0]].sort((a, b) => a - b)
        state.available = state.available.slice(1)
        return state;
	},
}