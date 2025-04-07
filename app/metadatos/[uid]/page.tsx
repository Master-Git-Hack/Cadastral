/** @format */

"use client";
import Layout from "@/components/navbar/index";
import Spinner from "@/components/ui/spinner";
import { Suspense, use } from "react";
import type { MetadatosProps } from "./interface";

export default function Metadatos(props: MetadatosProps) {
	const params = use(props.params);
	return (
		<Suspense fallback={<Spinner />}>
			<Layout>
				{params.metadatoUID}
				<div className="fex flex-column" />
			</Layout>
		</Suspense>
	);
}
