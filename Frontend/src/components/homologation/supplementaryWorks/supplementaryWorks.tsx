/** @format */
import {
	getState,
	addRow,
	removeRow,
	update,
	consume,
} from "../../../features/homologation/supplementaryWorks/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toFancyNumber } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";
import { Table, Header, Body, Footer } from "../../table/Table";
import ReactTooltip from "react-tooltip";
import { useEffect, useRef } from "react";
import { Spinner } from "../../spinner/spinner";
export default function SupplementaryWorksComponent() {
	const { status, data, total, options, id, record } = useAppSelector(getState);
	const dispatch = useAppDispatch();
	const pageReference = useRef<HTMLDivElement>(null);
	const scrollToBottom = () => pageReference.current?.scrollIntoView(false);

	useEffect(() => {
		dispatch(consume.get({ url: `/HOMOLOGATION/OC/${id}`, type: "/OC" }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		window.resizeTo(1250, 500);
	}, []);

	useEffect(() => {
		//window.scrollTo(0, window.innerHeight);
		scrollToBottom();
	}, [pageReference, data]);

	const sendRequest = () => {
		const properties = {
			url: `/HOMOLOGATION/OC/${id}`,
			responseType: "json",
			payload: {
				datos: data,
				valor_unitario: total,
				record: record,
			},
		};
		try {
			if (record.type.includes("exists")) dispatch(consume.patch(properties));
			if (record.type.includes("newOne")) dispatch(consume.post(properties));
		} catch (e) {
			alert("Error al guardar");
		} finally {
			if (status.includes("success")) {
				alert("Registro guardado exitosamente");
				window.opener = null;
				window.open("about:blank", "_self", "");
				window.close();
			} else {
				alert("Algo fallo, favor de intentar más tarde");
			}
		}
	};
	return (
		<div className="container-xxl container-fluid" ref={pageReference}>
			<div className="row my-auto mb-3">
				<div className="col my-auto ">
					<h5>Obras complementarias</h5>
				</div>
				<div className="col my-auto">
					{!status.includes("loading") ? (
						<div className="row text-end">
							<div className="col pt-3  ">
								<button className="btn btn-success" onClick={sendRequest}>
									Guardar
								</button>
							</div>
							<br />
						</div>
					) : null}
				</div>
			</div>
			{!status.includes("loading") ? (
				<Table>
					<Header>
						<tr>
							<th className="text-truncate text-wrap">Descripción</th>
							<th className="text-truncate text-wrap">Tipo</th>
							<th className="text-truncate text-wrap">Estado de Conservación</th>
							<th className="text-truncate text-wrap">Edad</th>
							<th className="text-truncate text-wrap">VUT</th>
							<th className="text-truncate text-wrap">Cantidad</th>
							<th className="text-truncate text-wrap">Unidad</th>
							<th className="text-truncate text-wrap">
								Valor Unitario de Reposición Nuevo
							</th>
							<th className="text-truncate text-wrap">Factor de Edad</th>
							<th className="text-truncate text-wrap">
								Factor de Estado de Conservación
							</th>
							<th className="text-truncate text-wrap">
								Valor Unitario de Reposición Reposición
							</th>
							<th className="text-truncate text-wrap">Importe</th>
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
												update({
													key: "description",
													index,
													value: event.target.value,
												}),
											)
										}
									/>
								</td>
								<td>
									<select
										className="form-select form-select-sm"
										value={item.type}
										onChange={(event) =>
											dispatch(
												update({
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
												(item: any) =>
													item.id === Number(event.target.value),
											);
											dispatch(
												update({
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
								<td style={{ minWidth: 70 }}>
									<FancyInput
										index={index}
										name="age.value"
										value={item.age.value}
										onChange={(event: any) =>
											dispatch(
												update({
													key: "age",
													index,
													object: "value",
													value: Number(event.target.value),
												}),
											)
										}
									/>
								</td>
								<td style={{ minWidth: 70 }}>
									<FancyInput
										index={index}
										name="vut"
										value={item.vut}
										onChange={(event: any) =>
											dispatch(
												update({
													key: "vut",
													index,
													value: Number(event.target.value),
												}),
											)
										}
									/>
								</td>
								<td style={{ minWidth: 70 }}>
									<FancyInput
										index={index}
										name="quantity.value"
										value={item.quantity.value}
										onChange={(event: any) =>
											dispatch(
												update({
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
												update({
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
								<td style={{ minWidth: 120 }}>
									<FancyInput
										index={index}
										name="unitCost.value"
										value={item.unitCost.value}
										onChange={(event: any) =>
											dispatch(
												update({
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
								<td>{toFancyNumber(Number(item.age.factor.toFixed(3)))}</td>
								<td>
									<span
										data-tip
										data-for={`state of conservation factor value explain ${index}`}
									>
										{toFancyNumber(
											Number(item.stateOfConservationFactor.value.toFixed(3)),
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
								<td>{toFancyNumber(Number(item.unitCost.net.toFixed(3)), true)}</td>
								<td>
									{toFancyNumber(Number(item.unitCost.result.toFixed(3)), true)}
								</td>
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
									className="btn btn-sm btn-primary "
									onClick={() => dispatch(addRow())}
									autoFocus
								>
									Agregar Fila
								</button>
							</td>
							<td colSpan={6} className="text-end">
								{data.length > 1 ? (
									<button
										className="btn btn-sm btn-outline-danger"
										onClick={() => dispatch(removeRow())}
									>
										Remover ultima fila
									</button>
								) : null}
							</td>
						</tr>
					</Footer>
				</Table>
			) : (
				<Spinner />
			)}
		</div>
	);
}
