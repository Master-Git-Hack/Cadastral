/** @format */

"use client";
import { Danger, Success } from "@/components/ui/alert";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import FileButton from "@/components/ui/button-file";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Table } from "@/components/ui/table";
import useMedatados from "@/store/metadatos/index";
import useParser from "@/store/parser/index";
import { cn } from "@utils/index";
import { useRouter } from "next/navigation";
import { TreeSelect } from "primereact/treeselect";
import { useEffect, useState } from "react";
import { Section1 } from "./sections/section1";
import { Section2 } from "./sections/section2";
import { Section3 } from "./sections/section3";
import { Section4 } from "./sections/section4";
import { Section5 } from "./sections/section5";
import { Section6 } from "./sections/section6";
import { Section7 } from "./sections/section7";
import { Section8 } from "./sections/section8";
import { Section9 } from "./sections/section9";
enum MetadatoActions {
	PostMetadato = "POST_METADATO",
	PatchMetadato = "PATCH_METADATO",
	PostTemporal = "POST_TEMPORAL",
	PatchTemporal = "PATCH_TEMPORAL",
}
const SaveActions = ({ open, setOpen, uid, isTemporal }: any) => {
	const {
		postMetadato,
		patchMetadato,
		postTemporal,
		patchTemporal,
		clearMetadatos,
		...data
	} = useMedatados((state) => state);

	const router = useRouter();

	const handleSave = async (action: MetadatoActions) => {
		try {
			// Definición de los mensajes y métodos disponibles
			const actionMap = {
				[MetadatoActions.PostMetadato]: {
					message: {
						title: "Inserción Exitosa",
						text: "El registro se ha creado correctamente",
						type: "success",
					},
					method: postMetadato,
				},
				[MetadatoActions.PatchMetadato]: {
					message: {
						title: "Actualización Exitosa",
						text: "El registro se ha actualizado correctamente",
						type: "success",
					},
					method: patchMetadato,
				},
				[MetadatoActions.PostTemporal]: {
					message: {
						title: "Inserción Temporal Exitosa",
						text: "El registro temporal se ha creado correctamente",
						type: "success",
					},
					method: postTemporal,
				},
				[MetadatoActions.PatchTemporal]: {
					message: {
						title: "Actualización Temporal Exitosa",
						text: "El registro temporal se ha actualizado correctamente",
						type: "success",
					},
					method: patchTemporal,
				},
			};

			const selectedAction = actionMap[action];

			const { method, message: msg } = selectedAction;

			await method()
				.then(({ status, message, ...response }: any) => {
					if (status !== 200)
						return Danger({
							title: status,
							text:
								response?.data?.detail ?? response?.data?.message ?? message,
						});
					Success({ title: msg.title, text: msg.text }).finally(() => {
						clearMetadatos();
						return router.push("/metadatos");
					});
				})
				.catch(({ status, message, ...response }) => {
					Danger({
						title: status ?? "Error",
						text: response?.data?.detail ?? response?.data?.message ?? message,
					});
				});
		} catch (error: any) {
			// Manejo de errores generales
			Danger({ title: "Error", text: error?.message ?? "Error desconocido" });
		}
	};
	return (
		<Drawer
			open={open}
			onClose={() => setOpen(false)}
			onOpenChange={(isOpen) => setOpen(isOpen)}
		>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className="text-center">¿Esta Seguro?</DrawerTitle>
					<DrawerDescription className="text-center">
						Esta por realizar una "Insersión/Actualización" de un metadato,
						¿Desea continuar?
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className="mb-5 flex flex-row items-center justify-between p-4">
					<div className="flex gap-2">
						<Button
							className={cn("bg-red-300 hover:bg-red-600 ")}
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
					</div>
					{!uid && (
						<div className="flex gap-2">
							<Button
								className={cn("bg-blue-500 hover:bg-blue-900")}
								onClick={() => handleSave(MetadatoActions.PostTemporal)}
							>
								Crear Registro Temporal
							</Button>
							<Button
								className={cn("ms-5 bg-teal-600 hover:bg-teal-900")}
								onClick={() => handleSave(MetadatoActions.PostMetadato)}
							>
								Crear Nuevo Registro
							</Button>
						</div>
					)}

					{uid && (
						<div className="flex gap-2">
							{isTemporal && (
								<Button
									className={cn("bg-blue-500 hover:bg-blue-900")}
									onClick={() => handleSave(MetadatoActions.PatchTemporal)}
								>
									Actualizar Registro Temporal
								</Button>
							)}
							{isTemporal ? (
								<Button
									className={cn("ms-5 bg-teal-600 hover:bg-teal-900")}
									onClick={() => handleSave(MetadatoActions.PostMetadato)}
								>
									Crear Nuevo Registro
								</Button>
							) : (
								<Button
									className={cn("ms-5 bg-teal-600 hover:bg-teal-900")}
									onClick={() => handleSave(MetadatoActions.PatchMetadato)}
								>
									Actualizar Registro
								</Button>
							)}
						</div>
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
export default function Create({
	isTemporal = false,
	page = 1,
	disabled = false,
	onEdit,
	uid = undefined,
}: any) {
	const {
		getResources,
		schema_name,
		table_name,
		db_name,
		setMetadatos,
		...data
	} = useMedatados((state) => state);

	const [currentUID, setCurrentUID] = useState(uid);

	const [open, setOpen] = useState(false);
	const [resources, setResources] = useState([]);
	const router = useRouter();
	const callResources = async () => {
		const { data } = await getResources();
		setResources(data?.data);
	};
	const handleTreeSelect = ({ value }: any) => {
		const [db_name, schema_name, table_name] = value.split(".");
		setMetadatos({ ...data, db_name, table_name, schema_name });
	};
	useEffect(() => {
		if (resources.length === 0) {
			callResources();
		}
	}, [resources]);
	useEffect(() => {
		if (!uid && !currentUID) {
			if (data.uid) {
				setCurrentUID(data.uid);
			}
		}
		if (uid && !currentUID) {
			setCurrentUID(uid);
		}
	}, [uid]);
	return (
		<div className="p-4 bg-white dark:bg-black  max-h-full">
			<div className="flex flex-row-reverse py-2 justify-between items-center">
				{currentUID && (
					<Button
						className={cn(
							`bg-${!disabled ? "teal" : "red"}-500 hover:bg-${!disabled ? "teal" : "red"}-700 text-white dark:text-gray-600 rounded-full`,
						)}
						onClick={() => onEdit(!disabled)}
					>
						<span
							className={cn(
								`pi pi-${!disabled ? "check" : "times"}-circle me-5 text-white dark:text-gray-600`,
							)}
						/>
						<span>Edición</span>
					</Button>
				)}
			</div>

			<div className="flex flex-row-reverse py-2">
				<div className="w-1/3">
					*
					<TreeSelect
						value={`${db_name}.${schema_name}.${table_name}`}
						onChange={handleTreeSelect}
						options={resources}
						filter
						className="md:w-20rem w-full"
						placeholder="Selecciona una Tabla"
						disabled={disabled}
						variant="filled"
						autoFocus
						valueTemplate={() => (
							<Breadcrumb aria-disabled="true">
								<BreadcrumbList>
									<BreadcrumbItem>
										<BreadcrumbPage>
											{schema_name === "mapservice"
												? "GeoServer"
												: schema_name
														.split("_")
														.map(
															(word) =>
																word.charAt(0).toUpperCase() + word.slice(1),
														)
														.join(" ")}
										</BreadcrumbPage>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbPage>
											{schema_name === "mapservice"
												? "GeoServer Web Map Service"
												: table_name
														.split("_")
														.map(
															(word) =>
																word.charAt(0).toUpperCase() + word.slice(1),
														)
														.join(" ")}
										</BreadcrumbPage>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbPage>
											{(schema_name === "mapservice" ? table_name : db_name)
												.split("_")
												.map(
													(word) =>
														word.charAt(0).toUpperCase() + word.slice(1),
												)
												.join(" ")}
										</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						)}
					/>
					<div className="flex flex-row-reverse py-2 justify-between items-center">
						{/* <FileButton
							size="sm"
							className="border border-gray-200 rounded-lg w-full mt-4 hover:border-gray-600 me-auto"
							useFilename
							fileType="xml"
							// customSaveFile={(filename: string) => jsonToXml(file, filename)}
							onChange={async (file: File) => {
								if (file) {
									const response = await xmlToJson(file);
									if (response.status !== 200) {
										return Danger({
											title: "Error",
											text: "No fue posible parsear el archivo",
										});
									}

									setMetadatos({ ...data, ...response.data?.data });
								}
							}}
						>
							Importar desde archivo XML
						</FileButton> */}
						<Button
							size="lg"
							variant="outline"
							className="mt-4  ms-4"
							onClick={() => setOpen(true)}
						>
							Guardar
						</Button>

						<SaveActions
							open={open}
							setOpen={setOpen}
							uid={currentUID}
							isTemporal={isTemporal}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-between my-5">
				<div className="flex-col">
					{Number.parseInt(page) - 1 > 0 && (
						<Button
							variant="outline"
							className="mt-1 "
							onClick={() =>
								router.push(
									`?page=${Number.parseInt(page) - 1}${isTemporal ? "&temporal=true" : ""}`,
								)
							}
						>
							Anterior {Number.parseInt(page) - 1}
						</Button>
					)}
				</div>

				<div className="flex-col">
					{Number.parseInt(page) + 1 < 10 && (
						<Button
							variant="outline"
							className="mt-1 "
							onClick={() =>
								router.push(
									`?page=${Number.parseInt(page) + 1}${isTemporal ? "&temporal=true" : ""}`,
								)
							}
						>
							Siguiente {Number.parseInt(page) + 1}
						</Button>
					)}
				</div>
			</div>

			<Table>
				{page === "1" && <Section1 editable={!disabled} />}
				{page === "2" && <Section2 editable={!disabled} />}
				{page === "3" && <Section3 editable={!disabled} />}
				{page === "4" && <Section4 editable={!disabled} />}
				{page === "5" && <Section5 editable={!disabled} />}
				{page === "6" && <Section6 editable={!disabled} />}
				{page === "7" && <Section7 editable={!disabled} />}
				{page === "8" && <Section8 editable={!disabled} />}
				{page === "9" && <Section9 editable={!disabled} />}
			</Table>
		</div>
	);
}
