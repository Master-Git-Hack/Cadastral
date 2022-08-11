/** @format */

import { ReactNode } from "react";

export interface PaginatedViewProps {
	children: { [key: string | number]: ReactNode | ReactNode[] } | ReactNode[] | ReactNode;
	title?: ReactNode | ReactNode[];
	footer?: ReactNode | ReactNode[];
	sidebar?: {
		children: ReactNode | ReactNode[];
		position?: "left" | "right";
		outside?: boolean;
	};
	startAt?: number;
	totalPages: number;
	limit?: number;
}
