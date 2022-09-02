/** @format */

import { Grid, Row, Col } from "rsuite";
import { Badge } from "../../../../../components/Badge";
import { Success, Danger } from "../../../../../components/Button";
import { Input } from "../../../../../components/Input/";
import { Component } from "../../../../../components/Table";
import { useAppDispatch, useAppSelector } from "../../../../../redux";
import {
	addRowLocZone,
	rmRowLocZone,
	updateSymbolsData,
	getHomologaciones,
	updateLocZoneSubject,
} from "../../../../../redux/justipreciacion/homologacion";

import { asFancyNumber } from "../../../../../utils/number";
import { searchByValue } from "../../../../../utils/search";
import { Title } from "../factores.interface";
import {
	ColumnsBodyProps,
	FooterProps,
	LocationZoneActionsProps,
	LocationZoneColumnsProps,
	LocationZoneProps,
} from "./symbols.types";
const { Fancy, Text } = Input;
const Select = Input.Select.Normal;
const Actions = ({ tag, length, colSpan, ...props }: LocationZoneActionsProps) => {
	const dispatch = useAppDispatch();

	const key = props.name;
	return (
		<tr>
			<th colSpan={colSpan}>
				<div className="d-flex flex-row justify-content-between">
					<Success
						appearance="outline"
						size="xs"
						onClick={() => dispatch(addRowLocZone({ key }))}
					>
						Agregar Fila a {tag}
					</Success>
					{length > 1 && (
						<Danger size="xs" onClick={() => dispatch(rmRowLocZone({ key }))}>
							Remover Ultima Fila de {tag}
						</Danger>
					)}
				</div>
			</th>
		</tr>
	);
};
const ColumnsHeader = ({ columns, name }: LocationZoneColumnsProps) => (
	<>
		{columns.map((column: string, index: number) => (
			<th key={`header for table component ${name} ${index} ${column}`}>{column}</th>
		))}
	</>
);
const ColumnsBody = ({ columns, item, index, name, options }: ColumnsBodyProps) => {
	const dispatch = useAppDispatch();
	return (
		<>
			{columns.map((column: string, indx: number) => (
				<td key={`columns for body component ${indx} ${name}`}>
					<Select
						data={options}
						label={name}
						defaultValue={item[column]}
						value={item[column].value}
						onChange={({ currentTarget: { value } }) => {
							dispatch(
								updateSymbolsData({
									index,
									key: name,
									column,
									value: searchByValue(options, Number(value)),
								}),
							);
						}}
					/>
				</td>
			))}
		</>
	);
};
const Body = ({ tag, columns, ...props }: LocationZoneColumnsProps) => {
	const dispatch = useAppDispatch();
	const { factors, handlers } = useAppSelector(getHomologaciones);
	const { subject } = factors[props.name];
	const { options } = handlers[props.name];

	return subject.map(({ percentage, observations, ...item }: any, index: number) => (
		<tr key={`body for table component ${props.name} ${index}`}>
			<td>
				<Fancy
					index={index}
					name={props.name}
					label={props.name}
					value={percentage}
					classNameDecorator="text-center bg-light"
					onChange={({ currentTarget: { valueAsNumber } }) =>
						dispatch(
							updateLocZoneSubject({
								index,
								key: props.name,
								name: "percentage",
								value: valueAsNumber,
							}),
						)
					}
					isPercentage
				/>
			</td>
			<td>
				<div className="d-flex d-flex-row">
					<label
						className="invisible disabled"
						htmlFor={`observations component ${index}`}
					/>
					<Text
						onChange={(value) =>
							dispatch(
								updateLocZoneSubject({
									index,
									key: props.name,
									name: "observations",
									value,
								}),
							)
						}
						value={observations}
					/>
				</div>
			</td>
			<ColumnsBody
				index={index}
				item={item}
				name={props.name}
				columns={columns}
				options={options}
			/>
		</tr>
	));
};
const Footer = ({ name, results }: FooterProps) => (
	<tr>
		<td colSpan={2} />
		{results.map((item: any, index: number) => (
			<td key={`footer for table component ${name} ${index}`}>{asFancyNumber(item.value)}</td>
		))}
	</tr>
);
const LocationZone = ({ tag, ...props }: LocationZoneProps) => {
	const { factors } = useAppSelector(getHomologaciones);
	const { subject, name, data } = factors[props.name];
	const columns: Array<string> = Object.keys(subject[0]).filter((key: string) =>
		key.includes("C"),
	);
	const colSpan = columns.length + 2;

	const percentage = subject.reduce(
		(previous: number, { percentage }: any) => previous + Number(percentage),
		0,
	);
	const Header = () => (
		<>
			<Title name={name} colSpan={columns.length + 2} />
			<Actions name={props.name} tag={name} colSpan={colSpan} length={subject.length} />
			<tr>
				<th>
					<div className="d-flex justify-content-between my-auto py-auto">
						<span>PORCENTAJE</span>
						<div>
							<Badge
								type={
									percentage === 100
										? "success"
										: percentage > 100
										? "danger"
										: "warning"
								}
								text={asFancyNumber(percentage, { isPercentage: true })}
							/>
						</div>
					</div>
				</th>
				<th className="bg-warning bg-opacity-75 text-white">{name.toUpperCase()}</th>
				<ColumnsHeader name={props.name} columns={columns} />
			</tr>
		</>
	);
	return (
		<Component
			name={name}
			customHeader={<Header />}
			customBody={<Body name={props.name} columns={columns} />}
			hasFooter
			customFooter={<Footer name={props.name} results={data} />}
		/>
	);
};
const Extra = () => {
	const {
		documentation: {
			Area: { data },
		},
		factors: {
			Zone: { results },
		},
	} = useAppSelector(getHomologaciones);

	const headers = Object.keys(results[0])
		.filter((key: string) => key.includes("factor"))
		.slice(1);
	return (
		<Component
			name="Zone extra info"
			customHeader={
				<tr>
					<th colSpan={2}>Factor resultante con dos indicadores (F.Zona)</th>
				</tr>
			}
			customBody={
				<>
					{data.map(({ id }: any, index: number) => (
						<tr key={`row at zone extra information ${index}`}>
							<td>C{id}</td>
							{headers.map((key: string, identifier: number) => (
								<td key={`column generator ${index} ${identifier}`}>
									{asFancyNumber(results[index][key])}
								</td>
							))}
						</tr>
					))}
				</>
			}
		/>
	);
};
export const Symbols = ({ name, tag }: LocationZoneProps) => {
	const colSpan = name.includes("Zone") ? 20 : 24;
	const minColSpan = name.includes("Zone") ? colSpan + 4 : colSpan;
	return (
		<Grid fluid>
			<Row>
				<Col
					xs={minColSpan}
					sm={minColSpan}
					md={minColSpan}
					lg={colSpan}
					xl={colSpan}
					xxl={colSpan}
				>
					<LocationZone name={name} />
				</Col>
				{name.includes("Zone") && (
					<Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
						<Extra />
					</Col>
				)}
			</Row>
		</Grid>
	);
};

export const ZoneExtra = () => {
	const dispatch = useAppDispatch();
	return <></>;
};
