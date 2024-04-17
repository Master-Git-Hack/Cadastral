/** @format */

export interface NumberProps {
	id?: string;
	defaultValue?: number;
	disabled?: boolean;
	max?: number;
	min?: number;
	step?: number;
	value: number;
	onChange: (value: number) => void;
	size?: "xs" | "sm" | "md" | "lg";
}
