/** @format */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { getState, consume, isLoading } from "../../../features/homologation/slice";
import { handleRequest } from "../../../features/homologation/handlers";

export const SaveButton = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(getState);
	const { record, errors } = state;
	const { id } = record.justipreciacion;
	const { type, status } = record.homologacion;
	const [show, setShow] = useState(false);
	console.log(state);
	const sendRequest = () => {
		const properties = {
			url: `/HOMOLOGATION/${type}/${id}`,
			responseType: "json",
			payload: handleRequest(state),
		};
		if (errors.length === 0) {
			try {
				dispatch(isLoading());
				if (status.includes("exists")) dispatch(consume.patch(properties));
				if (status.includes("newOne")) dispatch(consume.post(properties));
			} catch (e) {
				alert("Error al guardar");
			}
		} else {
			alert("Favor de revisar los campos vacios");
			setShow(true);
		}
	};
	useEffect(() => {
		if (state.status.includes("complete")) {
			setShow(false);
			alert("Registro guardado exitosamente");
			window.opener = null;
			window.open("about:blank", "_self", "");
			window.close();
		}
		if (state.status.includes("failed")) {
			alert("Algo fallo, favor de intentar más tarde");
		}
	}, [state.status]);
	return (
		<div className="container container-fluid">
			<div className="row my-auto">
				<div className="col my-auto">
					<h5>Calculo de Obras Complementarias</h5>
				</div>
				<div className="col my-auto">
					{!status.includes("loading") ? (
						<div className="row text-end">
							<div className="col pt-3 pe-5 ">
								<button className="btn btn-success" onClick={sendRequest}>
									Guardar
								</button>
							</div>
							<br />
						</div>
					) : null}
				</div>
			</div>
			{show && <ul className="list-group my-4"></ul>}
		</div>
	);
};
