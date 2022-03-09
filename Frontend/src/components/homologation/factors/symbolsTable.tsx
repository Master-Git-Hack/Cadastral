/** @format */

import { symbolsOptions } from "../../../types/homologation/factors/symbols";
import { toFancyNumber, searchByType } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";
import { Selector } from "../../inputs/selector";
import { useAppSelector, useAppDispatch } from "../../../hooks/store";
import { selector, setLocationZone } from "../../../features/homologation/slice";

import { FC, useState } from "react";

export const SymbolsTable: FC<{ name: string }> = (props) => {
	const dispatch = useAppDispatch();
	const { factors } = useAppSelector(selector);
	const items = factors[props.name];
	const { data, isUsed, name } = items;
	const title = name.toUpperCase();
	const columns = Object.keys(data[0]).filter((key: string) => key.includes("C"));
	const colSpan = (columns.length + 1) % 2 === 0 ? columns.length + 2 : columns.length + 3;
	const percentage = data
		.map((item: any) => item.percentage)
		.reduce((previous: number, current: any) => previous + Number(current), 0);
	return isUsed ? (
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
					<Headers columns={columns} />
				</tr>
				<Body data={data} name={name} columns={columns} dispatch={dispatch} />
			</tbody>
		</table>
	) : null;
};
const Actions: FC<{ colSpan: number; name: string; dispatch: Function }> = (props) => (
	<tr>
		<td colSpan={props.colSpan / 2}>
			<button className="btn btn-sm btn-outline-primary" onClick={() => props.dispatch()}>
				Agregar fila
			</button>
		</td>
		<td colSpan={props.colSpan / 2}>
			<button className="btn btn-sm btn-outline-danger" onClick={() => props.dispatch()}>
				Remover fila
			</button>
		</td>
	</tr>
);
const Headers: FC<{ columns: any }> = (props) =>
	props.columns.map((column: string) => <td key={column}>{column}</td>);

const Body: FC<{ data: any; name: string; columns: any; dispatch: Function }> = (props) => {
	const [percentage, setPercentage] = useState(props.data.map((item: any) => item.percentage));
	const [observations, setObservations] = useState(
		props.data.map((item: any) => item.observations),
	);
	return props.data.map((item: any, index: number) => (
		<tr key={index}>
			<td>
				<FancyInput
					index={index}
					name="percentage"
					value={percentage[index]}
					onChange={(event) =>
						setPercentage(() => {
							props.dispatch(
								setLocationZone({
									itemName: props.name,
									itemID: index,
									value: Number(event.target.value),
									subItemName: "percentage",
								}),
							);
							return percentage.map((item: any, i: number) =>
								i === index ? Number(event.target.value) : item,
							);
						})
					}
					isCurrency={false}
					isPercentage={true}
				/>
			</td>
			<td>
				<input
					type="text"
					name="observations"
					className="form-control"
					value={observations[index]}
					onChange={(event) =>
						setObservations(() => {
							props.dispatch(
								setLocationZone({
									itemName: props.name,
									itemID: index,
									value: event.target.value,
									subItemName: "observations",
								}),
							);
							return observations.map((item: any, i: number) =>
								i === index ? event.target.value : item,
							);
						})
					}
				/>
			</td>
			{props.columns.map((column: string) => (
				<td key={column}>
					<FancyInput
						index={index}
						name={column}
						value={item[column]}
						onChange={(event) => {
							const value = searchByType(symbolsOptions, event.target.value);
							props.dispatch(
								setLocationZone({
									itemName: props.name,
									itemID: index,
									value,
									subItemName: column,
								}),
							);
						}}
						isCurrency={column.includes("C")}
						isPercentage={column.includes("P")}
					/>
				</td>
			))}
		</tr>
	));
};
