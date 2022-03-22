/** @format */

import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selector, setFactorsData, setHomologation } from "../../features/homologation/slice";
import { FancyInput } from "../inputs/fancyInput";
import { toFancyNumber } from "../../utils/utils";

export const UnitCost: FC = () => {
	const dispatch = useAppDispatch();
	const { homologation, type, factors } = useAppSelector(selector);
	const { surface, commercial } = factors;
	const { areas, salesCosts, weightingPercentage } = homologation;
	const length = Array.from({ length: areas.data.length }, (_, i) => i);
	const percentage = weightingPercentage.total;
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-bordered table-striped table-hover">
			<tbody className="align-self-middle align-middle text-center">
				<tr>
					<td colSpan={1}>#</td>
					<td colSpan={2}>{salesCosts.tag}</td>
					{type !== "TERRENO" ? (
						<td colSpan={2}>
							Sup. Terreno ( $ / m<sup>2</sup> )
						</td>
					) : null}
					<td colSpan={2}>
						{areas.name}(m<sup>2</sup>)
					</td>
					<td className="align-middle" colSpan={2}>
						Precio Unitario ( $ / m<sup>2</sup> )
					</td>
					<td className="align-middle" colSpan={2}>
						Factor de Superficie
					</td>
					<td className="align-middle" colSpan={2}>
						Factor de Comercialización
					</td>
					<td className="align-middle" colSpan={2}>
						Ponderación
						<br />
						<small
							className={`badge rounded-pill bg-${
								percentage === 100
									? "success"
									: percentage > 100
									? "danger"
									: "warning"
							}`}
						>
							{toFancyNumber(percentage, false, true, 0)}
						</small>
					</td>
				</tr>

				<Body
					type={type}
					length={length}
					surface={surface.data}
					commercial={commercial.data}
					areas={areas}
					weightingPercentage={weightingPercentage.data}
					salesCosts={salesCosts.data}
					dispatch={dispatch}
				/>
			</tbody>
			<tfoot>
				<AreaSubject type={type} area={areas} />
			</tfoot>
		</table>
	);
};
const AreaSubject: FC<{ type: string; area: any }> = (props) => (
	<tr>
		<td colSpan={3}>{props.area.tag}</td>
		{props.type !== "TERRENO" ? (
			<td colSpan={2} className="text-center">
				{toFancyNumber(props.area.subject.value)} m<sup>2</sup>
			</td>
		) : null}
		<td colSpan={2} className="text-center">
			{toFancyNumber(props.area.averageLotArea.value)} m<sup>2</sup>
		</td>
		<td colSpan={8} />
	</tr>
);
const Body: FC<{
	type: string;
	length: any;
	areas: any;
	salesCosts: any;
	surface: any;
	commercial: any;
	weightingPercentage: any;
	dispatch: Function;
}> = (props) =>
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
			{props.type !== "TERRENO" ? (
				<td colSpan={2}>
					<FancyInput
						index={i}
						name="surface"
						value={props.areas.data[i].surface}
						onChange={(event) =>
							props.dispatch(
								setHomologation({
									itemName: "areas",
									itemID: i,
									subItemName: "surface",
									value: Number(event.target.value),
								}),
							)
						}
						isCurrency={false}
						isPercentage={false}
					/>
				</td>
			) : null}
			<td colSpan={2}>
				<FancyInput
					index={i}
					name="areas"
					value={props.areas.data[i].value}
					onChange={(event) =>
						props.dispatch(
							setHomologation({
								itemName: "areas",
								itemID: i,
								subItemName: "value",
								value: Number(event.target.value),
							}),
						)
					}
					isCurrency={false}
					isPercentage={false}
				/>
			</td>
			<td colSpan={2}>{toFancyNumber(Number(props.salesCosts[i].unitaryCost.toFixed(2)), true)}</td>
			<td colSpan={2}>{toFancyNumber(Number(props.surface[i].value.toFixed(2)))}</td>
			<td colSpan={2}>
				<FancyInput
					index={i}
					name="commercial"
					value={props.commercial[i].value}
					onChange={(event) =>
						props.dispatch(
							setFactorsData({
								itemName: "commercial",
								itemID: i,
								value: {
									id: i + 1,
									value: Number(event.target.value),
								},
							}),
						)
					}
					isCurrency={false}
					isPercentage={false}
					style="text-center"
				/>
			</td>
			<td colSpan={2}>
				<FancyInput
					index={i}
					name="weightingPercentage"
					value={props.weightingPercentage[i].value}
					onChange={(event) =>
						props.dispatch(
							setHomologation({
								itemName: "weightingPercentage",
								itemID: i,
								value: Number(event.target.value),
							}),
						)
					}
					isCurrency={false}
					isPercentage={true}
					style="text-center"
				/>
			</td>
		</tr>
	));
