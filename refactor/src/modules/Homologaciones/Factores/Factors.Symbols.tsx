/** @format */

import { useAppDispatch, useAppSelector } from "../../../hooks/Redux";
import {
	LocationZoneActionsProps,
	LocationZoneColumnsProps,
	LocationZoneProps,
} from "./Factores.types";
import { Button } from "../../../components/Button/Button";
import {
	addRowLocZone,
	getHomologaciones,
	rmRowLocZone,
	updateLocZoneSubject,
	updateSymbolsData,
} from "../../../Slices/Justipreciacion/homologaciones.slice";
import { Input } from "../../../components/Input/Input";
import { asFancyNumber } from "../../../utils/utils.number";
import { Table } from "../../../components/Table/Table";
import { Title } from "./Factores.Common";
import { Pill } from "../../../components/Pill/Pill";
import { searchByType } from "../../../utils/utils.search";

const Actions = (props: LocationZoneActionsProps) => {
	const dispatch = useAppDispatch();
	const { tag, length, colSpan } = props;
	const key = props.name;
	return (
		<tr>
			<th colSpan={colSpan}>
				<div className="d-flex flex-row justify-content-between">
					<Button
						text={`Agregar Fila a ${tag}`}
						type={"success"}
						outline
						onClick={() => dispatch(addRowLocZone({ key }))}
					/>
					{length > 1 && (
						<Button
							text={`Remover Ultima Fila de ${tag}`}
							type={"link"}
							className="text-danger ms-auto"
							onClick={() => dispatch(rmRowLocZone({ key }))}
						/>
					)}
				</div>
			</th>
		</tr>
	);
};
const ColumnsHeader = (props: LocationZoneColumnsProps) => (
	<>
		{props.columns.map((column: string, index: number) => (
			<th key={`header for table component ${props.name} ${index} ${column}`}>{column}</th>
		))}
	</>
);
const ColumnsBody = (props: {
	index: number;
	columns: string[];
	item: any;
	name: string;
	options: Array<any>;
}) => {
	const { columns, item, index, name, options } = props;
	const dispatch = useAppDispatch();
	return (
		<>
			{columns.map((column: string, indx: number) => (
				<td key={`columns for body component ${indx} ${name}`}>
					<Input.Select
						name={name}
						label={name}
						current={item[column]}
						options={options}
						onChange={(event) =>
							dispatch(
								updateSymbolsData({
									index,
									key: name,
									column,
									value: searchByType(options, event.currentTarget.value),
								}),
							)
						}
					/>
				</td>
			))}
		</>
	);
};
const Body = (props: LocationZoneColumnsProps) => {
	const dispatch = useAppDispatch();
	const { columns } = props;
	const { factors, handlers } = useAppSelector(getHomologaciones);
	const { subject } = factors[props.name];
	const { options } = handlers[props.name];
	return subject.map((item: any, index: number) => (
		<tr key={`body for table component ${props.name} ${index}`}>
			<td>
				<Input.Fancy
					index={index}
					name={props.name}
					label={props.name}
					value={item.percentage}
					classNameDecorator="text-center bg-light"
					onChange={(event) =>
						dispatch(
							updateLocZoneSubject({
								index,
								key: props.name,
								name: "percentage",
								value: event.currentTarget.valueAsNumber,
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
					<input
						id={`observations component ${index}`}
						type="text"
						className="form-control form-control-sm"
						value={item.observations}
						onChange={(event) =>
							dispatch(
								updateLocZoneSubject({
									index,
									key: props.name,
									name: "observations",
									value: event.currentTarget.value,
								}),
							)
						}
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
const Footer = (props: { name: string; results: Array<any> }) => (
	<tr>
		<td colSpan={2} />
		{props.results.map((item: any, index: number) => (
			<td key={`footer for table component ${props.name} ${index}`}>
				{asFancyNumber(item.value)}
			</td>
		))}
	</tr>
);
const LocationZone = (props: LocationZoneProps) => {
	const { tag } = props;
	const dispatch = useAppDispatch();
	const { factors, handlers } = useAppSelector(getHomologaciones);
	const factor = factors[props.name];
	const { options } = handlers[props.name];

	const { subject, name, data } = factor;
	const columns: Array<string> = Object.keys(subject[0]).filter((key: string) =>
		key.includes("C"),
	);
	const colSpan = columns.length + 2;

	const percentage = subject.reduce(
		(previous: number, current: any) => previous + Number(current.percentage),
		0,
	);
	const Header = () => (
		<>
			<Title name={name} colSpan={columns.length + 2} />
			<Actions name={props.name} tag={name} colSpan={colSpan} length={subject.length} />
			<tr>
				<th>
					<div className="d-flex flex-row justify-content-between">
						PORCENTAJE
						<Pill
							className={
								percentage === 100
									? "bg-success"
									: percentage > 100
									? "bg-danger"
									: "bg-warning bg-gradient bg-opacity-75 text-dark"
							}
							text={asFancyNumber(percentage, { isPercentage: true })}
						/>
					</div>
				</th>
				<th className="bg-warning bg-opacity-75 text-white">{name.toUpperCase()}</th>
				<ColumnsHeader name={props.name} columns={columns} />
			</tr>
		</>
	);
	return (
		<Table.Component
			name={name}
			customHeader={<Header />}
			customBody={<Body name={props.name} columns={columns} />}
			hasFooter
			customFooter={<Footer name={props.name} results={data} />}
		/>
	);
};
const Extra = () => {
	const { documentation, factors } = useAppSelector(getHomologaciones);
	const { data } = documentation.Area;
	const { results } = factors.Zone;
	const headers = Object.keys(results[0])
		.filter((name: string) => name.includes("factor"))
		.slice(1);
	return (
		<Table.Component
			name="Zone extra info"
			customHeader={
				<tr>
					<th colSpan={2}>Factor resultante con dos indicadores (F.Zona)</th>
				</tr>
			}
			customBody={
				<>
					{data.map((item: any, index: number) => (
						<tr key={`row at zone extra information ${index}`}>
							<td>C{item.id}</td>
							{headers.map((key: string, id: number) => (
								<td key={`column generator ${index} ${id}`}>
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
export const Symbols = (props: LocationZoneProps) => (
	<div className=" d-flex flex-row justify-content-between flex-fill my-1 mx-1">
		<LocationZone name={props.name} />
		{props.name.includes("Zone") && (
			<div className="ms-3 my-auto">
				<Extra />
			</div>
		)}
	</div>
);

export const ZoneExtra = () => {
	const dispatch = useAppDispatch();
};
