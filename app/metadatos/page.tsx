/** @format */

"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";

import Layout from "@/components/navbar/index";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { IMetaTable } from "./types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import ImportXML from "./create/xml_import";
const PreviousVersions = ({ id, open, setOpen }: any) => {
	const { getPrevious, setMetadatos: setMeta } = useMedatados((state) => state);
	const [metadatos, setMetadatos] = useState([]);
	const handleGetPrevious = async () => {
		const { data } = await getPrevious(id);
		setMetadatos(data?.data as any);
	};

	useEffect(() => {
		if (metadatos?.length === 0) handleGetPrevious();
	}, [metadatos]);
	return (
		<Drawer
			open={open}
			onClose={() => setOpen(false)}
			onOpenChange={(isOpen) => setOpen(isOpen)}
		>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Versiones Anteriores</DrawerTitle>
					<DrawerDescription>
						Aqui estan todas las versiones previas a la seleccionada
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className="mb-5">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[250px]">
									Nombre de la Base de Datos
								</TableHead>
								<TableHead className="w-[250px]">Nombre del Schema</TableHead>
								<TableHead className="w-[250px]">Nombre de la Tabla</TableHead>
								<TableHead className="w-[100px]">Titulo</TableHead>
								<TableHead>Proposito</TableHead>
								<TableHead>Resumen</TableHead>
								<TableHead>Usuario</TableHead>
								<TableHead className="w-[50px]">Versión</TableHead>
								<TableHead>Ultima Actualización</TableHead>
								<TableHead className="text-right">
									<span className="sr-only">Acciones</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{metadatos?.map(
								({
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
									...metaData
								}: IMetaTable) => (
									<TableRow key={uid}>
										<TableCell className="font-medium text-center w-[250px]">
											{db_name
												.split("_")
												?.map(
													(word: string) =>
														word.charAt(0).toUpperCase() +
														word.slice(1),
												)
												.join(" ")}
										</TableCell>
										<TableCell className="font-medium text-center w-[250px]">
											{schema_name
												.split("_")
												?.map(
													(word: string) =>
														word.charAt(0).toUpperCase() +
														word.slice(1),
												)
												.join(" ")}
										</TableCell>
										<TableCell className="font-medium text-center w-[250px]">
											{table_name
												.split("_")
												?.map(
													(word: string) =>
														word.charAt(0).toUpperCase() +
														word.slice(1),
												)
												.join(" ")}
										</TableCell>
										<TableCell className="font-bold text-justify capitalize w-[100px]">
											{title}
										</TableCell>
										<TableCell className="font-small">
											<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
												{purpose}
											</p>
										</TableCell>
										<TableCell className="font-small">
											<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
												{abstract}
											</p>
										</TableCell>
										<TableCell>{username}</TableCell>
										<TableCell className="text-center w-[50px]">
											{version}
										</TableCell>
										<TableCell>
											{new Date(update_date).toLocaleDateString("es-ES", {
												year: "numeric", // Ejemplo: 2023
												month: "long", // Ejemplo: octubre
												day: "numeric", // Ejemplo: 25
											})}
										</TableCell>
										<TableCell className="text-right">
											<DropdownMenu>
												<DropdownMenuTrigger className="text-blue-600">
													Acciones...
												</DropdownMenuTrigger>
												<DropdownMenuContent>
													<DropdownMenuLabel>Edición</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem>
														<Link
															href={`/metadatos/${uid}/edit?page=1`}
															className="transition-colors hover:text-blue-500 "
															onClick={() =>
																setMeta({
																	uid,
																	db_name,
																	table_name,
																	schema_name,
																	title,
																	purpose,
																	abstract,
																	username,
																	update_date,
																	...metaData,
																})
															}
														>
															<Button
																variant="link"
																onClick={() => {}}
															>
																Editar
															</Button>
														</Link>
													</DropdownMenuItem>
													<DropdownMenuLabel>Reporte</DropdownMenuLabel>
													<DropdownMenuItem>
														<Link
															href={`/metadatos/${uid}/view`}
															className="transition-colors hover:text-blue-500"
														>
															<Button
																variant="link"
																onClick={() => {}}
															>
																PDF
															</Button>
														</Link>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								),
							)}
						</TableBody>
					</Table>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
import useMedatados from "@/store/metadatos/index";

export default function Metadatos() {
	const {
		getAllTemporal,
		getMetadatos,
		setMetadatos: setMeta,
		clearMetadatos,
		deleteTemporal,
		exportAsXML,
		newVersion,
	} = useMedatados((state) => state);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState(0);
	const router = useRouter();
	const [metadatos, setMetadatos] = useState<IMetaTable[]>([]);
	const [temporal, setTemporal] = useState([]);
	const handleGetTmp = async () => {
		const { data } = await getAllTemporal(router);
		setTemporal(data?.data as any);
	};
	const handleGetMeta = async () => {
		const { data } = await getMetadatos(router);
		setMetadatos(data?.data as any);
	};
	useEffect(() => {
		if (metadatos?.length === 0) handleGetMeta();
		if (temporal?.length === 0) handleGetTmp();
	}, [metadatos, temporal]);
	return (
		<Layout container>
			<div className="flex flex-row-reverse py-2">
				<Link href={`metadatos/create?page=1`} onClick={clearMetadatos} className="ms-5">
					<Button>Nuevo Registro</Button>
				</Link>
				<ImportXML />
			</div>
			<Table>
				<TableCaption className="mt-5 pt-5">Registros Pendientes</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[250px] text-center">
							Nombre de la Base de Datos
						</TableHead>
						<TableHead className="w-[250px] text-center">Nombre del Schema</TableHead>
						<TableHead className="w-[250px] text-center">Nombre de la Tabla</TableHead>
						<TableHead className="w-[100px] text-center">Titulo</TableHead>
						<TableHead className="text-center">Proposito</TableHead>
						<TableHead className="text-center">Resumen</TableHead>
						<TableHead className="text-center">Usuario</TableHead>
						<TableHead className="w-[50px] text-center">Versión</TableHead>
						<TableHead className="text-justify">Ultima Actualización</TableHead>
						<TableHead className="text-left">
							<span className="sr-only">Acciones</span>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{metadatos
						?.sort((a, b) => a?.title.localeCompare(b?.title))
						?.map(
							({
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
								...metaData
							}: IMetaTable) => (
								<TableRow key={uid}>
									<TableCell className="font-small  w-[250px]">
										{db_name
											.split("_")
											?.map(
												(word: string) =>
													word.charAt(0).toUpperCase() + word.slice(1),
											)
											.join(" ")}
									</TableCell>
									<TableCell className="font-small  w-[250px]">
										{schema_name
											.split("_")
											?.map(
												(word: string) =>
													word.charAt(0).toUpperCase() + word.slice(1),
											)
											.join(" ")}
									</TableCell>
									<TableCell className="font-small  w-[250px]">
										{table_name
											.split("_")
											?.map(
												(word: string) =>
													word.charAt(0).toUpperCase() + word.slice(1),
											)
											.join(" ")}
									</TableCell>
									<TableCell className="font-bold text-justify capitalize w-[100px]">
										{title}
									</TableCell>
									<TableCell className="font-small">
										<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
											{purpose}
										</p>
									</TableCell>
									<TableCell className="font-small">
										<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
											{abstract}
										</p>
									</TableCell>
									<TableCell>{username}</TableCell>
									<TableCell className="text-center w-[50px]">
										{version}
									</TableCell>
									<TableCell>
										{new Date(update_date).toLocaleDateString("es-ES", {
											year: "numeric", // Ejemplo: 2023
											month: "long", // Ejemplo: octubre
											day: "numeric", // Ejemplo: 25
										})}
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger className="text-blue-600">
												Acciones...
											</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuLabel>Versiones</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem>
													<Link href={`#new_version`}>
														<Button
															variant="link"
															onClick={async () =>
																(await newVersion(id)) &&
																window.location.reload(true)
															}
														>
															Cambiar de Versión
														</Button>
													</Link>
												</DropdownMenuItem>
												{version > 1 && (
													<DropdownMenuItem>
														<Link href={`#previous_versions`}>
															<Button
																variant="link"
																onClick={() => {
																	setId(id);
																	setTimeout(
																		() => setOpen(true),
																		1500,
																	);
																}}
															>
																Versiones Anteriores
															</Button>
														</Link>
													</DropdownMenuItem>
												)}

												<DropdownMenuLabel>Edición</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem>
													<Link
														href={`/metadatos/${uid}/edit?page=1`}
														className="transition-colors hover:text-blue-500 "
														onClick={() =>
															setMeta({
																uid,
																db_name,
																table_name,
																schema_name,
																title,
																purpose,
																abstract,
																username,
																update_date,
																...metaData,
															})
														}
													>
														<Button
															variant="link"
															onClick={() =>
																setMeta({
																	uid,
																	db_name,
																	table_name,
																	schema_name,
																	title,
																	purpose,
																	abstract,
																	username,
																	update_date,
																	...metaData,
																})
															}
														>
															Editar
														</Button>
													</Link>
												</DropdownMenuItem>
												<DropdownMenuLabel>Exportar</DropdownMenuLabel>
												<DropdownMenuItem>
													<Link
														href={`/metadatos/${uid}/view`}
														className="transition-colors hover:text-blue-500"
													>
														<Button variant="link">PDF</Button>
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Link
														href={`/metadatos#xml`}
														className="transition-colors hover:text-blue-500"
													>
														<Button
															variant="link"
															onClick={async () => {
																try {
																	const response =
																		await exportAsXML(
																			uid,
																			router,
																		);

																	// Create a link element
																	const link =
																		document.createElement("a");

																	// Create an object URL for the blob and set it as the link's href
																	link.href = URL.createObjectURL(
																		response.data,
																	);

																	// Set the file name for download (the name of the file being downloaded)
																	link.download = `${uid}.xml`;

																	// Append the link to the document and simulate a click to start the download
																	document.body.appendChild(link);
																	link.click();

																	// Clean up: remove the link element after clicking
																	document.body.removeChild(link);
																} catch (error) {
																	console.error(
																		"Error downloading file:",
																		error,
																	);
																}
															}}
														>
															XML
														</Button>
													</Link>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							),
						)}
				</TableBody>
			</Table>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[250px]">Nombre de la Base de Datos</TableHead>
						<TableHead className="w-[250px]">Nombre del Schema</TableHead>
						<TableHead className="w-[250px]">Nombre de la Tabla</TableHead>
						<TableHead className="w-[100px]">Titulo</TableHead>
						<TableHead>Proposito</TableHead>
						<TableHead>Resumen</TableHead>
						<TableHead>Usuario</TableHead>
						<TableHead>Ultima Actualización</TableHead>
						<TableHead className="text-right">
							<span className="sr-only">Acciones</span>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{temporal?.map(
						({
							uid,
							datos,
							username,

							update_date,
						}) => (
							<TableRow key={uid}>
								<TableCell className="font-medium">
									{datos?.db_name
										?.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</TableCell>
								<TableCell className="font-medium">
									{datos?.schema_name
										?.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</TableCell>
								<TableCell className="font-medium">
									{datos?.table_name
										?.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</TableCell>
								<TableCell className="font-bold">{datos?.title}</TableCell>
								<TableCell className="font-small">
									<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
										{datos?.purpose}
									</p>
								</TableCell>
								<TableCell className="font-small">
									<p className="whitespace-nowrap overflow-hidden text-ellipsis hover:text-clip hover:whitespace-normal w-80 hover:overflow-clip hover:text-justify hover:max-h-52 hover:overflow-y-scroll hover:px-2">
										{datos?.abstract}
									</p>
								</TableCell>
								<TableCell>{username}</TableCell>
								<TableCell>
									{new Date(update_date).toLocaleDateString("es-ES", {
										year: "numeric", // Ejemplo: 2023
										month: "long", // Ejemplo: octubre
										day: "numeric", // Ejemplo: 25
									})}
								</TableCell>
								<TableCell className="text-right">
									<Link
										href={`/metadatos/${uid}/edit?page=1&temporal=true`}
										className="transition-colors hover:text-blue-500"
									>
										<Button
											variant="link"
											onClick={() =>
												setMeta({
													uid,
													...datos,
													username,

													update_date,
												})
											}
											// onClick={() => setMeta({ ...data, ...datos, uid })}
										>
											Editar
										</Button>
									</Link>
									<span className="mx-2">/</span>
									<Link
										href={`#`}
										className="text-red-400 transition-colors hover:text-red-600"
										onClick={async () => {
											await deleteTemporal(uid).then(() =>
												window.location.reload(true),
											);
										}}
									>
										Eliminar
									</Link>
								</TableCell>
							</TableRow>
						),
					)}
				</TableBody>
			</Table>
			{id !== 0 && <PreviousVersions id={id} open={open} setOpen={setOpen} />}
		</Layout>
	);
}
