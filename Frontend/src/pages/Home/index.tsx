/** @format */

import Navbar from "@features/Navbar";
import useMunicipios from "@actions/Municipios";
import useQuery from "@hooks/useQuery";
import { DataTable } from "@components/Table";
import Layout from "@features/Layout";
export default function Home() {
	const query = useQuery();

	return (
		<>
			<Layout />
		</>
	);
}
