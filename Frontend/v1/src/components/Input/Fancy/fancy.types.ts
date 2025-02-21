/** @format */

import type { ChangeEventHandler } from "react";
import type { Input } from "../input.types";
export interface FancyProps extends Input {
	value: number;
	isCurrency?: boolean;
	isPercentage?: boolean;
	classNameEditing?: string;
	classNameDecorator?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	decimals?: number;
}
