/** @format */
import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import { FancyInput } from "../inputs/fancyInput";
import {
	roundToTenth,
	toFancyNumber,
	countFactors,
	getFactorsTag,
	getUsedFactors,
	getObjectKey,
} from "../../utils/utils";
import {
	selector,
	setFactorsData,
	setLocationZoneResults,
} from "../../features/homologation/slice";
export const BigPicture: FC = () => {
	const dispatch = useAppDispatch();
	const { factors, homologation, rowsCount } = useAppSelector(selector);

	const factorItems = getUsedFactors(factors);
	const colSpan = countFactors(factorItems);
	const tags = getFactorsTag(factorItems).filter((key: string) => !key.includes("FCom."));
	console.log(useAppSelector(selector));
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-bordered table-stripped table-hover">
			<thead className="align-self-middle align-middle text-center">
				<tr>
					<th rowSpan={2}>Oferta</th>
					<th rowSpan={2}>Precio de </th>
					<th rowSpan={2}>
						(m<sup>2</sup>)
					</th>
					<th rowSpan={2}>
						Precio Unitario ($/m<sup>2</sup>){" "}
					</th>
					<th colSpan={colSpan}>Factores de Homologación</th>
					<th rowSpan={2}>F.Ho. Re.</th>
					<th rowSpan={2}>Ponderación</th>
					<th rowSpan={2}>
						Valor Unitario Resultante ($/m<sup>2</sup>)
					</th>
				</tr>
				<Headers tags={tags} />
			</thead>
			<tbody className="align-self-middle align-middle text-center">
				<Body
					tags={tags}
					rowsCount={rowsCount}
					factors={factorItems}
					factorResults={factors.results}
					homologation={homologation}
					dispatch={dispatch}
				/>
			</tbody>
		</table>
	);
};
const Headers: FC<{ tags: any }> = (props) => (
	<tr>
		{props.tags.map((header: string, index: number) => (
			<th key={`bigPicture-headers-${header}-${index}`}>{header}</th>
		))}
		<th>FCom.</th>
	</tr>
);
const Show: FC<{
	id: string;
	value: number;
	isCurrency?: boolean;
	isPercentage?: boolean;
	decimals?: number;
}> = (props) => {
	const show = (
		value: number,
		isCurrency: boolean = false,
		isPercentage: boolean = false,
		decimals: number = 2,
	) => <td id={props.id}>{toFancyNumber(value, isCurrency, isPercentage, decimals)}</td>;
	return (
		<>
			{show(
				props.value,
				props.isCurrency !== undefined ? props.isCurrency : false,
				props.isPercentage !== undefined ? props.isPercentage : false,
				props.decimals !== undefined ? props.decimals : 2,
			)}
		</>
	);
};
const Body: FC<{
	rowsCount: number;
	factorResults: any;
	tags: any;
	factors: any;
	homologation: any;
	dispatch: Function;
}> = (props) => {
	const { areas, salesCosts, weightingPercentage } = props.homologation;
	const items = Array.from({ length: props.rowsCount }, (_: any, i: number) => `C${i + 1}`);
	return (
		<>
			{items.map((item: string, index: number) => (
				<tr key={`bigPicture-body-${item}-${index}`}>
					<td>{item}</td>
					<Show id={`salesCost-${index}`} value={salesCosts.data[index].value} />
					<Show id={`areas-${index}`} value={areas.data[index].value} decimals={0} />
					<Show
						id={`unitaryCost-${index}`}
						value={salesCosts.data[index].unitaryCost}
						isCurrency={true}
					/>
					<FactorsView
						factors={props.factors}
						tags={props.tags}
						index={index}
						dispatch={props.dispatch}
					/>
					<Show
						id={`factorResults-${index}`}
						value={props.factorResults.data[index].value}
					/>
					<td>
						<FancyInput
							index={index}
							name="weightingPercentage"
							value={weightingPercentage.data[index].value}
							onChange={() => {}}
							isCurrency={false}
							isPercentage={true}
						/>
					</td>
				</tr>
			))}
		</>
	);
};
const FactorsView: FC<{ factors: any; tags: any; index: number; dispatch: Function }> = (props) => {
	const keys = getObjectKey(props.factors).filter(
		(key: string) => !key.includes("comparison") && !key.includes("Zona"),
	);
	return (
		<>
			{keys.map((key: string) =>
				props.tags
					.filter((tag: string) => !tag.includes("FZo."))
					.map((tag: string) =>
						props.factors[key].tag === tag ? (
							<Show
								id={`bigPicture-factors-${key}-${tag}-${props.index}`}
								key={`bigPicture-factors-${key}-${tag}-${props.index}`}
								value={
									key === "surface"
										? props.factors[key].data[props.index].value
										: key !== "location" && key !== "zone"
										? props.factors[key].data[props.index].result
										: props.factors[key].results[props.index].value
								}
							/>
						) : null,
					),
			)}
			<td>
				<FancyInput
					index={props.index}
					name="zone"
					value={props.factors.zone.results[props.index].value}
					onChange={(event) => 
						props.dispatch(
							setLocationZoneResults({
								itemName: "zone",
								itemID: props.index,
								value: Number(event.target.value),
							}),
						)
					}
					isCurrency={false}
					isPercentage={false}
				/>
			</td>
			<td>
				<FancyInput
					index={props.index}
					name="comparison"
					value={props.factors.comparison.data[props.index].value}
					onChange={(event) =>
						props.dispatch(
							setFactorsData({
								itemName: "comparison",
								itemID: props.index,
								value: {
									id: props.index + 1,
									value: Number(event.target.value),
								},
							}),
						)
					}
					isCurrency={false}
					isPercentage={false}
				/>
			</td>
		</>
	);
};
