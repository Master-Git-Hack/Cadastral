/** @format */

import { FC, useState, useEffect } from "react";
import { selector, setZone, setZoneSubjectFactors } from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toFancyNumber } from "../../../utils/utils";

export const ZoneTable: FC = () => {
	const { districtIndicators, factors,homologation } = useAppSelector(selector);
	const { results } = factors.zone;
	const {subject, data} = homologation.areas
	const dispatch = useAppDispatch();
	const findDistrict = (district: string) =>
		districtIndicators.find((d) => d.district === district);
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-bordered table-stripped table-hover">
			<Header
				subject={subject}
				districtIndicators={districtIndicators}
				findDistrict={findDistrict}
				dispatch={dispatch}
			/>
			<Body
				analytics={data}
				results={results}
				type1={subject.factor1.type}
				type2={subject.factor2.type}
				findDistrict={findDistrict}
				dispatch={dispatch}
			/>
		</table>
	);
};
const DistrictSelect: FC<{ name: string; index: number; value: any; onChange: any }> = (props) => {
	const { districtIndicators } = useAppSelector(selector);
	return (
		<select
			className="form-select form-select-sm"
			value={props.value}
			onChange={props.onChange}
		>
			{districtIndicators.map((item: any, index: number) => (
				<option
					key={`option for district indicator ${props.name}-${props.index} ${index}`}
					value={item.district}
				>
					{item.district}
				</option>
			))}
		</select>
	);
};
const RootSelect: FC<{ value: number; onChange: any }> = (props) => (
	<select className="form-select form-select-sm" value={props.value} onChange={props.onChange}>
		<option value={12}>12</option>
		<option value={11}>11</option>
		<option value={10}>10</option>
		<option value={9}>9</option>
		<option value={8}>8</option>
		<option value={7}>7</option>
		<option value={6}>6</option>
		<option value={5}>5</option>
		<option value={4}>4</option>
		<option value={3}>3</option>
		<option value={2}>2</option>
	</select>
);
const Header: FC<{
	subject: any;
	districtIndicators: any;
	findDistrict: Function;
	dispatch: Function;
}> = (props) => (
	<thead>
		<tr>
			<th>Raiz 1</th>
			<th colSpan={3}>
				<RootSelect
					value={props.subject.factor1.root}
					onChange={(event: any) =>
						props.dispatch(
							setZoneSubjectFactors({
								itemName: "factor1",
								value: {
									...props.subject.factor1,
									root: Number(event.target.value),
								},
							}),
						)
					}
				/>
			</th>
			<th>Raiz 2</th>
			<th colSpan={3}>
				<RootSelect
					value={props.subject.factor2.root}
					onChange={(event: any) =>
						props.dispatch(
							setZoneSubjectFactors({
								itemName: "factor2",
								value: {
									...props.subject.factor2,
									root: Number(event.target.value),
								},
							}),
						)
					}
				/>
			</th>
		</tr>
		<tr>
			<th colSpan={3}>
				<select
					className="form-select form-select-sm"
					value={props.subject.factor1.type}
					onChange={(event) =>
						props.dispatch(
							setZoneSubjectFactors({
								itemName: "factor1",
								value: {
									...props.subject.factor1,
									type: event.target.value,
								},
							}),
						)
					}
				>
					<option value="economicallyActivePopulation">
						Poblacion Economicamente Activa
					</option>
					<option value="inhabitedDwellings">Total de Viviendas Habitadas</option>
					<option value="percentage">Porcentaje poblacion activa</option>
					<option value="populationDensity">Densidad de Poblacion</option>
					<option value="totalPopulation">Poblacion Total</option>
				</select>
			</th>
			<th>Factor 1</th>
			<th colSpan={2}>
				<select
					className="form-select form-select-sm"
					value={props.subject.factor2.type}
					onChange={(event) =>
						props.dispatch(
							setZoneSubjectFactors({
								itemName: "factor2",
								value: {
									...props.subject.factor2,
									type: event.target.value,
								},
							}),
						)
					}
				>
					<option value="economicallyActivePopulation">
						Poblacion Economicamente Activa
					</option>
					<option value="inhabitedDwellings">Total de Viviendas Habitadas</option>
					<option value="percentage">Porcentaje poblacion activa</option>
					<option value="populationDensity">Densidad de Poblacion</option>
					<option value="totalPopulation">Poblacion Total</option>
					<option value="useZoneResults">Factor de Zona Calculado</option>
				</select>
			</th>
			<th>Factor 2</th>
			<th>Resultado 1</th>
		</tr>
		<tr>
			<th>SUJETO</th>
			<th>
				<DistrictSelect
					index={0}
					name="subject"
					value={props.subject.district.district}
					onChange={(event: any) => {
						const response = props.findDistrict(event.target.value);
						props.dispatch(
							setZoneSubjectFactors({
								itemName: "district",
								value: response,
							}),
						);
					}}
				/>
			</th>
			<th>
				{toFancyNumber(
					props.subject.district[props.subject.factor1.type],
					false,
					props.subject.factor1.type === "percentage" ? true : false,
				)}
			</th>
			<th colSpan={5} />
		</tr>
	</thead>
);
const Body: FC<{
	analytics: any;
	results: any;
	dispatch: Function;
	findDistrict: Function;
	type1: string;
	type2: string;
}> = (props) => (
	<tbody>
		{props.analytics.map((item: any, index: number) => (
			<tr key={`analytics row ${index}`}>
				<td>C{index + 1}</td>
				<td>
					<DistrictSelect
						index={index}
						name="analytics factor1"
						value={item.district.district}
						onChange={(event: any) => {
							const response = props.findDistrict(event.target.value);
							props.dispatch(
								setZone({
									itemName: "analytics",
									subItemName: "district",
									itemID: index,
									value: response,
								}),
							);
						}}
					/>
				</td>
				<td>
					{toFancyNumber(
						item.district[props.type1],
						false,
						props.type1 === "percentage" ? true : false,
					)}
				</td>
				<td>{toFancyNumber(Number(item.factor1.value.toFixed(2)), false, false, 2)}</td>
				<td colSpan={2}>
					{toFancyNumber(
						props.type2 !== "useZoneResults"
							? item.district[props.type2]
							: props.results[index].value,
						false,
						props.type2 === "percentage" ? true : false,
					)}
				</td>
				<td>{toFancyNumber(Number(item.factor2.value.toFixed(2)), false, false, 2)}</td>
				<td>{toFancyNumber(Number(item.factor1.result.toFixed(2)), false, false, 2)}</td>
			</tr>
		))}
	</tbody>
);
