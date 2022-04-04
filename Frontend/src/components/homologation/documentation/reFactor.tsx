/** @format */
import { getState } from "../../../features/homologation/slice";
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
			{type.includes("TERRENO") ? (
				<div className="col mx-2">
					<IndivisoComponent />
				</div>
			) : null}
		</div>
	);
}
export const ReFactorComponent = () => {
	const dispatch = useAppDispatch();
	const { documentation, record } = useAppSelector(getState);
	const { SalesCost, Area } = documentation;
	const { surface } = Area.averageLotArea;
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
				<tr>
					<td>SUPERFICIE TOTAL (SUJETO)</td>
					<td>
						<FancyInput
							index={0}
							name="Total Surface"
							value={surface}
							onChange={() => {}}
						/>
					</td>
				</tr>
				<tr>
					<td>{Area.subject.name}</td>
					<td>
						<FancyInput index={0} name="Surface" value={surface} onChange={() => {}} />
					</td>
				</tr>
			</Body>
			{type.includes("TERRENO") ? (
				<Footer>
					<tr>
						<td>Valor Unitario Aplicable en Números Redondos AL TERRENO</td>
						<td>{toFancyNumber(Number(result.toFixed(2)))}</td>
					</tr>
				</Footer>
			) : null}
		</Table>
	);
};
export const AdjustedValueComponent = () => {
	const { reFactor } = useAppSelector(getState).documentation.SalesCost.averageUnitCost;
	return (
		<Table>
			<Header>
				<tr>
					<th>VALOR AJUSTADO</th>
					<th>{toFancyNumber(Number(reFactor.toFixed(0)), true)}</th>
				</tr>
			</Header>
		</Table>
	);
};
export const IndivisoComponent = () => {
	const { type } = useAppSelector(getState).record.homologacion;
	const { reFactor } = useAppSelector(getState).documentation.SalesCost.averageUnitCost;
	return type.includes("TERRENO") ? (
		<Table>
			<Header>
				<tr>
					<th colSpan={2} style={{ minWidth: 450 }}>
						Cálculo terreno por indiviso
					</th>
				</tr>
			</Header>
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
						<td>VALOR UNITARIO APLICABLE</td>
						<td>{toFancyNumber(Number(reFactor.toFixed(2)))}</td>
					</tr>
				</Header>
			}
		</Table>
	);
};
