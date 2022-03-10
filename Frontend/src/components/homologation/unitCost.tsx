/** @format */

import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
	selector,
	setHomologation,
	setHomologationAreaSubject,
} from "../../features/homologation/slice";
import { FancyInput } from "../inputs/fancyInput";
import { toFancyNumber } from "../../utils/utils";

export const UnitCost: FC = () => {
	const dispatch = useAppDispatch();
	const { homologation, type } = useAppSelector(selector);
	const { areas, salesCosts } = homologation;
	const length = Array.from({ length: areas.data.length }, (_, i) => i);
	const handleType = type === "TERRENO" ? 1 : 0;
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-bordered table-striped table-hover">
			<tbody className="align-self-middle align-middle text-center">
				<tr>
					<td className="align-middle" colSpan={7}>
						Precio Unitario ( $ / m<sup>2</sup> )
					</td>
				</tr>
				<AreaSubject
					type={type}
					subject={type !== "TERRENO" ? areas.subject : areas.averageLotArea}
					dispatch={dispatch}
				/>
				<tr>
					<td colSpan={1}>#</td>
					<td colSpan={2}>Precio de {handleType ? "Venta" : "Renta"}</td>
					<td colSpan={2}>
						{handleType ? "Área " : "Sup. Terreno "}(m<sup>2</sup>)
					</td>
					<td className="align-middle" colSpan={2}>
						Precio Unitario ( $ / m<sup>2</sup> )
					</td>
				</tr>

				<Body
					length={length}
					areas={areas.data}
					salesCosts={salesCosts.data}
					dispatch={dispatch}
				/>
			</tbody>
		</table>
	);
};
const AreaSubject: FC<{ type: string; subject: number; dispatch: Function }> = (props) =>
	props.type !== "TERRENO" ? (
		<tr>
			<td colSpan={2}>
				Superficie (m<sup>2</sup>) del sujeto
			</td>
			<td colSpan={4}>
				<FancyInput
					index={0}
					name="subject"
					value={props.subject}
					onChange={(event) =>
						props.dispatch(
							setHomologationAreaSubject({ value: Number(event.target.value) }),
						)
					}
					isCurrency={false}
					isPercentage={false}
					style={`text-center`}
				/>
			</td>
		</tr>
	) : (
		<tr>
			<td colSpan={3}>Área de Lote Moda</td>
			<td colSpan={4}>{toFancyNumber(props.subject)}</td>
		</tr>
	);
const Body: FC<{ length: any; areas: any; salesCosts: any; dispatch: Function }> = (props) =>
	props.length.map((i: number) => (
		<tr key={`areasBody-${i}`}>
			<td colSpan={1}>C{i + 1}</td>
			<td colSpan={2}>
				<FancyInput
					index={i}
					name="salesCosts"
					value={props.salesCosts[i].value}
					onChange={(event) =>
						props.dispatch(
							setHomologation({
								itemName: "salesCosts",
								itemID: i,
								value: Number(event.target.value),
							}),
						)
					}
					isCurrency={true}
					isPercentage={false}
				/>
			</td>
			<td colSpan={2}>
				<FancyInput
					index={i}
					name="areas"
					value={props.areas[i].value}
					onChange={(event) =>
						props.dispatch(
							setHomologation({
								itemName: "areas",
								itemID: i,
								value: Number(event.target.value),
							}),
						)
					}
					isCurrency={false}
					isPercentage={false}
				/>
			</td>
			<td colSpan={2}>{toFancyNumber(props.salesCosts[i].unitaryCost, true)}</td>
		</tr>
	));
