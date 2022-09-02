/** @format */

import { useEffect } from "react";
import { SaveButton } from "../../components/inputs/saveButton";
import CostosConstruccion from "../../components/justipreciacion/costosConstruccion.tsx/CostosConstruccion";
import { consumeCC, getCC } from "../../features/justipreciacion/costosConstruccionSlice";
import {
	consumeJusti,
	getJustipreciacion,
} from "../../features/justipreciacion/justipreciacionSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { exportDataAtFail, getParams, roundNumber } from "../../utils/utils";

export default function CConstruccion() {
	const dispatch = useAppDispatch();

	const { data, factorGTO, total, titulo, status, message, record, redondeo } =
		useAppSelector(getCC);
	const subTotal = factorGTO.enabled ? total : roundNumber(total, redondeo);
	const totalCalculado = roundNumber(total * factorGTO.value, redondeo);
	const justipreciacion = useAppSelector(getJustipreciacion);
	const { id, register } = record;
	useEffect(() => {
		id === 0 &&
			justipreciacion.id !== 0 &&
			dispatch(consumeCC.get({ url: `COSTOSCONSTRUCCION/${justipreciacion.id}` }));
	}, [id, justipreciacion.id, dispatch]);
	useEffect(() => {
		status.includes("fail") && alert(message);
	}, [message, status]);
	const saveAction = () => {
		const url = `COSTOSCONSTRUCCION/${justipreciacion.id}`;
		const { costoDirecto, indirectos, m2, valorNeto } = data[0];

		const payload = {
			id,
			descripcion: titulo,
			costo_directo: costoDirecto,
			indirectos,
			m2,
			factor_gto: factorGTO.enabled,
			valor_neto: valorNeto,
			valor_resultante: total,
			total: totalCalculado,
			tipo_servicio: getParams("tipo_servicio") ?? "justipreciacion",
			registro: justipreciacion.registro,
			redondeo,
		};
		const responseType = "json";
		justipreciacion.registro !== "" &&
			dispatch(
				record.status.includes("newOne")
					? consumeCC.post({ url, responseType, payload })
					: consumeCC.patch({ url, responseType, payload }),
			)
				.unwrap()
				.then((response) => {
					dispatch(
						consumeJusti.patch({
							url: `COSTOSCONSTRUCCION/Justipreciacion/${justipreciacion.id}`,
							responseType,
							payload: { cna_vu: totalCalculado },
						}),
					)
						.unwrap()
						.then(() => {
							alert("Registro guardado exitosamente");
							window.opener = null;
							window.open("about:blank", "_self", "");
							window.close();
						})
						.catch((error: any) => {
							alert(
								"Algo ocurrio al tratar de actualizar los valores en el registro de Justipreciación",
							);
						});
				})
				.catch((error): void => {
					alert("Ocurrio un error");
					exportDataAtFail(payload, `${url}.json`);
				});
	};

	return (
		<div className="d-flex flex-column justify-content-center m-1 align-self-center flex-fill shadow-lg p-3 my-4 ">
			<div className="d-inline-flex my-3 ">
				<div className="me-auto text-start my-auto">
					<h1 className="text-center my-3">
						Cálculo: <strong>Costos de Construcción</strong>
					</h1>
				</div>
				<div className="text-end my-auto">
					<SaveButton registro={record.status} actionClick={() => saveAction()} />
				</div>
			</div>

			<CostosConstruccion />
		</div>
	);
}
