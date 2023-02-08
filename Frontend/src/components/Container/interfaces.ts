/** @format */

import { ReactElement, ReactNode } from "react";

import { ContainerProps as BaseProps, PaginationProps } from "@mui/material";
export interface ContainerProps extends BaseProps {
	header?: ReactNode | ReactNode[] | ReactElement | ReactElement[];
	actions?: {
		title?: string;
		position?: "top" | "bottom" | "both";
		show?: "all" | "first" | "last" | "afterFirst" | "beforeLast";
		component?: ReactNode | ReactNode[] | ReactElement | ReactElement[];
		shadow?: number;
	};
	pagination?: PaginationProps;
	footer?: ReactNode | ReactNode[] | ReactElement | ReactElement[];
	startAt?: number;
	hide?: number;
	totalPages?: number;
	shadow?: number;
	justifyContent?: "flex-start" | "center" | "flex-end";
}
