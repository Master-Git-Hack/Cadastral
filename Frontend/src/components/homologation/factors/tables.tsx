/** @format */
import { useAppSelector, useAppDispatch } from "../../../hooks/store";
import {
	getState,
	addRowLocationZone,
	updateFactorStateAge,
	removeRowLocationZone,
	updateFactorStateCommon,
	updateFactorStateLocationZone,
} from "../../../features/homologation/slice";
import { searchByType, toFancyNumber } from "../../../utils/utils";
import { Selector } from "../../inputs/selector";
import { Header, Table, Body, Footer } from "../../table/Table";
import { FancyInput } from "../../inputs/fancyInput";
import { Fragment } from "react";
const Title = (props: { title: string; colSpan?: number }) => (
	<tr>
		<th colSpan={props.colSpan ? props.colSpan : 6}>FACTOR POR {props.title.toUpperCase()}</th>
	</tr>
);
const handleChange = (
	key: string,
	object: string,
	item: string,
	value: any,
	dispatch: Function,
	action: Function,
	isSubject: boolean = false,
	index: number = 0,
) => {
	const payload = {
		key,
		object,
		item,
		value,
	};
	dispatch(
		action(
			isSubject
				? payload
				: {
						...payload,
						index,
				  },
		),
	);
};
export const AgeTable = () => {
	const dispatch = useAppDispatch();
	const { Age } = useAppSelector(getState).factors;
	const { data, subject, name } = Age;
	const { type } = useAppSelector(getState).record.homologacion;

	return !type.includes("TERRENO") ? (
		<Table>
			<Header>
				<Title title={name} />
			</Header>
			<Body>
				<tr>
					<td>#</td>
					<td colSpan={4}>{name.toUpperCase()}</td>
					<td colSpan={1} rowSpan={1}>
						Factores
					</td>
				</tr>
				{data.map((item: any, index: number) => (
					<tr key={`table for ages, values section ${index}`}>
						<td>C{item.id}</td>
						<td colSpan={4}>
							<FancyInput
								index={index}
								name="Ages"
								value={item.value}
								onChange={(event) =>
									handleChange(
										"Age",
										"data",
										"value",
										Number(event.target.value),
										dispatch,
										updateFactorStateAge,
										false,
										index,
									)
								}
								style={`text-center`}
							/>
						</td>
						<td>{toFancyNumber(item.result)}</td>
					</tr>
				))}
			</Body>
			<Footer>
				<tr>
					<td>SUJETO</td>
					<td colSpan={5}>
						<FancyInput
							index={0}
							name="Ages"
							value={subject.value}
							onChange={(event) =>
								handleChange(
									"Age",
									"subject",
									"value",
									Number(event.target.value),
									dispatch,
									updateFactorStateAge,
									true,
								)
							}
							style={`text-center bg-warning`}
						/>
					</td>
				</tr>
			</Footer>
		</Table>
	) : null;
};
export const CommonTable = (props: { id: number; name: string }) => {
	const dispatch = useAppDispatch();
	const factor = useAppSelector(getState).factors[props.name];
	const { subject, data, name } = factor;
	return (
		<Table>
			<Header>
				<Title title={name} />
			</Header>
			<Body>
				<tr>
					<td colSpan={1} rowSpan={1}>
						#
					</td>
					<td colSpan={1} rowSpan={1}>
						{name.toUpperCase()}
					</td>
					<td colSpan={1} rowSpan={1}>
						Calificación
					</td>
					<td colSpan={1} rowSpan={2}>
						Factores
					</td>
				</tr>
				<tr>
					<td colSpan={1} rowSpan={1}>
						SUJETO
					</td>
					<td colSpan={1} rowSpan={1}>
						<Selector
							id={props.id}
							name="subject"
							subject={subject}
							selector={factor.options}
							onChange={(event) => {
								const value = searchByType(factor.options, event.target.value);
								handleChange(
									props.name,
									"subject",
									"value",
									value,
									dispatch,
									updateFactorStateCommon,
									true,
								);
							}}
							style={`bg-warning`}
						/>
					</td>
					<td
						id={`${props.name}-${props.id}-bodyElementsToUse-subjectValue`}
						colSpan={1}
						rowSpan={1}
					>
						{toFancyNumber(subject.value)}
					</td>
				</tr>
				{data.map((item: any, index: number) => (
					<tr
						id={`table-${name}-${props.name}-${props.id}-body-row-${index}`}
						key={`table-${name}-${props.name}-${props.id}-bodyElementsToRender-${index}`}
					>
						<td colSpan={1} rowSpan={1}>
							C{item.id}
						</td>
						<td colSpan={1} rowSpan={1}>
							<Selector
								id={props.id + index}
								name={props.name}
								subject={item}
								selector={factor.options}
								onChange={(event) => {
									const value = searchByType(factor.options, event.target.value);
									console.log(value);
									handleChange(
										props.name,
										"data",
										"value",
										value,
										dispatch,
										updateFactorStateCommon,
										false,
										index,
									);
								}}
								style={`bg-light`}
							/>
						</td>
						<td
							id={`${props.name}-${props.id}-body-row-${index}-value`}
							colSpan={1}
							rowSpan={1}
						>
							{toFancyNumber(item.value ? item.value : 0, false, false, 2)}
						</td>
						<td
							id={`${props.name}-${props.id}-body-row-${index}-divisor`}
							colSpan={1}
							rowSpan={1}
						>
							{toFancyNumber(Number(item.result.toFixed(2)), false, false, 2)}
						</td>
					</tr>
				))}
			</Body>
		</Table>
	);
};
const SymbolsActions = (props: { dispatch: Function; colSpan: number; name: string }) => (
	<tr>
		<th colSpan={props.colSpan / 2} className="text-start">
			<button
				className="btn btn-sm btn-primary"
				onClick={() => props.dispatch(addRowLocationZone({ key: props.name }))}
			>
				Agregar fila
			</button>
		</th>
		<th colSpan={props.colSpan / 2} className="text-end">
			<button
				className="btn btn-sm btn-outline-danger"
				onClick={() => props.dispatch(removeRowLocationZone({ key: props.name }))}
			>
				Remover fila
			</button>
		</th>
	</tr>
);
const SymbolsComponent = (props: { id: number; name: string }) => {
	const dispatch = useAppDispatch();
	const factor = useAppSelector(getState).factors[props.name];
	const { subject, data, name, options } = factor;

	const columns: Array<string> = Object.keys(subject[0]).filter((key: string) =>
		key.includes("C"),
	);
	const colSpan = (columns.length + 1) % 2 === 0 ? columns.length + 3 : columns.length + 2;

	const percentage = subject.reduce(
		(previous: number, current: any) => previous + Number(current.percentage),
		0,
	);

	return (
		<Table>
			<Header>
				<Title title={name} colSpan={colSpan} />
				<SymbolsActions dispatch={dispatch} colSpan={colSpan} name={props.name} />
				<tr>
					<th>
						PORCENTAJE
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
							{toFancyNumber(percentage, false, true)}
						</small>
					</th>
					<th className="bg-warning">{name.toUpperCase()}</th>
					<SymbolsHeader name={props.name} columns={columns} />
				</tr>
			</Header>

			<Body>
				<SymbolsBody
					data={subject}
					name={props.name}
					columns={columns}
					dispatch={dispatch}
					options={options}
				/>
			</Body>
			<Footer>
				<SymbolsFooter results={data} name={props.name} />
			</Footer>
		</Table>
	);
};
const SymbolsHeader = (props: { name: string; columns: any }) =>
	props.columns.map((column: string, index: number) => (
		<th key={`header for table ${props.name} in ${column} - ${index}`}>{column}</th>
	));

