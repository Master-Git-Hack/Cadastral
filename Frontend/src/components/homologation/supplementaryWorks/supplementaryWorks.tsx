/** @format */

import {
	getState,
	addRowSupplementary,
	removeRowSupplementary,
	updateSupplementary,
} from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toFancyNumber } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";
import { Table, Header, Body, Footer } from "../../table/Table";
import ReactTooltip from "react-tooltip";
export default function SupplementaryWorksComponent() {
	const { data, total, options } = useAppSelector(getState).supplementaryWorks;
	const dispatch = useAppDispatch();
	return (
		<Table>
			<Header>
				<tr>
					<th>Descripción</th>
					<th>Tipo</th>
					<th>Estado de Conservación</th>
					<th>Edad</th>
					<th>VUT</th>
					<th>Cantidad</th>
					<th>Unidad</th>
					<th>Valor Unitario de Reposición Nuevo</th>
					<th>Factor de Edad</th>
					<th>Factor de Estado de Conservación</th>
					<th>Valor Unitario de Reposición Reposición</th>
					<th>Importe</th>
				</tr>
			</Header>
			<Body>
				{data.map((item: any, index: number) => (
					<tr key={` table for supplementary works row ${index}`}>
						<td>
							<textarea
								rows={1}
								className="form-control form-control-sm"
								value={item.description}
								onChange={(event) =>
									dispatch(
										updateSupplementary({
											key: "description",
											index,
											value: event.target.value,
										}),
									)
								}
							/>
						</td>
						<td style={{ minWidth: 70 }}>
							<select
								className="form-select form-select-sm"
								value={item.type}
								onChange={(event) =>
									dispatch(
										updateSupplementary({
											key: "type",
											index,
											value: event.target.value,
										}),
									)
								}
							>
								<option value="IE - Instalaciones Especiales">
									IE - Instalaciones Especiales
								</option>
								<option value="EA -  Elementos Accesorios">
									EA - Elementos Accesorios
								</option>
								<option value="OC -  Obras Complementarias">
									OC - Obras Complementarias
								</option>
							</select>
						</td>
						<td>
							<select
								className="form-select form-select-sm"
								value={item.stateOfConservationFactor.id}
								onChange={(event) => {
									const value = options.find(
										(item: any) => item.id === Number(event.target.value),
									);
									dispatch(
										updateSupplementary({
											key: "stateOfConservationFactor",
											index,
											value,
										}),
									);
								}}
							>
								{options.map((option: any, indx: number) => (
									<option
										key={`option for calculation state of conservation factor ${index} ${indx}`}
										value={option.id}
									>
										{option.id}
									</option>
								))}
							</select>
						</td>
						<td>
							<FancyInput
								index={index}
								name="age.value"
								value={item.age.value}
								onChange={(event: any) =>
									dispatch(
										updateSupplementary({
											key: "age",
											index,
											object: "value",
											value: Number(event.target.value),
										}),
									)
								}
							/>
						</td>
						<td>
							<FancyInput
								index={index}
								name="vut"
								value={item.vut}
								onChange={(event: any) =>
									dispatch(
										updateSupplementary({
											key: "vut",
											index,
											value: Number(event.target.value),
										}),
									)
								}
							/>
						</td>
						<td>
							<FancyInput
								index={index}
								name="quantity.value"
								value={item.quantity.value}
								onChange={(event: any) =>
									dispatch(
										updateSupplementary({
											key: "quantity",
											index,
											object: "value",
											value: Number(event.target.value),
										}),
									)
								}
							/>
						</td>
						<td style={{ minWidth: 80 }}>
							<select
								className="form-select form-select-sm"
								value={item.quantity.unity}
								onChange={(event) =>
									dispatch(
										updateSupplementary({
											key: "quantity",
											index,
											object: "unity",
											value: event.target.value,
										}),
									)
								}
							>
								<option value="m2">m2</option>
								<option value="m3">m3</option>
								<option value="ml">ml</option>
								<option value="lote">lote</option>
								<option value="pza">pza</option>
							</select>
						</td>
						<td>
							<FancyInput
								index={index}
								name="unitCost.value"
								value={item.unitCost.value}
								onChange={(event: any) =>
									dispatch(
										updateSupplementary({
											key: "unitCost",
											index,
											object: "value",
											value: Number(event.target.value),
										}),
									)
								}
								isCurrency={true}
							/>
						</td>
						<td>{toFancyNumber(Number(item.age.factor.toFixed(2)))}</td>
						<td>
							<span
								data-tip
								data-for={`state of conservation factor value explain ${index}`}
							>
								{toFancyNumber(
									Number(item.stateOfConservationFactor.value.toFixed(2)),
								)}
							</span>
							<ReactTooltip
								id={`state of conservation factor value explain ${index}`}
								place="bottom"
								type="light"
								effect="solid"
							>
								<span>{item.stateOfConservationFactor.type}</span>
							</ReactTooltip>
						</td>
						<td>{toFancyNumber(Number(item.unitCost.net.toFixed(2)), true)}</td>
						<td>{toFancyNumber(Number(item.unitCost.result.toFixed(2)), true)}</td>
					</tr>
				))}
			</Body>
			<Footer>
				<tr>
					<td colSpan={11} className="text-end">
						VALOR TOTAL INST. ESPECIALES:
					</td>
					<td>{toFancyNumber(Number(total.toFixed(2)), true)}</td>
				</tr>
				<tr>
					<td colSpan={6} className="text-start">
						<button
							className="btn btn-sm btn-primary"
							onClick={() => dispatch(addRowSupplementary())}
						>
							Agregar Fila
						</button>
					</td>
					<td colSpan={6} className="text-end">
						{data.length > 1 ? (
							<button
								className="btn btn-sm btn-outline-danger"
								onClick={() => dispatch(removeRowSupplementary())}
							>
								Remover ultima fila
							</button>
						) : null}
					</td>
				</tr>
			</Footer>
		</Table>
	);
}
