/** @format */
import { useNavigate } from "react-router";

import "primereact/resources/themes/tailwind-light/theme.css";
import { Table, Button } from "flowbite-react";
import { NavLink } from "react-router-dom";
import {
	useGetCedulasQuery,
	useDeleteCedulaMutation,
	usePostCedulaMutation,
} from "@api/Comparables";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Alert from "@components/Alerts";

export default function Comparables() {
	// const { uid } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useGetCedulasQuery();
	const [
		deleteCedula,
		{ isLoading: isLoadingDelete, isError: isErrorDeleting, error: errorDelete },
	] = useDeleteCedulaMutation();
	const [postCedula, { isLoading: isLoadingPost, isError: isErrorPost, error: errorPost }] =
		usePostCedulaMutation();
	if (isError || isErrorDeleting || isErrorPost)
		return <Error message={error?.data || errorDelete?.data || errorPost?.data} />;
	if (isLoading || isLoadingDelete || isLoadingPost) return <Spinner size={20} />;
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
							inputPlaceholder: "registro",
						})
							.then(({ isConfirmed, value }) => {
								if (isConfirmed) {
									postCedula({ registro: value });
								}
							})
							.finally(() => navigate(0))
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
					{data?.data?.map(({ id, fecha, registro }, index) => (
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
									to={`cedulas/${id}`}
								>
									Ver Cédulas
								</NavLink>
								<span className="mx-2">/</span>

								<button
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									onClick={() =>
										Alert.Warning({
											titleText: "Advertencia",
											messageText:
												"Esta seguro que desea eliminar este registro",
											showCancelButton: true,
											confirmButtonText: "Eliminar",
											cancelButtonText: "Cancelar",
										}).then(({ isConfirmed }) => {
											if (isConfirmed) {
												deleteCedula({ id });
												return navigate(0);
											}
										})
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
