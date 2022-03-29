/** @format */
import { useAppSelector, useAppDispatch } from "../../../hooks/store";
import {
	getState,
	updateFactorStateAge,
	updateFactorStateCommon,
} from "../../../features/homologation/slice";
import { searchByType, toFancyNumber } from "../../../utils/utils";
import { Selector } from "../../inputs/selector";
import { Header, Table, Body, Footer } from "../../table/Table";
const Title = (props: { title: string }) => (
	<tr>
		<th colSpan={6}>FACTOR POR {props.title.toUpperCase()}</th>
	</tr>
);
const handleChange = (
	key: string,
	object: string,
	value: any,
	dispatch: Function,
	action: Function,
	isSubject: boolean = false,
	index: number = 0,
) => {
	const payload = {
		key,
		object,
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
	const { data, subject, isUsed, name } = Age;

	return isUsed ? (
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
							<input
								type="number"
								className="form-control form-control-sm text-center"
								name="value"
								value={Number(item.value)}
								onChange={(event) =>
									handleChange(
										"Age",
										"data",
										Number(event.target.value),
										dispatch,
										updateFactorStateAge,
										false,
										index,
									)
								}
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
						<input
							type="number"
							className="form-control form-control-sm bg-warning text-center"
							name="subject"
							value={Number(subject.value)}
							onChange={(event) =>
								handleChange(
									"Age",
									"subject",
									Number(event.target.value),
									dispatch,
									updateFactorStateAge,
									true,
								)
							}
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
							{toFancyNumber(
								subject.value / item.value ? subject.value / item.value : 0,
								false,
								false,
								2,
							)}
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
				onClick={() => props.dispatch({ itemName: props.name, value: null })}
			>
				Agregar fila
			</button>
		</th>
		<th colSpan={props.colSpan / 2} className="text-end">
			<button
				className="btn btn-sm btn-outline-danger"
				onClick={() => props.dispatch({ itemName: props.name, value: null })}
			>
				Remover fila
			</button>
		</th>
	</tr>
);
const SymbolsComponent = (props: { id: number; name: string }) => {
	const dispatch = useAppDispatch();
	const factor = useAppSelector(getState).factors[props.name];
	const { subject, data, name } = factor;
	const percentage = subject
		.map((item: any) => item.percentage)
		.reduce((previous: number, current: any) => previous + Number(current), 0);
	return (
		<Table>
			<Header>
				<Title title={name} />
				<SymbolsActions
					dispatch={dispatch}
					colSpan={factor.options.length + 2}
					name={props.name}
				/>
			</Header>
			<Body>
				<tr>
					<td>
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
					</td>
					<td className="bg-warning">{title}</td>
					<Headers columns={columns} />
				</tr>
			</Body>
		</Table>
	);
};
export const SymbolsTable = (props: { id: number; name: string }) => (
	<SymbolsComponent {...props} />
);
