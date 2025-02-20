/** @format */
import { Routes, Route } from "react-router-dom";
import AvaluosCatastrales from "@features/AvaluosCatastrales";

import Layout from "@features/Layout";
export default function Metadata() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<AvaluosCatastrales />} />
			</Routes>
		</Layout>
	);
}
