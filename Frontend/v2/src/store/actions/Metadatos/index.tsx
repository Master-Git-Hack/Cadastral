/** @format */
import { useState, useEffect, useMemo } from "react";
import {
	useGetMetadatosQuery,
	useGetMetadatoQuery,
	usePostMetadatoMutation,
	usePatchMetadatoMutation,
} from "@api/Metadatos";
import { IMetadatos } from "@api/Metadatos/types";
export default function useMunicipios() {
	const { data, isLoading, isFetching, error } = useGetMetadatosQuery(null);
	const [metadato, setMetadatos] = useState<IMetadatos | null>(null);
	const get = (table_name: string) =>
		setMetadatos(
			data?.data.find((metadato: IMetadatos) => metadato.table_name === table_name) ?? null,
		);
	const [
		postMetadato,
		{
			isLoading: isPostLoading,
			isError: isPostError,
			isSuccess: isPostSuccess,
			error: postError,
		},
	] = usePostMetadatoMutation();
	const [
		patchMetadato,
		{
			isLoading: isPatchLoading,
			isError: isPatchError,
			isSuccess: isPatchSuccess,
			error: patchError,
		},
	] = usePatchMetadatoMutation();
	return {};
}
