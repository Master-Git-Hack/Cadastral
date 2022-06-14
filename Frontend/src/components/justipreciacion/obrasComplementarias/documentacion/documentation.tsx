/** @format */

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { dataStorage } from "../../../../types/justipreciacion/obrasComplementarias/documentacion/docStorage";
import { toFancyNumber } from "../../../../utils/utils";
import { FancyInput } from "../../../inputs/fancyInput";
import { Body, Footer, Header, Table } from "../../../table/Table";
import {
	getOC as getState,
	addRowDocumentationAreaData,
	removeRowDocumentationAreaData,
	addDocumentationCalculationRow,
	removeDocumentationCalculationRow,
	updateDocumentation,
	updateDocumentationCalculation,
	updateDocumentationAreaData,
} from "../../../../features/justipreciacion/obrasComplementariasSlice";
import { MinMaxView } from "../../../views/MinMax";
export const DocsView = () => {
	const { documentation } = useAppSelector(getState);
	return (
		<>
			{documentation.map((item: any, index: number) => (
				<DocumentationView
					key={`handle documentation values ${index} ${item.id}`}
					{...item}
					id={index}
				/>
			))}
		</>
	);
};

const HandleUnities = (props: { name: string; value: string; onChange: any }) => (
	<select
		className="form-select form-select-sm"
		name={props.name}
		value={props.value}
		onChange={props.onChange}
	>
		<option value="m2">m2</option>
		<option value="m3">m3</option>
		<option value="ml">ml</option>
		<option value="lote">lote</option>
		<option value="pza">pza</option>
	</select>
);
export const DocumentationView = (props: any) => {
	const { id, name, area, calculation, value, show } = props;
	const { data } = area;
	const { subTotal, total, gtoFactor, result } = value;
	const dispatch = useAppDispatch();
	const [showFactor, setShowFactor] = useState(false);
	return (
		<MinMaxView
			id={id + 1}
			name={name}
			visibility={show}
			children={
				<>
					<div className="d-flex flex-column justify-content-center align-self-center flex-fill mt-1">
						<div className="d-flex flex-row input-group mb-2">
							<span className="input-group-text">Titulo</span>
							<textarea
								rows={1.5}
								name={`area title ${id}`}
								className="form-control form-control-sm"
								value={name}
								onChange={(event) =>
									dispatch(
										updateDocumentation({
											index: id,
											key: "name",
											value: event.target.value,
										}),
									)
								}
							/>
						</div>
						<Table>
							<Header style={`primary`}>
								<tr>
									<th>Producto</th>
									<th style={{ width: 200 }}>Cantidad</th>
									<th style={{ width: 200 }}>Unidad</th>
								</tr>
							</Header>
							<Body>
								{data.map((item: any, index: number) => (
									<tr
										key={`row for data ${index} to describe product information`}
									>
										<td>
											<textarea
												rows={1.5}
												name={`area description${id}`}
												className="form-control form-control-sm"
												value={item.description}
												onChange={(event) =>
													dispatch(
														updateDocumentationAreaData({
															id,
															index,
															key: "description",
															value: event.target.value,
														}),
													)
												}
											/>
										</td>
										<td>
											<FancyInput
												index={id}
												name={`area value ${id}`}
												value={item.value}
												onChange={(event) =>
													dispatch(
														updateDocumentationAreaData({
															id,
															index,
															key: "value",
															value: Number(event.target.value),
														}),
													)
												}
												style={`text-center`}
											/>
										</td>
										<td>
											<HandleUnities
												name={`area unit header ${id}`}
												value={item.unity}
												onChange={(event: any) =>
													dispatch(
														updateDocumentationAreaData({
															id,
															index,
															key: "unity",
															value: event.target.value,
														}),
													)
												}
											/>
										</td>
									</tr>
								))}
							</Body>
							<Footer>
								<tr>
									<td>
										<div className="d-flex flex-row justify-content-between">
											<button
												className="btn btn-sm btn-outline-success "
												onClick={() =>
													dispatch(addRowDocumentationAreaData(id))
												}
											>
												Agregar Producto
											</button>
											<input
												style={{ width: 300 }}
												type="file"
												className="form-control form-control-sm "
											/>
										</div>
									</td>
									<td>
										<strong>TOTAL DE AREA ({area.unity}): </strong> {area.total}
									</td>
									<td>
										{data.length > 1 && (
											<button
												className="btn btn-sm btn-link text-danger"
												onClick={() =>
													dispatch(removeRowDocumentationAreaData(id))
												}
											>
												Remover Ultimo Producto
											</button>
										)}
									</td>
								</tr>
							</Footer>
						</Table>
					</div>

					<Table style={`mb-2`}>
						<Header style={`success`}>
							<tr>
								<th colSpan={4}>Descripción</th>
								<th colSpan={2}>Cantidad</th>
								<th colSpan={1} style={{ width: 100 }}>
									Unidad
								</th>
								<th colSpan={2}>Precio</th>
								<th colSpan={2}>Total</th>
								<th colSpan={1} style={{ width: 200 }}>
									IND.
								</th>
							</tr>
						</Header>
						<Body>
							{calculation.map((item: any, index: number) => (
								<tr key={`calculation ${id} row ${index}`}>
									<td colSpan={4}>
										<textarea
											rows={1}
											name={`calculation description ${id} row ${index}`}
											className="form-control form-control-sm"
											value={item.quantity.description}
											onChange={(event) =>
												dispatch(
													updateDocumentationCalculation({
														index: id,
														id: index,
														key: "quantity",
														subKey: "description",
														value: event.target.value,
													}),
												)
											}
										/>
									</td>
									<td colSpan={2}>
										<HandleUnities
											name={`row ${index} quantity unity ${id}`}
											value={item.quantity.unity}
											onChange={(event: any) =>
												dispatch(
													updateDocumentationCalculation({
														index: id,
														id: index,
														key: "quantity",
														subKey: "unity",
														value: event.target.value,
													}),
												)
											}
										/>
									</td>
									<td colSpan={1}>
										<FancyInput
											index={index}
											name={`row ${index} quantity value ${id}`}
											value={item.quantity.value}
											onChange={(event: any) =>
												dispatch(
													updateDocumentationCalculation({
														index: id,
														id: index,
														key: "quantity",
														subKey: "value",
														value: Number(event.target.value),
													}),
												)
											}
											style={`text-center`}
										/>
									</td>
									<td colSpan={2}>
										<div className="input-group">
											<span className="input-group-text" id="basic-addon1">
												{toFancyNumber(
													Number(item.value.ind.unitary.toFixed(2)),
													true,
												)}
											</span>
											<FancyInput
												index={index}
												name={`row ${index} value unit ${id}`}
												value={item.value.unitary}
												onChange={(event: any) =>
													dispatch(
														updateDocumentationCalculation({
															index: id,
															id: index,
															key: "value",
															subKey: "unitary",
															value: Number(event.target.value),
														}),
													)
												}
												isCurrency={true}
												style={`text-center`}
											/>
										</div>
									</td>
									<td colSpan={2}>
										{toFancyNumber(Number(item.value.total.toFixed(2)), true)}
									</td>
									<td colSpan={1}>
										<FancyInput
											index={index}
											name={`row ${index} value ind value ${id}`}
											value={item.value.ind.value}
											onChange={(event: any) =>
												dispatch(
													updateDocumentationCalculation({
														index: id,
														id: index,
														key: "value",
														subKey: "ind",
														subSubKey: "value",
														value: Number(event.target.value),
													}),
												)
											}
											style={`text-center`}
										/>
									</td>
								</tr>
							))}
						</Body>
						<Footer>
							<tr>
								<td colSpan={9} className="text-end">
									Sub Total:
								</td>
								<td colSpan={2}>
									{toFancyNumber(Number(subTotal.toFixed(2)), true)}
								</td>
								<td colSpan={1} />
							</tr>
							<tr>
								<td colSpan={9} className="text-end">
									Total:
								</td>
								<td colSpan={2}>{toFancyNumber(Number(total.toFixed(2)), true)}</td>
								<td colSpan={1}>
									<div className="form-check form-switch">
										<input
											id="factorGto"
											className="form-check-input"
											type="checkbox"
											checked={showFactor}
											onChange={(event) => {
												const current = !showFactor;
												setShowFactor(current);
												dispatch(
													updateDocumentation({
														index: id,
														key: "value",
														subKey: "gtoFactor",
														value: current ? 0.935 : 1,
													}),
												);
											}}
										/>
										<label className="form-check-label" htmlFor="factorGto">
											Factor Guanajuato
										</label>
									</div>
								</td>
							</tr>
							{showFactor && (
								<tr>
									<td colSpan={9} className="text-end">
										Factor Gto:
									</td>
									<td colSpan={2}>
										{toFancyNumber(
											Number(gtoFactor.toFixed(3)),
											false,
											false,
											3,
										)}
									</td>
									<td colSpan={1} />
								</tr>
							)}

							<tr>
								<td colSpan={9}>
									<div className="d-flex flex-row justify-content-between">
										<button
											onClick={() =>
												dispatch(addDocumentationCalculationRow(id))
											}
											className="btn btn-sm btn-outline-success"
										>
											Agregar Fila
										</button>
										{result.unity}
									</div>
								</td>
								<td colSpan={2}>
									{toFancyNumber(Number(result.value.toFixed(0)), true)}
								</td>
								<td colSpan={1}>
									{calculation.length > 1 && (
										<button
											onClick={() =>
												dispatch(removeDocumentationCalculationRow(id))
											}
											className="btn btn-sm btn-link text-danger"
										>
											Remover Ultima Fila
										</button>
									)}
								</td>
							</tr>
						</Footer>
					</Table>
					<div className="d-flex justify-content-between my-2"></div>
				</>
			}
		/>
	);
};
