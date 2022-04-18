/** @format */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getState, request } from "../../features/homologation/slice";
import { handleRequest } from "../../features/homologation/handlers";

export const SaveButton = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(getState);
	const { record } = state;
	const { id } = record.justipreciacion;
	const { type, status } = record.homologacion;
	const sendRequest = () => {
		const payload = handleRequest(state);
		const properties = {
			url: `/HOMOLOGATION/${type}/${id}`,
			responseType: "json",
			payload,
		};
		if (status.includes("exists")) dispatch(request.patch(properties));
		else if (status.includes("newOne")) dispatch(request.post(properties));
	};

	return (
		<div className="row text-end">
			<div className="col pt-3 pe-5 ">
				<button className="btn btn-success" onClick={sendRequest}>
					Guardar
				</button>
			</div>
			<br />
		</div>
	);
};
