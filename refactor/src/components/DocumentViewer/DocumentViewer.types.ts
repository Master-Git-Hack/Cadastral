/** @format */

import { IframeHTMLAttributes } from "react";

export interface DocumentViewerProps {
	document?: IframeHTMLAttributes<HTMLIFrameElement>;
	status: "success" | "loading" | "working" | "fail";
	width?: number;
	height?: number;
}
