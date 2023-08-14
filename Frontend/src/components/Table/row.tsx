/** @format */

import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@utils/ui";
export const Row = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
	({ className, ...props }, ref) => (
		<tr
			ref={ref}
			className={cn(
				"border-b transition-colors hover:bg-zinc-100/50 data-[state=selected]:bg-zinc-100 dark:hover:bg-zinc-800/50 dark:data-[state=selected]:bg-zinc-800",
				className,
			)}
			{...props}
		/>
	),
);
Row.displayName = "Row";
export default Row;
