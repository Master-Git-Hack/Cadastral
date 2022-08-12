/** @format */

import { ChangeEventHandler } from "react";
import { Input } from "../input.types";
export interface FancyProps extends Input {
	value: number;
	isCurrency?: boolean;
	isPercentage?: boolean;
	classNameEditing?: string;
	classNameDecorator?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	decimals?: number;
}
