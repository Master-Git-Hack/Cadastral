/** @format */

"use client";
import { Section1 } from "./sections/section1";
import { Section2 } from "./sections/section2";
import { Section3 } from "./sections/section3";
import { Section4 } from "./sections/section4";
import { Section5 } from "./sections/section5";
import { Section6 } from "./sections/section6";
import { Section7 } from "./sections/section7";
import { Section8 } from "./sections/section8";
import { Section9 } from "./sections/section9";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { TreeSelect } from "primereact/treeselect";
import useMedatados from "@/store/metadatos/index.ts";
import FileButton from "@/components/ui/button-file";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
export default function Create({
	isTemporal = false,
	page = 1,
	disabled = false,
	onEdit,
	uid = undefined,
}) {
	const { getResources, schema_name, table_name, db_name, setMetadatos, ...data } = useMedatados(
		(state) => state,
	);
	const [resources, setResources] = useState([]);
	const router = useRouter();
	const callResources = async () => {
		const { data } = await getResources();
		setResources(data?.data);
	};
	const handleTreeSelect = ({ value }) => {
		const [db_name, schema_name, table_name] = value.split(".");
		setMetadatos({ ...data, db_name, table_name, schema_name });
	};
	useEffect(() => {
		if (resources.length === 0) {
			callResources();
		}
	}, [resources]);
	return (
		<div className="p-4 bg-white dark:bg-black  max-h-full">
			<div className="flex flex-row-reverse py-2">
				{isTemporal && uid && (
					<Toggle
						variant="outline"
						size="lg"
						className="bg-teal-500 text-white dark:text-gray-600"
						pressed={disabled}
						onPressedChange={(pressed) => {
							onEdit(pressed);
						}}
					>
						{disabled ? "Deshabilitar" : "Habilitar"} Edición
					</Toggle>
				)}
				<div className="w-1/3">
					<TreeSelect
						value={`${data.db_name}.${data.schema_name}.${data.table_name}`}
						onChange={handleTreeSelect}
						options={resources}
						filter
						className="md:w-20rem w-full"
						placeholder="Selecciona una Tabla"
					></TreeSelect>
					<Breadcrumb disabled>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>
									{schema_name
										.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</BreadcrumbPage>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>
									{table_name
										.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</BreadcrumbPage>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>
									{db_name
										.split("_")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className="flex flex-row py-2 justify-between items-center">
						<FileButton
							size="sm"
							className="border border-gray-200 rounded-lg w-full mt-4 hover:border-gray-600 me-auto"
							useFilename
							fileType="xml"

							// customSaveFile={(filename: string) => jsonToXml(file, filename)}
							// onChange={(file: File) => {
							// 	const formData = new FormData();
							// 	formData.append("file", file);

							// 	convertXmlToJson(formData);
							// }}
						>
							Importar desde archivo XML
						</FileButton>
						<Button size="lg" variant="outline" className="mt-4  ms-4">
							Guardar
						</Button>
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-between my-5">
				<div className="flex-col">
					{parseInt(page) - 1 > 0 && (
						<Button
							variant="outline"
							className="mt-1 "
							onClick={() => router.push(`?page=${parseInt(page) - 1}`)}
						>
							Anterior {parseInt(page) - 1}
						</Button>
					)}
				</div>

				<div className="flex-col">
					{parseInt(page) + 1 < 10 && (
						<Button
							variant="outline"
							className="mt-1 "
							onClick={() => router.push(`?page=${parseInt(page) + 1}`)}
						>
							Siguiente {parseInt(page) + 1}
						</Button>
					)}
				</div>
			</div>

			<Table>
				{page === "1" && <Section1 />}
				{/* {page === 2 && <Section2 />}
				{page === 3 && <Section3 />}
				{page === 4 && <Section4 />}
				{page === 5 && <Section5 />}
				{page === 6 && <Section6 />}
				{page === 7 && <Section7 />}
				{page === 8 && <Section8 />}
				{page === 9 && <Section9 />} */}
			</Table>
		</div>
	);
}
