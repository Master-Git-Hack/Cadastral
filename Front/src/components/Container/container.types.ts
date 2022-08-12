/** @format */

import { ReactNode } from "react";

export interface ContainerProps {
	children: ReactNode | ReactNode[];
	header?: ReactNode | ReactNode[];
	footer?: ReactNode | ReactNode[];
	sidebar?: {
		children: ReactNode | ReactNode[];
		position?: "left" | "right";
		outside?: boolean;
	};
}
