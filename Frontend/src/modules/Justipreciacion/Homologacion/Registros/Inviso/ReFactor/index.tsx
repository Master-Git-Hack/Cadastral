/** @format */

import { useEffect } from "react";
import { JustifyChanges } from "../../../../../../components/Custom/JustifyChanges";
import { Fancy } from "../../../../../../components/Input/Fancy";
import { Text } from "../../../../../../components/Input";
import { Table } from "../../../../../../components/Table";
import { useAppDispatch, useAppSelector } from "../../../../../../redux";
import {
	getHomologaciones,
	setAreaSubject,
	setAreaAverageLotArea,
	setReFactorRoot,
	setReFactorSurface,
	setReFactorForm,
} from "../../../../../../redux/justipreciacion/homologacion";
import { asFancyNumber } from "../../../../../../utils/number";
import { getJustipreciacion, setInitialState } from "../../../../../../redux/justipreciacion";

export const ReFactor = () => {
	const dispatch = useAppDispatch();

	const {
		documentation: {
			SalesCost: { averageUnitCost },
			Area: {
				subject,
				averageLotArea: { surface, value },
			},
			ReFactor: {
				root: { enabled, observations, ...root },
				form,
				result,
				...ReFactor
			},
		},
		record: { type },
	} = useAppSelector(getHomologaciones);

	const { sp1_factor, sp1_superficie } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		type.includes("TERRENO") &&
			sp1_factor !== (form?.value ?? 1) &&
			dispatch(setInitialState({ type, sp1_superficie, sp1_factor: form?.value ?? 1 }));
	}, [type, form?.value]);

	return (
		<Table.Component
			name=""
			customHeader={
				<tr>
					<th colSpan={2} style={{ minWidth: 370 }}>
						DATOS DE FACTOR
					</th>
				</tr>
			}
			customBody={
				<>
					{type.includes("TERRENO") && (
						<tr>
							<td>SUPERFICIE TOTAL (SUJETO)</td>
							<td>
								<Fancy
									label="surface"
									value={surface}
									onChange={({ currentTarget: { valueAsNumber } }) => {
										dispatch(
											setAreaAverageLotArea({
												key: "surface",
												value: valueAsNumber,
											}),
										);
									}}
									name={"surface"}
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
								<Fancy
									label="subject"
									value={subject.value}
									onChange={({ currentTarget: { valueAsNumber } }) => {
										dispatch(
											setAreaSubject({
												key: "value",
												value: valueAsNumber,
											}),
										);
									}}
									name={"subject"}
								/>
							</td>
						</tr>
					)}
					<tr>
						<td>
							<div className="d-flex">
								<div className="me-auto my-auto">{ReFactor.surface.name}</div>
								<JustifyChanges
									action={"Cambiar Raíz"}
									name={"Factor de Superficie"}
									editable={enabled}
									size="sm"
									setEditable={(checked: boolean) => {
										dispatch(
											setReFactorRoot({ key: "enabled", value: checked }),
										);
										!checked &&
											dispatch(
												setReFactorRoot({ key: "observations", value: "" }),
											) &&
											dispatch(setReFactorRoot({ key: "value", value: 8 }));
									}}
									comment={observations}
									setComment={(value: string) => {
										dispatch(setReFactorRoot({ key: "observations", value }));
									}}
								>
									<div>
										<span>Valor actual: Raíz </span>
										<small>
											<strong>
												<sup>{root.value}</sup>&radic;
												<span style={{ textDecoration: "overline" }}>
													x
												</span>
											</strong>
										</small>
										<br />
										<Text
											disabled={!enabled}
											type="number"
											onChange={(value: string) => {
												dispatch(
													setReFactorRoot({
														key: "value",
														value: Number(value),
													}),
												);
											}}
											value={root.value}
										/>
									</div>
								</JustifyChanges>
							</div>
						</td>
						<td>{asFancyNumber(ReFactor.surface.value)}</td>
					</tr>
					{type.includes("TERRENO") && (
						<>
							<tr>
								<td>{form.name}</td>
								<td>
									<Fancy
										index={0}
										label="form"
										value={form.value}
										onChange={({ currentTarget: { valueAsNumber } }) => {
											dispatch(
												setReFactorForm({
													key: "value",
													value: valueAsNumber,
												}),
											);
										}}
										name={"Form"}
									/>
								</td>
							</tr>
							<tr>
								<td>{result.name}</td>
								<td>{asFancyNumber(result.value)}</td>
							</tr>
						</>
					)}
				</>
			}
			hasFooter
			customFooter={
				type.includes("TERRENO") && (
					<tr>
						<td>Valor Unitario Aplicable en Números Redondos AL TERRENO</td>
						<td>
							{asFancyNumber(averageUnitCost.result, {
								isCurrency: true,
							})}
						</td>
					</tr>
				)
			}
		/>
	);
	/**btnType="link"
	actionToDo="Cambiar Raíz"
	name={ReFactor.surface.name}
	enabled={enabled}
	setEnabled={(event: any) => {
		/**const value = event.currentTarget.checked;
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
			); */
	/*}}
	comment={ReFactor.observation}
	setComment={(event: any) => {
		/**dispatch(
			setRootReFactor({
				key: "observation",
				value: event.currentTarget.value,
			}),
		) */
	/*  }}
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
				onChange={(event) => {
					/**enabled &&
					dispatch(
						setRootReFactor({
							key: "root",
							value: event.currentTarget
								.valueAsNumber,
						}),
					) */
	/*   }}
				disabled={!enabled}
			/>
		</>
	} */
};
