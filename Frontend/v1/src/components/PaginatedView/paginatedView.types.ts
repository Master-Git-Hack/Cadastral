/** @format */

import { ReactNode } from "react";

export interface PaginatedViewProps {
	children: { [key: string | number]: ReactNode | ReactNode[] } | any[];
	title?: ReactNode | ReactNode[];
	footer?: ReactNode | ReactNode[];
	errors?: any[];
	showErrors?: boolean;
	startAt?: number;
	totalPages: number;
	limit?: number;
	actions: {
		children: ReactNode | ReactNode[];
		position?: "top" | "bottom";
		show?: "first" | "last" | "all" | "beforeLast" | "afterFirst";
	};
	hidePage?: number;
}
