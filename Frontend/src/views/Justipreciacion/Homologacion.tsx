/** @format */
import { useEffect, useState } from "react";
import { SaveButton } from "../../components/inputs/saveButton";
import {
	setIndiviso,
	getHomologacion,
	consumeHomologacion,
} from "../../features/justipreciacion/homologacionSlice";
import {
	getJustipreciacion,
	consumeJusti,
	setInitialState,
} from "../../features/justipreciacion/justipreciacionSlice";
import BigPicture from "../../components/justipreciacion/homologacion/bigPicture/bigPicture";
import Area from "../../components/justipreciacion/homologacion/documentacion/Area/area";
import ReFactor from "../../components/justipreciacion/homologacion/documentacion/reFactor/reFactor";
import Factores, {
	AgeFactor,
	ZoneFactor,
	SelectFactors,
} from "../../components/justipreciacion/homologacion/factores/Factores";
import { Justipreciacion } from "../../components/justipreciacion/Justipreciacion";
import { Container } from "../../components/views/Container";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { exportDataAtFail, getParams } from "../../utils/utils";
import { AlertComponent } from "../../components/views/Alert";
import { Spinner } from "../../components/spinner/spinner";
const AgeArea = () => (
	<>
		<AgeFactor />
		<Area />
	</>
);
export default function Homologacion() {
	const dispatch = useAppDispatch();
	const components = [Factores, ZoneFactor, AgeArea, SelectFactors, BigPicture, ReFactor];
	const { record, documentation, factors, status, message, errors } =
		useAppSelector(getHomologacion);
	const { isUsed } = documentation.ReFactor;
	const { id, type, appraisalPurpose } = record;
	const [data] = useState(components.slice(0, isUsed ? 6 : 5));
	const justipreciacion = useAppSelector(getJustipreciacion);
	const [showErrors, setShowErrors] = useState(false);

	useEffect(() => {
		id === 0 &&
			justipreciacion.id !== 0 &&
			dispatch(
				consumeHomologacion.get({
					url: `HOMOLOGACION/${type}/${justipreciacion.id}`,
				}),
			);
	}, [id, justipreciacion.id, dispatch, type]);
	useEffect(() => {
		if (status.includes("fail")) {
			alert(message);
		}
	}, [message, status]);
	const Errors = errors.map((error: any, index) => (
		<div className="font-monospace" key={`list of errors, row ${index}`}>
			{error?.Location && (
				<AlertComponent
					variant="danger"
					Show={true}
					Header={`Se encontró, el siguiente error. ${error.Location.name}`}
					Body={
						<p>
							{error.Location.message} para {error.Location.reference}
						</p>
					}
				/>
			)}
			{error?.Zone && (
				<AlertComponent
					variant="danger"
					Header={`Se encontró, el siguiente error. ${error.Zone.name}`}
					Show={true}
					Body={
						<p>
							{error.Zone.message} para {error.Zone.reference}
						</p>
					}
				/>
			)}
			{error?.Area && (
				<>
					{error.Area?.colony && (
						<AlertComponent
							variant="danger"
							Header={`Se encontró, el siguiente error. ${error.Area.colony.name}`}
							Show={true}
							Body={
								<p>
									{error.Area.colony.message} para {error.Area.colony.reference}
								</p>
							}
						/>
					)}
					{error.Area?.street && (
						<AlertComponent
							variant="danger"
							Header={`Se encontró, el siguiente error. ${error.Area.street.name}`}
							Show={true}
							Body={
								<p>
									{error.Area.street.message} para {error.Area.street.reference}
								</p>
							}
						/>
					)}
					{error.Area?.streetNumber && (
						<AlertComponent
							variant="danger"
							Header={`Se encontró, el siguiente error. ${error.Area.streetNumber.name}`}
							Show={true}
							Body={
								<p>
									{error.Area.streetNumber.message} para{" "}
									{error.Area.streetNumber.reference}
								</p>
							}
						/>
					)}
					{error.Area?.observations && (
						<AlertComponent
							variant="danger"
							Header={`Se encontró, el siguiente error. ${error.Area.observations.name}`}
							Show={true}
							Body={
								<p>
									{error.Area.observations.message} para{" "}
									{error.Area.observations.reference}
								</p>
							}
						/>
					)}
					{error.Area?.references && (
						<AlertComponent
							variant="danger"
							Header={`Se encontró, el siguiente error. ${error.Area.references.name}`}
							Show={true}
							Body={
								<p>
									{error.Area.references.message} para{" "}
									{error.Area.references.reference}
								</p>
							}
						/>
					)}
				</>
			)}
			{error?.Surface?.observations && (
				<AlertComponent
					variant="danger"
					Header={`Se encontró, el siguiente error. ${error.Surface.observations.name}`}
					Show={true}
					Body={<p>{error.Surface.observations.message}</p>}
				/>
			)}
			{error?.SalesCost?.observations && (
				<AlertComponent
					variant="danger"
					Header={`Se encontró, el siguiente error. ${error.SalesCost.observations.name}`}
					Show={true}
					Body={<p>{error.SalesCost.observations.message}</p>}
				/>
			)}
		</div>
	));
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
		const error = errors.length > 0;
		setShowErrors(error);
		!error &&
			dispatch(
				record.status.includes("newOne")
					? consumeHomologacion.post({
							url,
							responseType,
							payload,
					  })
					: consumeHomologacion.patch({
							url,
							responseType,
							payload,
					  }),
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
						consumeJusti.patch({
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
				.catch((error): void => {
					alert("Ocurrio un error");
					exportDataAtFail(payload, `${url}.json`);
				});
	};
	return status.includes("loading") ? (
		<Spinner />
	) : (
		<>
			<Justipreciacion />

			<Container
				titleStrong={type}
				Title="Homologación de tipo:"
				startAt={record.status.includes("exists") ? 5 : 1}
				dataLimit={1}
				pageLimit={isUsed ? 6 : 5}
				hideElement={isUsed ? 6 : 7}
				data={data.slice(0, isUsed ? 6 : 5)}
				SaveButton={
					<>
						<SaveButton registro={record.status} actionClick={() => saveAction()} />

						{type.includes("TERRENO") && (
							<div className="form-check form-switch mt-5">
								<input
									className="form-check-input"
									type="checkbox"
									role="switch"
									checked={isUsed}
									onChange={(event: any) =>
										dispatch(setIndiviso(event.target.checked))
									}
								/>
								<label className="form-check-label">
									Realizar Calculo Indiviso
								</label>
							</div>
						)}
					</>
				}
				Errors={Errors}
				showErrors={showErrors}
				fixedTop={false}
				width={1200}
				height={1024}
			/>
		</>
	);
}
