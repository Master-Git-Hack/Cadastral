/** @format */

import { ReactNode, MouseEventHandler } from "react";
import { ButtonProps } from "./Button.types";

export interface ButtonActionsProps extends ButtonProps {
	actions?: string[];
	customActions?: ReactNode | ReactNode[];
	onClick?: (action: string, index: number) => void | MouseEventHandler<HTMLButtonElement>;
}
