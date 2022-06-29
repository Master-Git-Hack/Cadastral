/** @format */

import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../hooks/store";
import { Viewer } from "../../pdf/viewer/viewer";
import {
	setLimits,
	setValues,
	setDefaultProperties,
	setMoreProperties,
	setMargins,
	consumeReport,
	setDocument,
	setLoading,
} from "../../../features/catastral/avaluosSlice";
import moment from "moment";
import { FloatingInput } from "../../inputs/floatingInput";
export const DocumentProperties = (props: {
	id: number;
	filename: string;
	status: string;
	message: string;
	document: any;
	limits: any;
	year: number;
	collection: number;
	watermark: boolean;
	zoom: number;
	moreProperties: any;
}) => {
	const {
		filename,
		id,
		status,
		message,
		document,
		limits,
		year,
		collection,
		watermark,
		zoom,
		moreProperties,
	} = props;
	console.log(props);
	const dispatch = useAppDispatch();
	const [showProperties, setShowProperties] = useState(false);
	const [properties, setProperties] = useState(false);
	const [width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		window.innerWidth !== width && setWidth(width);
	}, [window.innerWidth]);
	const min =
		limits.min < 10
			? String(!isNaN(limits.min) ? limits.min : 0).padStart(2, "0")
			: !isNaN(limits.min)
			? limits.min
			: "00";
	const max =
		limits.max < 10
			? String(!isNaN(limits.max) ? limits.max : 0).padStart(2, "0")
			: !isNaN(limits.max)
			? limits.max
			: "00";
	const handleCommonChanges = (key: string, value: number | string | boolean) =>
		dispatch(setValues({ id, key, value }));
	const handleDefaultProperties = (value: boolean) =>
		dispatch(setDefaultProperties({ id, value }));
	const handlerMoreProperties = (key: string, value: number | string) =>
		dispatch(setMoreProperties({ id, key, value }));
	const handleMargins = (key: string, value: number) =>
		dispatch(setMargins({ id, key, value: !isNaN(value) ? value : 0 }));

	const handleDocument = () => dispatch(setLoading(id));
	useEffect(() => {
		status.includes("fail") && alert(message);
		if (status.includes("loading")) {
			const url = `CATASTRAL/Reportes/GET/${filename}`;
			const payload = {
				...props,
				limits: { min, max },
				collection: collection.toString().padStart(4, "0"),
				year: year.toString().slice(2, 4),
			};
			console.log(payload);
			dispatch(consumeReport.post({ url, responseType: "blob", payload }))
				.unwrap()
				.then((response) => {
					console.log(response);
					dispatch(
						setDocument({
							id,
							document: URL.createObjectURL(response.payload),
							status: "success",
						}),
					);
				})
				.catch((error) =>
					dispatch(setDocument({ id, status: "fail", message: error.message })),
				);
		}
	}, [status]);

	return (
		<div className="row">
			<div className="col-6">
				<div className="row justify-content-center justify-content-sm-center text-center">
					<FloatingInput
						index={id}
						classNames="col"
						minWidth={200}
						name="collection"
						tag="Identificador"
						type="number"
						value={collection}
						valueToShow={
							!isNaN(collection) ? collection.toString().padStart(4, "0") : "0000"
						}
						maxLength={4}
						min={0}
						step={1}
						max={9999}
						onChange={(event) =>
							handleCommonChanges(
								"collection",
								!isNaN(collection)
									? event.currentTarget.valueAsNumber
											.toString()
											.slice(0, 4)
											.replace(".", "")
											.replace(",", "")
									: 0,
							)
						}
					/>
					{console.log(width)}
					<FloatingInput
						index={id}
						classNames="col"
						minWidth={200}
						name="min"
						tag="Inicio"
						type="number"
						value={limits.min}
						valueToShow={min}
						min={1}
						step={1}
						max={9999}
						onChange={(event) =>
							dispatch(
								setLimits({
									id,
									key: "min",
									value: !isNaN(limits.min)
										? event.currentTarget.valueAsNumber
										: 0,
								}),
							)
						}
					/>

					<FloatingInput
						index={id}
						classNames="col"
						minWidth={200}
						name="max"
						tag="Termino"
						type="number"
						value={limits.max}
						valueToShow={max}
						min={1}
						step={1}
						max={9999}
						onChange={(event) =>
							dispatch(
								setLimits({
									id,
									key: "max",
									value: !isNaN(limits.max)
										? event.currentTarget.valueAsNumber
										: 0,
								}),
							)
						}
					/>

					<FloatingInput
						index={id}
						classNames="col"
						minWidth={200}
						name="year"
						tag="Año"
						type="number"
						value={year}
						valueToShow={
							!isNaN(year)
								? year.toString().slice(2, 4)
								: moment().year().toString().slice(2, 4)
						}
						min={2000}
						max={moment().year() + 1}
						onChange={(event) =>
							handleCommonChanges(
								"year",
								!isNaN(year)
									? event.currentTarget.valueAsNumber.toString().slice(0, 4)
									: moment().year(),
							)
						}
					/>
				</div>
				<div className="row text-center">
					<p className="col">
						{min !== max ? "Desde " : "Recuperar "}"
						<strong>{`${
							!isNaN(collection) ? collection.toString().padStart(4, "0") : "0000"
						}_${min}_${
							!isNaN(year)
								? year.toString().slice(2, 4)
								: moment().year().toString().slice(2, 4)
						}`}</strong>
						{min !== max && (
							<>
								"{" - hasta - "}"
								<strong>{`${collection.toString().padStart(4, "0")}_${max}_${
									!isNaN(year)
										? year.toString().slice(2, 4)
										: moment().year().toString().slice(2, 4)
								}`}</strong>
							</>
						)}
						" .
					</p>
				</div>
				<div className="col form-check form-switch text-start mb-3">
					<label className="form-check-label ">Marca de Agua</label>
					<input
						className="form-check-input"
						type="checkbox"
						checked={watermark}
						onChange={(event) =>
							handleCommonChanges("watermark", Boolean(event.target.checked))
						}
					/>
				</div>
				<div className="col form-check form-switch text-start mb-3">
					<label className="form-check-label ">Usar Propiedes Recomendadas</label>
					<input
						className="form-check-input"
						type="checkbox"
						checked={properties}
						onChange={(event) => {
							const value = event.currentTarget.checked;
							handleDefaultProperties(value);
							setProperties(value);
						}}
					/>
				</div>
				<div className="col form-check form-switch text-start">
					<label className="form-check-label ">Mostrar Propiedades</label>
					<input
						className="form-check-input"
						type="checkbox"
						checked={showProperties}
						onChange={(event) => setShowProperties(event.target.checked)}
					/>
				</div>

				<div className="row text-center" style={{ minWidth: 200 }}>
					<div className="col">
						<label className="form-label">
							Zoom de la pagina: {(zoom * 100).toFixed(0)}
						</label>
						<input
							value={zoom}
							type="range"
							className="form-range "
							min="0.5"
							max="2"
							step="0.05"
							onChange={(event) =>
								handleCommonChanges("zoom", event.currentTarget.valueAsNumber)
							}
						/>
					</div>
				</div>

				{showProperties && (
					<div className="row mt-2 text-center">
						<div className="row">
							<div className="col" style={{ minWidth: 200 }}>
								<label className="form-label">Tipo de Pagina:</label>
								<select
									className="form-select "
									value={moreProperties.pageSize}
									onChange={(event) =>
										handlerMoreProperties("pageSize", event.currentTarget.value)
									}
								>
									<option value="A4">A4</option>
									<option value="Letter">Carta</option>
								</select>
							</div>
							<div className="col my-auto" style={{ minWidth: 200 }}>
								<label className="form-label">
									Nivel de DPI: {moreProperties.dpi}
								</label>
								<input
									value={moreProperties.dpi}
									type="range"
									className="form-range"
									min="300"
									max="2000"
									step="100"
									onChange={(event) =>
										handlerMoreProperties(
											"dpi",
											event.currentTarget.valueAsNumber,
										)
									}
								/>
							</div>
						</div>
						<p className="mt-2">
							<strong>Margenes del documento</strong>
						</p>
						<div className="row w-100">
							<FloatingInput
								index={id}
								classNames="col"
								minWidth={200}
								name="margin-top"
								tag="Superior"
								type="number"
								value={moreProperties.margins.top}
								valueToShow={
									!isNaN(moreProperties.margins.top)
										? moreProperties.margins.top
										: 0
								}
								min={0}
								step={1}
								max={20}
								maxLength={2}
								onChange={(event) =>
									handleMargins(
										"top",
										!isNaN(moreProperties.margins.top)
											? event.currentTarget.valueAsNumber
											: 0,
									)
								}
							/>

							<FloatingInput
								index={id}
								classNames="col"
								minWidth={200}
								name="margin-bottom"
								tag="Inferior"
								type="number"
								value={moreProperties.margins.bottom}
								valueToShow={
									!isNaN(moreProperties.margins.bottom)
										? moreProperties.margins.bottom
										: 0
								}
								min={0}
								step={1}
								max={20}
								maxLength={2}
								onChange={(event) =>
									handleMargins(
										"bottom",
										!isNaN(moreProperties.margins.bottom)
											? event.currentTarget.valueAsNumber
											: 0,
									)
								}
							/>

							<FloatingInput
								index={id}
								classNames="col"
								minWidth={200}
								name="margin-left"
								tag="Izquierdo"
								type="number"
								value={moreProperties.margins.left}
								valueToShow={
									!isNaN(moreProperties.margins.left)
										? moreProperties.margins.left
										: 0
								}
								min={0}
								step={1}
								max={20}
								maxLength={2}
								onChange={(event) =>
									handleMargins(
										"left",
										!isNaN(moreProperties.margins.left)
											? event.currentTarget.valueAsNumber
											: 0,
									)
								}
							/>

							<FloatingInput
								index={id}
								classNames="col"
								minWidth={200}
								name="margin-right"
								tag="Derecho"
								type="number"
								value={moreProperties.margins.right}
								valueToShow={
									!isNaN(moreProperties.margins.right)
										? moreProperties.margins.right
										: 0
								}
								min={0}
								step={1}
								max={20}
								maxLength={2}
								onChange={(event) =>
									handleMargins(
										"right",
										!isNaN(moreProperties.margins.right)
											? event.currentTarget.valueAsNumber
											: 0,
									)
								}
							/>
						</div>
					</div>
				)}
				<div className="text-end my-4">
					<button
						className="btn btn-sm btn-outline-primary"
						onClick={() => handleDocument()}
					>
						Previsualizar Documento
					</button>
				</div>
			</div>

			<div className="col-6" style={{ minWidth: 200 }}>
				<Viewer document={document} status={status} />
			</div>
		</div>
	);
};
