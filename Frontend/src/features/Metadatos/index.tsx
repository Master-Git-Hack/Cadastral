/** @format */
import { NavLink } from "react-router-dom";

import "primereact/resources/themes/tailwind-light/theme.css";
import { Table } from "flowbite-react";
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
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
			<Table>
				<Table.Head className="text-center">
					<Table.HeadCell>Nombre de la Tabla</Table.HeadCell>
					<Table.HeadCell>Schema de Origen</Table.HeadCell>
					<Table.HeadCell>Título</Table.HeadCell>
					<Table.HeadCell>Propósito</Table.HeadCell>
					<Table.HeadCell>Descripción</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Editar</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{data?.data?.features?.map(
						({
							uid,
							table_name,
							schema_name,
							title,
							purpose,
							abstract,
						}: IMetadatos) => (
							<Table.Row
								className="bg-white dark:border-gray-700 dark:bg-gray-800 min-h-screen"
								key={uid}
							>
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
									{table_name}
								</Table.Cell>
								<Table.Cell>{schema_name}</Table.Cell>
								<Table.Cell>
									<p className=" text-justify">{title}</p>
								</Table.Cell>
								<Table.Cell className=" w-fit hover:h-52">
									<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
										{purpose}
									</p>
								</Table.Cell>

								<Table.Cell className=" w-fit hover:h-52">
									<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
										{abstract}
									</p>
								</Table.Cell>
								<Table.Cell>
									<NavLink
										className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
										to={`/metadatos/edit/${uid}`}
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
