/** @format */

import { PaginatedView } from "../../../components/PaginatedView";
import { Save, Success, Danger } from "../../../components/Button";
import { Spinner } from "../../../components/Spinner";
import { useEffect, useState } from "react";
import { Factores } from "./Factores";
import { Alert } from "../../../utils/alert";
import {
	addRow,
	getHomologaciones,
	loadFactors,
	rmRow,
	get,
	post,
	patch,
} from "../../../redux/justipreciacion/homologacion";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { BigPicture } from "./BigPicture";
import { Area } from "./Registros/Area";
import { NaturalValues } from "./ValoresNaturales";
import { Indiviso } from "./Registros/Inviso";
import { Justipreciacion } from "..";
import { consumeJustipreciacion, getJustipreciacion } from "../../../redux/justipreciacion";
import { ExportComponents } from "./Export";
const { AgeContainer, Compilation, Selector } = Factores;
//const { Success, Error, SimpleMessage, Save } = Alert;
const base = (type: "TERRENO" | "RENTA", key: string = "6") => ({
	1: <Compilation />,
	2: <AgeContainer type={type} />,
	3: <Area.Component viewAs="usage" />,
	4: <Selector />,
	5: <BigPicture viewAs="usage" />,
	[key]: <NaturalValues />,
});
const Pages = (type: "TERRENO" | "RENTA", isUsed: boolean) =>
	!isUsed
		? { ...base(type) }
		: {
				...base(type, "7"),
				6: <Indiviso />,
		  };

export const Homologacion = () => {
	const dispatch = useAppDispatch();
	const {
		record: { id, type, appraisalPurpose, ...record },
		documentation,
		factors,
		status,
		message,
		errors,
	} = useAppSelector(getHomologaciones);
	const {
		ReFactor: { isUsed },
	} = documentation;
	const justipreciacion = useAppSelector(getJustipreciacion);
	const [loadingPage, setLoadingPage] = useState(true);
	const [startAt, setStartAt] = useState(1);
	const [loadingSave, setLoadingSave] = useState(false);
	const [showErrors, setShowErrors] = useState(false);

	useEffect(() => {
		id === 0 &&
			justipreciacion.id !== 0 &&
			dispatch(
				get({
					url: `HOMOLOGACION/${type}/${justipreciacion.id}`,
				}),
			);
	}, [id, justipreciacion.id]);

	useEffect(() => {
		dispatch(loadFactors());
	}, []);
	useEffect(() => {
		status.includes("fail") && Alert.Error({ title: "¡Algo Fallo!", text: message });
		//status.includes("loading") && setLoadingPage(true);
		if (status.includes("warning") && message !== undefined) {
			setLoadingPage(false);
			Alert.Warning({ title: "¡Registro NO encontrado!", text: message });
		}
		if (status.includes("success") && message !== undefined) {
			setLoadingPage(false);
			Alert.Success({ title: "¡Registro encontrado Exitosamente!", text: message });
			setStartAt(3);
		}
	}, [message, status]);

	const saveAction = () => {
		const url = `HOMOLOGACION/${type}/${justipreciacion.id}`;
		const { adjustedValue, roundedValue } = documentation.SalesCost.averageUnitCost;
		const payload = {
			factores: factors,
			resultado: documentation,
			registro: justipreciacion.registro,
			valor_unitario: isUsed ? adjustedValue : roundedValue,
			tipo: type.toLowerCase(),
			tipo_servicio: appraisalPurpose,
		};
		const responseType = "json";
		const { length } = errors;
		setShowErrors(length > 0);
		const action = record.status.includes("newOne") ? "guardar" : "actualizar";
		Alert.Save({
			title: `¡Esta por ${action} el registro!`,
			text: action,
		}).then(({ isConfirmed, isDismissed }) => {
			isConfirmed &&
				length === 0 &&
				justipreciacion.registro !== "" &&
				dispatch(
					record.status.includes("newOne")
						? post({ url, payload, responseType })
						: patch({ url, payload, responseType }),
				)
					.unwrap()
					.then((response) => {
						const {
							sp1_vu,
							sp1_factor,
							sp1_superficie,
							comparativo_mercado,
							cna_edad,
							cna_superficie,
						} = justipreciacion;

						dispatch(
							consumeJustipreciacion.patch({
								url: `HOMOLOGACION/Justipreciacion/${type}/${justipreciacion.id}`,
								responseType,
								payload: {
									sp1_factor,
									valor_unitario: type.includes("TERRENO")
										? sp1_vu
										: comparativo_mercado,
									sp1_superficie,
									cna_edad,
									cna_superficie,
								},
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
							.catch((error) =>
								Alert.Error({
									title: "¡Algo Fallo!",
									text: `Algo ocurrio al tratar de actualizar los valores en el registro de Justipreciación, ${error.message}`,
								}),
							);
					});
			isConfirmed &&
				length > 0 &&
				Alert.Error({
					title: "¡Algo Fallo!",
					text: "Hay errores en el formulario, que necesita atender primero.",
				});
		});
	};
	return (
		<Justipreciacion>
			{loadingPage && <Spinner backdrop inverse size="lg" />}
			{!loadingPage && (
				<PaginatedView
					startAt={startAt}
					errors={errors}
					showErrors={showErrors}
					title={
						<>
							<h1 className="me-auto">
								Homologación de tipo: <strong>{type}</strong>
							</h1>
							<ExportComponents />
							<Save
								status={record.status}
								loading={loadingSave}
								onClick={saveAction}
							/>
						</>
					}
					footer={
						<span className="text-muted fw-lighter">
							Sí el ejercicio cuenta con proceso de cálculo de indivisos, favor de
							posicionarse en la página 6 o posterior para actualizar el registro de
							justipreciación, sino se utilizará el valor resultante mostrado en la
							página 5.
						</span>
					}
					totalPages={!isUsed ? 6 : 7}
					actions={{
						children: (
							<>
								<Success
									appearance="link"
									onClick={() => dispatch(addRow())}
									size="xs"
								>
									Agregar Fila
								</Success>
								<Danger onClick={() => dispatch(rmRow())} size="xs">
									Remover Fila
								</Danger>
							</>
						),
						position: "top",
						show: "first",
					}}
				>
					{Pages(type, isUsed)}
				</PaginatedView>
			)}
		</Justipreciacion>
	);
};
