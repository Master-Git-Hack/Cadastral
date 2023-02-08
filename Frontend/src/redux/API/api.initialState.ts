/** @format */

import { APIState } from "./api.interfaces";

export const initialState: APIState = {
	status: "idle",
	record: {
		type: "get",
		message: "",
		loading: false,
	},
	fetch: {
		response: "loading",
		message: "",
		loading: false,
		data: undefined,
	},
	message: "",
};
