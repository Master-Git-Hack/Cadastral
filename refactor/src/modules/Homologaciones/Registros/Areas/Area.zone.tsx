/** @format */

import { Fragment } from "react";
import { Dropdown } from "../../../../components/Dropdown/Dropdown";
import { Input } from "../../../../components/Input/Input";
import { Table } from "../../../../components/Table/Table";
import { useAppDispatch, useAppSelector } from "../../../../hooks/Redux";
import {
	getHomologaciones,
	updateCommonSubject,
} from "../../../../Slices/Justipreciacion/homologaciones.slice";
import { asFancyNumber } from "../../../../utils/utils.number";

const Component = () => {
	const dispatch = useAppDispatch();
	const { factors, documentation, handlers } = useAppSelector(getHomologaciones);
	const { subject, data } = documentation.Area;
	const { options, findLocation } = handlers.Area;
	const { Zone } = factors;
	return (
		<Table.Component
			name="Complement of Zone by Areas"
			customHeader={<Header />}
			customBody={<Body />}
			hasFooter
			customFooter={<Footer />}
		/>
	);
};
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
	{ value: 0, type: "Densidad de Población" },
	{ value: 1, type: "Población Económicamente Activa" },
	{ value: 2, type: "Población Total" },
	{ value: 3, type: "Porcentaje de Población Activa" },
	{ value: 4, type: "Total de Viviendas Habitadas" },
	{ value: 5, type: "Factor de Zona Calculado" },
];
const Header = () => {
	const dispatch = useAppDispatch();
	const { documentation, handlers } = useAppSelector(getHomologaciones);
	const { factors, zone } = documentation.Area.subject;
	const { findLocation } = handlers.Area;
	const { zoneInformation } = handlers;
	const options = zoneInformation.map((item: any) => ({
		type: item.name,
		value: item.id,
	}));
	const current = { type: zone.name, value: zone.id };
	const factores = factors.map((factor: any) => ({
		...factor,
		name: invertedObjectOptions[factor.type],
	}));
	return (
		<>
			<tr>
				<th colSpan={3}>
					<Input.Select
						name=""
						label=""
						current={factores[0]}
						options={factorsOptions.slice(0, 5)}
						onChange={(event) => {
							const selection = event.currentTarget.value;

							console.log(objectOptions[selection]);
						}}
					/>
				</th>
				<th>Factor 1</th>
				<th>
					<Input.Select
						name=""
						label=""
						current={factores[1]}
						options={factorsOptions}
						onChange={(event) => {
							const selection = event.currentTarget.value;

							console.log(objectOptions[selection]);
						}}
					/>
				</th>
				<th>Factor 2</th>
				<th>Factor resultante 1 indicador (F. Zona)</th>
			</tr>
			<tr>
				<th>SUJETO</th>
				<th colSpan={2}>
					<Input.Select
						name=""
						label=""
						current={current}
						options={options}
						onChange={(event) => {
							const selection = event.currentTarget.value;

							console.log(findLocation(selection, zoneInformation));
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
			{factors.map((factor: any, index: number) => (
				<Fragment
					key={`columns for header component at intermunicipio evaluation ${index}`}
				>
					<td colSpan={colSpan / 2}>
						<Dropdown
							name={`Raíz ${factor.id}: ${factor.root}`}
							btnText={`Valor actual de la raíz ${factor.id}: Raíz(${factor.root})`}
							options={options}
							currentItem={factor.root - 2}
							onClick={(option: string, index: number) => {
								console.log(option);
							}}
						/>
					</td>
				</Fragment>
			))}
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
		type: item.name,
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
							<Input.Select
								name=""
								label=""
								current={{ type: zone.name, value: zone.id }}
								options={options}
								onChange={(event) => {
									const selection = event.currentTarget.value;

									console.log(findLocation(selection, zoneInformation));
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
