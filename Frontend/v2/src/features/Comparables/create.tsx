/** @format */
import { useNavigate } from "react-router";
import { useState } from "react";
import "primereact/resources/themes/tailwind-light/theme.css";
import { Table, Button } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { useGetCedulas, deleteCedula } from "@api/Comparables";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Alert from "@components/Alerts";
import Input from "@components/Input";
import { Toggle } from "@components/toggle";
export default function Create() {
	const [data, setData] = useState({
		tipo: "",
		id_comparable_catcom: "",
		zoom: 1,
		margin_left: 0,
		margin_top: 0,
		margin_right: 0,
		margin_bottom: 0,
		dpi: 300,
	});
	const [enableProperties, setEnableProperties] = useState(false);
	const handleInputChange = ({ target }) => setData({ ...data, [target.name]: target.value });
	return (
		<div className="overflow-auto">
			<Table striped hoverable>
				<Table.Body>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>tipo</strong>
						</Table.Cell>
						<Table.Cell>select</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>id_comparable_catcom</strong>
						</Table.Cell>
						<Table.Cell>
							<Input
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
							<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell>
									<strong>Margen Izquierdo</strong>
								</Table.Cell>
								<Table.Cell>
									<Input
										name="margin_left"
										type="number"
										variant="outline"
										min={0}
										max={20}
										step={1}
										size="lg"
										value={data.margin_left}
										onChange={handleInputChange}
									/>
								</Table.Cell>
							</Table.Row>
							<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell>
									<strong>Margen Superior</strong>
								</Table.Cell>
								<Table.Cell>
									<Input
										name="margin_top"
										type="number"
										variant="outline"
										min={0}
										max={20}
										step={1}
										size="lg"
										value={data.margin_top}
										onChange={handleInputChange}
									/>
								</Table.Cell>
							</Table.Row>
							<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell>
									<strong>Margen Derecho</strong>
								</Table.Cell>
								<Table.Cell>
									<Input
										name="margin_right"
										type="number"
										variant="outline"
										min={0}
										max={20}
										step={1}
										size="lg"
										value={data.margin_right}
										onChange={handleInputChange}
									/>
								</Table.Cell>
							</Table.Row>
							<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
								<Table.Cell>
									<strong>Margen Inferior</strong>
								</Table.Cell>
								<Table.Cell>
									<Input
										name="margin_bottom"
										type="number"
										variant="outline"
										min={0}
										max={20}
										step={1}
										size="lg"
										value={data.margin_bottom}
										onChange={handleInputChange}
									/>
								</Table.Cell>
							</Table.Row>
						</>
					)}
				</Table.Body>
			</Table>
		</div>
	);
}
