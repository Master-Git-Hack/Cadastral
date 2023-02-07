export interface StateProps { 
    status: boolean;
    type: "Success"|"Error"|"Warning"|"Info"|"Question"|"SimpleMessage"|"Save"|"Ask"|"Custom";
    title: string;
    text: string;
    isLoading: boolean;
    icon?: "success" | "error" | "warning" | "info" | "question";
	iconColor?: string;
	footer?: string;
	toast?: boolean;
	position?:
		| "top"
		| "top-end"
		| "top-left"
		| "top-right"
		| "center"
		| "center-left"
		| "center-right"
		| "bottom"
		| "bottom-left"
		| "bottom-right";
	grow?: "fullscreen" | "row" | "column";
	showConfirmButton?: boolean;
	confirmButtonText?: string;
	showDenyButton?: boolean;
	confirmButtonColor?: "success" | "danger" | "warning" | "info" | "primary";
	denyButtonText?: string;
	showCancelButton?: boolean;
	cancelButtonText?: string;
	showCloseButton?: boolean;
	cancelButtonColor?: "success" | "danger" | "warning" | "info" | "primary";
	input?:
		| "text"
		| "email"
		| "password"
		| "number"
		| "tel"
		| "range"
		| "textarea"
		| "select"
		| "radio"
		| "checkbox"
		| "file"
		| "url";
	inputPlaceholder?: string;
	inputValue?: string;
	inputLabel?: string;
	inputOptions?: { [key: string]: string };
	html?: any;
	didOpen?: (isLoading: boolean) => void;
}