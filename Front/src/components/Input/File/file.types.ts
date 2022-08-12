/** @format */

import { ChangeEventHandler, MouseEventHandler } from "react";

export interface FileProps {
	filename: string;
	file: any;
	onChange: ChangeEventHandler<HTMLInputElement>;
	remove: MouseEventHandler<HTMLButtonElement>;
}
