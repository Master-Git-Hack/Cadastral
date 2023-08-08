/** @format */

import { InputNumber as Component } from "primereact/inputnumber";
import { NumberProps, BASE_STYLE } from "./types";
import { ElementRef, forwardRef } from "react";

import { cn } from "@utils/ui";

export const InputNumber = forwardRef<ElementRef<typeof Component>, NumberProps>(
	({ className, ...props }, ref) => {
		return <Component className={cn(BASE_STYLE, className)} ref={ref} {...props} />;
	},
);
InputNumber.displayName = "Number";

export default InputNumber;
