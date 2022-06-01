import { commercialStorage } from './commercialStorage';
import { insertion } from "../../properties";
const template = (id: number) => ({
	id,
	value: 0.95,
});

const initialState: commercialStorage = {
	name: "Comercialización",
	tag: "FCom.",
	isUsed: true,
	position: 13,
	data: [template(1)],
};

export const commercialHandler = ({
    template,
    insertion,
    initialState,
})