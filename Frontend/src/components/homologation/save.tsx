/** @format */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getState } from "../../features/homologation/slice";

export const SaveButton = () => {
	const dispatch = useAppDispatch();
	const { status } = useAppSelector(getState);
	const sendRequest = () => {
		const path = window.location.pathname.split("/homologaciones/");
		let url = `/HOMOLOGATION`;
		if (path[1] !== "") {
			url = `${url}/${path[1]}`;
		}
		url = `${url}`;
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
