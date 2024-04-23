/** @format */
import { Routes, Route } from "react-router-dom";
import Comparables from "@features/Comparables";
import Cedulas from "@features/Comparables/cedula_mercado";
import CrearCedula from "@features/Comparables/create";
import Layout from "@features/Layout";
import Viewer from "@features/Comparables/viewer";
export default function Metadata() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Comparables />} />
				<Route path="cedulas/:cedula_mercado" element={<Cedulas />} />
				<Route path="cedulas/:cedula_mercado/crear" element={<CrearCedula />} />
				{/* <Route path="edit/:uid" element={<EditMetadatos />} />
				<Route path="temporal/edit/:uid" element={<EditMetadatos isTemporal={true} />} />
				<Route path="crear/" element={<CreateMetadatos />} /> */}
				<Route path="cedulas/:cedula_mercado/view/:id/:as_report/:tipo" element={<Viewer />} />
			</Routes>
		</Layout>
	);
}
