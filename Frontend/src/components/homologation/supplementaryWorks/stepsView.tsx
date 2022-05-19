/** @format */
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/store";
import { DataProperties } from "../../../types/homologacion/supplementaryWorks/Properties/data";
import { toFancyNumber } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";
import { Body, Footer, Header, Table } from "../../table/Table";
import {
	addDataCalculationRow,
	removeDataCalculationRow,
	updateData,
	updateDataCalculation,
} from "../../../features/homologation/supplementaryWorks/slice2";
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
const DataView = (props: any) => {
	const { id, name, area, calculation, value, visibility } = props;
	const { description } = area;
	const { subTotal, total, gtoFactor, result } = value;
	const dispatch = useAppDispatch();
	const [showFactor, setShowFactor] = useState(false);
	return (
		<Table>
			<Header>
				<tr className="bg-primary">
					<th colSpan={2} className="bg-primary opacity-75 text-light rounded-start">
						Descripción
					</th>
					<th colSpan={10} className="bg-primary opacity-75 text-light rounded-end">
						<textarea
							rows={1}
							name={`area title ${id}`}
							className="form-control form-control-sm"
							value={name}
							onChange={(event) =>
								dispatch(
									updateData({
										index: id - 1,
										key: "name",
										value: event.target.value,
									}),
								)
							}
						/>
					</th>
				</tr>
				<tr>
					<th colSpan={1}>Descripción</th>
					<th colSpan={4}>
						<textarea
							rows={1}
							name={`area description${id}`}
							className="form-control form-control-sm"
							value={description}
							onChange={(event) =>
								dispatch(
									updateData({
										index: id - 1,
										key: "area",
										subKey: "description",
										value: event.target.value,
									}),
								)
							}
						/>
					</th>
					<th colSpan={1}>Cantidad</th>
					<th colSpan={4}>
						<FancyInput
							index={id}
							name={`area value ${id}`}
							value={area.value}
							onChange={(event) =>
								dispatch(
									updateData({
										index: id - 1,
										key: "area",
										subKey: "value",
										value: Number(event.target.value),
									}),
								)
							}
							style={`text-center`}
						/>
					</th>

					<th colSpan={1}>Unidad</th>
					<th colSpan={1}>
						<HandleUnities
							name={`area unit header ${id}`}
							value={area.unity}
							onChange={(event: any) =>
								dispatch(
									updateData({
										index: id - 1,
										key: "area",
										subKey: "unity",
										value: event.target.value,
									}),
								)
							}
						/>
					</th>
				</tr>
				<tr>
					<th colSpan={4} className="bg-success opacity-75 text-light">
						Descripción
					</th>
					<th colSpan={2} className="bg-success opacity-75 text-light">
						Cantidad
					</th>
					<th colSpan={1} className="bg-success opacity-75 text-light">
						Unidad
					</th>
					<th colSpan={2} className="bg-success opacity-75 text-light">
						Precio
					</th>
					<th colSpan={2} className="bg-success opacity-75 text-light">
						Total
					</th>
					<th colSpan={1} className="bg-success opacity-75 text-light">
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
										updateDataCalculation({
											index: id - 1,
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
										updateDataCalculation({
											index: id - 1,
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
										updateDataCalculation({
											index: id - 1,
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
							<FancyInput
								index={index}
								name={`row ${index} value unit ${id}`}
								value={item.value.unitary}
								onChange={(event: any) =>
									dispatch(
										updateDataCalculation({
											index: id - 1,
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
							{toFancyNumber(Number(item.value.ind.unitary.toFixed(2)), true)}
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
										updateDataCalculation({
											index: id - 1,
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
						SubTotal:
					</td>
					<td colSpan={2}>{toFancyNumber(Number(subTotal.toFixed(2)), true)}</td>
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
									setShowFactor(!showFactor);
									dispatch(
										updateData({
											index: id - 1,
											key: "value",
											subKey: "gtoFactor",
											value: !showFactor ? 0.935 : 1,
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
							{toFancyNumber(Number(gtoFactor.toFixed(3)), false, false, 3)}
						</td>
						<td colSpan={1} />
					</tr>
				)}

				<tr>
					<td colSpan={9} className="text-end">
						{result.unity}
					</td>
					<td colSpan={2}>{toFancyNumber(Number(result.value.toFixed(0)), true)}</td>
					<td colSpan={1} />
				</tr>
				<tr>
					<td colSpan={1} className="text-start">
						<button
							onClick={() => dispatch(addDataCalculationRow(id - 1))}
							className="btn btn-sm btn-primary"
						>
							Agregar Fila
						</button>
					</td>
					<td colSpan={10} className="text-center">
						<button onClick={visibility} className={`btn btn-sm btn-outline-primary`}>
							Ocultar
						</button>
					</td>
					<td colSpan={1} className="text-end">
						<button
							onClick={() => dispatch(removeDataCalculationRow(id - 1))}
							className="btn btn-sm btn-outline-danger"
						>
							Remover Ultima Fila
						</button>
					</td>
				</tr>
			</Footer>
		</Table>
	);
};
export const StepsView = (props: DataProperties) => {
	const [show, setShow] = useState(true);
	const { id, name } = props;
	const properties = {
		...props,
		visibility: () => setShow(!show),
	};
	return (
		<div className="mb-2">
			{show ? (
				<DataView {...properties} />
			) : (
				<div className="row text-center border p-2">
					<div className="col-6">
						<h6 className="text-center badge rounded-pill bg-info">
							Documento: {id} - {name}
						</h6>
					</div>
					<div className="col-6">
						<button onClick={() => setShow(!show)} className={`btn btn-sm btn-primary`}>
							Mostrar
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
