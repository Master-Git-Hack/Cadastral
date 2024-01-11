/** @format */

/** @format */
import { NavLink, redirect } from "react-router-dom";

import "primereact/resources/themes/tailwind-light/theme.css";
//import { Table } from "@components/Table";
import { useState, useEffect } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import {
	useGetMetadatosQuery,
	useGetMetadatoReportMutation,
	useGetAllTemporalQuery,
	useDeleteTemporalMutation,
} from "@api/Metadatos";
import { IMetadatos } from "@api/Metadatos/types";
import Spinner from "@components/Spinner";
import Alert from "@components/Alerts";
import Error from "../Error";
import { Table, Button } from "flowbite-react";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router";
import Toast from "@components/Alerts";

export default function Metadatos() {
	const navigate = useNavigate();

	const { data, isLoading, isError, error } = useGetMetadatosQuery();
	const {
		data: temporal,
		isLoading: isLoadingTemporal,
		isError: isErrorTemporal,
		error: errorTemporal,
	} = useGetAllTemporalQuery();
	const [deleteTemporal] = useDeleteTemporalMutation();
	if (isError || isErrorTemporal) return <Error message={error?.data} />;
	if (isLoading || isLoadingTemporal) return <Spinner size={20} />;

	return (
		<div className="overflow-auto">
			<div className="flex flex-row-reverse py-2">
				<NavLink to={`crear`}>
					<Button pill color="light">
						Nuevo Registro
					</Button>
				</NavLink>
			</div>
			<Table striped hoverable>
				<Table.Head>
					<Table.HeadCell>Nombre de la Tabla</Table.HeadCell>
					<Table.HeadCell>Nombre del Schema</Table.HeadCell>
					<Table.HeadCell>Titulo</Table.HeadCell>
					<Table.HeadCell>Proposito</Table.HeadCell>
					<Table.HeadCell>Resumen</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Editar</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{data?.data?.map(
						(
							{ uid, table_name, schema_name, title, purpose, abstract }: IMetadatos,
							index: number,
						) => (
							<Table.Row
								className="bg-white dark:border-gray-700 dark:bg-gray-800"
								key={index}
							>
								<Table.Cell
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{table_name
										.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</Table.Cell>
								<Table.Cell>
									{schema_name
										.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</Table.Cell>
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
										Editar
									</NavLink>
									<span className="mx-2">/</span>

									<NavLink
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										to={`view/${uid}`}
									>
										PDF
									</NavLink>
								</Table.Cell>
							</Table.Row>
						),
					)}
				</Table.Body>
			</Table>
			<div>
				<p className="text-center text-2xl mt-20 mb-10 text-black dark:text-white">
					Registros Pendientes
				</p>
			</div>
			{temporal?.data && (
				<Table striped hoverable>
					<Table.Head>
						<Table.HeadCell>Nombre de la Tabla</Table.HeadCell>
						<Table.HeadCell>Nombre del Schema</Table.HeadCell>
						<Table.HeadCell>Titulo</Table.HeadCell>
						<Table.HeadCell>Proposito</Table.HeadCell>
						<Table.HeadCell>Resumen</Table.HeadCell>
						<Table.HeadCell>
							<span className="sr-only">Editar</span>
						</Table.HeadCell>
					</Table.Head>
					<Table.Body>
						{temporal.data?.map(
							(
								{
									uid = "",
									datos = {
										table_name: "",
										schema_name: "",
										title: "",
										purpose: "",
										abstract: "",
									},
									fecha_creacion = "",
									fecha_modificacion = "",
								}: IMetadatos,
								index: number,
							) => (
								<Table.Row
									className="bg-white dark:border-gray-700 dark:bg-gray-800"
									key={index}
								>
									<Table.Cell
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{datos?.table_name
											.split("_")
											?.map(
												(word: string) =>
													word.charAt(0).toUpperCase() + word.slice(1),
											)
											.join(" ")}
									</Table.Cell>
									<Table.Cell>
										{datos?.schema_name
											.split("_")
											?.map(
												(word: string) =>
													word.charAt(0).toUpperCase() + word.slice(1),
											)
											.join(" ")}
									</Table.Cell>
									<Table.Cell>
										<p className=" text-justify">{datos?.title}</p>
									</Table.Cell>
									<Table.Cell className="px-6 py-4 w-fit hover:h-52">
										<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
											{datos?.purpose}
										</p>
									</Table.Cell>

									<Table.Cell className="px-6 py-4 w-fit hover:h-52">
										<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
											{datos?.abstract}
										</p>
									</Table.Cell>
									<Table.Cell className="px-6 py-4 text-right">
										<NavLink
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
											to={`edit/${uid}?type=temporal`}
										>
											Editar
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
														deleteTemporal({ uid }) &&
														navigate(0),
												)
											}
										>
											Eliminar
										</button>
									</Table.Cell>
								</Table.Row>
							),
						)}
					</Table.Body>
				</Table>
			)}
		</div>
	);
}
