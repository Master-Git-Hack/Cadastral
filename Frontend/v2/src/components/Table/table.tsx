/** @format */

import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@utils/ui";

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
	({ className, ...props }, ref) => (
		<div className="w-full overflow-auto">
			<table
				ref={ref}
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	),
);
Table.displayName = "Table";

export default Table;
