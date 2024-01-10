/** @format */

import { ReactSweetAlertOptions } from "sweetalert2-react-content";

import type { SweetAlertOptions, SweetAlertIcon } from "sweetalert2";
import { cva, type VariantProps } from "class-variance-authority";
export const variants = {
	default: "#2563EB",
	primary: "#8B5CF6",
	secondary: "#4FD1C5",
	outline: "#FFFFFF",
	dark: "#1F2937",
	light: "#FFFFFF",
	success: "#10B981",
	warning: "#F59E0B",
	danger: "#EF4444",
	info: "#22D3EE",
};

export interface IAlert extends SweetAlertOptions {
	icon?: SweetAlertIcon;
	isLoading?: boolean;
	confirmColor?:
		| "default"
		| "primary"
		| "secondary"
		| "outline"
		| "dark"
		| "light"
		| "success"
		| "warning"
		| "danger"
		| "info";
	cancelColor?:
		| "default"
		| "primary"
		| "secondary"
		| "outline"
		| "dark"
		| "light"
		| "success"
		| "warning"
		| "danger"
		| "info";
	denyColor?:
		| "default"
		| "primary"
		| "secondary"
		| "outline"
		| "dark"
		| "light"
		| "success"
		| "warning"
		| "danger"
		| "info";
}
export interface AlertProps extends IAlert {}

export const DEFAULT_ALERT_OPTIONS: IAlert = {
	backdrop: false,
	allowOutsideClick: false,
	allowEscapeKey: true,
	allowEnterKey: true,
	focusConfirm: true,
	scrollbarPadding: true,
	returnInputValueOnDeny: true,
	position: "center",
	showConfirmButton: true,
};
