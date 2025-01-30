/** @format */

"use client";
import { use, Suspense } from "react";
import { MetadatosProps } from "./interface";
import Layout from "@/components/navbar/index";
import Spinner from "@/components/ui/spinner";
export default function Metadatos(props: MetadatosProps) {
	const params = use(props.params);
	return (
		<Suspense fallback={<Spinner />}>
			<Layout>
				{params.metadatoUID}
				<div className="fex flex-column"></div>
			</Layout>
		</Suspense>
	);
}
