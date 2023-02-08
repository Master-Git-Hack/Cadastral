/** @format */

import { AlertProps as Props } from "@mui/material";
export interface AlertProps extends Props {
	title?: string;
	reference?: string;
	justifyContent?: "flex-start" | "center" | "flex-end";
}
