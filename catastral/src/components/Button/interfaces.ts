import { StackProps } from "@mui/material";
import {  ReactNode } from "react";


export interface BasicProps {
	variant?: "text" | "outlined" | "contained";
}
export interface LinkProps  {
	href?: string;
	variant?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "subtitle1"
		| "subtitle2"
		| "body1"
		| "body2"
		| "caption"
		| "button"
		| "overline"
		| "inherit";
}
export interface FabProps {
	variant?: "circular" | "extended";
}
export interface ButtonProps{
    autoFocus?: boolean;
    type?: "button" | "link" | "floating";
	children: ReactNode | ReactNode[];
	color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    sx?: any;
    button: BasicProps | LinkProps | FabProps;
    successful?: boolean;
	onClick?: () => void;
	menu?: {
		component: ReactNode | ReactNode[];
		orientation?: {
			vertical: "top" | "center" | "bottom";
			horizontal: "left" | "center" | "right";
		},
		stack?:StackProps;
	};
	justifyContent?: "flex-start" | "center" | "flex-end";
	

}