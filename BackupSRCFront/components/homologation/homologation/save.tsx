/** @format */

import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
	selector,
	sendPatchRequest,
	findErrors,
	checkForErrors,
} from "../../../features/homologation/slice";
export const Save: FC = () => {
	const dispatch = useAppDispatch();
	const { status, errors } = useAppSelector(selector);
	const state = useAppSelector(selector);
	const sendRequest = async () =>
		checkForErrors(dispatch).then(() => {
			if (errors.length > 0) {
				window.alert("Favor de atender los errors encontrados!");
			} else {
				dispatch(sendPatchRequest({ state, dispatch }));
			}
		});

	useEffect(() => {
		if (status === "complete" && errors.length === 0) {
			alert("Registro guardado exitosamente");
			window.opener = null;
			window.open("about:blank", "_self", "");
			window.close();
		}
		if (status === "failed")
			alert(
				"Algo fallo al guardar el registro, favor de intentarlo más tarde, en caso de que el problema percista contacte al administrador del sistema",
			);
	}, [status]);
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
