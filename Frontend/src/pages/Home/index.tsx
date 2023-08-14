/** @format */

import Navbar from "@features/Navbar";
import useMunicipios from "@actions/Municipios";
import useQuery from "@hooks/useQuery";
import { DataTable } from "@components/Table";

export default function Home() {
	const query = useQuery();

	return (
		<>
			<Navbar />
			<DataTable data={[{ something: 2, text: 1 }]} head={{ className: "text-center" }} />
		</>
	);
}
