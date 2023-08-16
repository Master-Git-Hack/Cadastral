/** @format */

import { AlertProps, IAlert, DEFAULT_ALERT_OPTIONS, variants } from "./types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { cn } from "@utils/ui";
const Template = ({
	titleText="",
	text="",
	icon,
	iconColor,
	footer,
	toast,
	grow,
	showDenyButton,
	showCancelButton,
	showCloseButton,
	input,
	inputPlaceholder,
	inputValue,
	inputLabel,
	inputOptions,
	html,
	isLoading,
	confirmButtonText= "OK",

	denyButtonText= "Abort",
	cancelButtonText= "Cancel",
	confirmColor = "default",
	cancelColor = "danger",
	didOpen,
	...props
}: IAlert) => {
	const Alert = withReactContent(Swal);
	return Alert.fire({
		...props,
		...DEFAULT_ALERT_OPTIONS,
		titleText,
		text,
		icon,
		iconColor,
		footer,
		toast,
		grow,
		showDenyButton,
		showCancelButton,
		showCloseButton,
		input,
		inputPlaceholder,
		inputValue,
		inputLabel,
		inputOptions,
		html,
		confirmButtonText,
		denyButtonText,
		cancelButtonText,
		confirmButtonColor: variants[confirmColor ],
		cancelButtonColor: variants[cancelColor ],

		didOpen: () => {
			isLoading && Alert.showLoading();
			return didOpen;
		},
		
	});
};

const Component = ({ titleText, text, icon, isLoading = false, ...props }: AlertProps) =>
	Template({ titleText, text, icon, isLoading, ...props });
export const Success = ({
	icon = "success",
	confirmColor = "success",
    isLoading = false,
    ...props
}: AlertProps) => Template({ ...props, icon, confirmColor, isLoading });

export const Danger = ({
	icon = "error",
	confirmColor = "danger",
	isLoading = false,
	...props
}: AlertProps) => Template({ icon, confirmColor, isLoading, ...props });

export const Warning = ({
	icon = "warning",
	confirmColor = "warning",
	isLoading = false,
	...props
}: AlertProps) => Template({ icon, confirmColor, isLoading, ...props });

export const Info = ({
	icon = "info",
	confirmColor = "info",
	isLoading = false,
	...props
}: AlertProps) => Template({ icon, confirmColor, isLoading, ...props });

export const Question = ({
	icon = "question",
	confirmColor = "secondary",
	isLoading = false,
	...props
}: AlertProps) => Template({ icon, confirmColor, isLoading, ...props });

export const Simple = (props: AlertProps) => Template(props);
export const Save = ({
	text,
	icon = "warning",
	confirmButtonText = "Continuar",
	confirmColor = "success",
	cancelButtonText = "Cancelar",
	cancelColor = "danger",
	showCancelButton = true,
	...props
}: AlertProps) =>
	Template({
		text: `¿Desea proceder a ${text} los cambios?`,
		icon,
		confirmButtonText,
		confirmColor,
		cancelButtonText,
		cancelColor,
		showCancelButton,
		...props,
	});
export const Ask = ({
	icon = "info",
	confirmButtonText = "Intentar Nuevamente",
	confirmColor = "secondary",
	cancelButtonText = "Cancelar",
	cancelColor = "danger",
	...props
}: AlertProps) => Template({...props, icon, confirmButtonText, confirmColor, cancelButtonText, cancelColor });
export const Alert = Object.assign(Component, {
	Success,
	Danger,
	Warning,
	Info,
	Question,
	Simple,
	Save,
	Ask,
});
export default Alert;
