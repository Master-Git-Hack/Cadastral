/** @format */

import { SaveButton } from "../../components/inputs/saveButton";
import { Container } from "../../components/views/Container";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
	getOC as getState,
	addRow,
	removeRow,
	checkErrors,
	consumeOC,
} from "../../features/justipreciacion/obrasComplementariasSlice";
import {
	getJustipreciacion,
	consumeJusti,
	obrasComplementarias,
} from "../../features/justipreciacion/justipreciacionSlice";
import Calculous from "../../components/justipreciacion/obrasComplementarias/calculous/calculous";
import { DocsView } from "../../components/justipreciacion/obrasComplementarias/documentacion/documentation";
import { useEffect, useState } from "react";
import { AlertComponent } from "../../components/views/Alert";
import { Justipreciacion } from "../../components/justipreciacion/Justipreciacion";
import { exportDataAtFail } from "../../utils/utils";
import { Spinner } from "../../components/spinner/spinner";

export default function ObrasComplementarias() {
	const { documentation, errors, record, calculous, total, status, message } =
		useAppSelector(getState);
	const dispatch = useAppDispatch();
	const justipreciacion = useAppSelector(getJustipreciacion);
	const [showErrors, setShowErrors] = useState(false);
	useEffect(() => {
		documentation && dispatch(checkErrors());
	}, [dispatch, documentation]);
	useEffect(() => {
		record.id === 0 &&
			justipreciacion.id !== 0 &&
			dispatch(
				consumeOC.get({ url: `HOMOLOGACION/ObrasComplementarias/${justipreciacion.id}` }),
			);
	}, [dispatch, record.id, justipreciacion.id]);
	useEffect(() => {
		justipreciacion.valor_total_obras_comp !== total && dispatch(obrasComplementarias(total));
	}, [total]);
	const Errors = errors.map((error: any, index: number) => (
		<div className="font-monospace" key={`list of errors, row ${index}`}>
			{error?.name && (
				<AlertComponent
					variant="danger"
					Show={true}
					Header={`Se encontró, el siguiente error. ${error.name.name}`}
					Body={
						<p>
							{error.name.message} para {error.name.reference}
						</p>
					}
				/>
			)}
			{error?.area &&
				error.area.map((item: any, indx: number) => (
					<AlertComponent
						key={`list of errors, row ${index} area ${indx}`}
						variant="danger"
						Show={true}
						Header={`Se encontró, el siguiente error. ${item.name}`}
						Body={
							<p>
								{item.message} para {item.reference}
							</p>
						}
					/>
				))}
			{error?.calculation &&
				error.calculation.map((item: any, indx: number) => (
					<AlertComponent
						key={`list of errors, row ${index} calculation ${indx}`}
						variant="danger"
						Show={true}
						Header={`Se encontró, el siguiente error. ${item.name}`}
						Body={
							<p>
								{item.message} para {item.reference}
							</p>
						}
					/>
				))}
		</div>
	));
	const saveAction = () => {
		const url = `HOMOLOGACION/ObrasComplementarias/${justipreciacion.id}`;
		const responseType = "json";
		const payload = {
			datos: documentation,
			calculo: calculous,
			valor_unitario: total,
			registro: justipreciacion.registro,
		};
		const error = errors.length > 0;
		setShowErrors(error);
		!error &&
			justipreciacion.registro !== "" &&
			dispatch(
				record.status.includes("newOne")
					? consumeOC.post({
							url,
							responseType,
							payload,
					  })
					: consumeOC.patch({
							url,
							responseType,
							payload,
					  }),
			)
				.unwrap()
				.then((response) => {
					const { valor_total_obras_comp } = justipreciacion;
					const url = `HOMOLOGACION/OC/Justipreciacion/${justipreciacion.id}`;
					dispatch(
						consumeJusti.patch({
							url,
							responseType,
							payload: { valor_total_obras_comp },
						}),
					)
						.unwrap()
						.then(() => {
							alert("Registro guardado exitosamente");
							window.opener = null;
							window.open("about:blank", "_self", "");
							window.close();
						})
						.catch((error) => {
							alert(
								"Algo ocurrio al tratar de actualizar los valores en el registro de Justipreciación",
							);
						});
				})
				.catch((error) => {
					alert("Ocurrio un error");
					exportDataAtFail(payload, `${url}.json`);
				});
	};
	useEffect(() => {
		status.includes("fail") && alert(message);
	}, [status, message]);
	return (
		<>
			{status.includes("loading") ? (
				<Spinner />
			) : (
				<>
					<Justipreciacion />
					<Container
						titleStrong="Obras Complementarias"
						Title="Cálculo:"
						Errors={Errors}
						showErrors={showErrors}
						fixedTop={false}
						dataLimit={1}
						pageLimit={2}
						hideElement={3}
						data={[DocsView, Calculous]}
						startAt={1}
						SaveButton={
							<SaveButton registro={record.status} actionClick={() => saveAction()} />
						}
						width={1200}
						height={1024}
						AddButton={
							<button
								className=" btn btn-sm btn-success"
								onClick={() => dispatch(addRow())}
							>
								Agregar Documento
							</button>
						}
						RemoveButton={
							<>
								{documentation.length > 1 && (
									<button
										className=" btn btn-sm btn-link text-danger"
										onClick={() => dispatch(removeRow())}
									>
										Eliminar Ultimo Documento
									</button>
								)}
							</>
						}
					/>
				</>
			)}
		</>
	);
}
