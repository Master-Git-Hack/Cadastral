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
import { asFancyNumber } from "../../../../../utils/utils";
import { FancyInput } from "../../../../inputs/fancyInput";
import { Body, Footer, Header, Table } from "../../../../table/Table";
import { useEffect, useState } from "react";
import { RoundSelection } from "../../../../roundSelection/RoundSelection";
import { JustifyChange } from "../../../../views/JustifyChange";
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
					<td>{asFancyNumber(value)}</td>
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
							<JustifyChange
								btnType="link"
								actionToDo="Cambiar Raíz"
								name={ReFactor.surface.name}
								enabled={enabled}
								setEnabled={(event: any) => {
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
								comment={ReFactor.observation}
								setComment={(event: any) =>
									dispatch(
										setRootReFactor({
											key: "observation",
											value: event.currentTarget.value,
										}),
									)
								}
								ComponentToJustify={
									<>
										Valor actual: Raíz {ReFactor.root} (
										<small>
											<strong>
												<sup>{ReFactor.root}</sup>&radic;{" "}
												<span style={{ textDecoration: "overline" }}>
													x
												</span>{" "}
											</strong>
										</small>
										)
										<input
											type="number"
											value={ReFactor.root}
											className="form-control form-control-sm"
											onChange={(event) =>
												enabled &&
												dispatch(
													setRootReFactor({
														key: "root",
														value: event.currentTarget.valueAsNumber,
													}),
												)
											}
											disabled={!enabled}
										/>
									</>
								}
							/>
						</div>
					</td>
					<td>{asFancyNumber(ReFactor.surface.value)}</td>
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
												value: event.currentTarget.valueAsNumber,
											}),
										)
									}
								/>
							</td>
						</tr>
						<tr>
							<td>{ReFactor.result.name}</td>
							<td>{asFancyNumber(ReFactor.result.value)}</td>
						</tr>
					</>
				)}
			</Body>
			{type.includes("TERRENO") && (
				<Footer>
					<tr>
						<td>Valor Unitario Aplicable en Números Redondos AL TERRENO</td>
						<td>
							{asFancyNumber(SalesCost.averageUnitCost.result, { isCurrency: true })}
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
	const setValue = (key: string, value: number | string) =>
		dispatch(
			setRoundedResult({
				key,
				value,
			}),
		);

	return (
		<Table>
			<Header>
				<tr>
					<th>VALOR AJUSTADO</th>
					<th>{asFancyNumber(adjustedValue, { isCurrency: true })}</th>
				</tr>
			</Header>
			<Body>
				<tr>
					<td colSpan={2}>
						<RoundSelection
							type="modal"
							modalBtnType="link"
							name="Valor Ajustado"
							current={value + 1}
							onClick={(option: any, index: number) =>
								enabled && setValue("value", index - 1)
							}
							enabled={enabled}
							setEnabled={(event: any) =>
								setValue("enabled", event.currentTarget.checked) &&
								!value &&
								setValue("value", 1) &&
								setValue("observations", "value")
							}
							comment={observations}
							setComment={(event: any) =>
								setValue("observations", event.currentTarget.value)
							}
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
					<td>{asFancyNumber(indiviso)}</td>
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
					<td>{asFancyNumber(result)}</td>
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
							{asFancyNumber(adjustedValue, { isCurrency: true })}
						</th>
					</tr>
				</Header>
			}
		</Table>
	);
};
