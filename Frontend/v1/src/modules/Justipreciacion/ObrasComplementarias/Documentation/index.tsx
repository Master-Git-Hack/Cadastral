/** @format */

import { useAppDispatch, useAppSelector } from "../../../../redux";
import {
	addDataRow,
	getOC,
	rmDataRow,
	setCalc,
	setDoc,
	setDocData,
} from "../../../../redux/justipreciacion/obrasComplementarias";
import { Area } from "./Area";
import { Text } from "../../../../components/Input";
import { Col, Divider, Grid, Row, Table } from "rsuite";
import { Button, Danger, Success } from "../../../../components/Button";
import { Fancy } from "../../../../components/Input/Fancy";
import { SelectUnit } from "../../../../components/Custom/SelectUnit";
import { asFancyNumber } from "../../../../utils/number";
import { Switch } from "../../../../components/Input/Switch";
import { HidePage } from "../../../../components/HidePage";

const { Column, HeaderCell, Cell } = Table;
const headerStyle = { padding: 4, backgroundColor: "#e2e3e5", color: "black" };

const Title = ({ title, onChange }: any) => (
	<div className="d-flex py-auto">
		<h3 className="mx-3">Título: </h3>
		<Text value={title} onChange={onChange} />
	</div>
);

const Component = ({ index, data, total, totalByUnit, factorGTO, unit }: any) => {
	const dispatch = useAppDispatch();
	const {
		handlers: {
			documentation: { getGTOFactor },
		},
	} = useAppSelector(getOC);

	const handleChange = (id: number, key: string, value: number) =>
		dispatch(setDocData({ index, id, key, value }));

	const handleStatus = (id: number) => {
		const nextData = Object.assign([], data);
		const activeItem: any = nextData.find((item: any) => item.id - 1 === id);
		const value = activeItem.status ? null : "EDIT";
		dispatch(setDocData({ index, id, key: "status", value }));
	};
	return (
		<div className="mt-5">
			<div className="pt-4 pb-2 mx-2">
				<Switch
					checked={factorGTO}
					withText
					label="Factor GTO"
					onChange={(value: boolean) =>
						setTimeout(() => dispatch(setDoc({ index, key: "factorGTO", value })), 1000)
					}
				/>
			</div>
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
						<strong>Descripción</strong>
					</HeaderCell>
					<TextCell dataKey="description" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Cantidad</strong>
					</HeaderCell>
					<FancyCell dataKey="quantity" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Cantidad</strong>
					</HeaderCell>
					<SelectUnitCell dataKey="unit" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Precio</strong>
					</HeaderCell>
					<FancyCell dataKey="value" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Total</strong>
					</HeaderCell>
					<Cell>
						{(rowData: any) => asFancyNumber(rowData.total, { isCurrency: true })}
					</Cell>
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>IND.</strong>
					</HeaderCell>
					<FancyCell dataKey="ind" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" width={100} fixed>
					<HeaderCell style={headerStyle}>...</HeaderCell>
					<ActionCell dataKey="id" onClick={handleStatus} />
				</Column>
			</Table>
			<Grid fluid>
				{factorGTO && (
					<>
						<Row>
							<Col md={20} className="text-end">
								<strong>SubTotal:</strong>
							</Col>
							<Col md={4} className="text-start">
								{asFancyNumber(total, { isCurrency: true })}
							</Col>
						</Row>
						<Row>
							<Col md={20} className="text-end">
								<strong>Factor GTO:</strong>
							</Col>
							<Col md={4} className="text-start">
								{asFancyNumber(getGTOFactor(factorGTO), { decimals: 3 })}
							</Col>
						</Row>
					</>
				)}
				<Row>
					<Col md={20} className="text-end">
						<strong>Total:</strong>
					</Col>
					<Col md={4} className="text-start">
						{asFancyNumber(total * getGTOFactor(factorGTO), { isCurrency: true })}
					</Col>
				</Row>
				<Row>
					<Col md={20} className="text-end">
						<strong>Unidad:</strong>
					</Col>
					<Col md={4} className="text-start">
						{`${asFancyNumber(!isNaN(totalByUnit) ? totalByUnit : 1, {
							isCurrency: true,
						})} por ${unit}`}
					</Col>
				</Row>
			</Grid>

			<div className="d-flex justify-content-between mx-3 py-2">
				<div>
					<Success
						appearance="outline"
						onClick={() => dispatch(addDataRow(index))}
						size="xs"
					>
						Agregar Productos
					</Success>
					{data.length > 1 && (
						<Danger appearance="link" onClick={() => dispatch(rmDataRow(index))}>
							Remover última fila
						</Danger>
					)}
				</div>
				<div className="text-end"></div>
			</div>
		</div>
	);
};
export const Documentation = () => {
	const dispatch = useAppDispatch();
	const { Documentation, Calculation } = useAppSelector(getOC);
	const title = (index: number) => Calculation[index].title;
	const { length } = Documentation;
	return (
		<>
			{Documentation.map(({ area, ...item }: any, index: number) => {
				return length > 1 ? (
					<HidePage
						elementOnHide={
							<Title
								title={title(index)}
								onChange={(value: string) =>
									dispatch(setCalc({ index, key: "title", value }))
								}
							/>
						}
					>
						<div key={`Documentation data ${index}`} className="mx-3 mt-5">
							<Title
								title={title(index)}
								onChange={(value: string) =>
									dispatch(setCalc({ index, key: "title", value }))
								}
							/>
							<Area {...area} index={index} />
							<Component {...item} index={index} unit={area.unit.toUpperCase()} />
						</div>
						<Divider>
							<strong>{title(index).toUpperCase()}</strong>
						</Divider>
					</HidePage>
				) : (
					<div key={`Documentation data ${index}`}>
						<Title
							title={title(index)}
							onChange={(value: string) =>
								dispatch(setCalc({ index, key: "title", value }))
							}
						/>
						<Area {...area} index={index} />
						<Component {...item} index={index} unit={area.unit.toUpperCase()} />
					</div>
				);
			})}
		</>
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
const FancyCell = ({ rowData, dataKey, onChange, isCurrency, ...props }: any) => {
	const editing = rowData.status === "EDIT";
	const current = rowData[dataKey];
	const value = dataKey.includes("value") ? rowData.value * rowData.ind : current;
	return (
		<Cell {...props} className={editing ? "table-content-editing" : ""}>
			{editing ? (
				<div
					className="d-flex flex-row my-auto"
					style={{ minHeight: 40, height: 45, maxHeight: 50 }}
				>
					<Fancy
						value={current}
						onChange={({ currentTarget: { valueAsNumber } }) => {
							onChange && onChange(rowData.id - 1, dataKey, valueAsNumber);
						}}
						isCurrency={isCurrency}
						name={`${rowData.id}-${dataKey}`}
						label={`${rowData.id}-${dataKey}`}
					/>
				</div>
			) : (
				<span className="table-content-edit-span">
					{asFancyNumber(value, { isCurrency })}
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
