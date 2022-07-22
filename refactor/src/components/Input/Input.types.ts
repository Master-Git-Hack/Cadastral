/** @format */
import { ButtonProps } from "./../Button/Button.types";

import { ChangeEventHandler, MouseEventHandler } from "react";

interface Input {
	index?: number;
	name: string;
	label: string;
	onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
	className?: string;
}
export interface FancyProps extends Input {
	value: number;
	isCurrency?: boolean;
	isPercentage?: boolean;
	classNameEditing?: string;
	classNameDecorator?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	decimals?: number;
}

export interface FloatingProps extends Input {
	tag: string;
	type: string;
	value: any;
	valueToShow: any;
	minWidth?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	step?: number;
	onChange: ChangeEventHandler<HTMLInputElement>;
}
interface ObjectSelect {
	id?: number;
	name?: string;
	value: number;
	type: string;
}
export interface SelectProps extends Input {
	current: ObjectSelect;
	options: Array<ObjectSelect>;
	onChange: ChangeEventHandler<HTMLSelectElement>;
}
export interface SwitchProps extends Input {
	name: string;
	type: "radio" | "switch" | "checkbox";
	checked: boolean;
	onChange: ChangeEventHandler<HTMLInputElement>;
	inline?: boolean;
}
export interface RangeProps extends Input {
	value: string | number;
	onChange: ChangeEventHandler<HTMLInputElement>;
	disabled?: boolean;
}
export interface AreaProps extends Input {
	rows?: number;
	value: string;
	onChange: ChangeEventHandler<HTMLTextAreaElement>;
}
export interface FileProps extends Input {
	value: any;
	filename?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	remove: MouseEventHandler<HTMLButtonElement>;
}
