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
	confirmButtonColor,
	showDenyButton,
	showCancelButton,
	showCloseButton,
	cancelButtonColor,
	didOpen,
	...props
}: SweetAlertProps) => withReactContent(Swal).fire({
		titleText:title,
		position: props?.position ?? "center",
		showConfirmButton: props?.showConfirmButton ?? true,
		confirmButtonText: props?.confirmButtonText ?? "OK",
		confirmButtonColor: colorAlertPicker(confirmButtonColor ?? "primary"),
		cancelButtonColor: colorAlertPicker(cancelButtonColor ?? "secondary"),
		denyButtonText: props?.denyButtonText ?? "Cancel",
		cancelButtonText: props?.cancelButtonText ?? "Cancel",
		didOpen: () => {
			props?.isLoading && Swal.showLoading();
			return didOpen;
		},
		...definedProps,
		...props
	});


const base = (
	{title,
	text,
	icon,
	confirmButtonColor,
	isLoading}:SADefinedProps
) =>  withReactContent(Swal).fire({
		...definedProps,
		titleText:title,
		text,
		icon,
		confirmButtonText: "Aceptar",
		confirmButtonColor,
		didOpen: () => isLoading && Swal.showLoading(),
	});


export const Success = ({confirmButtonColor,...props }: SADefinedProps) =>
	base({confirmButtonColor:colorAlertPicker("success"),...props});
export const Error = ({confirmButtonColor,...props }: SADefinedProps) =>
base({confirmButtonColor:colorAlertPicker("danger"),...props});
export const Warning = ({confirmButtonColor,...props }: SADefinedProps) =>
base({confirmButtonColor:colorAlertPicker("warning"),...props});
export const Info = ({confirmButtonColor,...props }: SADefinedProps) =>base({confirmButtonColor:colorAlertPicker("info"),...props});

export const Question = ({icon,confirmButtonColor,...props }: SADefinedProps) =>base({confirmButtonColor:colorAlertPicker("primary"),icon:"question",...props});;
export const SimpleMessage = ({title,text,...props}:SADefinedProps) =>
	Swal.fire({ titleText:title, text });

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
