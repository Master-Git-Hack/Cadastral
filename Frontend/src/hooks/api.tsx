/** @format */

import { useAppDispatch, useAppSelector } from "./@redux/app";
import { getAPI, consume, updateStateByKeys } from "./@redux/API/index";
import { ApiProps } from "./@api/api.interface";

export const useApi = () => {
	const dispatch = useAppDispatch();
	const { status, record, fetch, message } = useAppSelector(getAPI);
	const consumeAPI = (props: ApiProps) => consume[fetch.type](props);
	const set = {
		status: (value: "idle" | "waiting" | "working" | "reviewing" | "done" | "error") =>
			dispatch(updateStateByKeys({ key: "status", value })),
		record: (value: { type: "get" | "post" | "patch"; message: string; loading: boolean }) =>
			dispatch(updateStateByKeys({ key: "record", value })),
		fetch: (value: {
			response: "success" | "error" | "loading";
			message: string;
			loading: boolean;
		}) => dispatch(updateStateByKeys({ key: "fetch", value })),
		message: (value: string) => dispatch(updateStateByKeys({ key: "message", value })),
	};
	return { status, record, fetch, message, set, consumeAPI };
};
