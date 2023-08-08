/** @format */

import { InputSwitch } from "primereact/inputswitch";
import { SwitchProps } from "./types";
import { ElementRef, forwardRef } from "react";

import { cn } from "@lib/utils/ui";

export const Switch = forwardRef<ElementRef<typeof InputSwitch>, SwitchProps>(
	({ className, ...props }, ref) => {
		return (
			<InputSwitch
				className={cn(
					"flex h-9 w-full rounded-md border border-zinc-200 border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-800",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Switch.displayName = "Switch";

export default Switch;
