/** @format */

import { InputText } from "primereact/inputtext";
import { TextProps } from "./types";
import { ElementRef, forwardRef } from "react";

export const Text = forwardRef<ElementRef<typeof InputText>, TextProps>(
	({ className, icon, button, ...props }, ref) => {
		const current = typeof icon !== "undefined" ? "ps-10" : "";
		return (
			<form>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						{icon}
					</div>
					<InputText
						className={`block h-9 w-full rounded-md border border-zinc-200 border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-800 hover:border-blue-400 hover:ring-1 hover:ring-blue-400 ${current}`}
						ref={ref}
						{...props}
					/>

					{button}
				</div>
			</form>
		);
	},
);
Text.displayName = "Text";

export default Text;
