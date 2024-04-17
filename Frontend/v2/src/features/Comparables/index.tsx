/** @format */
import { useNavigate } from "react-router";

import "primereact/resources/themes/tailwind-light/theme.css";
import { Table, Button } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { useGetCedulasMercadoQuery } from "@api/Comparables";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Alert from "@components/Alerts";
export default function Comparables() {
	// const { uid } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useGetCedulasMercadoQuery();
	if (isError) return <Error message={error?.data} />;
	if (isLoading) return <Spinner size={20} />;

	return (
		<div className="overflow-auto">
			<div className="flex flex-row-reverse py-2">
				<Button
					pill
					color="light"
					onClick={() =>
						Alert({
							titleText: "Insertar un nuevo registro",
							input: "text",
							inputLabel: "Registro",
							confirmButtonText: "Agregar",
							showCancelButton: true,
							cancelButtonText: "Cancelar",
						}).then(({ isConfirmed, value }) => {
							if (isConfirmed) {
								console.log(value);
							}
						})
					}
				>
					Nuevo Registro
				</Button>
			</div>
			<Table striped hoverable>
				<Table.Head>
					<Table.HeadCell>#</Table.HeadCell>
					<Table.HeadCell>Fecha</Table.HeadCell>
					<Table.HeadCell>Registro</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Editar</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{data?.data?.forEach(({ id, fecha, registro }, index) => (
						<Table.Row
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
							key={index}
						>
							<Table.Cell>
								<p className=" text-justify">{id}</p>
							</Table.Cell>
							<Table.Cell>
								<p className=" text-justify">{fecha}</p>
							</Table.Cell>
							<Table.Cell>
								<p className=" text-justify">{registro}</p>
							</Table.Cell>
							<Table.Cell className="px-6 py-4 text-right">
								<NavLink
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									to={`view/${id}`}
								>
									Ver
								</NavLink>
								<span className="mx-2">/</span>
								<NavLink
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									to={`tipo/${tipo}`}
								>
									Crear Comparables
								</NavLink>
								<span className="mx-2">/</span>

								<button
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									onClick={() =>
										Alert.Warning({
											titleText: "Advertencia",
											messageText:
												"Esta seguro que desea eliminar este registro",
										}).then(
											({ isConfirmed }) =>
												isConfirmed &&
												// deleteTemporal({ uid }) &&
												navigate(0),
										)
									}
								>
									Eliminar
								</button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}
