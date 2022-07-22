/** @format */

import { ChangeEventHandler } from "react";
/** @format */

export interface ModalProps {
	type: string;
	action: string;
	name: string;
	editable: boolean;
	setEditable: ChangeEventHandler<HTMLInputElement>;
	comment: string;
	setComment: ChangeEventHandler<HTMLTextAreaElement>;
	children: JSX.Element;
}
