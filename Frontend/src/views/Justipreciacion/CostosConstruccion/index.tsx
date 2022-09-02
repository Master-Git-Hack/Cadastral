/** @format */
import { useEffect } from "react";
import { Save } from "../../../components/Button";
import { CostosConstruccion as Component } from "../../../modules/Justipreciacion/CostosConstruccion";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { consumeJustipreciacion, getJustipreciacion } from "../../../redux/justipreciacion";
import { getCC, get, post, patch } from "../../../redux/justipreciacion/costosConstruccion";
import { Alert } from "../../../utils/alert";
import { roundNumber } from "../../../utils/number";
import { getURLParams } from "../../../utils/url";
export default function CostosConstruccion() {
	const dispatch = useAppDispatch();

	const {
		data,
		factorGTO: { enabled, value },
		total,
		titulo,
		status,
		message,
		record: { id, register, ...record },
		redondeo,
	} = useAppSelector(getCC);
	const subTotal = enabled ? total : roundNumber(total, redondeo);
	const totalCalculado = roundNumber(total * value, redondeo);
	const justipreciacion = useAppSelector(getJustipreciacion);

	const saveAction = () => {
		const url = `COSTOSCONSTRUCCION/${justipreciacion.id}`;
		const { costoDirecto, indirectos, m2, valorNeto } = data[0];
		const responseType = "json";
		const payload = {
			id,
			descripcion: titulo,
			costo_directo: costoDirecto,
			indirectos,
			m2,
			factor_gto: enabled,
			valor_neto: valorNeto,
			valor_resultante: total,
			total: totalCalculado,
			tipo_servicio: getURLParams("tipo_servicio") ?? "justipreciacion",
			registro: justipreciacion.registro,
			redondeo,
		};
		const action = record.status.includes("newOne") ? "guardar" : "actualizar";
		Alert.Save({
			title: `¡Esta por ${action} el registro!`,
			text: action,
		})
			.then(({ isConfirmed, isDismissed }) => {
				isConfirmed &&
					justipreciacion.registro !== "" &&
					dispatch(
						record.status.includes("newOne")
							? post({ url, responseType, payload })
							: patch({ url, responseType, payload }),
					)
						.unwrap()
						.then(() =>
							dispatch(
								consumeJustipreciacion.patch({
									url: `COSTOSCONSTRUCCION/Justipreciacion/${justipreciacion.id}`,
									responseType,
									payload: { cna_vu: totalCalculado },
								}),
							)
								.unwrap()
								.then(() =>
									Alert.Success({
										title: "¡Registro guardado/actualizado exitosamente!",
										text: "La ventana esta por cerrarse.",
									}).then((_) => {
										window.opener = null;
										window.open("about:blank", "_self", "");
										window.close();
									}),
								)
								.catch((error: any) =>
									Alert.Error({
										title: "¡Algo Fallo!",
										text: `Algo ocurrio al tratar de actualizar los valores en el registro de Justipreciación, ${error.message}`,
									}),
								),
						);
			})
			.catch((error: any) =>
				Alert.Error({
					title: "¡Algo Fallo!",
					text: `Algo ocurrio al tratar de actualizar los valores en el registro del cálculo de costos de construcción, ${error.message}`,
				}),
			);
	};
	useEffect(() => {
		id === 0 &&
			justipreciacion.id !== 0 &&
			dispatch(get({ url: `COSTOSCONSTRUCCION/${justipreciacion.id}` }));
	}, [id, justipreciacion.id, dispatch]);
	useEffect(() => {
		status.includes("fail") && Alert.Error({ title: "¡Error de Conexión!", text: message });
		if (status.includes("warning") && message !== undefined) {
			Alert.Warning({ title: "¡Registro NO encontrado!", text: message });
		}
		if (status.includes("success") && message !== undefined) {
			Alert.Success({ title: "¡Registro encontrado Exitosamente!", text: message });
		}
	}, [message, status]);

	return (
		<Component subTotal={subTotal} totalCalculado={totalCalculado}>
			<Save status={record.status} onClick={saveAction} />
		</Component>
	);
}
