/** @format */

"use client";
import { use } from "react";
import { MetadatosProps } from "./interface";
import Layout from "@/components/navbar/index";
export default function Metadatos(props: MetadatosProps) {
	const params = use(props.params);
	return (
		<Layout>
			{params.metadatoUID}
			<div className="fex flex-column"></div>
		</Layout>
	);
}
