/** @format */
import { useState, useEffect, ChangeEventHandler } from "react";
import { template, templateNoXML } from "./data";
import { IMetadatos } from "@api/Metadatos/types";
import Toggle from "@components/Toggle";
import Input from "@components/Input";
import FileButton from "@components/Button/file";
import Alert from "@components/Alerts";
//import "primereact/resources/themes/tailwind-light/theme.css";
/*onChange={({ currentTarget: { value } }: ChangeEventHandler<HTMLInputElement>) =>
setText(value as string)
}*/
export default function Create({ onEdit = true, record = undefined }) {
	const [data, setData] = useState<IMetadatos>(record ?? templateNoXML);
	const [withXML, setWithXML] = useState<boolean>(false);
	const [text, setText] = useState<string>("");
	useEffect(() => {
		if (withXML && record === undefined) setData(template);
	}, [withXML, record]);
	return (
		<div className="container mx-auto px-4">
			<div className="grid">
				<div className="flex flex-row justify-end">
					<Toggle
						size="sm"
						variant="info"
						checked={withXML}
						onChange={() => setWithXML(!withXML)}
						disabled={!onEdit}
					>
						Usar XML
					</Toggle>
				</div>
			</div>
			<button
				
			>
				test
			</button>
			<div className="flex inline-flex  w-full py-1">
				<label className="text-start w-1/4">Nombre de la Tabla</label>
				<Input
					type="text"
					value={text}
					placeholder="Escribe algo..."
					variant="outline"
					className="w-fit"
				/>
			</div>
			<div className="flex inline-flex  w-full py-1">
				<label className="text-start w-1/4">Schema de Origen</label>
				<Input
					type="text"
					value={text}
					placeholder="Escribe algo..."
					variant="outline"
					className="w-fit"
				/>
			</div>
			<div className="flex inline-flex  w-full py-1">
				<label className="text-start w-1/4">Título</label>
				<Input
					type="text"
					value={text}
					placeholder="Escribe algo..."
					variant="outline"
					className="w-fit"
				/>
			</div>
			<div className="flex inline-flex w-full py-1">
				<label className="text-start w-1/4">Título</label>
				<Input
					type="text"
					value={text}
					placeholder="Escribe algo..."
					variant="outline"
					className="w-fit"
				/>
			</div>
			{withXML ? (
				<FileButton
					align="end"
					size="sm"
					useFilename
					onChange={(files) => {
						console.log(files);
					}}
				>
					XML
				</FileButton>
			) : (
				<></>
			)}
		</div>
	);
}
