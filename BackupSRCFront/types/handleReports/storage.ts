/** @format */

import { State } from "./state";

interface StorageProps {
	[key: string]: string | Array<State> | any;
}
export interface Storage extends StorageProps {
	status: "complete" | "loading" | "working" | "failed";
	filename: string;
	reports: Array<State>;
	document: any;
}
