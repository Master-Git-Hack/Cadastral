/** @format */

export interface DocumentViewerProps {
	document?: string;
	status: "success" | "loading" | "working" | "fail" | string;
	width?: number;
	height?: number;
}
