/** @format */

import { api } from "../../../api";
import {
	Properties,
	ObrasComplementarias,
} from "../../../types/justipreciacion/obrasComplementarias";
import { CalculationProps } from "../../../types/justipreciacion/obrasComplementarias/calculo";
import { DocumentationProps } from "../../../types/justipreciacion/obrasComplementarias/registro";

export interface Record {
	id: number;
	register: string;
	status: "newOne" | "exists";
}
export interface StateProps {
	Documentation: Array<DocumentationProps>;
	Calculation: Array<CalculationProps>;
	total: number;
	isComplete: boolean;
	message: string;
	status: string;
	errors: Array<Properties>;
	record: Record;
	handlers: Properties;
}
const { calculo, documentation } = ObrasComplementarias;
const { documentationTemplate } = documentation;
const { calculationTemplate } = calculo;

export const name = "ObrasComplementarias";
export const consume = api(name);
export const initialState: StateProps = {
	Documentation: [documentationTemplate],
	Calculation: [calculationTemplate],
	total: 0,
	message: "",
	status: "unset",
	errors: [],
	record: {
		id: 0,
		register: "",
		status: "newOne",
	},
	isComplete: true,
	handlers: {
		documentation,
		calculo,
		getFinalTotal: (calculation: Array<CalculationProps>): number =>
			calculation.reduce(
				(previous: number, { total }: CalculationProps) => previous + total,
				0,
			),
	},
};
