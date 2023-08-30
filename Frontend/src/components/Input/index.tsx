/** @format */

import { forwardRef } from "react";
import { variants, InputProps } from "./types";
import { cn } from "@utils/ui";
import { Area } from "./area";
const Component = forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, size, rounded, validation, ...props }, ref) => (
		<input
			ref={ref}
			{...props}
			className={cn(
				variants({ variant, size, rounded, validation }),
				className + " w-full rounded-md",
			)}
		/>
	),
);
Component.displayName = "Input";
export const Input = Object.assign(Component, { Area });
export default Input;
