/** @format */


export interface SwitchProps {
	checked?: boolean;
	onChange: (checked: boolean) => void;
	withText?: boolean;
	label?: JSX.Element | JSX.Element[];
	checkedText?: JSX.Element;
	uncheckedText?: JSX.Element;
	size?: "lg" | "md" | "sm" | "xs";
	reverse?: boolean;
}
