/** @format */
interface Properties{
    [key: string | number]: any;
}
interface AreaProperties {
	description?: string;
	value: number;
	unity: string;
	getResult?: Function;
}
const getResult = (value: number, total: number): number => value / total;
interface CalculationProperties extends Properties {
	id: number;
	quantity: AreaProperties;
	value: {
		unitary: number;
		ind: {
			value: number;
			unitary: number;
			getUnitaryInd: Function;
		};
		total: number;
		getTotal: Function;
	};
}
const getUnitaryInd = (ind: number = 1, unitary: number): number => unitary * ind;
interface ValueProperties {
	subTotal: number;
	total: number;
	gtoFactor: number;
	result: AreaProperties;
	getSubTotal: Function;
	getTotal: Function;
}
const getSubTotal = (data: Array<CalculationProperties>) =>
	data.reduce(
		(previous: number, current: CalculationProperties) =>
			previous + Number(current.value.total),
		0,
	);
export interface DataProperties extends Properties{
	id: number;
	name: string;
	area: AreaProperties;
	calculation: Array<CalculationProperties>;
	value: ValueProperties;
	appendCalculationTemplate: Function;
}
const calculationTemplate = (id: number): CalculationProperties => ({
	id,
	quantity: {
		description: "",
		value: 1,
		unity: "m2",
	},
	value: {
		unitary: 1,
		ind: {
			value: 1,
			unitary: 1,
			getUnitaryInd,
		},
		total: 1,
		getTotal: (quantity: number, unitary: number): number => quantity * unitary,
	},
});
const appendCalculationTemplate = (data: Array<CalculationProperties>) => {
	const length = data.length + 1;
	data.push(calculationTemplate(length));
	return data;
};
export const dataTemplate = (id: number): DataProperties => ({
	id,
	name: "",
	area: {
		description: "",
		value: 1,
		unity: "m2",
	},
	calculation: [calculationTemplate(1)],
	value: {
		subTotal: 1,
		total: 1,
		gtoFactor: 1,
		result: {
			value: 1,
			unity: "m2",
			getResult,
		},
		getSubTotal,
		getTotal: (factor: number, subTotal: number): number => subTotal * factor,
	},
	appendCalculationTemplate,
});
