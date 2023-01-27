/** @format */

import { ReactElement, ReactNode } from "react";
import {
	TableBodyProps,
	TableContainerProps,
	TableFooterProps,
	TableHeadProps,
	TablePaginationProps,
	TableProps,
	PaperProps,
	BoxProps,
} from "@mui/material";
import { DataGridProps, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
interface Columns extends GridColDef {
	getValue?: ({ row }: GridValueGetterParams) => void;
}
export interface AutoTableProps extends DataGridProps {
	columns: Columns[];
	rows: any[];
	box?: BoxProps;
	justifyContent?: "flex-start" | "center" | "flex-end";
}

export interface CustomTableProps extends PaperProps {
	head?: TableHeadProps;
	body?: TableBodyProps;
	footer?: TableFooterProps;
	container?: TableContainerProps;
	pagination?: TablePaginationProps;
	table?: TableProps;
	children?: ReactNode | ReactNode[] | ReactElement | ReactElement[];
	justifyContent?: "flex-start" | "center" | "flex-end";
	loading?: boolean;
}
