/** @format */

import { FC } from "react";
import { selector, setHomologationRector } from "../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { toFancyNumber } from "../../utils/utils";
import { FancyInput } from "../inputs/fancyInput";

export const ReFactor: FC = () => {
	const dispatch = useAppDispatch();
	const { type, homologation } = useAppSelector(selector);
	console.log(useAppSelector(selector));
	const { areas, refactor } = homologation;
	const { subject, averageLotArea } = areas;
	return (
		<table className="mt-3 table table-sm table-responsive table-responsive-sm table-hover table-stripped table-bordered">
			<thead className="align-self-middle align-middle text-center">
				<tr>
					<th colSpan={2}>DATOS DE FACTOR</th>
				</tr>
			</thead>
			{type === "TERRENO" ? (
				<ReFactorTerreno
					subject={subject}
					averageLotArea={averageLotArea}
					surface={refactor.totalSurface}
					formFactor={refactor.formFactor}
					resultantFactor={refactor.resultantFactor}
					unitCost={refactor.unitCost}
					dispatch={dispatch}
				/>
			) : (
				<ReFactorRenta
					subject={subject}
					averageLotArea={averageLotArea}
					areaSubject={subject}
					land={1}
					dispatch={dispatch}
				/>
			)}
		</table>
	);
};
const ReFactorTerreno: FC<{
	subject: number;
	averageLotArea: number;
	surface: number;
	formFactor: number;
	resultantFactor: number;
	unitCost: number;
	dispatch: Function;
}> = (props) => (
	<>
		<tbody className="align-self-middle align-middle text-center">
			<tr>
				<td>SUPERFICIE TOTAL (SUJETO)</td>
				<td>
					<FancyInput
						index={1}
						name="superficieTotal"
						value={props.subject}
						onChange={(event) =>
							props.dispatch(
								setHomologationRector({
									itemName: "areas",
									subItemName: "subject",
									value: Number(event.target.value),
								}),
							)
						}
						isCurrency={false}
						isPercentage={false}
					/>
				</td>
			</tr>
			<tr>
				<td>SUPERFICIE LOTE MODA</td>
				<td>{toFancyNumber(props.averageLotArea)}</td>
			</tr>
			<tr>
				<td>FACTOR DE SUPERFICIE</td>
				<td>{toFancyNumber(props.surface)}</td>
			</tr>
			<tr>
				<td>FACTOR DE FORMA</td>
				<td>
					<FancyInput
						index={1}
						name="formFactor"
						value={props.formFactor}
						onChange={(event) =>
							props.dispatch(
								setHomologationRector({
									itemName: "refactor",
									subItemName: "formFactor",
									value: Number(event.target.value),
								}),
							)
						}
						isCurrency={false}
						isPercentage={false}
					/>
				</td>
			</tr>
			<tr>
				<td>FACTOR RESULTANTE</td>
				<td>{toFancyNumber(props.resultantFactor)}</td>
			</tr>
			<tr>
				<td>Valor Unitario Aplicable en Números Redondos AL TERRENO</td>
				<td>{toFancyNumber(props.unitCost)}</td>
			</tr>
		</tbody>
	</>
);

const ReFactorRenta: FC<{
	subject: number;
	averageLotArea: number;
	areaSubject: number;
	land: number;
	dispatch: Function;
}> = (props) => (
	<>
		<tbody className="align-self-middle align-middle text-center">
			<tr>
				<td>SUPERFICIE TOTAL (SUJETO)</td>
				<td>
					<FancyInput
						index={1}
						name="superficieTotal"
						value={props.subject}
						onChange={() => props.dispatch}
						isCurrency={false}
						isPercentage={false}
					/>
				</td>
			</tr>
			<tr>
				<td>SUPERFICIE DEL COMPARABLE</td>
				<td>{toFancyNumber(props.averageLotArea)}</td>
			</tr>
			<tr>
				<td>SUPERFICIE DEL SUJETO</td>
				<td>
					<FancyInput
						index={1}
						name="areaSubject"
						value={props.areaSubject}
						onChange={() => props.dispatch}
						isCurrency={false}
						isPercentage={false}
					/>
				</td>
			</tr>
			<tr>
				<td>FACTOR DEL TERRENO</td>
				<td>{toFancyNumber(props.land)}</td>
			</tr>
		</tbody>
	</>
);
