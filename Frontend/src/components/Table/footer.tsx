/** @format */

import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@utils/ui";
export const Footer = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<tfoot
			ref={ref}
			className={cn(
				"bg-zinc-900 font-medium text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
				className,
			)}
			{...props}
		/>
	),
);
Footer.displayName = "Footer";
export default Footer;
