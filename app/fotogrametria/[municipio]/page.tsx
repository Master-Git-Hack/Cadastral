/** @format */
"use client";
import { use } from "react";
import Layout from "@/components/navbar/index";
interface MunicipioProps {
	params: Promise<{ municipio: string }>;
}
import DropZone from "@components/ui/drag_and_drop_images/index";
export default function Municipio(props: MunicipioProps) {
	const params = use(props.params);
	return (
		<Layout>
			{params.municipio}
			<div className="fex flex-column">
				<DropZone />
			</div>
		</Layout>
	);
}
