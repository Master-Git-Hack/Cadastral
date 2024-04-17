/** @format */

import { forwardRef, ThHTMLAttributes } from "react";

import { cn } from "@utils/ui";
export const Head = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<th
			ref={ref}
			className={cn(
				"h-10 px-2 text-left align-middle font-medium text-zinc-500 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] dark:text-zinc-400",
				className,
			)}
			{...props}
		/>
	),
);
Head.displayName = "Head";
export default Head;
