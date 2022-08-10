/** @format */

import { ChangeEventHandler } from "react";
import { ReactNode } from "react";
export interface Item {
	/** The value of the option corresponds to the `valueKey` in the data. **/
	value: string;

	/** The content displayed by the option corresponds to the `labelKey` in the data. **/
	label: ReactNode;
}
export interface SelectProps {
	index?: number;
	className?: string;
	label?: ReactNode;
	labelKey?: string;
	valueKey?: string;
	defaultValue?: Item | string | number;
	data: Item[];
	value?: any;
	placement?:
		| "bottomStart"
		| "bottomEnd"
		| "topStart"
		| "topEnd"
		| "leftStart"
		| "leftEnd"
		| "rightStart"
		| "rightEnd"
		| "auto"
		| "autoVerticalStart"
		| "autoVerticalEnd"
		| "autoHorizontalStart"
		| "autoHorizontalEnd";
	block?: boolean;
	onSelect?: (value: any, item: any, event: any) => void;
	size?: "lg" | "md" | "sm" | "xs";
	onChange?: ChangeEventHandler<HTMLSelectElement>;
}
