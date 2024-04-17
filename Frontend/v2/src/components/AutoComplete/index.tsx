/** @format */

import { AutoComplete as Component } from "primereact/autocomplete";
import { forwardRef } from "react";
import { cn } from "@utils/ui";
import { AutoCompleteProps } from "./types";

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
	({ className, type, ...props }, ref) => {
		return (
			<Component
				type={type}
				inputClassName={cn(
					"flex h-9 w-full rounded-md border border-zinc-200 border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-800",
					className,
				)}
				className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center")}
				ref={ref}
				panelClassName={cn(
					"left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
				)}
				{...props}
			/>
		);
	},
);
AutoComplete.displayName = "AutoComplete";
export default AutoComplete;
