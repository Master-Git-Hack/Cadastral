/** @format */

import { useEffect } from "react";
import { Table } from "rsuite";
import { Justipreciacion } from "..";
import { Button } from "../../../components/Button";
import { Container } from "../../../components/Container";
import { RoundedSelection } from "../../../components/Custom/RoundedSelection";
import { M2 } from "../../../components/Decorators";
import { Fancy } from "../../../components/Input/Fancy";
import { Text } from "../../../components/Input";
import { Switch } from "../../../components/Input/Switch";
import { Spinner } from "../../../components/Spinner";
import { Footer, Container as TC } from "../../../components/Table";
import { useAppDispatch, useAppSelector } from "../../../redux";
import {
	getCC,
	setFactorGTO,
	setRedondeo,
	setTitle,
	setValues,
	updateTotalData,
} from "../../../redux/justipreciacion/costosConstruccion";
import { asFancyNumber } from "../../../utils/number";
const { Column, HeaderCell, Cell } = Table;
const headerStyle = { padding: 4, backgroundColor: "#d1e6dd", color: "black" };
export const CostosConstruccion = ({ children, subTotal, totalCalculado }: any) => {
	const dispatch = useAppDispatch();

	const {
		data,
		factorGTO: { enabled, value },
		total,
		titulo,
		handlers: { getTotal },
		redondeo,
		status,
		record,
	} = useAppSelector(getCC);
	const handleChange = (id: number, key: string, value: number) =>
		dispatch(setValues({ id: id - 1, key, value }));
	const handleEditState = (id: number) => {
		const nextData = Object.assign([], data);
		const activeItem: any = nextData.find((item: any) => item.id === id);
		dispatch(
			setValues({ id: id - 1, key: "status", value: activeItem.status ? null : "EDIT" }),
		);
	};
	useEffect(() => {
		total !== getTotal(data) && dispatch(updateTotalData());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [total]);
	return (
		<Justipreciacion>
			{status.includes("loading") ? (
				<Spinner backdrop inverse size="lg" />
			) : (
				<Container
					header={
						<div className="d-flex justify-content-between align-items-start my-3 px-4">
							<h1 className="me-auto">
								Cálculo: <strong>Costos de Construcción</strong>
							</h1>

							{children}
						</div>
					}
				>
					<div className="shadow-lg p-3 my-2 bg-body rounded h-auto vw-75 ">
						<div className="d-flex my-2">
							<h3 className="mx-5">Titulo:</h3>
							<Text
								onChange={(value: string) => dispatch(setTitle(value))}
								value={titulo}
							/>
						</div>
						<Table
							wordWrap="break-word"
							bordered
							cellBordered
							hover
							headerHeight={80}
							autoHeight
							affixHorizontalScrollbar
							showHeader
							virtualized
							data={data}
						>
							<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
								<HeaderCell style={headerStyle}>
									<strong>Valor Costo Directo</strong>
								</HeaderCell>
								<FancyCell
									dataKey="costoDirecto"
									isCurrency
									onChange={handleChange}
								/>
							</Column>

							<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
								<HeaderCell style={headerStyle}>
									<strong>% Indirectos</strong>
								</HeaderCell>
								<FancyCell dataKey="indirectos" onChange={handleChange} />
							</Column>

							<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
								<HeaderCell style={headerStyle}>Valor Real Neto</HeaderCell>
								<Cell dataKey="valorNeto" style={{ padding: 4, maxHeight: 100 }}>
									{(rowData) => (
										<span className="table-content-edit-span">
											{asFancyNumber(rowData.valorNeto, { isCurrency: true })}
										</span>
									)}
								</Cell>
							</Column>
							<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
								<HeaderCell style={headerStyle}>
									<strong>
										<M2 mayus />
									</strong>
								</HeaderCell>
								<FancyCell dataKey="m2" onChange={handleChange} />
							</Column>

							<Column align="center" verticalAlign="middle" flexGrow={1} fixed>
								<HeaderCell style={headerStyle}>
									<strong>
										<M2 text="$ / " />
									</strong>
								</HeaderCell>
								<Cell dataKey="total" style={{ padding: 4, maxHeight: 100 }}>
									{(rowData) => (
										<span className="table-content-edit-span">
											{asFancyNumber(total, { isCurrency: true })}
										</span>
									)}
								</Cell>
							</Column>
							<Column align="center" verticalAlign="middle" width={100} fixed>
								<HeaderCell style={headerStyle}>...</HeaderCell>
								<ActionCell dataKey="id" onClick={handleEditState} />
							</Column>
						</Table>

						<TC className="table-borderless">
							<Footer>
								{enabled && (
									<>
										<tr>
											<td className="text-end bg-light" colSpan={4}>
												SubTotal:
											</td>
											<td className="bg-light">
												{asFancyNumber(subTotal, { isCurrency: true })}
											</td>
											<td />
										</tr>
										<tr>
											<td className="text-end bg-light" colSpan={4}>
												Factor GTO:
											</td>
											<td className="bg-light">{value}</td>
											<td />
										</tr>
									</>
								)}
								<tr className="table-info">
									<td colSpan={4}>
										<div className="d-flex justify-content-end">
											<div className="me-auto  my-auto">
												<RoundedSelection
													currentItem={redondeo}
													onSelect={(currentItem: number) =>
														dispatch(setRedondeo(currentItem))
													}
												/>
											</div>
											<div className="my-auto text-center">
												<M2 text="Total " />:
											</div>
										</div>
									</td>
									<td>{asFancyNumber(totalCalculado, { isCurrency: true })}</td>
									<td />
								</tr>
								<tr>
									<td colSpan={6}>
										<div className="d-flex justify-content-end">
											<Switch
												checked={enabled}
												reverse
												label="Factor GTO"
												withText
												onChange={(checked: boolean) =>
													setTimeout(
														() => dispatch(setFactorGTO(checked)),
														1000,
													)
												}
											/>
										</div>
									</td>
								</tr>
							</Footer>
						</TC>
					</div>
				</Container>
			)}
		</Justipreciacion>
	);
};
const FancyCell = ({ rowData, dataKey, onChange, isCurrency, ...props }: any) => {
	const editing = rowData.status === "EDIT";
	return (
		<Cell {...props} className={editing ? "table-content-editing" : ""}>
			{editing ? (
				<div
					className="d-flex flex-row my-auto"
					style={{ minHeight: 40, height: 45, maxHeight: 50 }}
				>
					<Fancy
						value={rowData[dataKey]}
						onChange={({ currentTarget: { valueAsNumber } }) => {
							onChange && onChange(rowData.id, dataKey, valueAsNumber);
						}}
						isCurrency={isCurrency}
						name={`${rowData.id}-${dataKey}`}
						label={`${rowData.id}-${dataKey}`}
					/>
				</div>
			) : (
				<span className="table-content-edit-span">
					{asFancyNumber(rowData[dataKey], { isCurrency })}
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
					onClick(rowData.id);
				}}
			>
				{rowData.status === "EDIT" ? "Guardar" : "Editar"}
			</Button>
		</Cell>
	);
};
