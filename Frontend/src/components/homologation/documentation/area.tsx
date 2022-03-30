/** @format */
import { Fragment } from "react";
import { getState, updateDocumentationStateArea } from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toFancyNumber } from "../../../utils/utils";
import { Table, Body, Header, Footer } from "../../table/Table";

export const ZoneExtraInformationTable = () => {
	const dispatch = useAppDispatch();
	const { subject, data, options, findLocation, factorsKeys } =
		useAppSelector(getState).documentation.Area;
	const { Zone } = useAppSelector(getState).factors;
	const factorKeys = factorsKeys(subject.factors);
	return (
		<div className="col d-flex justify-content-center">
			<Table>
				<HeaderZone
					subject={subject}
					options={options}
					findLocation={findLocation}
					dispatch={dispatch}
				/>
				<BodyZone
					data={data}
					factors={subject.factors}
					factorKeys={factorKeys}
					zone={Zone}
					options={options}
					dispatch={dispatch}
					findLocation={findLocation}
				/>
			</Table>
		</div>
	);
};
const BodyZone = (props: {
	data: any;
	factors: any;
	factorKeys: Array<string>;
	zone: any;
	options: any;
	findLocation: Function;
	dispatch: Function;
}) => (
	<Body>
		{props.data.map((item: any, index: number) => (
			<tr key={`BodyItem for zone extra information ${index} `}>
				<td>C{item.id}</td>
				<td colSpan={3}>
					<SelectLocation
						index={index}
						name={item.address.zone.name}
						value={item.address.zone.name}
						onChange={(event: any) => {
							const value = props.findLocation(event.target.value, props.options);
							props.dispatch(
								updateDocumentationStateArea({
									key: "data",
									index,
									object: "address",
									item: "zone",
									value,
								}),
							);
						}}
					/>
				</td>
				{props.factors.map((factor: any, indx: number) => (
					<Fragment key={`factors inside ${index} ${indx}`}>
						<td colSpan={3}>
							{toFancyNumber(
								!factor.type.includes("useZoneResults")
									? item.address.zone[factor.type]
									: props.zone.data[index].value,
								false,
								factor.type.includes("percentage") ? true : false,
							)}
						</td>
						<td>
							{toFancyNumber(
								!factor.type.includes("useZoneResults")
									? item.address.extras[props.factorKeys[index]]
									: props.zone.data[index].value,
								false,
								factor.type.includes("percentage") ? true : false,
							)}
						</td>
					</Fragment>
				))}
				<td>{props.zone.results[index].factor1}</td>
			</tr>
		))}
	</Body>
);
const HeaderZone = (props: {
	subject: any;
	options: any;
	findLocation: Function;
	dispatch: Function;
}) => {
	const colSpan = props.subject.factors.length * 4 + 1;
	return (
		<Header>
			<tr>
				{props.subject.factors.map((factor: any, index: number) => (
					<Fragment key={`columns for header at intermunicipio evaluation ${index}`}>
						<th colSpan={2}>Raíz {factor.id}</th>
						<th colSpan={6}>
							<SelectRootValue
								name={`Raíz ${factor.id} ${index}`}
								value={factor.root}
								onChange={(event: any) =>
									props.dispatch(
										updateDocumentationStateArea({
											key: "subject",
											object: "factors",
											index,
											item: "root",
											value: Number(event.target.value),
										}),
									)
								}
							/>
						</th>
					</Fragment>
				))}
			</tr>
			<tr>
				<th colSpan={4} />
				<th colSpan={3}>
					<SelectFactorsHeader
						value={props.subject.factors[0].type}
						onChange={(event: any) =>
							props.dispatch(
								updateDocumentationStateArea({
									key: "subject",
									object: "factors",
									index: 0,
									item: "type",

									value: event.target.value,
								}),
							)
						}
						hasZoneAttribute={false}
					/>
				</th>
				<th>Factor 1</th>
				{props.subject.factors.map((factor: any, index: number) =>
					index > 0 ? (
						<Fragment key={`columns for header at intermunicipio evaluation ${index}`}>
							<th colSpan={3}>
								<SelectFactorsHeader
									value={factor.type}
									onChange={(event: any) =>
										props.dispatch(
											updateDocumentationStateArea({
												key: "subject",
												object: "factors",
												index,
												item: "type",
												value: event.target.value,
											}),
										)
									}
									hasZoneAttribute={true}
								/>
							</th>
							<th>Factor {factor.id}</th>
						</Fragment>
					) : null,
				)}
				<th>Factor resultante 1 indicador (F. Zona)</th>
			</tr>
			<tr>
				<th>SUJETO</th>
				<th colSpan={3}>
					<SelectLocation
						index={0}
						name="SUJETO"
						value={props.subject.zone.name}
						onChange={(event: any) => {
							const value = props.findLocation(event.target.value, props.options);
							props.dispatch(
								updateDocumentationStateArea({
									key: "subject",
									object: "zone",
									value,
								}),
							);
						}}
					/>
				</th>
				<th colSpan={colSpan}>
					{toFancyNumber(
						props.subject.zone[props.subject.factors[0].type],
						false,
						(props.subject.factors[0].type.includes("percentage")
							? true
							: false) as boolean,
						0,
					)}
				</th>
			</tr>
		</Header>
	);
};
export const SelectLocation = (props: {
	index: number;
	name: string;
	value: any;
	onChange: any;
}) => {
	const { options } = useAppSelector(getState).documentation.Area;
	return (
		<select
			className="form-select form-select-sm"
			value={props.value}
			onChange={props.onChange}
		>
			{options.map((item: any, index: number) => (
				<option
					key={`table for guanajuato locations ${props.name} ${item.name} ${index}`}
					value={item.name}
				>
					{item.name}
				</option>
			))}
		</select>
	);
};
const RootOptions = (props: { name: string }) => {
	const options = [];
	for (let i = 2; i <= 12; i++) options.push(i);
	return (
		<>
			{options.map((item: any) => (
				<option key={`root selection for ${props.name} ${item}`} value={item}>
					Raíz {item}
				</option>
			))}
		</>
	);
};
export const SelectRootValue = (props: { name: string; value: number; onChange: any }) => (
	<select className="form-select form-select-sm" value={props.value} onChange={props.onChange}>
		<RootOptions name={props.name} />
	</select>
);
const SelectFactorsHeader = (props: {
	value: string;
	onChange: any;
	hasZoneAttribute: boolean;
}) => (
	<select className="form-select form-select-sm" value={props.value} onChange={props.onChange}>
		<option value="economicallyActivePopulation">Poblacion Economicamente Activa</option>
		<option value="inhabitedDwellings">Total de Viviendas Habitadas</option>
		<option value="percentage">Porcentaje poblacion activa</option>
		<option value="populationDensity">Densidad de Poblacion</option>
		<option value="totalPopulation">Poblacion Total</option>
		{props.hasZoneAttribute ? (
			<option value="useZoneResults">Factor de Zona Calculado</option>
		) : null}
	</select>
);
