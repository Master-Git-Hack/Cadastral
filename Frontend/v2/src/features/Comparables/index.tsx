/** @format */
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import "primereact/resources/themes/tailwind-light/theme.css";
import { Table, Button } from "flowbite-react";
import { NavLink } from "react-router-dom";
import {
	useGetCedulasQuery,
	useDeleteCedulaMutation,
	usePostCedulaMutation,
	usePatchCedulaMutation,
} from "@api/Comparables";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Alert from "@components/Alerts";

export default function Comparables() {
	const { username } = useParams();
	const navigate = useNavigate();

	const { data, isLoading, isError, error } = useGetCedulasQuery({ username });
	const [
		deleteCedula,
		{ isLoading: isLoadingDelete, isError: isErrorDeleting, error: errorDelete },
	] = useDeleteCedulaMutation();
	const [postCedula, { isLoading: isLoadingPost, isError: isErrorPost, error: errorPost }] =
		usePostCedulaMutation();
	const [patchCedula] = usePatchCedulaMutation();
	if (isError || isErrorDeleting || isErrorPost)
		return <Error message={error?.data || errorDelete?.data || errorPost?.data} />;
	if (isLoading || isLoadingDelete || isLoadingPost) return <Spinner size={20} />;
	return (
		<div
			className={`overflow-auto ${username ? "w-full min-h-screen bg-white dark:bg-black antialiased tracking-tight" : ""}`}
		>
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
									postCedula({ registro: value, username });
								}
							})
							.finally(() => setTimeout(() => navigate(0), 1000))
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
								<button
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									onClick={() =>
										Alert({
											titleText: "Modificar registro",
											input: "text",
											inputLabel: `Registro:${registro}`,
											confirmButtonText: "Cambiar en nombre del registro",
											showCancelButton: true,
											cancelButtonText: "Cancelar",
											inputPlaceholder: "registro",
										})
											.then(({ isConfirmed, value }) => {
												if (isConfirmed) {
													patchCedula({
														id,
														data: { registro: value },
														username,
													});
												}
											})
											.finally(() => setTimeout(() => navigate(0), 1000))
									}
								>
									Editar
								</button>
								<span className="mx-2">/</span>
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
												deleteCedula({ id, username });
												return setTimeout(() => navigate(0), 1000);
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
