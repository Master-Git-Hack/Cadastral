/** @format */

import { ChangeEventHandler } from "react";
interface open {
	[key: string]: any;
}
interface Value extends open {
	value: string | number;
	label: string;
}
export interface SelectProps {
	name?: string;
	value: Value;
	keyValue?: string;
	options: Array<Value>;
	onChange: ChangeEventHandler<HTMLSelectElement>;
	label?: string;
	loading?: boolean;
	justifyContent?: "flex-start" | "center" | "flex-end";
}
