/** @format */

import { Col, Grid, Row, Table } from "rsuite";
import { SelectUnit } from "../../../../components/Custom/SelectUnit";
import { Fancy } from "../../../../components/Input/Fancy";
import { Text } from "../../../../components/Input";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { getOC, setAge, setCalc } from "../../../../redux/justipreciacion/obrasComplementarias";
import { asFancyNumber } from "../../../../utils/number";
import { Button } from "../../../../components/Button";
import { Custom } from "../../../../components/Input/Select";

const { Column, HeaderCell, Cell } = Table;
const headerStyle = { padding: 4, backgroundColor: "#d1e6dd", color: "black" };
const typeOptions = [
	{ value: "IE - Instalaciones Especiales", label: "IE - Instalaciones Especiales" },
	{ value: "IA - Instalaciones Auxiliares", label: "IA - Instalaciones Auxiliares" },
	{ value: "OC - Obras Complementarias", label: "OC - Obras Complementarias" },
];
export const Calculation = () => {
	const dispatch = useAppDispatch();
	const {
		Calculation,
		Documentation,
		total,
		handlers: {
			calculo: { options },
		},
	} = useAppSelector(getOC);
	const handleChange = (index: number, key: string, value: any) =>
		dispatch(setCalc({ index, key, value }));
	const handleAgeChange = (index: number, key: string, value: any) =>
		dispatch(setAge({ index, key, value }));

	const handleStatus = (index: number) => {
		const nextData = Object.assign([], Calculation);
		const activeItem: any = nextData.find(
			(item: any, currentIndex: number) => currentIndex === index,
		);
		dispatch(setCalc({ index, key: "status", value: activeItem.status ? null : "EDIT" }));
	};

	return (
		<>
			<Table
				wordWrap="break-word"
				bordered
				cellBordered
				data={Calculation}
				hover
				headerHeight={50}
				autoHeight
				affixHorizontalScrollbar
				showHeader
			>
				<Column align="center" verticalAlign="middle" flexGrow={2} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Descripción</strong>
					</HeaderCell>
					<Cell>{(rowData) => rowData.title}</Cell>
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={2.3} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Tipo</strong>
					</HeaderCell>
					<SelectTypeCell dataKey="type" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Estado de Conservación</strong>
					</HeaderCell>
					<SelectConservationCell
						dataKey="conservation"
						options={options}
						onChange={handleChange}
					/>
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Edad</strong>
					</HeaderCell>
					<FancyCell dataKey="age" onChange={handleAgeChange} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>VUT</strong>
					</HeaderCell>
					<FancyCell dataKey="vut" onChange={handleChange} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Cantidad</strong>
					</HeaderCell>
					<ReadAreaCell Key="total" Documentation={Documentation} asNumber />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Unidad</strong>
					</HeaderCell>
					<ReadAreaCell Key="unit" Documentation={Documentation} />
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Valor Unitario de Reposición Nuevo</strong>
					</HeaderCell>
					<ReadDocCell
						Key="totalByUnit"
						Documentation={Documentation}
						asNumber
						isCurrency
					/>
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Factor de Edad</strong>
					</HeaderCell>
					<Cell dataKey="age">{(rowData) => asFancyNumber(rowData.age.factor)}</Cell>
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Factor de Estado de Conservación</strong>
					</HeaderCell>
					<Cell dataKey="conservation">
						{(rowData) => asFancyNumber(rowData.conservation.value)}
					</Cell>
				</Column>

				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Valor Unitario de Reposición</strong>
					</HeaderCell>
					<Cell dataKey="repositionValue">
						{(rowData) => asFancyNumber(rowData.repositionValue, { isCurrency: true })}
					</Cell>
				</Column>
				<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
					<HeaderCell style={headerStyle}>
						<strong>Importe</strong>
					</HeaderCell>
					<Cell dataKey="total">
						{(rowData) => asFancyNumber(rowData.total, { isCurrency: true })}
					</Cell>
				</Column>

				<Column align="center" verticalAlign="middle" width={100} fixed>
					<HeaderCell style={headerStyle}>...</HeaderCell>
					<ActionCell dataKey="id" onClick={handleStatus} />
				</Column>
			</Table>
			<Grid fluid className="my-3">
				<Row>
					<Col md={22} className="text-end">
						<strong>VALOR TOTAL INST. ESPECIALES:</strong>
					</Col>
					<Col md={2} className="text-start">
						{asFancyNumber(total, { isCurrency: true })}
					</Col>
				</Row>
			</Grid>
		</>
	);
}; //
const ReadDocCell = ({ Key, Documentation, asNumber, isCurrency, ...props }: any) => (
	<Cell {...props}>
		{asNumber ?? false
			? asFancyNumber(Documentation[props.rowIndex][Key], { isCurrency })
			: Documentation[props.rowIndex][Key]}
	</Cell>
);
const ReadAreaCell = ({ Key, Documentation, asNumber, ...props }: any) => (
	<Cell {...props}>
		{asNumber ?? false
			? asFancyNumber(Documentation[props.rowIndex].area[Key])
			: Documentation[props.rowIndex].area[Key]}
	</Cell>
);
const SelectConservationCell = ({ rowData, dataKey, onChange, options, ...props }: any) => {
	const editing = rowData.status === "EDIT";
	const current = rowData[dataKey];

	return (
		<Cell {...props} className={editing ? "table-content-editing" : ""}>
			{editing ? (
				<Custom
					block
					data={options}
					labelKey="id"
					value={current.value}
					onSelect={(value: string) =>
						onChange &&
						onChange(
							props.rowIndex,
							dataKey,
							options.find((item: any) => item.value === Number(value)),
						)
					}
					searchable={false}
					size="lg"
				/>
			) : (
				<span className="table-content-edit-span">{current.id}</span>
			)}
		</Cell>
	);
};
const SelectTypeCell = ({ rowData, dataKey, onChange, ...props }: any) => {
	const editing = rowData.status === "EDIT";
	const current = rowData[dataKey];
	return (
		<Cell {...props} className={editing ? "table-content-editing " : ""}>
			{editing ? (
				<Custom
					block
					data={typeOptions}
					defaultValue={current}
					onSelect={(value: string) => {
						onChange && onChange(props.rowIndex, dataKey, value);
					}}
					searchable={false}
					size="lg"
				/>
			) : (
				<span className="table-content-edit-span">{current}</span>
			)}
		</Cell>
	);
};

const FancyCell = ({ rowData, dataKey, onChange, isCurrency, ...props }: any) => {
	const editing = rowData.status === "EDIT";
	const current = rowData[dataKey];
	const value = dataKey.includes("age") ? current.value : current;
	return (
		<Cell {...props} className={editing ? "table-content-editing" : ""}>
			{editing ? (
				<div
					className="d-flex flex-row my-auto"
					style={{ minHeight: 40, height: 45, maxHeight: 50 }}
				>
					<Fancy
						value={value}
						onChange={({ currentTarget: { valueAsNumber } }) => {
							onChange &&
								onChange(
									props.rowIndex,
									dataKey.includes("age") ? "value" : dataKey,
									valueAsNumber,
								);
						}}
						isCurrency={isCurrency}
						name={`${rowData.id}-${dataKey}`}
						label={`${rowData.id}-${dataKey}`}
						classNameDecorator="bg-white"
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
							onChange && onChange(props.rowIndex, dataKey, value);
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
					onClick(props.rowIndex);
				}}
			>
				{rowData.status === "EDIT" ? "Guardar" : "Editar"}
			</Button>
		</Cell>
	);
};
