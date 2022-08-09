/** @format */

import { MouseEventHandler, ReactNode } from "react";
export interface HideShowProps {
	id?: string;
	name: string;
	label?: string;
	children: ReactNode | ReactNode[];
	className?: string;
	isHidden?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}
