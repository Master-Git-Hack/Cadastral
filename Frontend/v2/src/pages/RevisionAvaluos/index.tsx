/** @format */
import { Routes, Route } from "react-router-dom";
import Revisiones from "@features/RevisionAvaluos";
import Create from "@features/RevisionAvaluos/create";
import Layout from "@features/Layout";
export default function RevisionAvaluos() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Revisiones />} />
				<Route path="edit/:uid" element={<></>} />
				<Route path=":type/nuevo-registro" element={<Create />} />
			</Routes>
		</Layout>
	);
}
