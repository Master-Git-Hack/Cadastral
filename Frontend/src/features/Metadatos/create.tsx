/** @format */
import { useState, useEffect } from "react";
import { template, templateNoXML } from "./data";
import { IMetadatos } from "@api/Metadatos/types";
import Toggle from "@components/Toggle";
import Input from "@components/Input";
//import "primereact/resources/themes/tailwind-light/theme.css";

export default function Create({ onEdit = true, record = undefined }) {
	const [data, setData] = useState<IMetadatos>(record ?? templateNoXML);
	const [withXML, setWithXML] = useState<boolean>(false);

	useEffect(() => {
		if (withXML && record === undefined) setData(template);
	}, [withXML, record]);
	return (
		<>
			<div className="max-w-screen-md mx-auto p-4">
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
			<Input
				type="text"
				size="lg"
				value="aslkdhjaslkdjaskldj askljdakls"
				variant="success"
				className="w-full"
			>
				XC
			</Input>
			{withXML ? <></> : <></>}
		</>
	);
}
