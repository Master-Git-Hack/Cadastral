/** @format */

import type { FactorsProps } from "../";
import { getURLParams } from "../../../../../utils/url";

export const optionRenta = [
	{
		label: "HABITACIONAL",
		value: 1.0,
	},
	{
		label: "COMERCIAL",
		value: 1.03,
	},
	{
		label: "MIXTO H-C",
		value: 1.05,
	},
	{
		label: "INDUSTRIAL",
		value: 1.07,
	},
	{
		label: "MIXTO I-H",
		value: 0.97,
	},
	{
		label: "MIXTO I-C",
		value: 1.09,
	},
	{
		label: "SERVICIOS",
		value: 1.04,
	},
];
// HABITACIONAL	1
// HABITACIONAL SUPERIOR	1
// HABITACIONAL MEDIO	1
// HABITACIONAL INTERÉS SOCIAL	1
// HABITACIONAL ECONÓMICA-POPULAR	1
// RESIDENCIAL 	1
// RESIDENCIAL SUPERIOR	1
// RESIDENCIAL MEDIO	1
// COMERCIAL	1.03
// COMERCIAL SUPERIOR	1.03
// COMERCIAL MEDIO	1.03
// COMERCIAL ECONÓMICO	1.03
// CENTRO	1.05
// CENTRO SUPERIOR	1.05
// CENTRO MEDIO	1.05
// CENTRO ECONÓMICO	1.05
// INDUSTRIAL	1.07
// INDUSTRIAL SUPERIOR	1.07
// INDUSTRIAL MEDIO	1.07
// INDUSTRIAL ECONÓMICO	1.07
// MIXTO HABITACIONAL COMERCIAL	0.97
// MIXTO HABITACIONAL SERVICIOS	0.97
// MIXTO HABITACIONAL INDUSTRIAL	0.97
// MIXTO HAB., COMERCIAL Y DE SERVICIOS	0.97
// MIXTO COMERCIAL HABITACIONAL	0.97
// MIXTO COMERCIAL SERVICIOS	0.97
// MIXTO COMERCIAL INDUSTRIAL	0.97
// MIXTO COMERCIAL Y EQUIPAMIENTO	0.97
// MIXTO INDUSTRIAL HABITACIONAL	0.97
// MIXTO INDUSTRIAL COMERCIAL	0.97
// MIXTO INDUSTRIAL SERVICIOS	0.97
// MIXTO INDUSTRIAL EQUIPAMIENTO	0.97
// MIXTO SERVICIOS Y EQUIPAMIENTO	0.97
// MARGINADO IRREGULAR	1.1
// SUBURBANA	1.1
// RÚSTICO	1.1
// DE SERVICIOS	1.04
// CAMPESTRE	1.1
export const optionTerreno = [
	{ label: "HABITACIONAL", value: 1.0 },
	{ label: "HABITACIONAL SUPERIOR", value: 1.0 },
	{ label: "HABITACIONAL MEDIO", value: 1.0 },
	{ label: "HABITACIONAL INTERÉS SOCIAL", value: 1.0 },
	{ label: "HABITACIONAL ECONÓMICA-POPULAR", value: 1.0 },
	{ label: "RESIDENCIAL", value: 1.0 },
	{ label: "RESIDENCIAL SUPERIOR", value: 1.0 },
	{ label: "RESIDENCIAL MEDIO", value: 1.0 },
	{ label: "COMERCIAL", value: 1.03 },
	{ label: "COMERCIAL SUPERIOR", value: 1.03 },
	{ label: "COMERCIAL MEDIO", value: 1.03 },
	{ label: "COMERCIAL ECONÓMICO", value: 1.03 },
	{ label: "CENTRO", value: 1.05 },
	{ label: "CENTRO SUPERIOR", value: 1.05 },
	{ label: "CENTRO MEDIO", value: 1.05 },
	{ label: "CENTRO ECONÓMICO", value: 1.05 },
	{ label: "INDUSTRIAL", value: 1.07 },
	{ label: "INDUSTRIAL SUPERIOR", value: 1.07 },
	{ label: "INDUSTRIAL MEDIO", value: 1.07 },
	{ label: "INDUSTRIAL ECONÓMICO", value: 1.07 },
	{ label: "MIXTO HABITACIONAL COMERCIAL", value: 0.97 },
	{ label: "MIXTO HABITACIONAL SERVICIOS", value: 0.97 },
	{ label: "MIXTO HABITACIONAL INDUSTRIAL", value: 0.97 },
	{ label: "MIXTO HAB., COMERCIAL Y DE SERVICIOS", value: 0.97 },
	{ label: "MIXTO COMERCIAL HABITACIONAL", value: 0.97 },
	{ label: "MIXTO COMERCIAL SERVICIOS", value: 0.97 },
	{ label: "MIXTO COMERCIAL INDUSTRIAL", value: 0.97 },
	{ label: "MIXTO COMERCIAL Y EQUIPAMIENTO", value: 0.97 },
	{ label: "MIXTO INDUSTRIAL HABITACIONAL", value: 0.97 },
	{ label: "MIXTO INDUSTRIAL COMERCIAL", value: 0.97 },
	{ label: "MIXTO INDUSTRIAL SERVICIOS", value: 0.97 },
	{ label: "MIXTO INDUSTRIAL EQUIPAMIENTO", value: 0.97 },
	{ label: "MIXTO SERVICIOS Y EQUIPAMIENTO", value: 0.97 },
	{ label: "MARGINADO IRREGULAR", value: 1.1 },
	{ label: "SUBURBANA", value: 1.1 },
	{ label: "RÚSTICO", value: 1.1 },
	{ label: "DE SERVICIOS", value: 1.04 },
	{ label: "CAMPESTRE", value: 1.1 },
];
const type = getURLParams("tipo") === "terreno";
const options = type ? optionTerreno : optionRenta;
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: FactorsProps = {
	name: "Uso",
	tag: "FUso.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1), template(2), template(3), template(4)],
};
export const usage = {
	template,
	options,
	initialState,
};
