/** @format */

"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Error from "@components/error";
import Layout from "@/components/navbar/index";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
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
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
const PreviousVersions = ({ id, open, setOpen }) => {
	const { getPrevious, setMetadatos: setMeta } = useMedatados((state) => state);
	const [metadatos, setMetadatos] = useState([]);
	const handleGetPrevious = async () => {
		const { data } = await getPrevious(id);
		console.log(data);
		setMetadatos(data?.data);
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
								}) => (
									<TableRow key={uid}>
										<TableCell className="font-medium text-center">
											{db_name
												.split("_")
												?.map(
													(word: string) =>
														word.charAt(0).toUpperCase() +
														word.slice(1),
												)
												.join(" ")}
										</TableCell>
										<TableCell className="font-medium text-center">
											{schema_name
												.split("_")
												?.map(
													(word: string) =>
														word.charAt(0).toUpperCase() +
														word.slice(1),
												)
												.join(" ")}
										</TableCell>
										<TableCell className="font-medium text-center">
											{table_name
												.split("_")
												?.map(
													(word: string) =>
														word.charAt(0).toUpperCase() +
														word.slice(1),
												)
												.join(" ")}
										</TableCell>
										<TableCell className="font-bold text-justify capitalize">
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
										<TableCell className="text-center">{version}</TableCell>
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
																onClick={() => {}}
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
															href={`/metadatos/${uid}/edit`}
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
import useMedatados from "@/store/metadatos/index.ts";
export default function Metadatos() {
	const { getAllTemporal, getMetadatos, setMetadatos: setMeta } = useMedatados((state) => state);
	const [open, setOpen] = useState(false);
	const [id, setId] = useState(0);
	const router = useRouter();
	const [metadatos, setMetadatos] = useState([]);
	const [temporal, setTemporal] = useState([]);
	const handleGetTmp = async () => {
		const { data } = await getAllTemporal(router);
		setTemporal(data?.data);
	};
	const handleGetMeta = async () => {
		const { data } = await getMetadatos(router);
		setMetadatos(data?.data);
	};
	useEffect(() => {
		if (metadatos.length === 0) handleGetMeta();
		if (temporal.length === 0) handleGetTmp();
	}, [metadatos, temporal]);
	return (
		<Layout container>
			<div className="flex flex-row-reverse py-2">
				<Link href={`metadatos/create?page=1`}>
					<Button>Nuevo Registro</Button>
				</Link>
			</div>
			<Table>
				<TableCaption className="mt-5 pt-5">Registros Pendientes</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[250px]">Nombre de la Base de Datos</TableHead>
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
					{metadatos.map(
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
						}) => (
							<TableRow key={uid}>
								<TableCell className="font-small text-center">
									{db_name
										.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</TableCell>
								<TableCell className="font-small text-center">
									{schema_name
										.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</TableCell>
								<TableCell className="font-small text-center">
									{table_name
										.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</TableCell>
								<TableCell className="font-bold text-justify capitalize">
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
								<TableCell className="text-center">{version}</TableCell>
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
													<Button variant="link" onClick={() => {}}>
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
													href={`/metadatos/${uid}/edit`}
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
													<Button variant="link" onClick={() => {}}>
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
													<Button variant="link" onClick={() => {}}>
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

							fecha_modificacion,
						}) => (
							<TableRow key={uid}>
								<TableCell className="font-medium">
									{datos?.db_name
										.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</TableCell>
								<TableCell className="font-medium">
									{datos?.schema_name
										.split("_")
										?.map(
											(word: string) =>
												word.charAt(0).toUpperCase() + word.slice(1),
										)
										.join(" ")}
								</TableCell>
								<TableCell className="font-medium">
									{datos?.table_name
										.split("_")
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
									{new Date(fecha_modificacion).toLocaleDateString("es-ES", {
										year: "numeric", // Ejemplo: 2023
										month: "long", // Ejemplo: octubre
										day: "numeric", // Ejemplo: 25
									})}
								</TableCell>
								<TableCell className="text-right">
									<Link
										href={`/metadatos/${uid}/edit?temporal=true`}
										className="transition-colors hover:text-blue-500"
									>
										Editar
									</Link>
									<span className="mx-2">/</span>
									<Link
										href={`#`}
										className="text-red-400 transition-colors hover:text-red-600"
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
