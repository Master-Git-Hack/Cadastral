/** @format */

import { ReactNode } from "react";

export interface ContainerProps {
	hasHeader?: boolean;
	headerChildren?: ReactNode | ReactNode[];
	justifyHeader?: "end" | "start" | "center" | "space-around" | "space-between";
	headerColSpan?: number;
	hasFooter?: boolean;
	footerChildren?: ReactNode | ReactNode[];
	justifyFooter?: "end" | "start" | "center" | "space-around" | "space-between";
	footerColSpan?: number;
	hasSidebar?: boolean;
	sidebarInside?: boolean;
	sidebarChildren?: ReactNode | ReactNode[];
	justifySidebar?: "end" | "start" | "center" | "space-around" | "space-between";
	sidebarColSpan?: number;
	children: ReactNode | ReactNode[];
	justify?: "end" | "start" | "center" | "space-around" | "space-between";
	colSpan?: number;
}
