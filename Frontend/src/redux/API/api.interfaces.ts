/** @format */

interface Record {
	type: "get" | "post" | "patch";
	message: string;
	loading: boolean;
}
interface Fetch {
	response: "success" | "error" | "loading";
	message: string;
	loading: boolean;
	data?: any;
}
export interface APIState {
	status: "idle" | "waiting" | "working" | "reviewing" | "done" | "error";
	record: Record;
	fetch: Fetch;
	message?: string;
}
export interface updateStateByKeys {
	key: keyof APIState;
	value: any;
}
export interface updateStateBySubKeys {
	parentKey: keyof APIState;
	key: keyof Record | keyof Fetch;
	value: any;
}
