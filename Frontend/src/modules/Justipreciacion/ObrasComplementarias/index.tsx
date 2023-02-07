/** @format */

import { useEffect, useState } from "react";
import { Justipreciacion } from "..";
import { Danger, Save, Success } from "../../../components/Button";
import { RoundedSelection } from "../../../components/Custom/RoundedSelection";
import { Switch } from "../../../components/Input/Switch";
import { PaginatedView } from "../../../components/PaginatedView";
import { Spinner } from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../redux";
import {
	consumeJustipreciacion,
	getJustipreciacion,
	obrasComplementarias,
} from "../../../redux/justipreciacion";

import {
	addRow,
	get,
	getOC,
	rmRow,
	post,
	patch,
	checkErrors,
	setIsComplete,
	setRound,
} from "../../../redux/justipreciacion/obrasComplementarias";
import { Alert } from "../../../utils/alert";
import { Calculation } from "./Calculation";
import { Documentation } from "./Documentation";
import { PartialCalculation } from "./PartialCalculation";

const Pages = (isComplete: boolean = true) =>
	isComplete
		? {
				1: <Documentation />,
				2: <Calculation />,
		  }
		: { 1: <PartialCalculation /> };
export const ObrasComplementarias = () => {
	const dispatch = useAppDispatch();
	const {
		Calculation,
		Documentation,
		total,
		status,
		message,
		errors,
		record,
		isComplete,
		rounded,
	} = useAppSelector(getOC);
	const justipreciacion = useAppSelector(getJustipreciacion);
	const [showErrors, setShowErrors] = useState(false);
	const [loadingSave, setLoadingSave] = useState(false);
	const [loadingPage, setLoadingPage] = useState(true);

	const { id } = record;
	useEffect(() => {
		id === 0 &&
			justipreciacion.id !== 0 &&
			dispatch(
				get({
					url: `HOMOLOGACION/ObrasComplementarias/${justipreciacion.id}`,
				}),
			);
	}, [id, justipreciacion.id]);

	useEffect(() => {
		justipreciacion.valor_total_obras_comp !== total && dispatch(obrasComplementarias(total));
	}, [total]);

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
		}
	}, [message, status]);

	const saveAction = () => {
		!isComplete && dispatch(checkErrors());
		const url = `HOMOLOGACION/ObrasComplementarias/${justipreciacion.id}`;
		const responseType = "json";
		const payload = {
			datos: Documentation,
			calculo: Calculation,
			valor_unitario: total,
			registro: justipreciacion.registro,
			calculo_completo: isComplete,
			redondeo: rounded,
		};
		const { length } = errors;
		setShowErrors(length > 0);
		const action = record.status.includes("newOne") ? "guardar" : "actualizar";
		Alert.Save({
			title: `¡Esta por ${action} el registro!`,
			text: action,
		})
			.then(({ isConfirmed, isDismissed }) => {
				isConfirmed &&
					length === 0 &&
					justipreciacion.registro !== "" &&
					dispatch(
						record.status.includes("newOne")
							? post({ url, responseType, payload })
							: patch({ url, responseType, payload }),
					)
						.unwrap()
						.then(() => {
							const { valor_total_obras_comp } = justipreciacion;
							dispatch(
								consumeJustipreciacion.patch({
									url: `HOMOLOGACION/OC/Justipreciacion/${justipreciacion.id}`,
									responseType,
									payload: { valor_total_obras_comp },
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
			})
			.catch((error) =>
				Alert.Error({
					title: "¡Algo Fallo!",
					text: `Algo ocurrio al tratar de actualizar los valores en el registro de Justipreciación, ${error.message}`,
				}),
			);
	};

	return (
		<Justipreciacion>
			{loadingPage && <Spinner backdrop inverse size="lg" />}
			{!loadingPage && (
				<PaginatedView
					errors={errors}
					showErrors={showErrors}
					title={
						<>
							<h1>
								Cálculo: <strong>Obras Complementarias</strong>
							</h1>
							<Save status={record.status} onClick={saveAction} />
						</>
					}
					footer={
						<RoundedSelection
							currentItem={rounded}
							onSelect={(currentItem) => dispatch(setRound(currentItem))}
							placement="rightEnd"
						/>
					}
					totalPages={isComplete ? 2 : 1}
					actions={{
						children: (
							<>
								<div className="d-flex justify-content-between mx-3 pt-2">
									<Success
										appearance="primary"
										onClick={() => dispatch(addRow())}
										size="xs"
									>
										Agregar Productos
									</Success>
									<div className="ms-4 text-end">
										<Switch
											checked={isComplete}
											label="Realizar Cálculo Completo"
											reverse
											withText
											onChange={(value: boolean) =>
												setTimeout(
													() => dispatch(setIsComplete(value)),
													1000,
												)
											}
										/>
									</div>
								</div>
								<div className="d-flex justify-content-between mx-3 pb-2">
									<div />
									{Documentation.length > 1 && (
										<Danger appearance="link" onClick={() => dispatch(rmRow())}>
											Remover última fila
										</Danger>
									)}
								</div>
							</>
						),
						position: "top",
						show: "first",
					}}
				>
					{Pages(isComplete)}
				</PaginatedView>
			)}
		</Justipreciacion>
	);
};
