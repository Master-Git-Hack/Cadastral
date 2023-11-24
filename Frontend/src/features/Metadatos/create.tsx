/** @format */
import { useState, useEffect, ChangeEventHandler } from "react";
import { template, translateTags, typesTags, transformKeys } from "./types";
import { IMetadatos } from "@api/Metadatos/types";
import Toggle from "@components/Toggle";
import Input from "@components/Input";
import FileButton from "@components/Button/file";
import Alert from "@components/Alerts";
import { xmlToJson, jsonToXml } from "@utils/xml";
import { flattenObject } from "@utils/object";
import { useXml2jsonMutation, useJson2xmlMutation } from "@api/ParseFile";
import Stepper from "@components/Stepper";
import { Dropdown } from "primereact/dropdown";
import { Table } from "flowbite-react";
/*onChange={({ currentTarget: { value } }: ChangeEventHandler<HTMLInputElement>) =>
setText(value as string)
}*/
import SchemaSelect from "./schemas_select";
export default function Create({ onEdit = true, record = undefined }) {
	const [data, setData] = useState<IMetadatos>(record ?? template);
	const [imported, setImported] = useState<boolean>(false);
	const [withXML, setWithXML] = useState<boolean>(false);
	const [text, setText] = useState<string>("");
	const [file, setFile] = useState<File | undefined>(undefined);
	const [convertXmlToJson, xmlToJsonResult] = useXml2jsonMutation();
	const [convertJsonToXml, jsonToXmlResult] = useJson2xmlMutation();
	const [currentSchema, setSchema] = useState<string | undefined>(undefined);
	const [indexPage, setIndexPage] = useState<number>(0);
	const form = () => {
		const current = [];
		for (const key in template) {
			if (template.hasOwnProperty(key)) {
				const currentType = typesTags[key];
				current.push(
					<div className="flex inline-flex  w-full py-1" key={key}>
						<label className="text-start w-6/12 ">{translateTags[key] ?? key}</label>
						{currentType !== "textarea" ? (
							<Input
								type={currentType}
								value={data[key]}
								placeholder="Escribe algo..."
								variant="outline"
								className="w-6/12"
								onChange={({
									currentTarget: { value },
								}: ChangeEventHandler<HTMLInputElement>) =>
									setData((prev) => ({ ...prev, [key]: value }))
								}
							/>
						) : (
							<Input.Area
								placeholder="Escribe algo..."
								variant="outline"
								className="w-6/12"
								rows="2"
							/>
						)}
					</div>,
				);
			}
		}
		return current;
	};
	useEffect(() => {
		if (xmlToJsonResult.isSuccess && !imported) {
			setImported(true);
			setData(xmlToJsonResult.data.data);
		}
	}, [xmlToJsonResult]);
	console.log(xmlToJsonResult);
	return (
		<div className="container mx-auto px-4 ">
			<div className="flex flex-col flex-wrap gap-2 text-sm">
				<div className="flex flex-row justify-end">
					<FileButton
						size="sm"
						useFilename
						fileType="xml"
						customSaveFile={(filename: string) => jsonToXml(file, filename)}
						onChange={(file: File) => {
							const formData = new FormData();
							formData.append("file", file);

							convertXmlToJson(formData);
						}}
					>
						Importar información de archivio XML
					</FileButton>
				</div>
				<Table>
					<Table.Head>
						<Table.HeadCell colSpan={1} />
						<Table.HeadCell colSpan={3} />
						<Table.HeadCell colSpan={8} />
					</Table.Head>
					{indexPage === 0 && (
						<>
							<Table.Head>
								<Table.HeadCell
									className="flex-row justify-center text-center text-2xl text-black dark:text-white"
									colSpan={12}
								>
									Identificación del conjunto de datos espaciales o producto
								</Table.HeadCell>
							</Table.Head>
							<Table.Body>
								<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
									<Table.Cell
										scope="row"
										colSpan={1}
										className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
									/>
									<Table.Cell colSpan={3} className="w-3/12">
										Nombre de la Tabla
									</Table.Cell>
									<Table.Cell colSpan={8} className="w-8/12">
										<Input.Select variant="outline" />
									</Table.Cell>
								</Table.Row>
							</Table.Body>
						</>
					)}
				</Table>
				{indexPage === 0 && (
					<div className="flex flex-col items-center justify-between">
						<p className="flex-row justify-center text-center text-2xl text-black dark:text-white">
							Identificación del conjunto de datos espaciales o producto
						</p>
						<div className="inline-flex mt-5 w-full  items-center">
							<span className="text-white dark:text-black">0.0</span>
							<label className="text-center w-4/12 text-black dark:text-white mx-3"></label>
							<Input.Select variant="outline" className="w-8/12" />
						</div>
						<div className="inline-flex w-full items-center">
							<span className="text-white dark:text-black">0.0</span>
							<label className="text-center w-4/12 text-black dark:text-white mx-3">
								Nombre del Schema
							</label>
							<Input.Select variant="outline" className="w-8/12" />
						</div>

						<div className="inline-flex w-full items-center mt-2">
							<span className="text-black dark:text-white">1.1</span>
							<label className="text-center w-4/12 text-black dark:text-white mx-3">
								Título del conjunto de datos espaciales o producto
							</label>
							<Input
								type="text"
								variant="outline"
								className="w-10/12 mx-3"
								size="lg"
							/>
						</div>
						<div className="inline-flex w-full items-center mt-2">
							<span className="text-black dark:text-white">1.2</span>
							<label className="text-center w-4/12 text-black dark:text-white mx-3">
								Propósito
							</label>
							<Input
								type="text"
								variant="outline"
								className="w-10/12 mx-3"
								size="lg"
							/>
						</div>
						<div className="inline-flex w-full items-center mt-2">
							<span className="text-black dark:text-white">1.3</span>
							<label className="text-center w-4/12 text-black dark:text-white mx-3">
								Descripción del conjunto de datos espaciales o producto
							</label>
							<Input
								type="text"
								variant="outline"
								className="w-10/12 mx-3"
								size="lg"
							/>
						</div>
						<div className="inline-flex w-full items-center mt-2">
							<span className="text-black dark:text-white">1.4</span>
							<label className="text-center w-4/12 text-black dark:text-white mx-3">
								Idioma de Identificación de Datos
							</label>
							<Input
								type="text"
								variant="outline"
								className="w-10/12 mx-3"
								size="lg"
							/>
						</div>
						<div className="flex-row w-full items-center mt-2">
							<span className="text-black dark:text-white">
								1.5 Tema principal del conjunto de datos espaciales o producto
							</span>

							<div className="inline-flex w-full items-center mt-2">
								<span className="text-black dark:text-white">1.5.1</span>
								<label className="text-center w-4/12 text-black dark:text-white mx-3">
									Tema principal del conjunto de datos espaciales o producto
								</label>
								<Input.Select variant="outline" className="w-8/12" />
							</div>
							<div className="inline-flex w-full items-center mt-2">
								<span className="text-black dark:text-white">1.5.2</span>
								<label className="text-center w-4/12 text-black dark:text-white mx-3">
									Grupo de datos del conjunto de datos espaciales o producto
								</label>
								<Input.Select variant="outline" className="w-8/12" />
							</div>
						</div>
						<div className="inline-flex w-full items-center mt-2">
							<span className="text-black dark:text-white">1.6</span>
							<label className="text-center w-4/12 text-black dark:text-white mx-3">
								Palabra clave
							</label>
							<Input type="text" variant="outline" className="w-8/12" size="lg" />
						</div>
						{/* 

	topiccategory: "",
	groupcategory: "Categoría de Grupo",
	keyword: "Palabras Clave",
	presentationform: "Forma de Presentación",
	ci_onlineresource_linkage: "Enlace del Recurso en Línea de CI",
	maintenanceandupdatefrequency: "Frecuencia de Mantenimiento y Actualización",
	md_dataidentification_characterset: "Conjunto de Caracteres de Identificación de Datos",
	specuse: "Uso Específico" */}
					</div>
				)}
				{indexPage === 1 && <></>}
				{indexPage === 2 && <></>}
				{indexPage === 3 && <></>}
				{indexPage === 4 && <></>}
				{indexPage === 5 && <></>}
				{indexPage === 6 && <></>}
				{indexPage === 7 && <></>}
				{indexPage === 8 && <></>}
			</div>

			<div>
				<Stepper
					className="mt-10"
					activeIndex={indexPage}
					onClick={(index: number) => setIndexPage(index)}
					items={[
						{
							label: { children: "Identificación" },
						},
						{
							label: { children: "Fechas Relacionadas" },
						},
						{
							label: { children: "Unidad Responsable" },
						},
						{
							label: { children: "Localización Geográfica" },
						},
						{
							label: { children: "Referencia" },
						},

						{
							label: { children: "Calidad" },
						},
						{
							label: { children: "Entidades/Atributos" },
						},
						{
							label: { children: "Distribución" },
						},
						{
							label: { children: "Información Metadatos" },
						},
					]}
				/>
			</div>
		</div>
	);
}
