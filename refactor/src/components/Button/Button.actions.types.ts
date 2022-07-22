/** @format */

import { MouseEventHandler } from "react";
import { ButtonProps } from "./Button.types";

export interface ButtonActionsProps extends ButtonProps {
	actions?: string[];
	customActions?: JSX.Element;
}
