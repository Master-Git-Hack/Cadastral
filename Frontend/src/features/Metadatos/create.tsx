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
		<div className="container mx-auto px-4">
			<div className="grid">
				<div className="flex flex-row justify-end">
					<FileButton
						align="end"
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
						XML
					</FileButton>
				</div>
			</div>

			{form()?.map((item) => item)}

			<div>
				<Stepper
					className="mt-10"
					activeIndex={2}
					onClick={(index: number) => console.log(index)}
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
							label: { children: "Sistema de Referencia" },
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
							label: { children: "Información de Metadatos" },
						},
					]}
				/>
			</div>
		</div>
	);
}
