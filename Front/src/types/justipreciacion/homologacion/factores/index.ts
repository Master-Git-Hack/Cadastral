/** @format */

export interface Properties {
	[key: string | number]: any;
}
export interface FactorsProps extends Properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position?: number;
	subject?: Properties;
	data: Array<Properties>;
	root?: Properties;
	results?: Array<Properties>;
}

export const operation = (data: any, subject: any) =>
	data.map((item: any) => {
		item.result = subject.value / item.value;
		return item;
	});
export const insertion = (data: any, template: any) => data.push(template(data.length));
export const symbolsOptions = [
	{
		label: "+",
		value: 1,
	},
	{
		label: "=",
		value: 0,
	},
	{
		label: "-",
		value: -1,
	},
];
