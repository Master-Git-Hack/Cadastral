/** @format */

import { forwardRef } from "react";
import { variants, InputProps } from "./types";
import { cn } from "@utils/ui";
export const Input = forwardRef<HTMLInputElement, InputProps>(
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
Input.displayName = "Input";
export default Input;
