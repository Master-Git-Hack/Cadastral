/** @format */
import { Routes, Route } from "react-router-dom";
import Comparables from "@features/Comparables";
import Cedulas from "@features/Comparables/cedula_mercado";
import CrearCedula from "@features/Comparables/create";
import Layout from "@features/Layout";
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
				<Route path="view/:id" element={<></>} />
			</Routes>
		</Layout>
	);
}
