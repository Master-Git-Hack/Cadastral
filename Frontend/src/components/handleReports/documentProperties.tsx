/** @format */
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import {
	getState,
	addDocument,
	removeDocument,
	handleProperties,
	handleMoreProperties,
	getReport,
} from "../../features/handleReports/slice";
import { Viewer } from "../pdf/viewer/viewer";
import pdfIcon from "bootstrap-icons/icons/file-pdf.svg";
import eye from "bootstrap-icons/icons/eye.svg";
import eyeSlash from "bootstrap-icons/icons/eye-slash.svg";
import fileAdd from "bootstrap-icons/icons/file-earmark-plus.svg";
import fileRemove from "bootstrap-icons/icons/file-earmark-minus.svg";

export const DocumentProperties = (props: { saveButton: any }) => {
	const dispatch = useAppDispatch();
	const { reports } = useAppSelector(getState);
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-hover table-stripped ">
			<thead className="table-light align-self-middle align-middle text-center">
				<tr>
					<th className="text-start">
						<button
							className="btn btn-sm btn-primary"
							onClick={() => dispatch(addDocument())}
						>
							Agregar otra seccion{" "}
							<img src={fileAdd} alt="file" className="mb-1 bg-primary" />
						</button>
					</th>
					<th className="text-end">
						{reports.length > 1 ? (
							<button
								className="btn btn-sm btn-outline-danger"
								onClick={() => dispatch(removeDocument())}
							>
								Remover seccion <img src={fileRemove} alt="file" className="mb-1" />
							</button>
						) : null}
					</th>
				</tr>
				<tr>
					<th>Propiedades del Documento</th>
					<th>Vista Previa</th>
				</tr>
			</thead>
			<tbody>
				<Body data={reports} dispatch={dispatch} />
			</tbody>
			<tfoot>
				{reports.length > 1 ? (
					<tr>
						<td />
						<td className="text-end">{props.saveButton}</td>
					</tr>
				) : null}
			</tfoot>
		</table>
	);
};
const Body = (props: { data: any; dispatch: Function }) =>
	props.data.map((item: any, index: number) =>
		item.showHide ? (
			<tr key={`document properties for reports ${index}`} className="text-center">
				<td>
					<div className="container">
						<div className="row">
							<div className="col text-start">
								<h6 className="text-start badge rounded-pill bg-info">
									Documento: {item.id}
								</h6>
							</div>
							<div className="col text-end">
								<button
									className="btn btn-sm btn-outline-warning text-end"
									onClick={() =>
										props.dispatch(
											handleProperties({
												itemName: "showHide",
												itemID: index,
												value: !item.showHide,
											}),
										)
									}
								>
									Ocultar <img src={eyeSlash} alt="file" className="mb-1" />
								</button>
							</div>
						</div>
					</div>
					<div className="container mt-2">
						<div className="row text-center px-5">
							<div className="col px-2">
								<div className="mx-auto border-0">
									Identificador:
									<input
										type="text"
										value={item.collection}
										className="form-control form-control-sm"
										onChange={(event) =>
											props.dispatch(
												handleProperties({
													itemName: "collection",
													itemID: index,
													value: event.target.value,
												}),
											)
										}
									/>
								</div>
							</div>
							<div className="col px-2">
								<div className="mx-auto">
									Inicio:
									<input
										type="number"
										value={item.limits.min}
										className="form-control form-control-sm"
										id="floatingInput-Inicio"
										onChange={(event) =>
											props.dispatch(
												handleProperties({
													itemName: "limits",
													itemID: index,
													value: {
														max: item.limits.max,
														min: Number(event.target.value),
													},
												}),
											)
										}
									/>
								</div>
							</div>
							<div className="col px-2">
								<div className="mx-auto">
									Fin:
									<input
										type="number"
										value={item.limits.max}
										className="form-control form-control-sm"
										id="floatingInput-Fin"
										onChange={(event) =>
											props.dispatch(
												handleProperties({
													itemName: "limits",
													itemID: index,
													value: {
														min: item.limits.min,
														max: Number(event.target.value),
													},
												}),
											)
										}
									/>
								</div>
							</div>
							<div className="col px-2">
								<div className="mx-auto">
									Año:
									<input
										type="number"
										value={item.year}
										className="form-control form-control-sm"
										id="floatingInput-Anio"
										onChange={(event) =>
											props.dispatch(
												handleProperties({
													itemName: "year",
													itemID: index,
													value: event.target.value,
												}),
											)
										}
									/>
								</div>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col">
								{"De "}
								<strong>{`${item.collection}_${item.limits.min}_${item.year
									.toString()
									.slice(2, 4)}`}</strong>
								{" a "}
								<strong>{`${item.collection}_${item.limits.max}_${item.year
									.toString()
									.slice(2, 4)}`}</strong>
							</div>
						</div>
						<div className="row text-center px-5">
							<div className="col-sm-6 mt-4">
								<div className="form-check form-switch text-start">
									<label className="form-check-label">
										Usar propiedades recomendadas
									</label>
									<input
										className="form-check-input"
										type="checkbox"
										checked={item.recommendedProperties}
										onChange={(event) =>
											props.dispatch(
												handleProperties({
													itemName: "recommendedProperties",
													itemID: index,
													value: event.target.checked,
												}),
											)
										}
									/>
								</div>
								<div className="form-check form-switch text-start">
									<label className="form-check-label ">Marca de Agua</label>
									<input
										className="form-check-input"
										type="checkbox"
										checked={item.watermark}
										onChange={(event) =>
											props.dispatch(
												handleProperties({
													itemName: "watermark",
													itemID: index,
													value: event.target.checked,
												}),
											)
										}
									/>
								</div>
								<div className="form-check form-switch text-start">
									<label className="form-check-label ">Mostrar Propiedades</label>
									<input
										className="form-check-input"
										type="checkbox"
										checked={item.showProperties}
										onChange={(event) =>
											props.dispatch(
												handleProperties({
													itemName: "showProperties",
													itemID: index,
													value: event.target.checked,
												}),
											)
										}
									/>
								</div>
							</div>
							<div className="col-sm-6 mt-4">
								<label className="form-label">
									Zoom de la pagina: {(item.zoom * 100).toFixed(0)}
								</label>
								<input
									value={item.zoom}
									type="range"
									className="form-range"
									min="0.5"
									max="2"
									step="0.05"
									onChange={(event) =>
										props.dispatch(
											handleProperties({
												itemName: "zoom",
												itemID: index,
												value: event.target.value,
											}),
										)
									}
								/>
							</div>
						</div>
						{item.showProperties ? (
							<div className="text-center px-5 border-top mt-4">
								<div className="row">
									<div className="col">
										<label className="form-label">Tipo de Pagina:</label>
										<select
											className="form-select "
											value={item.moreProperties.pageSize}
											onChange={(event) =>
												props.dispatch(
													handleMoreProperties({
														itemName: "pageSize",
														itemID: index,
														value: event.target.value,
													}),
												)
											}
										>
											<option value="A4">A4</option>
											<option value="Letter">Carta</option>
										</select>
									</div>
									<div className="col">
										<label className="form-label">
											Nivel de DPI: {item.moreProperties.dpi}
										</label>
										<input
											value={item.moreProperties.dpi}
											type="range"
											className="form-range"
											min="300"
											max="2000"
											step="100"
											onChange={(event) =>
												props.dispatch(
													handleMoreProperties({
														itemName: "dpi",
														itemID: index,
														value: Number(event.target.value),
													}),
												)
											}
										/>
									</div>
								</div>
								<p className="mt-4">Margenes del documento</p>
								<div className="row px-5">
									<div className="col">
										<div className="form-floating form-floating-sm">
											<input
												type="number"
												value={item.moreProperties.margins.top}
												className="form-control form-control-sm"
												id="floatingInput-Margin-Top"
												onChange={(event) =>
													props.dispatch(
														handleMoreProperties({
															itemName: "margins",
															itemID: index,
															value: {
																...item.moreProperties.margins,
																top: Number(event.target.value),
															},
														}),
													)
												}
											/>
											<label htmlFor="floatingInput-Margin-Top">
												Superior:{" "}
												<strong>{item.moreProperties.margins.top}</strong>
											</label>
										</div>
									</div>
									<div className="col">
										<div className="form-floating form-floating-sm">
											<input
												type="number"
												value={item.moreProperties.margins.bottom}
												className="form-control form-control-sm"
												id="floatingInput-Margin-Bottom"
												onChange={(event) =>
													props.dispatch(
														handleMoreProperties({
															itemName: "margins",
															itemID: index,
															value: {
																...item.moreProperties.margins,
																bottom: Number(event.target.value),
															},
														}),
													)
												}
											/>
											<label htmlFor="floatingInput-Margin-Bottom">
												Inferior:{" "}
												<strong>
													{item.moreProperties.margins.bottom}
												</strong>
											</label>
										</div>
									</div>
								</div>
								<div className="row px-5 mt-3">
									<div className="col">
										<div className="form-floating form-floating-sm">
											<input
												type="number"
												value={item.moreProperties.margins.left}
												className="form-control form-control-sm"
												id="floatingInput-Margin-Left"
												onChange={(event) =>
													props.dispatch(
														handleMoreProperties({
															itemName: "margins",
															itemID: index,
															value: {
																...item.moreProperties.margins,
																left: Number(event.target.value),
															},
														}),
													)
												}
											/>
											<label htmlFor="floatingInput-Margin-Left">
												Superior:{" "}
												<strong>{item.moreProperties.margins.left}</strong>
											</label>
										</div>
									</div>
									<div className="col">
										<div className="form-floating form-floating-sm">
											<input
												type="number"
												value={item.moreProperties.margins.right}
												className="form-control form-control-sm"
												id="floatingInput-Margin-Right"
												onChange={(event) =>
													props.dispatch(
														handleMoreProperties({
															itemName: "margins",
															itemID: index,
															value: {
																...item.moreProperties.margins,
																right: Number(event.target.value),
															},
														}),
													)
												}
											/>
											<label htmlFor="floatingInput-Margin-Right">
												Inferior:{" "}
												<strong>{item.moreProperties.margins.right}</strong>
											</label>
										</div>
									</div>
								</div>
							</div>
						) : null}
						<div className="row mt-4">
							<div className="col" />
							<div className="col text-end">
								<button
									className="btn btn-sm btn-outline-success"
									onClick={() =>
										props.dispatch(
											getReport({
												report: item,
												dispatch: props.dispatch,
											}),
										)
									}
								>
									Vista Previa <img src={pdfIcon} className="mb-1" alt="Pdf" />
								</button>
							</div>
						</div>
					</div>
				</td>
				<td width="430">
					<Viewer document={item.document} status={item.status} />
				</td>
			</tr>
		) : (
			<tr key={`document properties hided for reports ${index}`} className=" text-center">
				<td>
					<h6 className="text-start badge rounded-pill bg-info">Documento: {item.id}</h6>
				</td>
				<td>
					<button
						className="btn btn-sm btn-info"
						onClick={() =>
							props.dispatch(
								handleProperties({
									itemName: "showHide",
									itemID: index,
									value: !item.showHide,
								}),
							)
						}
					>
						Mostrar Documento {index > 0 ? item.id : null}{" "}
						<img src={eye} alt="file" className="mb-1" />
					</button>
				</td>
			</tr>
		),
	);
