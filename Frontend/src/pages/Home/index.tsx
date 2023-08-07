/** @format */

import Navbar from "@features/Navbar";
import useMunicipios from "@actions/Municipios";
import useQuery from "@hooks/useQuery";
import Spinner from "@components/Spinner";
import Metadatos from "@features/Metadatos";
export default function Home() {
	const query = useQuery();
	const { data, isLoading, error } = useMunicipios({ type: "INDICADORES" });
	if (isLoading) return <Spinner />;

	return (
		<>
			<Navbar />
			<Metadatos />
		</>
	);
}
