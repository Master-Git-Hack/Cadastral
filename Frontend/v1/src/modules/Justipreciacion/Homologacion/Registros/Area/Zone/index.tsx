/** @format */

import { Fragment, SyntheticEvent } from "react";
import { Dropdown } from "../../../../../../components/Dropdown";
import { Select as SelectComponent } from "../../../../../../components/Input/Select";
import { Table } from "../../../../../../components/Table";
import { useAppDispatch, useAppSelector } from "../../../../../../redux";
import {
	getHomologaciones,
	setAreaSubject,
	setAreaSubjectFactors,
	setAreaAddress,
} from "../../../../../../redux/justipreciacion/homologacion";
import { asFancyNumber } from "../../../../../../utils/number";
const Select = SelectComponent.Normal;
const CustomSelect = SelectComponent.Custom;
const Component = () => (
	<Table.Component
		name="Complement of Zone by Areas"
		customHeader={<Header />}
		customBody={<Body />}
		hasFooter
		customFooter={<Footer />}
	/>
);
const objectOptions: { [key: string]: string } = {
	"Densidad de Población": "populationDensity",
	"Población Económicamente Activa": "economicallyActivePopulation",
	"Población Total": "totalPopulation",
	"Porcentaje de Población Activa": "percentage",
	"Total de Viviendas Habitadas": "inhabitedDwellings",
	"Factor de Zona Calculado": "useZoneResults",
};
const invertedObjectOptions: { [key: string]: string } = Object.keys(objectOptions).reduce(
	(acc, key) => ({ ...acc, [objectOptions[key]]: key }),
	{},
);
const factorsOptions = [
	{ value: 0, label: "Densidad de Población" },
	{ value: 1, label: "Población Económicamente Activa" },
	{ value: 2, label: "Población Total" },
	{ value: 3, label: "Porcentaje de Población Activa" },
	{ value: 4, label: "Total de Viviendas Habitadas" },
	{ value: 5, label: "Factor de Zona Calculado" },
];
const Header = () => {
	const dispatch = useAppDispatch();
	const { documentation, handlers } = useAppSelector(getHomologaciones);
	const { factors, zone } = documentation.Area.subject;
	const { findLocation } = handlers.Area;
	const { zoneInformation } = handlers;
	const options = zoneInformation.map((item: any) => ({
		label: item.name,
		value: item.id,
	}));
	const current = { label: zone.name, value: zone.id };
	const factores = factors.map((factor: any) => ({
		...factor,
		value: factor.id,
		label: invertedObjectOptions[factor.type],
	}));

	return (
		<>
			<tr>
				<th colSpan={3}>
					<div style={{ padding: 4 }}>
						<Select
							defaultValue={factorsOptions.find(
									(item: any) =>
										item.label === invertedObjectOptions[factors[0].type],
								)?.value}
							data={factorsOptions.slice(0, 5)}
							onChange={({ currentTarget: { value } }) => {
								const selection =
									factorsOptions.find(
										(item: any) => item.value === Number(value),
									) ?? factorsOptions[0];
								dispatch(
									setAreaSubjectFactors({
										index: 0,
										key: "type",
										value: objectOptions[selection.label],
									}),
								);
							}}
						/>
					</div>
				</th>
				<th>Factor 1</th>
				<th>
					<Select
						defaultValue={factorsOptions.find(
									(item: any) =>
										item.label === invertedObjectOptions[factors[1].type],
								)?.value}
						data={factorsOptions}
						onChange={({ currentTarget: { value } }) => {
							const selection =
								factorsOptions.find((item) => item.value === Number(value)) ??
								factorsOptions[0];
							dispatch(
								setAreaSubjectFactors({
									index: 1,
									key: "type",
									value: objectOptions[selection.label],
								}),
							);
						}}
					/>
				</th>
				<th>Factor 2</th>
				<th>Factor resultante 1 indicador (F. Zona)</th>
			</tr>
			<tr>
				<th>SUJETO</th>
				<th colSpan={2}>
					<CustomSelect
						label="Municipio"
						size="xs"
						block
						placement="auto"
						data={options}
						value={current.value}
						onSelect={(value: string) => {
							dispatch(
								setAreaSubject({
									key: "zone",
									value: findLocation(value, zoneInformation),
								}),
							);
						}}
					/>
				</th>
				<th colSpan={4}>
					{asFancyNumber(zone[factors[0].type], {
						isPercentage: factors[0].type.includes("percentage"),
					})}
				</th>
			</tr>
		</>
	);
};
const Footer = () => {
	const dispatch = useAppDispatch();
	const { factors } = useAppSelector(getHomologaciones).documentation.Area.subject;
	const colSpan = factors.length + 7;
	const options = new Array(11).fill(0).map((_, i) => `${i + 2}`);
	return (
		<tr>
			<td colSpan={colSpan}>
				<div className="d-flex justify-content-between ">
					{factors.map((factor: any, index: number) => (
						<div
							key={`columns for header component at intermunicipio evaluation ${index}`}
							className={index % 2 === 0 ? " text-start" : "text-end"}
						>
							<Dropdown
								trigger="click"
								items={options}
								activeKey={factor.root}
								size="xs"
								title={`Valor actual de la raíz ${factor.id}: Raíz(${factor.root})`}
								onSelect={(eventKey: string): void => {
									dispatch(
										setAreaSubjectFactors({
											index,
											key: "root",
											value: Number(eventKey),
										}),
									);
								}}
							/>
						</div>
					))}
				</div>
			</td>
		</tr>
	);
};
const NumberComponent = (props: { value: number; isPercentage?: boolean; colSpan?: number }) => (
	<td colSpan={props.colSpan ?? 1}>
		{asFancyNumber(props.value, { isPercentage: props?.isPercentage ?? false })}
	</td>
);
const Body = () => {
	const dispatch = useAppDispatch();
	const { factors, documentation, handlers } = useAppSelector(getHomologaciones);
	const { subject, data } = documentation.Area;
	const factores = subject.factors;
	const { zoneInformation } = handlers;
	const { findLocation } = handlers.Area;
	const { Zone } = factors;
	const options = zoneInformation.map((item: any) => ({
		label: item.name,
		value: item.id,
	}));

	return (
		<>
			{data.map((item: any, index: number) => {
				const { zone, extras } = item.address;
				const factor2 = factores[0].type.includes("useZoneResults")
					? extras.factor2
					: Zone.data[index].value;
				return (
					<tr key={`Body items for zone extra information ${index}`}>
						<td>C{item.id}</td>
						<td>
							<CustomSelect
								label="Municipio"
								size="xs"
								block
								placement="auto"
								data={options}
								value={zone.id}
								onSelect={(value: string, any) => {
									dispatch(
										setAreaAddress({
											index,
											key: "zone",
											value: findLocation(value, zoneInformation),
										}),
									);
								}}
							/>
						</td>
						<NumberComponent
							value={zone[factores[0].type]}
							isPercentage={factores[0].type.includes("percentage")}
						/>
						<NumberComponent
							value={extras.factor1}
							isPercentage={factores[0].type.includes("percentage")}
						/>
						<NumberComponent
							value={factor2}
							isPercentage={factores[0].type.includes("percentage")}
						/>
						<NumberComponent
							value={extras.factor2}
							isPercentage={factores[1].type.includes("percentage")}
						/>
						<NumberComponent value={Zone.results[index].factor1} />
					</tr>
				);
			})}
		</>
	);
};
export const Zone = Component;
