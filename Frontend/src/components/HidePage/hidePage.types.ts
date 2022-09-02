/** @format */

import { ReactNode } from "react";

export interface HidePageProps {
	children: ReactNode | ReactNode[];
	elementOnHide?: ReactNode | ReactNode[];
	title?: string;
}
