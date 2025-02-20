export interface SwitchProps {
	checked?: boolean;
	onChange: (checked: boolean) => void;
	withText?: boolean;
	label?: any;
	checkedText?: any;
	uncheckedText?: any;
	size?: "lg" | "md" | "sm" | "xs";
	reverse?: boolean;
}