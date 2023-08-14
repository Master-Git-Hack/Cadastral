/** @format */

import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@utils/ui";
export const Caption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
	({ className, ...props }, ref) => (
		<caption
			ref={ref}
			className={cn("mt-4 text-sm text-zinc-500 dark:text-zinc-400", className)}
			{...props}
		/>
	),
);
Caption.displayName = "Caption";
export default Caption;
