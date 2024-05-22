/** @format */
import { Routes, Route } from "react-router-dom";
import Component from "@features/Comparables";
import Cedulas from "@features/Comparables/cedula_mercado";
import CrearCedula from "@features/Comparables/create";
import Layout from "@features/Layout";
import Viewer from "@features/Comparables/viewer";
export default function Comparables({ useLayout = true }) {
	const Base = () => (
		<Routes>
			<Route path={useLayout ? "/" : "/:username"} element={<Component />} />
			<Route path={`cedulas/:cedula_mercado`} element={<Cedulas />} />
			<Route path="cedulas/:cedula_mercado/crear" element={<CrearCedula />} />

			<Route path="cedulas/:cedula_mercado/view" element={<Viewer />} />
		</Routes>
	);
	if (!useLayout) {
		return <Base />;
	}
	return (
		<Layout>
			<Base />
		</Layout>
	);
}
