/** @format */

import { forwardRef } from "react";
import { variants, InputProps } from "./types";
import { cn } from "@utils/ui";
export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, size, children, ...props }, ref) => (
		<label className="block w-full">
			{children ? (
				<span className="block text-sm font-medium text-slate-700">{children}</span>
			) : (
				<></>
			)}

			<input ref={ref} {...props} className={cn(variants({ variant, size, className }))} />
		</label>
	),
);
Input.displayName = "Input";
export default Input;
