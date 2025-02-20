/** @format */

import { forwardRef } from "react";
import { variants, ToggleProps } from "./types";
import { cn } from "@utils/ui";
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
	({ className, variant, size, children, ...props }, ref) => (
		<label className="relative inline-flex items-center mr-5 cursor-pointer">
			<input type="checkbox" ref={ref} className="sr-only peer" {...props} />
			<div className={cn(variants({ variant, size, className }))}></div>
			<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
				{children}
			</span>
		</label>
	),
);
Toggle.displayName = "Toggle";
export default Toggle;
