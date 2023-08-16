/** @format */
import { Routes, Route } from "react-router-dom";
import Metadatos from "@features/Metadatos";
import EditMetadatos from "@features/Metadatos/edit";
import CreateMetadatos from "@features/Metadatos/create";
import Navbar from "@features/Navbar";
export default function Metadata() {
	return (
		<>
			<Navbar />
			<div className="py-5">
				<Routes>
					<Route path="/" element={<Metadatos />} />
					<Route path="edit/:uid" element={<EditMetadatos />} />
					<Route path="crear/" element={<CreateMetadatos />} />
				</Routes>
			</div>
		</>
	);
}
