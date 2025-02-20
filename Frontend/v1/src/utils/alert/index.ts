/** @format */

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { colorAlertPicker } from "../color";
import { SADefinedProps, SweetAlertProps } from "./alert.types";

const definedProps = {
	backdrop: false,
	allowOutsideClick: false,
	allowEscapeKey: true,
	allowEnterKey: true,
	focusConfirm: true,
	scrollbarPadding: true,
	returnInputValueOnDeny: true,
};

/**
 * @param {Object};
 *
 * @interface SweetAlertProps;
 * @returns SweetAlert2 response:{isConfirmed, isDenied,isDismissed, value,dismiss}
 */
export const Component = ({
	title,
	text,
	icon,
	iconColor,
	footer,
	toast,
	grow,
	confirmButtonColor,
	showDenyButton,
	showCancelButton,
	showCloseButton,
	cancelButtonColor,
	input,
	inputPlaceholder,
	inputValue,
	inputLabel,
	inputOptions,
	html,
	didOpen,
	...props
}: SweetAlertProps) => {
	const Component = withReactContent(Swal);
	const titleText = title;
	const isLoading = props?.isLoading ?? false;
	return Component.fire({
		titleText,
		text,
		icon,
		iconColor,
		footer,
		toast,
		position: props?.position || "center",
		grow,
		showConfirmButton: props?.showConfirmButton || true,
		confirmButtonText: props?.confirmButtonText || "OK",
		confirmButtonColor: colorAlertPicker(confirmButtonColor ?? "primary"),
		cancelButtonColor: colorAlertPicker(cancelButtonColor ?? "secondary"),
		showDenyButton,
		denyButtonText: props?.denyButtonText || "Cancel",
		showCancelButton,
		cancelButtonText: props?.cancelButtonText || "Cancel",
		showCloseButton,
		input,
		inputPlaceholder,
		inputValue,
		inputLabel,
		inputOptions,
		html,
		didOpen: () => {
			isLoading && Swal.showLoading();
			return didOpen;
		},
		...definedProps,
	});
};

const base = (
	titleText: string,
	text: string,
	icon: "success" | "error" | "warning" | "info" | "question",
	confirmButtonColor: string,
	isLoading: boolean = false,
) => {
	const Component = withReactContent(Swal);
	return Component.fire({
		...definedProps,
		titleText,
		text,
		icon,
		confirmButtonText: "Aceptar",
		confirmButtonColor,
		didOpen: () => isLoading && Swal.showLoading(),
	});
};

export const Success = ({ title, text, isLoading }: SADefinedProps) =>
	base(title, text, "success", colorAlertPicker("success"), isLoading);
export const Error = ({ title, text, isLoading }: SADefinedProps) =>
	base(title, text, "error", colorAlertPicker("danger"), isLoading);
export const Warning = ({ title, text, isLoading }: SADefinedProps) =>
	base(title, text, "warning", colorAlertPicker("warning"), isLoading);
export const Info = ({ title, text, isLoading }: SADefinedProps) =>
	base(title, text, "info", colorAlertPicker("info"), isLoading);
export const Question = ({ title, text, isLoading }: SADefinedProps) =>
	base(title, text, "question", colorAlertPicker("primary"), isLoading);
export const SimpleMessage = (titleText: string = "", text: string = "") =>
	Swal.fire({ titleText, text });

export const Save = (props: { title: string; text: string }) =>
	Component({
		title: props.title,
		text: `¿Desea proceder a ${props.text} los cambios?`,
		icon: "warning",
		confirmButtonText: "Continuar",
		confirmButtonColor: "success",
		cancelButtonText: "Cancelar",
		cancelButtonColor: "danger",
		showCancelButton: true,
	});
export const Ask = (props: { title: string; text: string }) =>
	Component({
		title: props.title,
		text: props.text,
		icon: "info",
		confirmButtonText: "Solicitar Documentos Nuevamente",
		confirmButtonColor: "info",
		cancelButtonText: "Cancelar",
		cancelButtonColor: "danger",
		showCancelButton: true,
		showCloseButton: true,
	});
export const Alert = {
	Component,
	Success,
	Error,
	Warning,
	Info,
	Question,
	SimpleMessage,
	Save,
	Ask,
};
