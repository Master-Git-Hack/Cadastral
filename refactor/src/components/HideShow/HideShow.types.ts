/** @format */

import { MouseEventHandler } from "react";
export interface HideShowProps {
	id?: string;
	name: string;
	label?: string;
	children: JSX.Element | JSX.Element[];
	className?: string;
	isHidden?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}
