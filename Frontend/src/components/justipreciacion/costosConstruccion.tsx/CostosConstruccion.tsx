/** @format */

import { useEffect } from "react";
import {
	getCC,
	addRow,
	removeRow,
	setValues,
	setTitle,
	setFactorGTO,
	updateTotalData,
	setRedondeo,
} from "../../../features/justipreciacion/costosConstruccionSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { roundNumber, roundToTenth, asFancyNumber } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";
import { Table, Body, Footer, Header } from "../../table/Table";
import { RoundSelection } from "../../roundSelection/RoundSelection";
export default function CostosConstruccion() {
	const dispatch = useAppDispatch();

	const { data, factorGTO, total, titulo, handlers, redondeo } = useAppSelector(getCC);
	const subTotal = factorGTO.enabled ? total : roundNumber(total, redondeo);
	const totalCalculado = roundNumber(total * factorGTO.value, redondeo);
	const handleValues = (id: number, key: string, value: number) =>
		dispatch(setValues({ id, key, value }));
	useEffect(() => {
		total !== handlers.getTotal(data) && dispatch(updateTotalData());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [total]);
	return (
		<>
			<div className="row mb-2 my-4">
				<div className="col-1 my-auto text-center">
					<h3>Titulo:</h3>
				</div>
				<div className="col-11 my-auto">
					<textarea
						className="form-control"
						aria-label="With textarea"
						value={titulo}
						rows={1}
						onChange={(event) => dispatch(setTitle(event.currentTarget.value))}
					/>
				</div>
			</div>
			<div className="d-inline-flex my-2 invisible ">
				<div className="me-auto text-start my-auto">
					<button className="btn btn-sm btn-outline-success">Agregar Fila</button>
				</div>
				{data.length > 1 && (
					<div className="text-end my-auto">
						<button className="btn btn-sm btn-link text-danger">
							Eliminar Ultima Fila
						</button>
					</div>
				)}
			</div>
			<Table>
				<Header style={`success`}>
					<tr>
						<th className="text-brake text-wrap">Valor Costo Directo</th>
						<th className="text-brake text-wrap">% Indirectos</th>
						<th className="text-brake text-wrap">Valor Real Neto</th>
						<th className="text-brake text-wrap">
							m<sup>2</sup>
						</th>
						<th className="text-brake text-wrap">
							$ / m<sup>2</sup>
						</th>
					</tr>
				</Header>
				<Body>
					{data.map((item: any, index: number) => (
						<tr key={`fila de la tabla de costos de construccion ${index}`}>
							<td>
								<FancyInput
									index={index}
									name={"costoDirecto"}
									value={item.costoDirecto}
									onChange={(event) => {
										const { name, valueAsNumber } = event.currentTarget;
										handleValues(
											index,
											name,
											!isNaN(valueAsNumber) ? valueAsNumber : 0,
										);
									}}
									isCurrency={true}
								/>
							</td>
							<td>
								<FancyInput
									index={index}
									name={"indirectos"}
									value={item.indirectos}
									onChange={(event) => {
										const { name, valueAsNumber } = event.currentTarget;
										handleValues(
											index,
											name,
											!isNaN(valueAsNumber) ? valueAsNumber : 0,
										);
									}}
								/>
							</td>
							<td>{asFancyNumber(item.valorNeto, { isCurrency: true })}</td>

							<td>
								<FancyInput
									index={index}
									name={"m2"}
									value={item.m2}
									onChange={(event) => {
										const { name, valueAsNumber } = event.currentTarget;
										handleValues(
											index,
											name,
											!isNaN(valueAsNumber) ? valueAsNumber : 0,
										);
									}}
								/>
							</td>
							<td>{asFancyNumber(item.total, { isCurrency: true })}</td>
						</tr>
					))}
				</Body>
				<Footer style={`info`}>
					{factorGTO.enabled && (
						<>
							<tr>
								<td className="text-end bg-light" colSpan={4}>
									SubTotal:
								</td>
								<td className="bg-light">
									{asFancyNumber(subTotal, { isCurrency: true })}
								</td>
							</tr>
							<tr>
								<td className="text-end bg-light" colSpan={4}>
									Factor GTO:
								</td>
								<td className="bg-light">{factorGTO.value}</td>
							</tr>
						</>
					)}
					<tr>
						<td colSpan={4}>
							<div className="d-flex">
								<div className="me-auto my-auto">
									<RoundSelection
										name="rounded"
										current={redondeo + 1}
										onClick={(option: any, index: number) =>
											dispatch(setRedondeo(index - 1))
										}
									/>
								</div>
								<div className="my-auto">
									Total m<sup>2</sup>:
								</div>
							</div>
						</td>
						<td>{asFancyNumber(totalCalculado, { isCurrency: true })}</td>
					</tr>
				</Footer>
			</Table>
			<div className="form-check form-switch ms-auto me-2">
				<input
					className="form-check-input"
					type="checkbox"
					role="switch"
					id="factorGTO"
					checked={factorGTO.enabled}
					onChange={(event) => dispatch(setFactorGTO(event.currentTarget.checked))}
				/>
				<label className="form-check-label" htmlFor="factorGTO">
					Factor GTO
				</label>
			</div>
		</>
	);
}
