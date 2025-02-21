/** @format */

"use client";

import { NavLink, redirect } from "react-router-dom";

import "primereact/resources/themes/tailwind-light/theme.css";
//import { Table } from "@components/Table";
import { useState, useEffect } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import moment from "moment";
import {
	useGetMetadatosQuery,
	useGetMetadatoReportMutation,
	useGetAllTemporalQuery,
	useDeleteTemporalMutation,
	useNewVersionMutation,
	usePreviousVersionMutation,
} from "@api/Metadatos";
import type { IMetadatos } from "@api/Metadatos/types";
import Spinner from "@components/Spinner";
import Alert from "@components/Alerts";
import Error from "../Error";
import { Table, Button } from "flowbite-react";
import { saveAs } from "file-saver";
import Toast from "@components/Alerts";
import { useLocation, useNavigate } from "react-router-dom";
import { MetadatosApi } from "@api/Metadatos";
import { useDispatch } from "react-redux";
import { Dialog } from "primereact/dialog";
const Previous = ({ setVisible, visible = false, id }) => {
	const [request, { data, isLoading, isError, error }] =
		usePreviousVersionMutation();
	useEffect(() => {
		request({ id });
	}, []);
	return (
		<Dialog
			header="Versiones Previas"
			maximizable
			visible={visible}
			onHide={() => {
				if (!visible) return;
				setVisible(false);
			}}
			style={{ width: "50vw" }}
			breakpoints={{ "960px": "75vw", "641px": "100vw" }}
		>
			<Table striped hoverable>
				<Table.Head>
					<Table.HeadCell>Nombre de la Base de Datos</Table.HeadCell>
					<Table.HeadCell>Nombre del Schema</Table.HeadCell>
					<Table.HeadCell>Nombre de la Tabla</Table.HeadCell>
					<Table.HeadCell>Titulo</Table.HeadCell>
					<Table.HeadCell>Proposito</Table.HeadCell>
					<Table.HeadCell>Resumen</Table.HeadCell>
					<Table.HeadCell>Usuario</Table.HeadCell>
					<Table.HeadCell>Versión</Table.HeadCell>
					<Table.HeadCell>Ultima Actualización</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Editar</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{data?.data?.map(
						(
							{
								uid,
								db_name,
								table_name,
								schema_name,
								title,
								purpose,
								abstract,
								username,
								update_date,
								version,
							}: IMetadatos,
							index: number,
						) => (
							<Table.Row
								className="bg-white dark:border-gray-700 dark:bg-gray-800"
								key={index}
							>
								<Table.Cell>
									{db_name
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
									<p className=" text-justify capitalize">{title}</p>
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
								<Table.Cell>{username}</Table.Cell>
								<Table.Cell className="text-center">{version}</Table.Cell>
								<Table.Cell>
									{new Date(update_date).toLocaleDateString("es-ES", {
										year: "numeric", // Ejemplo: 2023
										month: "long", // Ejemplo: octubre
										day: "numeric", // Ejemplo: 25
									})}
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
		</Dialog>
	);
};
export default function Metadatos() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { data, isLoading, isError, error, refetch } = useGetMetadatosQuery();
	const [id, setId] = useState(0);
	const {
		data: temporal,
		isLoading: isLoadingTemporal,
		isError: isErrorTemporal,
		error: errorTemporal,
		refetch: refetchTemporal,
	} = useGetAllTemporalQuery();
	const [deleteTemporal] = useDeleteTemporalMutation();
	const [newVersion] = useNewVersionMutation();
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		// Verifica si existe el parámetro 'refresh'
		if (location.state?.refresh) {
			refetch({ force: true });
			refetchTemporal({ force: true });
			setTimeout(() => {
				console.log("Refrescando");
			}, 900);
			// Elimina el parámetro 'refresh' después de cargar los datos
			navigate("/metadatos", { state: {} });
		}
	}, [location.state, navigate]);
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
					<Table.HeadCell>Nombre de la Base de Datos</Table.HeadCell>
					<Table.HeadCell>Nombre del Schema</Table.HeadCell>
					<Table.HeadCell>Nombre de la Tabla</Table.HeadCell>
					<Table.HeadCell>Titulo</Table.HeadCell>
					<Table.HeadCell>Proposito</Table.HeadCell>
					<Table.HeadCell>Resumen</Table.HeadCell>
					<Table.HeadCell>Usuario</Table.HeadCell>
					<Table.HeadCell>Versión</Table.HeadCell>
					<Table.HeadCell>Ultima Actualización</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Editar</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{[...data?.data]
						?.sort((a, b) => a?.title.localeCompare(b?.title))
						.map(
							(
								{
									id,
									uid,
									db_name,
									table_name,
									schema_name,
									title,
									purpose,
									abstract,
									username,
									update_date,
									version,
								}: IMetadatos,
								index: number,
							) => (
								<Table.Row
									className="bg-white dark:border-gray-700 dark:bg-gray-800"
									key={index}
								>
									<Table.Cell>
										{db_name
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
										<p className=" text-justify capitalize">{title}</p>
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
									<Table.Cell>{username}</Table.Cell>
									<Table.Cell className="text-center">{version}</Table.Cell>
									<Table.Cell>
										{new Date(update_date).toLocaleDateString("es-ES", {
											year: "numeric", // Ejemplo: 2023
											month: "long", // Ejemplo: octubre
											day: "numeric", // Ejemplo: 25
										})}
									</Table.Cell>
									<Table.Cell className="px-6 py-4 text-right">
										<NavLink
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
											to={`#new_version`}
										>
											<a
												onClick={async () => {
													const { data } = await newVersion({ id });
													console.log(data);
													//edit/${uid}
													return navigate(`/metadatos/edit/${data?.data?.uid}`);
												}}
											>
												Nueva Versión
											</a>
										</NavLink>
										<span className="mx-2">/</span>
										{version > 1 && (
											<>
												<NavLink
													className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
													to={`#previous_version`}
												>
													<a
														onClick={() => {
															setId(id);
															setTimeout(() => setVisible(true), 1500);
														}}
													>
														Versiones Previas
													</a>
												</NavLink>
												<span className="mx-2">/</span>
											</>
										)}

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
						<Table.HeadCell>Nombre de la Base de Datos</Table.HeadCell>
						<Table.HeadCell>Nombre de la Tabla</Table.HeadCell>
						<Table.HeadCell>Nombre del Schema</Table.HeadCell>
						<Table.HeadCell>Titulo</Table.HeadCell>
						<Table.HeadCell>Proposito</Table.HeadCell>
						<Table.HeadCell>Resumen</Table.HeadCell>
						<Table.HeadCell>Usuario</Table.HeadCell>
						<Table.HeadCell>Ultima Actualización</Table.HeadCell>
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
										db_name: "",
										table_name: "",
										schema_name: "",
										title: "",
										purpose: "",
										abstract: "",
									},
									username = "",
									fecha_creacion = "",
									fecha_modificacion = "",
								}: IMetadatos,
								index: number,
							) => (
								<Table.Row
									className="bg-white dark:border-gray-700 dark:bg-gray-800"
									key={index}
								>
									<Table.Cell>
										{datos?.db_name
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
									<Table.Cell>{username}</Table.Cell>
									<Table.Cell>
										{new Date(fecha_modificacion).toLocaleDateString("es-ES", {
											year: "numeric", // Ejemplo: 2023
											month: "long", // Ejemplo: octubre
											day: "numeric", // Ejemplo: 25
										})}
									</Table.Cell>
									<Table.Cell className="px-6 py-4 text-right">
										<NavLink
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
											to={`temporal/edit/${uid}`}
											state={{ refresh: true }}
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
			{id !== 0 && (
				<Previous id={id} visible={visible} setVisible={setVisible} />
			)}
		</div>
	);
}
