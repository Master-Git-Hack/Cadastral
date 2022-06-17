/** @format */

import { State, initialState as isReports } from "./storage";

/* Creating an interface called StorageProps that has a key of type string and a value of type string,
Array<State>, or any. */
interface StorageProps {
	[key: string]: string | Array<State> | any;
}
/* Creating an interface called Storage that extends the interface StorageProps. */
export interface Storage extends StorageProps {
	status: "success" | "loading" | "working" | "fail";
	filename: string;
	reports: Array<State>;
	document: any;
	message: string;
}
export const initialState = {
	status: "working",
	filename: "",
	reports: [isReports],
	document: [],
	message: "",
};
