/** @format */

import { ReactElement, ReactNode } from "react";
import { ButtonProps } from "../Button/interfaces";
export interface TitleProps {
	children: ReactNode | ReactNode[];
	sx?: any;
	align?: "left" | "right";
	variant?:
		| "button"
		| "inherit"
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
		| "overline";
	component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}
export interface HeaderProps {
	title?: TitleProps;
	color?: "default" | "inherit" | "primary" | "secondary" | "transparent";
	sx?: any;
	button?: ButtonProps;
}
export interface FooterProps {
	children?: ReactNode | ReactElement | ReactNode[] | ReactElement[];
	actions?: ButtonProps[];
	sx?: any;
}
export interface ModalProps {
	children: ReactNode | ReactElement | ReactNode[] | ReactElement[];
	modalBtn?: ButtonProps;
	asSimpleDialog?: boolean;
	open?: boolean;
	header: HeaderProps;
	footer?: FooterProps;
	fullWidth?: boolean;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	sx?: any;
	justifyContent?: "flex-start" | "center" | "flex-end";
}
