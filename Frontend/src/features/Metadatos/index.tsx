/** @format */
import { NavLink } from "react-router-dom";

import "primereact/resources/themes/tailwind-light/theme.css";
import { Table } from "@components/Table";
import { ScrollPanel } from "primereact/scrollpanel";
import { useGetMetadatosQuery } from "@api/Metadatos";
import { IMetadatos } from "@api/Metadatos/types";
import Spinner from "@components/Spinner";
import Error from "../Error";
export default function Metadatos() {
	const { data, isLoading, isError, error } = useGetMetadatosQuery(null);
	if (isError) return <Error message={error} />;
	if (isLoading) return <Spinner size={20} />;

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
			<Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<Table.Header className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<Table.Row>
						<Table.Head scope="col" class="px-6 py-3">
							Nombre de la Tabla
						</Table.Head>
						<Table.Head scope="col" class="px-6 py-3">
							Schema de Origen
						</Table.Head>
						<Table.Head scope="col" class="px-6 py-3">
							Título
						</Table.Head>
						<Table.Head scope="col" class="px-6 py-3">
							Propósito
						</Table.Head>
						<Table.Head scope="col" class="px-6 py-3">
							Descripción
						</Table.Head>
						<Table.Head scope="col" class="px-6 py-3">
							<span className="sr-only">Editar</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{data?.data?.features?.map(
						(
							{ uid, table_name, schema_name, title, purpose, abstract }: IMetadatos,
							index,
						) => (
							<Table.Row
								className={`${
									index % 2 === 0
										? "bg-gray-100 dark:bg-gray-600"
										: "bg-white  dark:bg-gray-800"
								} border-b dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-blue-600`}
								key={uid}
							>
								<Table.Cell
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{table_name}
								</Table.Cell>
								<Table.Cell>{schema_name}</Table.Cell>
								<Table.Cell>
									<p className=" text-justify">{title}</p>
								</Table.Cell>
								<Table.Cell className="px-6 py-4 w-fit hover:h-52">
									<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
										{purpose}
									</p>
								</Table.Cell>

								<Table.Cell className="px-6 py-4 w-fit hover:h-52">
									<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
										{abstract}
									</p>
								</Table.Cell>
								<Table.Cell className="px-6 py-4 text-right">
									<NavLink
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										to={`edit/${uid}`}
									>
										Edit
									</NavLink>
								</Table.Cell>
							</Table.Row>
						),
					)}
				</Table.Body>
			</Table>
		</div>
	);
}
