/** @format */

export interface DropdownProps {
	index?: number;
	name: string;
	btnText: string;
	btnType?:
		| "success"
		| "danger"
		| "warning"
		| "info"
		| "primary"
		| "secondary"
		| "dark"
		| "light"
		| "link";
	options: Array<string>;
	currentItem: number | string;
	menuStyle?: string;
	btnStyle?: string;
	onClick: (option: string, index: number) => void;
}
