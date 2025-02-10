/** @format */



export interface EnabledNumberProps {
	defaultValue?: number;
	max?: number;
	min?: number;
	step?: number;
	value: number;
	onChange: (value: number) => void;
	size?: "lg" | "md" | "sm" | "xs";
	postfix?: JSX.Element;
	prefix?: JSX.Element;
	checked: boolean;
	setChecked: (checked: boolean) => void;
}
