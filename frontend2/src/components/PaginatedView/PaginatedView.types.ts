/** @format */

import { ReactNode } from "react";
export interface ViewProps {
	title: ReactNode | ReactNode[];
	limitPages: number;
	pages: { [key: number]: ReactNode } | ReactNode[];
	startAt?: number;
    hidePage?: number;
    
}
