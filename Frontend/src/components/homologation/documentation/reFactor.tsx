/** @format */
import {
	getState,
	updateDocumentationStateArea,
	updateReFactor,
	updateIndiviso,
} from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toFancyNumber } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";
import { Body, Footer, Header, Table } from "../../table/Table";
export default function ReFactor() {
	const { type } = useAppSelector(getState).record.homologacion;
	return (
		<div className="d-flex justify-content-center px-5 my-3 mx-5">
			<div className="col mx-2">
				<ReFactorComponent />
			</div>
			<div className="col mx-2 my-auto">
				<AdjustedValueComponent />
			</div>
			<div className="col mx-2">
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
	const { type } = record.homologacion;
	const { result } = SalesCost.averageUnitCost;
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
				{type.includes("TERRENO") ? (
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
				) : null}
				<tr>
					<td>
						{type.includes("TERRENO")
							? "SUPERFICIE LOTE MODA"
							: "SUPERFICIE DEL COMPARABLE"}
					</td>
					<td>{toFancyNumber(value)}</td>
				</tr>
				{!type.includes("TERRENO") ? (
					<tr>
						<td>SUPERFICIE DEL SUJETO</td>
						<td>
							<FancyInput
								index={0}
								name="surface"
								value={Area.subject.value}
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
				) : null}
				<tr>
					<td>{ReFactor.surface.name}</td>
					<td>{toFancyNumber(Number(ReFactor.surface.value.toFixed(2)))}</td>
				</tr>
				{type.includes("TERRENO") ? (
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
				) : null}
			</Body>
			{type.includes("TERRENO") ? (
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
			) : null}
		</Table>
	);
};

export const AdjustedValueComponent = () => {
	const { adjustedValue } = useAppSelector(getState).documentation.SalesCost.averageUnitCost;
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
	const { type } = record.homologacion;
	const { adjustedValue } = documentation.SalesCost.averageUnitCost;
	const { surface, building, indiviso, result } = documentation.Indiviso;
	const { value } = documentation.Area.subject;
	const dispatch = useAppDispatch();
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
