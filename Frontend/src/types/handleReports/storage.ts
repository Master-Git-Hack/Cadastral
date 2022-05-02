/** @format */

import { State } from "./state";

/* Creating an interface called StorageProps that has a key of type string and a value of type string,
Array<State>, or any. */
interface StorageProps {
	[key: string]: string | Array<State> | any;
}
/* Creating an interface called Storage that extends the interface StorageProps. */
export interface Storage extends StorageProps {
	status: "complete" | "loading" | "working" | "failed";
	filename: string;
	reports: Array<State>;
	document: any;
}
