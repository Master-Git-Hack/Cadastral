/** @format */

import { DocumentViewer } from "../../components/DocumentViewer";
import { useAppDispatch } from "../../redux";
import { Grid, Row, Col } from "rsuite";
import { Input } from "../../components/Input";
import { InputNumber } from "../../components/Input/Number";
import { Switch } from "../../components/Input/Switch";
import { InputRange } from "../../components/Input/Range";
import { Custom as Select } from "../../components/Input/Select";
import { PopPanel } from "../../components/PopPanel";
import { ComparableProps } from "./comparable.types";
import { useEffect, useState } from "react";
import moment from "moment";
import {
	addDocument,
	removeDocument,
	setLimits,
	setValues,
	setDefaultProperties,
	setMoreProperties,
	setMargins,
	setDocument,
	setLoading,
	handleProperties,
	handleMoreProperties,
	changeStatus,
} from "../../redux/comparables";
import { Alert } from "../../utils/alert";
import { Button } from "../../components/Button";

export const Comparable = ({
	filename,
	id,
	status,
	message,
	document,
	folio,
	type,
	zoom,

	moreProperties: {
		dpi,
		pageSize,
		margins: { top, right, bottom, left },
	},
	...props
}: ComparableProps) => {
	const dispatch = useAppDispatch();
	const [properties, setProperties] = useState(false);
	const [showProperties, setShowProperties] = useState(false);

	const handleCommonChanges = (key: string, value: number | string | boolean) => {
		dispatch(setValues({ id: id - 1, key, value }));
	};

	const handleDefaultProperties = (value: boolean) => {
		dispatch(setDefaultProperties({ id: id - 1, value }));
	};

	const handlerMoreProperties = (key: string, value: number | string) => {
		dispatch(setMoreProperties({ id: id - 1, key, value }));
	};

	const handleMargins = (key: string, value: number) => {
		dispatch(setMargins({ id: id - 1, key, value: !isNaN(value) ? value : 0 }));
	};

	const handleDocument = () => {
		// dispatch(setLoading(id - 1));
	};
	useEffect(() => {
		status.includes("fail") && Alert.Error({ title: "Error", text: message });
		if (status.includes("loading")) {
			const url = `CATASTRAL/Reportes/GET/${filename}`;
			const payload = {
				filename,
				id,
				status,
				message,
				document,
				zoom,
				moreProperties: {
					dpi,
					pageSize,
					margins: { top, right, bottom, left },
				},
				folio,
				type,
			};
			// dispatch(post({ url, responseType: "blob", payload }))
			// 	.unwrap()
			// 	.then((file: any) =>
			// 		dispatch(
			// 			setDocument({
			// 				id: id - 1,
			// 				document: URL.createObjectURL(file),
			// 				status: "success",
			// 			}),
			// 		),
			// 	)
			// 	.catch((error: any) =>
			// 		dispatch(setDocument({ id: id - 1, status: "fail", message: error.message })),
			// 	);
		}
	}, [status]);
	return (
		<Grid fluid className="mx-5 px-5">
			<Row className="mt-1 mb-2">
				<Col
					xs={24}
					sm={12}
					md={12}
					lg={6}
					xl={6}
					xxl={6}
					className="text-center  my-auto py-1 "
				>
					<p>
						<strong>Folio</strong>
					</p>

					{/* <InputNumber
						min={0}
						max={9999}
						value={collection}
						onChange={(value: number) => {
							//only accept numbers of 4 digits
							handleCommonChanges(
								"collection",
								!isNaN(value)
									? value.toString().slice(0, 4).replace(".", "").replace(",", "")
									: 0,
							);
						}}
					/> */}
				</Col>
				<Col
					xs={24}
					sm={12}
					md={12}
					lg={18}
					xl={18}
					xxl={18}
					className="text-center  my-auto py-1 "
				>
					<Input.Text value={folio} onChange={(e) => {}} />
				</Col>
			</Row>
			<Row className="mt-1 mb-2">
				<Col
					xs={24}
					sm={12}
					md={12}
					lg={6}
					xl={6}
					xxl={6}
					className="text-center  my-auto py-1 "
				>
					<p>
						<strong>Tipo</strong>
					</p>

					{/* <InputNumber
						min={0}
						max={9999}
						value={collection}
						onChange={(value: number) => {
							//only accept numbers of 4 digits
							handleCommonChanges(
								"collection",
								!isNaN(value)
									? value.toString().slice(0, 4).replace(".", "").replace(",", "")
									: 0,
							);
						}}
					/> */}
				</Col>
				<Col
					xs={24}
					sm={12}
					md={12}
					lg={18}
					xl={18}
					xxl={18}
					className="text-center  my-auto py-1 "
				>
					<Select
						label="Tipo de Comparable"
						searchable={false}
						block
						size="lg"
						value={type}
						data={["terreno", "renta", "venta"].map((label) => ({
							label: label.charAt(0).toUpperCase() + label.slice(1),
							value: label,
						}))}
						onSelect={(value: string) => handlerMoreProperties("type", value)}
					/>
				</Col>
			</Row>
			<Row>
				{/* <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="py-2">
					<Switch
						size="md"
						withText
						checked={watermark}
						label="Marca de Agua"
						onChange={(value: boolean) => handleCommonChanges("watermark", value)}
					/>
				</Col> */}
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="py-2">
					<Switch
						size="md"
						withText
						checked={properties}
						label="Usar Propiedes Recomendadas (más comunes)"
						onChange={(value: boolean) => {
							setProperties(value);
							value && setTimeout(() => handleDefaultProperties(value), 1000);
						}}
					/>
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="py-2">
					<Switch
						size="md"
						withText
						checked={showProperties}
						label="Mostrar Propiedades"
						onChange={(value: boolean) =>
							setTimeout(() => setShowProperties(value), 1000)
						}
					/>
				</Col>
			</Row>
			<Row className="my-4 mx-5 text-center">
				<p>
					<strong>Zoom de la Página: </strong>
					{(zoom * 100).toFixed(0)}
				</p>
				<InputRange
					min={0.5}
					max={2}
					step={0.05}
					value={zoom}
					onChange={(value: number) => handleCommonChanges("zoom", value)}
					customTooltip={(value: number) => (value * 100).toFixed(0)}
				/>
			</Row>
			{showProperties && (
				<>
					<Row className="my-2">
						<Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="my-2">
							<Select
								label="Tipo de página"
								searchable={false}
								block
								size="lg"
								value={pageSize}
								data={["A4", "Carta"].map((label) => ({
									label,
									value: label.includes("Carta") ? "Letter" : label,
								}))}
								onSelect={(value: string) =>
									handlerMoreProperties("pageSize", value)
								}
							/>
						</Col>
						<Col
							xs={12}
							sm={12}
							md={12}
							lg={12}
							xl={12}
							xxl={12}
							className="my-auto px-5 text-center"
						>
							<p>
								<strong>Nivel de DPI: </strong>
								{dpi}
							</p>
							<InputRange
								min={300}
								max={2000}
								step={100}
								value={dpi}
								customTooltip={(value: number) => value}
								onChange={(value: number) => handlerMoreProperties("dpi", value)}
							/>
						</Col>
					</Row>
					<Row>
						<Col
							xs={24}
							sm={24}
							md={24}
							lg={24}
							xl={24}
							xxl={24}
							className="text-center"
						>
							<strong>Márgenes del Documento</strong>
						</Col>
					</Row>
					<Row className="my-4">
						<Col
							xs={24}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							xxl={6}
							className="text-center my-auto py-1"
						>
							<p>
								<strong>Superior: </strong>
								{top}
							</p>
							<InputNumber
								min={0}
								max={20}
								value={top}
								onChange={(value: number) =>
									handleMargins("top", !isNaN(value) ? value : 0)
								}
							/>
						</Col>
						<Col
							xs={24}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							xxl={6}
							className="text-center my-auto py-1"
						>
							<p>
								<strong>Inferior: </strong>
								{bottom}
							</p>
							<InputNumber
								min={0}
								max={20}
								value={bottom}
								onChange={(value: number) =>
									handleMargins("bottom", !isNaN(value) ? value : 0)
								}
							/>
						</Col>
						<Col
							xs={24}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							xxl={6}
							className="text-center my-auto py-1"
						>
							<p>
								<strong>Izquierdo: </strong>
								{left}
							</p>
							<InputNumber
								min={0}
								max={20}
								value={left}
								onChange={(value: number) =>
									handleMargins("left", !isNaN(value) ? value : 0)
								}
							/>
						</Col>
						<Col
							xs={24}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							xxl={6}
							className="text-center my-auto py-1"
						>
							<p>
								<strong>Derecho: </strong>
								{right}
							</p>
							<InputNumber
								min={0}
								max={20}
								value={right}
								onChange={(value: number) =>
									handleMargins("right", !isNaN(value) ? value : 0)
								}
							/>
						</Col>
					</Row>
				</>
			)}
			<Row className="mt-5">
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="text-end">
					<PopPanel
						size="full"
						btnAppearance="primary"
						action={`Previsualizar Documento ${id}`}
						customPanelActions={
							<Button onClick={() => handleDocument()}>
								Solicitar Documentos Nuevamente
							</Button>
						}
						onEnter={() => {
							status.includes("success") &&
								Alert.Ask({
									title: "¿Desea continuar?",
									text: "Se solicitarán los documentos nuevamente, si solo desea visualizar el documento, presione cancelar",
								}).then(
									({ isConfirmed }) =>
										() =>
											handleDocument(),
								);
							!status.includes("success") && handleDocument();
						}}
					>
						<DocumentViewer status={status} document={document} />
					</PopPanel>
				</Col>
			</Row>
		</Grid>
	);
};
