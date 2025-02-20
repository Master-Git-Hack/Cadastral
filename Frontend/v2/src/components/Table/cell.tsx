/** @format */

import { forwardRef, TdHTMLAttributes } from "react";

import { cn } from "@utils/ui";
export const Cell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<td
			ref={ref}
			className={cn(
				"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	),
);
Cell.displayName = "Cell";
export default Cell;
