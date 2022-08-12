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
export const Component = (props: SweetAlertProps) => {
	const Component = withReactContent(Swal);
	const {
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
	} = props;
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

export const Success = (props: SADefinedProps) =>
	base(props.title, props.text, "success", colorAlertPicker("success"), props.isLoading);
export const Error = (props: SADefinedProps) =>
	base(props.title, props.text, "error", colorAlertPicker("danger"), props.isLoading);
export const Warning = (props: SADefinedProps) =>
	base(props.title, props.text, "warning", colorAlertPicker("warning"), props.isLoading);
export const Info = (props: SADefinedProps) =>
	base(props.title, props.text, "info", colorAlertPicker("info"), props.isLoading);
export const Question = (props: SADefinedProps) =>
	base(props.title, props.text, "question", colorAlertPicker("primary"), props.isLoading);
export const SimpleMessage = (titleText: string = "", text: string = "") =>
	Swal.fire({ titleText, text });

export const Save = (props: { title: string; text: string }) =>
	Component({
		title: props.title,
		text: `¿Desea ${props.title} los cambios?`,
		icon: "warning",
		confirmButtonText: "Continuar",
		confirmButtonColor: "success",
		cancelButtonText: "Cancelar",
		cancelButtonColor: "danger",
		showCancelButton: true,
	});
export const Alert = { Component, Success, Error, Warning, Info, Question, SimpleMessage, Save };
