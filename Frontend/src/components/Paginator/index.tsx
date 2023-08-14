/** @format */
import { Paginator as Component } from "primereact/paginator";
import { PaginatorProps } from "./types";
import { ElementRef, forwardRef } from "react";

export const Paginator = forwardRef<ElementRef<typeof Paginator>, PaginatorProps>(
	({ className, children, ...props }, ref) => {
		const current = typeof icon !== "undefined" ? "ps-10" : "";
		return (
			<>
				{children}
				<Component ref={ref} {...props} />
			</>
		);
	},
);
Paginator.displayName = "Paginator";

export default Paginator;
