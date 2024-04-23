/** @format */

import Spinner from "@components/Spinner";
import Alert from "@components/Alerts";
import blankDocument from "../../assets/blank.pdf";
import { usePreviewMutation } from "@api/Comparables";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Error from "../Error";
import Input from "@components/Input";
import { Button, Table } from "flowbite-react";
export const DocumentViewer = ({
	width = window.innerWidth,
	height = window.innerHeight * 0.8,
}: any) => {
	const { id, cedula_mercado, as_report, tipo } = useParams();
	const [file, setFile] = useState(blankDocument);
	const [properties, setProperties] = useState({
		zoom: 1,
		margins: {
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
		},
		dpi: 300,
	});

	const [template, setTemplate] = useState(true);
	// const { data, isLoading, isError, error } = useViewMetadatoReportQuery({ uid });
	const [requestFile, { data, isLoading, isError, error, isUninitialized, isSuccess }] =
		usePreviewMutation();
	// console.log(data);
	useEffect(() => {
		// if (isUninitialized)
		requestFile({
			id_cedula_mercado: cedula_mercado,
			id_comparable_catcom: id,
			as_report,
			tipo,
			data: properties,
		});
	}, []);
	useEffect(() => {
		if (data !== undefined && template && isSuccess) {
			setFile(URL.createObjectURL(data));
			setTemplate(false);
		}
	}, [data, template, isSuccess]);
	if (isError) {
		setFile(blankDocument);
		setTemplate(true);
		return <Error message={error?.data} />;
	}
	if (isLoading) return <Spinner size={20} />;
	const handleInputChange = ({ target }) =>
		setProperties({ ...data, [target.name]: target.value });
	const handleMargins = ({ target }) =>
		setProperties({
			...properties,
			margins: { ...properties.margins, [target.name]: target.value },
		});
	return (
		<div className="flex-col my-3 items-center justify-center h-full">
			<div className="flex flex-row justify-between">
				<NavLink to={`/comparables/cedulas/${cedula_mercado}`}>
					<Button pill color="light">
						Atras
					</Button>
				</NavLink>

				<Button
					pill
					color="light"
					onClick={(e) => {
						e.preventDefault();
						requestFile({
							id_cedula_mercado: cedula_mercado,
							id_comparable_catcom: id,
							as_report,
							tipo,
							data: properties,
						});
						return 0;
					}}
				>
					Ajustar Propiedades de la Hoja
				</Button>
			</div>
			<Table>
				<Table.Body>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>Zoom</strong>
						</Table.Cell>
						<Table.Cell>
							<Input
								name="zoom"
								type="number"
								variant="outline"
								min={0}
								max={100}
								step={1}
								size="lg"
								value={properties.zoom * 100}
								onChange={({ target }) =>
									setProperties({ ...properties, zoom: target.value / 100 })
								}
							/>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell colSpan={2} className="text-center">
							<strong>Margenes</strong>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>Izquierdo</strong>
						</Table.Cell>
						<Table.Cell>
							<Input
								name="left"
								type="number"
								variant="outline"
								min={0}
								max={20}
								step={1}
								size="lg"
								value={properties.margins.left}
								onChange={handleMargins}
							/>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>Superior</strong>
						</Table.Cell>
						<Table.Cell>
							<Input
								name="top"
								type="number"
								variant="outline"
								min={0}
								max={20}
								step={1}
								size="lg"
								value={properties.margins.top}
								onChange={handleMargins}
							/>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>Derecho</strong>
						</Table.Cell>
						<Table.Cell>
							<Input
								name="right"
								type="number"
								variant="outline"
								min={0}
								max={20}
								step={1}
								size="lg"
								value={properties.margins.right}
								onChange={handleMargins}
							/>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>Inferior</strong>
						</Table.Cell>
						<Table.Cell>
							<Input
								name="bottom"
								type="number"
								variant="outline"
								min={0}
								max={20}
								step={1}
								size="lg"
								value={properties.margins.bottom}
								onChange={handleMargins}
							/>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<div className="flex flex-row mt-3 w-full aspect-video h-full">
				<iframe
					title="PDF Viewer"
					className="w-full aspect-video h-full"
					data-type="application/pdf"
					width={width}
					height={height}
					seamless={true}
					src={`${file}#zoom=${window.innerWidth * 0.05}`}
					allow="clipboard-write; encrypted-media;"
					allowFullScreen
				/>
			</div>
		</div>
	);
};
export default DocumentViewer;
