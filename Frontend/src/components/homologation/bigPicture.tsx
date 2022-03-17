/** @format */
import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import {
	toFancyNumber,
	countFactors,
	getFactorsTag,
	getUsedFactors,
	getObjectKey,
} from "../../utils/utils";
import {
	selector
} from "../../features/homologation/slice";
export const BigPicture: FC = () => {
	const dispatch = useAppDispatch();
	const { factors, homologation, rowsCount, type, status } = useAppSelector(selector);
	const factorItems = getUsedFactors(factors);
	const colSpan = countFactors(factorItems);
	const tags = getFactorsTag(factorItems).filter((key: string) => !key.includes("FCom."));
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-bordered table-stripped table-hover">
			<thead className="align-self-middle align-middle text-center">
				<tr>
					<th rowSpan={2}>Oferta</th>
					<th rowSpan={2}>{homologation.salesCosts.tag}</th>
					<th rowSpan={2}>
						{homologation.areas.name}
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
			<Body
				tags={tags}
				rowsCount={rowsCount}
				factors={factorItems}
				factorResults={factors.results}
				homologation={homologation}
				dispatch={dispatch}
			/>
			<Footer
				status={status}
				type={type}
				length={colSpan}
				area={homologation.areas}
				averageUnitCost={homologation.salesCosts.averageUnitCost}
			/>
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
	isArea?: boolean;
	rowSpan?: number;
	isFixed?: boolean;
}> = (props) => {
	const show = (
		value: number,
		isCurrency: boolean = false,
		isPercentage: boolean = false,
		decimals: number = 2,
		isArea: boolean = false,
	) => (
		<td id={props.id} className="text-center" rowSpan={props.rowSpan}>
			{toFancyNumber(value, isCurrency, isPercentage, decimals)}{" "}
			{isArea ? (
				<>
					m<sup>2</sup>
				</>
			) : null}
		</td>
	);
	return (
		<>
			{show(
				Number(props.isFixed !== undefined ? Number(props.value).toFixed(3) : props.value),
				props.isCurrency !== undefined ? props.isCurrency : false,
				props.isPercentage !== undefined ? props.isPercentage : false,
				props.decimals !== undefined ? props.decimals : 2,
				props.isArea !== undefined ? props.isArea : false,
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
		<tbody className="align-self-middle align-middle text-center">
			{items.map((item: string, index: number) => (
				<tr key={`bigPicture-body-${item}-${index}`}>
					<td>{item}</td>
					<Show
						id={`salesCost-${index}`}
						value={salesCosts.data[index].value}
						isCurrency={true}
					/>
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
						<Show
							id={`bigPicture-weightingPercentage-${index}`}
							value={weightingPercentage.data[index].value}
							isPercentage={true}
						/>
					</td>
					<Show
						id={`bigPicture-resultantUnitaryCosts-${index}`}
						value={salesCosts.results[index].value}
						isCurrency={true}
					/>
				</tr>
			))}
		</tbody>
	);
};
const FactorsView: FC<{ factors: any; tags: any; index: number; dispatch: Function }> = (props) => {
	const keys = getObjectKey(props.factors).filter((key: string) => !key.includes("commercial"));
	return (
		<>
			{keys.map((key: string) =>
				props.tags.map((tag: string) =>
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
				<Show
					id={`bigPicture-factors-commercial-FCom.-${props.index}`}
					key={`bigPicture-factors-commercial-FCom.-${props.index}`}
					value={props.factors.commercial.data[props.index].value}
				/>
			</td>
		</>
	);
};
const Footer: FC<{
	status: string;
	type: string;
	area: any;
	length: number;
	averageUnitCost: any;
}> = (props) => (
	<tfoot>
		<tr className="text-center align-self-middle align-middle">
			{props.type !== "TERRENO" ? (
				<>
					<td colSpan={2} rowSpan={2} className="text-end">
						SUJETO
					</td>
					<Show
						id="bigPicture-areaValue"
						value={props.area.subject.value}
						isArea={true}
						rowSpan={2}
					/>
				</>
			) : null}

			<td colSpan={2} rowSpan={2} className="text-end">
				{props.area.tag}
			</td>
			<Show
				id="bigPicture-areaValue"
				value={props.area.averageLotArea.value}
				isArea={true}
				rowSpan={2}
			/>

			<td colSpan={props.length + (props.type === "TERRENO" ? 3 : 0)} className="text-end">
				{props.type === "TERRENO"
					? "Valor Unitario Promedio"
					: "Valor Unitario  Ponderado homologado"}
			</td>
			<Show
				id="bigPicture-unitaryCosts"
				value={props.averageUnitCost.value}
				isCurrency={true}
			/>
		</tr>
		<tr className="text-center">
			<td colSpan={props.length + (props.type === "TERRENO" ? 3 : 0)} className="text-end">
				Valor Unitario Aplicable en Números Redondos
			</td>

			<Show
				id="bigPicture-roundedAverageUnitCost"
				value={props.averageUnitCost.roundedValue}
				isCurrency={true}
			/>
		</tr>
	</tfoot>
);
