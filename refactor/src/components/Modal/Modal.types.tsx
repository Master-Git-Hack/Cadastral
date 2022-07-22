/** @format */
export interface ModalProps {
	actionToDo: string;
	title: string;
	children: JSX.Element | JSX.Element[] | Element | Element[] | boolean;
	btnType?:
		| "success"
		| "danger"
		| "warning"
		| "info"
		| "primary"
		| "secondary"
		| "dark"
		| "light"
		| "link"
		| string;
}
