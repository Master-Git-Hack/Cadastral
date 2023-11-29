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
import { Table, Button } from "flowbite-react";

import { Section1 } from "./sections/section1";
import { Section2 } from "./sections/section2";
import { Section3 } from "./sections/section3";
import { Section4 } from "./sections/section4";
import { Section5 } from "./sections/section5";
import { Section6 } from "./sections/section6";
import { Section7 } from "./sections/section7";
import { Section8 } from "./sections/section8";
import { Section9 } from "./sections/section9";
import catalogo from "./catologos/index";
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

	useEffect(() => {
		if (xmlToJsonResult.isSuccess && !imported) {
			setImported(true);
			setData(xmlToJsonResult.data.data);
		}
	}, [xmlToJsonResult]);
	const handleSelectChange = ({
		target: {
			name,
			value: { code, label, description },
		},
	}) => setData({ ...data, [name]: `${code}. ${label}. ${description}` });
	const findSelectValue = (name: string) => {
		const [code] = data[name].split(".");
		return catalogo?.[name]?.find((item) => item.code === code);
	};
	return (
		<div className="p-4  max-h-full">
			<Table>
				<Table.Body>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell
							scope="row"
							colSpan={1}
							className="whitespace-nowrap dark:text-white"
						/>
						<Table.Cell colSpan={2} className="text-black dark:text-white">
							Nombre de la Tabla
						</Table.Cell>
						<Table.Cell colSpan={9}>
							<Dropdown
								name="table_name"
								options={[]}
								value={data.table_name}
								onChange={handleSelectChange}
								placeholder="Seleccione una Tabla"
								className="w-full md:w-14rem"
								disabled={!onEdit}
							/>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell
							scope="row"
							colSpan={1}
							className="whitespace-nowrap dark:text-white"
						/>
						<Table.Cell colSpan={2} className="w-3/12 text-black dark:text-white">
							Nombre del Schema
						</Table.Cell>
						<Table.Cell colSpan={9} className="w-full">
							<Dropdown
								name="schema_name"
								options={[]}
								value={data.schema_name}
								onChange={handleSelectChange}
								placeholder="Seleccione un Schema"
								className="w-full md:w-14rem"
								disabled={!onEdit}
							/>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell scope="row" colSpan={4} />
						<Table.Cell scope="row" colSpan={9}>
							<FileButton
								size="sm"
								className="w-1/4"
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
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<div className="flex flex-row justify-between my-5">
				<div className="flex-col">
					{indexPage > 0 && (
						<Button
							color="light"
							pill
							className="mt-1 "
							onClick={() => setIndexPage(indexPage - 1)}
						>
							Anterior {indexPage}
						</Button>
					)}
				</div>

				<div className="flex-col">
					{indexPage < 8 && (
						<Button
							color="light"
							pill
							className="mt-1 "
							onClick={() => setIndexPage(indexPage + 1)}
						>
							Siguiente {indexPage + 2}
						</Button>
					)}
				</div>
			</div>
			<div className=" ">
				<Table hoverable>
					{indexPage === 0 && (
						<Section1 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 1 && (
						<Section2 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 2 && (
						<Section3 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 3 && (
						<Section4 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 4 && (
						<Section5 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 5 && (
						<Section6 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 6 && (
						<Section7 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 7 && (
						<Section8 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 8 && (
						<Section9 data={data} setData={setData} editable={onEdit} />
					)}
				</Table>
			</div>
			<div className="flex flex-row justify-center items-center">
				<Stepper
					className="mt-10 w-8/12"
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
