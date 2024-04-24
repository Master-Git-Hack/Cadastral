/** @format */
import { useNavigate } from "react-router";

import "primereact/resources/themes/tailwind-light/theme.css";
import { Table, Button } from "flowbite-react";
import { NavLink, useParams } from "react-router-dom";
import {
	useGetComparablesQuery,
	useDeleteComparableMutation,
	useReportsMutation,
} from "@api/Comparables";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Alert from "@components/Alerts";
export default function Comparables() {
	const { cedula_mercado } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useGetComparablesQuery({ cedula_mercado });
	const [
		requestReports,
		{
			data: reports,
			isLoading: isReportsLoading,
			isError: isReportsError,
			error: reportsError,
		},
	] = useReportsMutation();
	if (isError || isReportsError) return <Error message={error?.data || reportsError?.data} />;
	if (isLoading || isReportsLoading) return <Spinner size={20} />;
	const ids = data?.data.map(({ id }) => id);

	return (
		<div className="overflow-auto">
			<div className="flex flex-row justify-between">
				<NavLink to={`/comparables`}>
					<Button pill color="light">
						Atras
					</Button>
				</NavLink>
				<Button.Group>
					<Button
						pill
						onClick={() =>
							requestReports({
								cedula_mercado,
								as_report: "mercado",
								data: { ids },
							})
						}
					>
						Ver Mercados
					</Button>
					<Button
						pill
						onClick={() =>
							requestReports({
								cedula_mercado,
								as_report: "cedula",
								data: { ids },
							})
						}
					>
						Ver Cédulas de Mercado
					</Button>
					<Button pill color="light">
						<NavLink to={`crear`}>Crear Nuevo Comparable</NavLink>
					</Button>
				</Button.Group>
			</div>

			<Table striped hoverable>
				<Table.Head>
					<Table.HeadCell>#</Table.HeadCell>
					<Table.HeadCell>Tipo</Table.HeadCell>
					<Table.HeadCell>Comparable</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Editar</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{data?.data?.map(({ id, tipo, id_comparable_catcom }, index) => (
						<Table.Row
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
							key={index}
						>
							<Table.Cell>
								<p className=" text-justify">{id}</p>
							</Table.Cell>
							<Table.Cell>
								<p className=" text-justify">{tipo}</p>
							</Table.Cell>
							<Table.Cell>
								<p className=" text-justify">{id_comparable_catcom}</p>
							</Table.Cell>
							<Table.Cell className="px-6 py-4 text-right">
								<NavLink
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									to={`view/${id}/mercado/${tipo}`}
								>
									Mercado
								</NavLink>
								<span className="mx-2">/</span>
								<NavLink
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									to={`view/${id}/cedula/${tipo}`}
								>
									Cedúla Mercado
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
