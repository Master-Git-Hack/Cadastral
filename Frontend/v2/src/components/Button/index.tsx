/** @format */

import { forwardRef } from "react";

import { variants, ButtonProps } from "./types";
import { cn } from "@utils/ui";

const Component = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, children, ...props }, ref) => (
		<div>
			<button {...props} data-dropdown-toggle="dropdown">
				{children}
				<svg
					className="w-2.5 h-2.5 ml-2.5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				></svg>
			</button>
			<div></div>
		</div>
	),
);
Component.displayName = "Button";
