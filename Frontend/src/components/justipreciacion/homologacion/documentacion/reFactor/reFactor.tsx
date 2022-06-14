/** @format */
import {
	getHomologacion as getState,
	updateDocumentationStateArea,
	updateReFactor,
	updateIndiviso,
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
import { useEffect } from "react";
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
					<td>{ReFactor.surface.name}</td>
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
	const { adjustedValue } = documentation.SalesCost.averageUnitCost;
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
