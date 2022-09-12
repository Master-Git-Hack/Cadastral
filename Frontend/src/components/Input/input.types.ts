/** @format */

import { ChangeEventHandler } from "react";

export interface Input {
	index?: number;
	name: string;
	label: string;
	onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
	className?: string;
}
export interface TextProps {
	isArea?: boolean;
	onChange: (value: string) => void;
	type?:
		| "text"
		| "password"
		| "email"
		| "tel"
		| "url"
		| "search"
		| "date"
		| "time"
		| "datetime-local"
		| "month"
		| "week"
		| "number"
		| "color";
	placeholder?: string;
	value: string | number;
	size?: "lg" | "md" | "sm" | "xs";
	rows?: number;
	disabled?: boolean;
}
