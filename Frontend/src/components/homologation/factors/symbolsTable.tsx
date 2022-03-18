/** @format */

import { symbolsOptions } from "../../../types/homologation/factors/symbols";
import { toFancyNumber, searchByType } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";
import { Selector } from "../../inputs/selector";
import { useAppSelector, useAppDispatch } from "../../../hooks/store";
import {
	selector,
	setLocationZone,
	addDataRowLocationZone,
	removeDataRowLocationZone,
} from "../../../features/homologation/slice";

import { FC } from "react";

export const SymbolsTable: FC<{ name: string; component?: any }> = (props) => {
	const dispatch = useAppDispatch();
	const { factors } = useAppSelector(selector);
	const items = factors[props.name];
	const { data, isUsed, name, results } = items;
	const title = name.toUpperCase();
	const columns = Object.keys(data[0]).filter((key: string) => key.includes("C"));
	const colSpan = (columns.length + 1) % 2 === 0 ? columns.length + 3 : columns.length + 2;
	const percentage = data
		.map((item: any) => item.percentage)
		.reduce((previous: number, current: any) => previous + Number(current), 0);
	return isUsed ? (
		<div className="row">
			<div
				className={`col-${props.name !== "zone" ? 12 : 10} col-sm-${
					props.name !== "zone" ? 12 : 10
				}`}
			>
				<table className="table table-sm table-responsive table-responsive-sm table-bordered table-striped table-hover">
					<tbody className="align-self-middle align-middle text-center">
						<tr>
							<td className="align-middle" colSpan={colSpan}>
								FACTOR POR {title}
							</td>
						</tr>
						<Actions dispatch={dispatch} colSpan={colSpan} name={props.name} />
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
						<Body
							data={data}
							name={props.name}
							columns={columns}
							dispatch={dispatch}
							factors={factors}
						/>
						<Footer results={results} name={props.name} />
					</tbody>
				</table>
			</div>
			{props.name === "zone" ? (
				<div className="col-2 col-sm-2">
					<table className="table table-sm table-responsive table-responsive-sm table-bordered table-striped table-hover">
						<tbody className="align-self-middle align-middle text-center">
							<tr>
								<td colSpan={2}>Factor resultante con dos indicadores (F.Zona)</td>
							</tr>
							{items.analytics.map((item: any, index: number) => (
								<tr key={`Factor resultante con dos indicadores (F.Zona) ${index}`}>
									<td>C{index + 1}</td>
									<td>{toFancyNumber(Number(item.factor2.result.toFixed(2)))}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : null}
		</div>
	) : null;
};

const Actions: FC<{ colSpan: number; name: string; dispatch: Function }> = (props) => (
	<tr>
		<td colSpan={props.colSpan / 2} className="text-start">
			<button
				className="btn btn-sm btn-primary"
				onClick={() =>
					props.dispatch(addDataRowLocationZone({ itemName: props.name, value: null }))
				}
			>
				Agregar fila
			</button>
		</td>
		<td colSpan={props.colSpan / 2} className="text-end">
			<button
				className="btn btn-sm btn-outline-danger"
				onClick={() =>
					props.dispatch(removeDataRowLocationZone({ itemName: props.name, value: null }))
				}
			>
				Remover fila
			</button>
		</td>
	</tr>
);

const Headers: FC<{ columns: any }> = (props) =>
	props.columns.map((column: string) => <td key={column}>{column}</td>);

const Body: FC<{ data: any; name: string; columns: any; dispatch: Function; factors: any }> = (
	props,
) =>
	props.data.map((item: any, index: number) => (
		<tr key={index}>
			<td>
				<FancyInput
					index={index}
					name="percentage"
					value={item.percentage}
					onChange={(event) =>
						props.dispatch(
							setLocationZone({
								itemName: props.name,
								itemID: index,
								value: Number(event.target.value),
								subItemName: "percentage",
							}),
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
						props.dispatch(
							setLocationZone({
								itemName: props.name,
								itemID: index,
								value: event.target.value,
								subItemName: "observations",
							}),
						)
					}
				/>
			</td>
			{props.columns.map((column: string) => (
				<td key={`Body-${props.name}-${index}-${column}`}>
					<Selector
						id={index}
						name={column}
						subject={item[column]}
						selector={symbolsOptions}
						onChange={(event) =>
							props.dispatch(
								setLocationZone({
									itemName: props.name,
									itemID: index,
									value: searchByType(symbolsOptions, event.target.value),
									subItemName: column,
								}),
							)
						}
					/>
				</td>
			))}
		</tr>
	));
const Footer: FC<{ results: any; name: string }> = (props) => (
	<tr>
		<td colSpan={2} />
		{props.results.map((item: any, index: number) => (
			<td key={`footer-${props.name}-${item.id}-${index}`}>{toFancyNumber(item.value)}</td>
		))}
	</tr>
);