const SymbolsBody = (props: {
	data: any;
	name: string;
	columns: any;
	dispatch: Function;
	options: any;
}) =>
	props.data.map((item: any, index: number) => (
		<tr key={index}>
			<td>
				<FancyInput
					index={index}
					name="percentage"
					value={item.percentage}
					onChange={(event) =>
						handleChange(
							props.name,
							"subject",
							"percentage",
							Number(event.target.value),
							props.dispatch,
							updateFactorStateLocationZone,
							false,
							index,
						)
					}
					isCurrency={false}
					isPercentage={true}
				/>
			</td>
			<td>
				<input
					type="text"
					name="observations"
					className="form-control form-control-sm"
					value={item.observations}
					onChange={(event) =>
						handleChange(
							props.name,
							"subject",
							"observations",
							event.target.value,
							props.dispatch,
							updateFactorStateLocationZone,
							false,
							index,
						)
					}
				/>
			</td>
			{props.columns.map((column: string) => (
				<td key={`Body-${props.name}-${index}-${column}`} style={{ minWidth: 75 }}>
					<Selector
						id={index}
						name={column}
						subject={item[column]}
						selector={props.options}
						onChange={(event) => {
							const value = searchByType(props.options, event.target.value);

							handleChange(
								props.name,
								"subject",
								column,
								value,
								props.dispatch,
								updateFactorStateLocationZone,
								false,
								index,
							);
						}}
					/>
				</td>
			))}
		</tr>
	));
const SymbolsFooter = (props: { results: any; name: string }) => (
	<tr>
		<td colSpan={2} />
		{props.results.map((item: any, index: number) => (
			<td key={`footer-${props.name}-${item.id}-${index}`}>{toFancyNumber(item.value)}</td>
		))}
	</tr>
);
const ZoneExtra = () => {
	const { data } = useAppSelector(getState).documentation.Area;
	const { results } = useAppSelector(getState).factors.Zone;
	const headers = Object.keys(results[0])
		.filter((name: string) => name.includes("factor"))
		.slice(1);

	return (
		<Table>
			<Header>
				<tr>
					<th colSpan={2}>Factor resultante con dos indicadores (F.Zona)</th>
				</tr>
			</Header>
			<Body>
				{data.map((item: any, index: number) => (
					<tr key={`row at zone extra information ${index}`}>
						<td>C{item.id}</td>
						{headers.map((key: string, id: number) => (
							<td key={`column generator ${index} ${id}`}>
								{toFancyNumber(Number(results[index][key].toFixed(2)))}
							</td>
						))}
					</tr>
				))}
			</Body>
		</Table>
	);
};
export const SymbolsTable = (props: { id: number; name: string }) =>
	props.name === "Zone" ? (
		<div className="d-flex">
			<div className="col-11 col-sm-11 ">
				<SymbolsComponent {...props} />
			</div>

			<div className="col-1 col-sm-1">
				<ZoneExtra />
			</div>
		</div>
	) : (
		<SymbolsComponent {...props} />
	);
