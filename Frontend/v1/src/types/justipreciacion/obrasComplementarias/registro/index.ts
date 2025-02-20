/** @format */

import { Properties } from "..";

export interface AreaDataProps extends Properties {
	id: number;
	description: string;
	value: number;
	unit: string;
	status: string | null;
}
export interface AreaProps extends Properties {
	data: Array<AreaDataProps>;
	total: number;
	unit: string;
}
export interface DataProps extends Properties {
	id: number;
	description: string;
	quantity: number;
	unit: string;
	value: number;
	ind: number;
	total: number;
	status: string | null;
}
export interface DocumentationProps extends Properties {
	data: Array<DataProps>;
	area: AreaProps;
	subTotal?: number;
	total: number;
	totalByUnit: number;
	factorGTO: boolean;
}
export const areaDataTemplate = (id: number): AreaDataProps => ({
	id,
	description: "",
	value: 1,
	unit: "m2",
	status: null,
});
export const areaTemplate: AreaProps = {
	data: [areaDataTemplate(1)],
	total: 1,
	unit: "m2",
};
export const dataTemplate = (id: number): DataProps => ({
	id,
	description: "",
	quantity: 1,
	unit: "m2",
	value: 1,
	ind: 1,
	total: 1,
	status: null,
});

export const documentationTemplate: DocumentationProps = {
	data: [dataTemplate(1)],
	area: areaTemplate,
	total: 1,
	totalByUnit: 1,
	factorGTO: true,
};
export const documentation = {
	dataTemplate,
	documentationTemplate,
	areaTemplate,
	areaDataTemplate,
	getTotalArea: (data: Array<DataProps>) =>
		data.reduce((previous: number, { value }: DataProps) => previous + value, 0),
	getDataTotal: (data: Array<DataProps>) =>
		data.reduce((previous: number, { total }: DataProps) => previous + total, 0),
	getTotalByUnit: (value: number, total: number) => total / value,
	getGTOFactor: (factorGTO: boolean = false) => (factorGTO ? 0.935 : 1),
};
