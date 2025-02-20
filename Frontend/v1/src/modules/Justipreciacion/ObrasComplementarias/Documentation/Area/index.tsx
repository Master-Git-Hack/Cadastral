/** @format */

import { Table } from "rsuite";
import { Button, Danger, Success } from "../../../../../components/Button";
import { SelectUnit } from "../../../../../components/Custom/SelectUnit";
import { Fancy } from "../../../../../components/Input/Fancy";
import { Text } from "../../../../../components/Input";
import { asFancyNumber } from "../../../../../utils/number";
import { AreaProps } from "./area.types";
import { useAppDispatch } from "../../../../../redux";
import {
	addAreaRow,
	rmAreaRow,
	setAreaData,
} from "../../../../../redux/justipreciacion/obrasComplementarias";
const { Column, HeaderCell, Cell } = Table;
const headerStyle = { padding: 4, backgroundColor: "#cfe2ff", color: "black" };
export const Area = ({ data, unit, total, index }: AreaProps) => {
	const dispatch = useAppDispatch();
	const handleChange = (id: number, key: string, value: number) =>
		dispatch(setAreaData({ index, id, key, value }));

	const handleStatus = (id: number) => {
		const nextData = Object.assign([], data);
		const activeItem: any = nextData.find((item: any) => item.id - 1 === id);
		dispatch(
			setAreaData({ index, id, key: "status", value: activeItem.status ? null : "EDIT" }),
		);
	};
	return (
		<div className="py-2">
			<Table
				wordWrap="break-word"
				bordered
				cellBordered
				data={data}
				hover
				headerHeight={40}
				autoHeight
				affixHorizontalScrollbar
				showHeader
			>
				{data.length > 1 && (
					<Column align="center" verticalAlign="middle" width={50} fixed>
						<HeaderCell style={headerStyle}>
							<strong>#</strong>
						</HeaderCell>
						<Cell dataKey="id" style={{ padding: 4 }} />
					</Column>
				)}
				<Column align="center" verticalAlign="middle" flexGrow={3} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Producto</strong>
					</HeaderCell>
					<TextCell dataKey="description" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Cantidad</strong>
					</HeaderCell>
					<FancyCell dataKey="value" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Unidad</strong>
					</HeaderCell>
					<SelectUnitCell dataKey="unit" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" width={100} fixed>
					<HeaderCell style={headerStyle}>...</HeaderCell>
					<ActionCell dataKey="id" onClick={handleStatus} />
				</Column>
			</Table>
			<div className="d-flex justify-content-between mx-3 pt-2">
				<Success appearance="outline" onClick={() => dispatch(addAreaRow(index))} size="xs">
					Agregar Productos
				</Success>
				<div className="text-end">
					<strong>Área Total: </strong>
					{asFancyNumber(total, { style: "decimal" })}
					{` ${unit}`}
				</div>
			</div>
			<div className="d-flex justify-content-between mx-3 pb-2">
				<div />
				{data.length > 1 && (
					<Danger appearance="link" onClick={() => dispatch(rmAreaRow(index))}>
						Remover última fila
					</Danger>
				)}
			</div>
		</div>
	);
};
const SelectUnitCell = ({ rowData, dataKey, onChange, isCurrency, ...props }: any) => {
	const editing = rowData.status === "EDIT";

	const current = rowData[dataKey];
	return (
		<Cell {...props} className={editing ? "table-content-editing" : ""}>
			{editing ? (
				<div
					className="d-flex flex-row my-auto justify-content-center"
					style={{ minHeight: 40, height: 45, maxHeight: 50 }}
				>
					<SelectUnit
						currentItem={current}
						onSelect={(currentItem: string) => {
							onChange && onChange(rowData.id - 1, dataKey, currentItem);
						}}
					/>
				</div>
			) : (
				<span className="table-content-edit-span">{current}</span>
			)}
		</Cell>
	);
};
const FancyCell = ({ rowData, dataKey, onChange, ...props }: any) => {
	const editing = rowData.status === "EDIT";
	const current = rowData[dataKey];
	return (
		<Cell {...props} className={editing ? "table-content-editing" : ""}>
			{editing ? (
				<div
					className="d-flex flex-row my-auto"
					style={{ minHeight: 40, height: 45, maxHeight: 50 }}
				>
					<Fancy
						value={current}
						onChange={({ currentTarget: { valueAsNumber } }) =>
							onChange(rowData.id - 1, dataKey, valueAsNumber)
						}
						name={`${rowData.id}-${dataKey}`}
						label={`${rowData.id}-${dataKey}`}
					/>
				</div>
			) : (
				<span className="table-content-edit-span">
					{asFancyNumber(current, { style: "decimal" })}
				</span>
			)}
		</Cell>
	);
};
const TextCell = ({ rowData, dataKey, onChange, isArea, ...props }: any) => {
	const editing = rowData.status === "EDIT";
	const current = rowData[dataKey];
	return (
		<Cell {...props} className={editing ? "table-content-editing" : ""}>
			{editing ? (
				<div
					className="d-flex flex-row my-auto"
					style={{ minHeight: 40, height: 45, maxHeight: 50 }}
				>
					<Text
						placeholder="Ingrese el Nombre del Producto"
						isArea={isArea}
						onChange={(value: string) => {
							onChange && onChange(rowData.id - 1, dataKey, value);
						}}
						value={current}
					/>
				</div>
			) : (
				<span
					className={`table-content-edit-span ${
						current.trim() === "" ? "text-muted" : ""
					}`}
				>
					{current.trim() === "" ? "Nombre del Producto" : current}
				</span>
			)}
		</Cell>
	);
};
const ActionCell = ({ rowData, dataKey, onClick, ...props }: any) => {
	return (
		<Cell {...props} style={{ padding: 4, maxHeight: 63 }}>
			<Button
				appearance="link"
				onClick={() => {
					onClick(rowData.id - 1);
				}}
			>
				{rowData.status === "EDIT" ? "Guardar" : "Editar"}
			</Button>
		</Cell>
	);
};
