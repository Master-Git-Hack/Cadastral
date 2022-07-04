/** @format */
import {
	getHomologacion as getState,
	updateDocumentationStateArea,
	updateReFactor,
	updateIndiviso,
	setRootReFactor,
	setRoundedResult,
} from "../../../../../features/justipreciacion/homologacionSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import {
	getJustipreciacion,
	terreno,
	renta,
	setInitialState,
} from "../../../../../features/justipreciacion/justipreciacionSlice";
import { toFancyNumber } from "../../../../../utils/utils";
import { FancyInput } from "../../../../inputs/fancyInput";
import { Body, Footer, Header, Table } from "../../../../table/Table";
import { useEffect, useState } from "react";
import { ModalComponent } from "../../../../views/Modal";
export default function ReFactor() {
	return (
		<div className="d-flex flex-row justify-content-center my-1 mx-1 align-self-center flex-fill">
			<div className="mx-2">
				<ReFactorComponent />
			</div>
			<div className="mx-2 my-auto justify-content-center align-self-center">
				<AdjustedValueComponent />
			</div>
			<div className="mx-2">
				<IndivisoComponent />
			</div>
		</div>
	);
}
export const ReFactorComponent = () => {
	const dispatch = useAppDispatch();
	const { documentation, record } = useAppSelector(getState);
	const { SalesCost, Area, ReFactor } = documentation;
	const { surface, value } = Area.averageLotArea;
	const { type } = record;
	const { sp1_factor, sp1_superficie } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		type.includes("TERRENO") &&
			sp1_factor !== ReFactor.form.value &&
			dispatch(setInitialState({ type, sp1_superficie, sp1_factor: ReFactor.form.value }));
	}, [type]);
	const [enabled, setEnabled] = useState(false);
	return (
		<Table>
			<Header>
				<tr>
					<th colSpan={2} style={{ minWidth: 370 }}>
						DATOS DE FACTOR
					</th>
				</tr>
			</Header>
			<Body>
				{type.includes("TERRENO") && (
					<tr>
						<td>SUPERFICIE TOTAL (SUJETO)</td>
						<td>
							<FancyInput
								index={0}
								name="surface"
								value={surface}
								onChange={(event) =>
									dispatch(
										updateDocumentationStateArea({
											key: "averageLotArea",
											object: "surface",
											value: Number(event.target.value),
										}),
									)
								}
							/>
						</td>
					</tr>
				)}
				<tr>
					<td>
						{type.includes("TERRENO")
							? "SUPERFICIE LOTE MODA"
							: "SUPERFICIE DEL COMPARABLE"}
					</td>
					<td>{toFancyNumber(value)}</td>
				</tr>
				{!type.includes("TERRENO") && (
					<tr>
						<td>SUPERFICIE DEL SUJETO</td>
						<td>
							<FancyInput
								index={0}
								name="surface"
								value={Area.subject.value}
								onChange={(event) => {
									dispatch(
										updateDocumentationStateArea({
											key: "subject",
											object: "value",
											value: Number(event.target.value),
										}),
									);
								}}
							/>
						</td>
					</tr>
				)}
				<tr>
					<td>
						<div className="d-flex">
							<div className="me-auto my-auto">{ReFactor.surface.name}</div>
							<ModalComponent
								Header={`CAMBIAR RAÍZ DEL ${ReFactor.surface.name}`}
								Body={
									<div className="row mx-auto">
										<div className="d-flex">
											<span className="mb-4 me-auto">
												Valor actual: Raíz {ReFactor.root} (
												<small>
													<strong>
														<sup>{ReFactor.root}</sup>&radic;{" "}
														<span
															style={{ textDecoration: "overline" }}
														>
															x
														</span>{" "}
													</strong>
												</small>
												)
											</span>
											<div className="form-check form-switch form-check-sm form-switch-sm">
												Habilitar edición
												<input
													className="form-check-input form-check-input-sm "
													type="checkbox"
													checked={enabled}
													onChange={(event: any) => {
														const value = event.currentTarget.checked;
														setEnabled(value);
														!value &&
															dispatch(
																setRootReFactor({
																	key: "root",
																	value: 8,
																}),
															) &&
															dispatch(
																setRootReFactor({
																	key: "observation",
																	value: "",
																}),
															);
													}}
												/>
											</div>
										</div>
										{enabled && (
											<>
												<input
													type="number"
													value={ReFactor.root}
													className="form-control form-control-sm"
													onChange={(event) =>
														dispatch(
															setRootReFactor({
																key: "root",
																value: event.currentTarget
																	.valueAsNumber,
															}),
														)
													}
												/>
												<span className="mt-3">
													Ingrese el motivo por el cual va a cambiar el
													valor asignado:
												</span>
												<textarea
													rows={2}
													className="form-control mt-1"
													value={ReFactor.observation}
													onChange={(event) =>
														dispatch(
															setRootReFactor({
																key: "observation",
																value: event.currentTarget.value,
															}),
														)
													}
												/>
											</>
										)}
									</div>
								}
								actionToDo="Cambiar Raíz"
								btnType="link"
							/>
						</div>
					</td>
					<td>{toFancyNumber(Number(ReFactor.surface.value.toFixed(2)))}</td>
				</tr>
				{type.includes("TERRENO") && (
					<>
						<tr>
							<td>{ReFactor.form.name}</td>
							<td>
								<FancyInput
									index={0}
									name="form"
									value={ReFactor.form.value}
									onChange={(event) =>
										dispatch(
											updateReFactor({
												key: "form",
												object: "value",
												value: Number(event.target.value),
											}),
										)
									}
								/>
							</td>
						</tr>
						<tr>
							<td>{ReFactor.result.name}</td>
							<td>{toFancyNumber(Number(ReFactor.result.value.toFixed(2)))}</td>
						</tr>
					</>
				)}
			</Body>
			{type.includes("TERRENO") && (
				<Footer>
					<tr>
						<td>Valor Unitario Aplicable en Números Redondos AL TERRENO</td>
						<td>
							{toFancyNumber(
								Number(SalesCost.averageUnitCost.result.toFixed(2)),
								true,
							)}
						</td>
					</tr>
				</Footer>
			)}
		</Table>
	);
};

