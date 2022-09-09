/** @format */

import { useEffect } from "react";
import { Grid, Row, Col } from "rsuite";
import { Fancy } from "../../../../../components/Input/Fancy";
import { Table } from "../../../../../components/Table";
import { useAppSelector, useAppDispatch } from "../../../../../redux";
import { getJustipreciacion, setInitialState } from "../../../../../redux/justipreciacion";
import {
	getHomologaciones,
	setIndiviso,
	setAreaSubject,
} from "../../../../../redux/justipreciacion/homologacion";
import { asFancyNumber } from "../../../../../utils/number";
import { AdjustedValue } from "./AdjustedValue";
import { ReFactor } from "./ReFactor";
export const Indiviso = () => {
	return (
		<Grid fluid>
			<Row>
				<Col>
					<ReFactor />
				</Col>
				<Col style={{ minWidth: 250 }}>
					<AdjustedValue />
				</Col>
				<Col>
					<Component />
				</Col>
			</Row>
		</Grid>
	);
};
export const Component = () => {
	const {
		documentation: {
			Area: {
				subject: { value },
			},
			SalesCost: {
				averageUnitCost: { adjustedValue },
			},
			Indiviso: { surface, building, indiviso, result },
		},
		record: { type },
	} = useAppSelector(getHomologaciones);

	const dispatch = useAppDispatch();
	const { sp1_factor, sp1_superficie } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		type.includes("TERRENO") &&
			sp1_superficie !== value &&
			dispatch(setInitialState({ type, sp1_superficie: value, sp1_factor }));
	}, [type, value]);
	return type.includes("TERRENO") ? (
		<Table.Component
			name="Indiviso"
			customHeader={
				<tr>
					<th colSpan={2} style={{ minWidth: 450 }}>
						Cálculo terreno por indiviso
					</th>
				</tr>
			}
			customBody={
				<>
					<tr>
						<td>SUPERFICIE DE CONSTRUCCION</td>
						<td>
							<Fancy
								index={0}
								name="surface indiviso"
								value={surface}
								onChange={({ currentTarget: { valueAsNumber } }) => {
									dispatch(
										setIndiviso({
											key: "surface",
											value: valueAsNumber,
										}),
									);
								}}
								label={"surface Indiviso"}
							/>
						</td>
					</tr>
					<tr>
						<td>CONST. PRIVATIVA</td>
						<td>
							<Fancy
								index={0}
								name="building"
								value={building}
								onChange={
									({ currentTarget: { valueAsNumber } }) => {
										dispatch(
											setIndiviso({
												key: "building",
												value: valueAsNumber,
											}),
										);
									}
									/**dispatch(
										updateIndiviso({
											key: "building",
											value: Number(event.target.value),
										}),
									) */
								}
								label={"building"}
							/>
						</td>
					</tr>
					<tr>
						<td>INDIVISO</td>
						<td>{asFancyNumber(indiviso, { style: "decimal", decimals: 6 })}</td>
					</tr>
					<tr>
						<td>SUPERFICIE TOTAL DEL TERRENO</td>
						<td>
							<Fancy
								label="area surface"
								value={value}
								onChange={({ currentTarget: { valueAsNumber } }) =>
									dispatch(
										setAreaSubject({
											key: "value",
											value: valueAsNumber,
										}),
									)
								}
								name={"area surface"}
							/>
						</td>
					</tr>
					<tr>
						<td>SUPERFICIE DE TERRENO SEGÚN INDIVISO</td>
						<td>{asFancyNumber(result)}</td>
					</tr>
				</>
			}
			hasFooter
			customFooter={
				<tr>
					<td colSpan={2} style={{ minWidth: 450 }}>
						TERRENO QUE LE CORRESPONDE AL LOCAL DE ACUERDO CON EL INDIVISO CALCULADO POR
						EL PERITO
					</td>
				</tr>
			}
		/>
	) : (
		<Table.Component
			name=""
			header={[
				"VALOR UNITARIO APLICABLE",
				asFancyNumber(adjustedValue, { isCurrency: true }),
			]}
		/>
	);
};
