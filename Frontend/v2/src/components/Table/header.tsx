/** @format */

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@utils/ui";
export const Header = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
	),
);
Header.displayName = "Header";
export default Header;
