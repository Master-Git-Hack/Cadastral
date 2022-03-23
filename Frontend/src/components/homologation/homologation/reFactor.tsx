/** @format */

import { FC,useEffect } from "react";
import {
	selector,
	setHomologationReFactor,
	setHomologationReFactorData,
	updateState
} from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toFancyNumber } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";

export const ReFactor: FC = () => {
	const dispatch = useAppDispatch();
	const { type, homologation } = useAppSelector(selector);
	const { areas, reFactor, salesCosts } = homologation;
	const { subject, averageLotArea } = areas;
	useEffect(() => {
		dispatch(updateState())
	},[])
	return (
		<table className="mt-3 table table-sm table-responsive table-responsive-sm table-hover table-stripped table-bordered">
			<thead className="align-self-middle align-middle text-center">
				<tr>
					<th colSpan={2}>DATOS DE FACTOR</th>
				</tr>
			</thead>
			{type === "TERRENO" ? (
				<ReFactorTerreno
					subject={reFactor.surface}
					averageLotArea={averageLotArea}
					surface={reFactor.data[0]}
					formFactor={reFactor.data[1]}
					resultantFactor={reFactor.factorResult.value}
					unitCost={salesCosts.averageUnitCost.result}
					dispatch={dispatch}
				/>
			) : (
				<ReFactorRenta
					subject={subject}
					averageLotArea={averageLotArea}
					result={reFactor.factorResult.value}
					dispatch={dispatch}
				/>
			)}
		</table>
	);
};
const ReFactorTerreno: FC<{
	subject: any;
	averageLotArea: any;
	surface: any;
	formFactor: any;
	resultantFactor: number;
	unitCost: number;
	dispatch: Function;
}> = (props) => (
	<>
		<tbody className="align-self-middle align-middle text-center">
			<tr>
				<td className="text-start">SUPERFICIE TOTAL (SUJETO)</td>
				<td>
					<FancyInput
						index={1}
						name="superficieTotal"
						value={props.subject.value}
						onChange={(event) =>
							props.dispatch(
								setHomologationReFactor({
									itemName: "reFactor",
									subItemName: "surface",
									value: {
										value: Number(event.target.value),
									},
								}),
							)
						}
						isCurrency={false}
						isPercentage={false}
					/>
				</td>
			</tr>
			<tr>
				<td className="text-start">SUPERFICIE LOTE MODA</td>
				<td>{toFancyNumber(props.averageLotArea.value)}</td>
			</tr>
			<tr>
				<td className="text-start">FACTOR DE SUPERFICIE</td>
				<td>{toFancyNumber(props.surface.value)}</td>
			</tr>
			<tr>
				<td className="text-start">FACTOR DE FORMA</td>
				<td>
					<FancyInput
						index={1}
						name="formFactor"
						value={props.formFactor.value}
						onChange={(event) =>
							props.dispatch(
								setHomologationReFactorData({
									itemID: 1,
									value: {
										...props.formFactor,
										value: Number(event.target.value),
									},
								}),
							)
						}
						isCurrency={false}
						isPercentage={false}
					/>
				</td>
			</tr>
			<tr>
				<td className="text-start">FACTOR RESULTANTE</td>
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
	subject: any;
	averageLotArea: any;
	result: number;
	dispatch: Function;
}> = (props) => (
	<>
		<tbody className="align-self-middle align-middle text-center">
			<tr>
				<td className="text-start">SUPERFICIE TOTAL (SUJETO)</td>
				<td>{toFancyNumber(props.averageLotArea.value)}</td>
			</tr>
			<tr>
				<td className="text-start">SUPERFICIE DEL COMPARABLE</td>
				<td>{toFancyNumber(props.subject.value)}</td>
			</tr>
			<tr></tr>
			<tr>
				<td>FACTOR DEL TERRENO</td>
				<td>{toFancyNumber(Number(props.result.toFixed(2)))}</td>
			</tr>
		</tbody>
	</>
);
