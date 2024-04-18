/** @format */
import { useNavigate } from "react-router";
import { useState } from "react";
import "primereact/resources/themes/tailwind-light/theme.css";
import { Table, Button, Tooltip } from "flowbite-react";
import { NavLink, useParams } from "react-router-dom";
import { usePreviewMutation, usePostComparableMutation } from "@api/Comparables";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Alert from "@components/Alerts";
import Input from "@components/Input";
import Select from "@components/Input/select";
import { Toggle } from "@components/Toggle";
const initialState = (id_cedula_mercado: number) => ({
	tipo: "TERRENO",
	id_cedula_mercado,
	id_comparable_catcom: "",
	zoom: 1,
	margins: {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
	},
	dpi: 300,
});
export default function Create() {
	const { cedula_mercado } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState(initialState(parseInt(cedula_mercado)));
	const [enableProperties, setEnableProperties] = useState(false);
	const [preview, setPreview] = useState({
		status: false,
		file: undefined,
	});
	const handleInputChange = ({ target }) => setData({ ...data, [target.name]: target.value });
	const handleMargins = ({ target }) =>
		setData({ ...data, margins: { ...data.margins, [target.name]: target.value } });
	const [
		postComparable,
		{ isLoading: isLoadingPost, isError: isErrorPost, error: errorPost, isSuccess },
	] = usePostComparableMutation();
	const [
		getPreview,
		{ isLoading: isLoadingPreview, isError: isErrorPreview, error: errorPreview, data: file },
	] = usePreviewMutation();
	if (isErrorPost || isErrorPreview)
		return <Error message={errorPost?.data || errorPreview?.data} />;
	if (isLoadingPost || isLoadingPreview) return <Spinner size={20} />;
	return (
		<div className="overflow-auto mx-3">
			<div className="flex flex-row py-2">
				<NavLink to={-1}>
					<Button pill color="light">
						Regresar
					</Button>
				</NavLink>
			</div>
			<Table striped hoverable>
				<Table.Body>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>Tipo</strong>
						</Table.Cell>
						<Table.Cell>
							<Select
								name="tipo"
								onClick={(tipo: string) => setData({ ...data, tipo })}
								options={[
									{ value: "TERRENO", label: "Terreno" },
									{ value: "RENTA", label: "Renta" },
									{ value: "VENTA", label: "Venta" },
								]}
							/>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>ID Comparable</strong>
						</Table.Cell>
						<Table.Cell>
							<Input
								min={1}
								name="id_comparable_catcom"
								type="number"
								variant="outline"
								size="lg"
								value={data.id_comparable_catcom}
								onChange={handleInputChange}
							/>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell colSpan={2}>
							<Toggle
								size="sm"
								variant="primary"
								checked={enableProperties}
								onChange={() => setEnableProperties(!enableProperties)}
							>
								Propiedades del documento
							</Toggle>
						</Table.Cell>
					</Table.Row>
					{enableProperties && (
						<>
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
										value={data.zoom * 100}
										onChange={({ target }) =>
											setData({ ...data, zoom: target.value / 100 })
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
										value={data.margins.left}
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
										value={data.margins.top}
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
										value={data.margins.right}
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
										value={data.margins.bottom}
										onChange={handleMargins}
									/>
								</Table.Cell>
							</Table.Row>
						</>
					)}
				</Table.Body>
			</Table>
			<div className="flex flex-row-reverse py-2">
				<Button.Group>
					<Button pill color="light" disabled={preview.file === undefined}>
						<Tooltip content="Se habilitara si require una preview de los documentos">
							{preview.status ? "Ocultar" : "Mostrar"}
						</Tooltip>
					</Button>

					<Button pill onClick={() => getPreview({ ...data, as_report: "cedula" })}>
						<Tooltip content="Previsualizar Documento">Cédula de Mercado</Tooltip>
					</Button>

					<Button pill onClick={() => getPreview({ ...data, as_report: "mercado" })}>
						<Tooltip content="Previsualizar Documento">Mercado</Tooltip>
					</Button>

					<Button
						pill
						color="success"
						onClick={() => {
							Alert.Question({
								titleText: "¿Esta seguro de la información?",
								confirmButtonText: "Guardar",
								showCancelButton: true,
								cancelButtonText: "Cancelar",
							}).then(({ isConfirmed }) => {
								if (isConfirmed) {
									postComparable(data);
									setData(initialState(parseInt(cedula_mercado)));
									navigate(-1);
								}
							});
						}}
					>
						Guardar
					</Button>
				</Button.Group>
			</div>
			{preview.status && (
				<div className="flex items-center justify-center h-full">
					<iframe
						title="PDF Viewer"
						className="w-full aspect-video h-full"
						data-type="application/pdf"
						width={window.innerWidth}
						height={window.innerHeight * 0.8}
						seamless={true}
						src={`${preview.file}#zoom=${window.innerWidth * 0.05}`}
						allow="clipboard-write; encrypted-media;"
						allowFullScreen
					/>
				</div>
			)}
		</div>
	);
}
