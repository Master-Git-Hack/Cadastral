/** @format */

import Navbar from "@features/Navbar";
import useMunicipios from "@actions/Municipios";
import useQuery from "@hooks/useQuery";
import Spinner from "@components/Spinner";
import Metadatos from "@features/Metadatos";
import Text from "@components/Input/Text";
export default function Home() {
	const query = useQuery();

	return (
		<>
			<Text
				placeholder="Buscar"
				icon={
					<svg
						className="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				}
			/>

			<Metadatos />
		</>
	);
}
