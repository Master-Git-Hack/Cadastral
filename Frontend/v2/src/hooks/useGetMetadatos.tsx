/** @format */

import { useGetMetadatosQuery } from "@api/Metadatos";
export default function useGetMedatatos() {
	const { data, isLoading, isError, error } = useGetMetadatosQuery(null);
	if (isError) console.log(error);
	if (isLoading) console.log("Loading...");
	return { data, error };
}