export const AdjustedValueComponent = () => {
	const { record, documentation } = useAppSelector(getState);
	const { adjustedValue, roundedResult } = documentation.SalesCost.averageUnitCost;
	const { value, enabled, observations } = roundedResult;
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(record.type.includes("TERRENO") ? terreno(adjustedValue) : renta(adjustedValue));
	}, [adjustedValue]);
	return (
		<Table>
			<Header>
				<tr>
					<th>VALOR AJUSTADO</th>
					<th>{toFancyNumber(Number(adjustedValue.toFixed(0)), true)}</th>
				</tr>
			</Header>
			<Body>
				<tr>
					<td colSpan={2}>
						<ModalComponent
							Header={`CAMBIAR RAÍZ DEL VALOR AJUSTADO`}
							Body={
								<div className="row mx-auto">
									<div className="d-flex">
										<span className="mb-4 me-auto">
											Valor actual:{" "}
											<strong>
												{value === 0
													? "Sin Redondeo"
													: value === 1
													? "Redondeo a la decena"
													: "Redondeo a la centena"}
											</strong>
										</span>
										<div className="form-check form-switch form-check-sm form-switch-sm">
											Habilitar edición
											<input
												className="form-check-input form-check-input-sm "
												type="checkbox"
												checked={enabled}
												onChange={(event: any) => {
													const value = event.currentTarget.checked;
													dispatch(
														setRoundedResult({ key: "enabled", value }),
													);
													!value &&
														dispatch(
															setRoundedResult({
																key: "value",
																value: 1,
															}),
														) &&
														dispatch(
															setRoundedResult({
																key: "observations",
																value: "",
															}),
														);
												}}
											/>
										</div>
									</div>
									{enabled && (
										<>
											<select
												value={value}
												className="form-select form-select-sm"
												onChange={(event: any) => {
													dispatch(
														setRoundedResult({
															key: "value",
															value: event.currentTarget.value,
														}),
													);
												}}
											>
												<option value={0}>Sin Redondeo</option>
												<option value={1}>Redondear a la decena</option>
												<option value={2}>Redondear a la centena</option>
											</select>
											<span className="mt-3">
												Ingrese el motivo por el cual va a cambiar el valor
												asignado:
											</span>
											<textarea
												rows={2}
												className="form-control mt-1"
												value={observations}
												onChange={(event) =>
													dispatch(
														setRoundedResult({
															key: "observations",
															value: event.currentTarget.value,
														}),
													)
												}
											/>
										</>
									)}
								</div>
							}
							actionToDo="Cambiar valor de Redondeo"
							btnType="link"
						/>
					</td>
				</tr>
			</Body>
		</Table>
	);
};
export const IndivisoComponent = () => {
	const { documentation, record } = useAppSelector(getState);
	const { type } = record;
	const { adjustedValue } = documentation.SalesCost.averageUnitCost;
	const { surface, building, indiviso, result } = documentation.Indiviso;
	const { value } = documentation.Area.subject;
	const dispatch = useAppDispatch();
	const { sp1_factor, sp1_superficie } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		type.includes("TERRENO") &&
			sp1_superficie !== value &&
			dispatch(setInitialState({ type, sp1_superficie: value, sp1_factor }));
	}, [value]);
	return type.includes("TERRENO") ? (
		<Table>
			<Header>
				<tr>
					<th colSpan={2} style={{ minWidth: 450 }}>
						Cálculo terreno por indiviso
					</th>
				</tr>
			</Header>
			<Body>
				<tr>
					<td>SUPERFICIE DE CONSTRUCCION</td>
					<td>
						<FancyInput
							index={0}
							name="surface"
							value={surface}
							onChange={(event) =>
								dispatch(
									updateIndiviso({
										key: "surface",
										value: Number(event.target.value),
									}),
								)
							}
						/>
					</td>
				</tr>
				<tr>
					<td>CONST. PRIVATIVA</td>
					<td>
						<FancyInput
							index={0}
							name="building"
							value={building}
							onChange={(event) =>
								dispatch(
									updateIndiviso({
										key: "building",
										value: Number(event.target.value),
									}),
								)
							}
						/>
					</td>
				</tr>
				<tr>
					<td>INDIVISO</td>
					<td>{toFancyNumber(indiviso)}</td>
				</tr>
				<tr>
					<td>SUPERFICIE TOTAL DEL TERRENO</td>
					<td>
						<FancyInput
							index={0}
							name="area surface"
							value={value}
							onChange={(event) =>
								dispatch(
									updateDocumentationStateArea({
										key: "subject",
										object: "value",
										value: Number(event.target.value),
									}),
								)
							}
						/>
					</td>
				</tr>
				<tr>
					<td>SUPERFICIE DE TERRENO SEGÚN INDIVISO</td>
					<td>{toFancyNumber(Number(result.toFixed(2)))}</td>
				</tr>
			</Body>
			<Footer>
				<tr>
					<td colSpan={2} style={{ minWidth: 450 }}>
						TERRENO QUE LE CORRESPONDE AL LOCAL DE ACUERDO CON EL INDIVISO CALCULADO POR
						EL PERITO
					</td>
				</tr>
			</Footer>
		</Table>
	) : (
		<Table>
			{
				<Header>
					<tr>
						<th style={{ minWidth: 230 }}>VALOR UNITARIO APLICABLE</th>
						<th className="bg-info">
							{toFancyNumber(Number(adjustedValue.toFixed(2)))}
						</th>
					</tr>
				</Header>
			}
		</Table>
	);
};
