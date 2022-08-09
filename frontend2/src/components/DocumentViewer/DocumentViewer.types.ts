/** @format */

import { IframeHTMLAttributes } from "react";

export interface DocumentViewerProps {
	document?: string;
	status: "success" | "loading" | "working" | "fail";
	width?: number;
	height?: number;
}
