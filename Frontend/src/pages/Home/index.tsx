/** @format */

import Navbar from "@features/Navbar";
import useMunicipios from "@actions/Municipios";
import useQuery from "@hooks/useQuery";

export default function Home() {
	const query = useQuery();

	return (
		<>
			<Navbar />
		</>
	);
}
