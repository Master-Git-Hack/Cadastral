/** @format */
import { Routes, Route } from "react-router-dom";
import Metadatos from "@features/Metadatos";
import EditMetadatos from "@features/Metadatos/edit";
import CreateMetadatos from "@features/Metadatos/create";
import Layout from "@features/Layout";
import MetadatosViewer from "@features/Metadatos/viewer";
import { truncate } from "fs";
export default function Metadata() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Metadatos />} />
				<Route path="edit/:uid" element={<EditMetadatos />} />
				<Route path="temporal/edit/:uid" element={<EditMetadatos isTemporal={true} />} />
				<Route path="crear/" element={<CreateMetadatos />} />
				<Route path="view/:uid" element={<MetadatosViewer />} />
			</Routes>
		</Layout>
	);
}