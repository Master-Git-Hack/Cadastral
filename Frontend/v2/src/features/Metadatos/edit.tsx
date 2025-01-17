/** @format */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMetadatoQuery } from "@api/Metadatos";
import { IMetadatos } from "@api/Metadatos/types";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Create from "./create";
import Toggle from "@components/Toggle";

export default function EditMetadatos({ isTemporal = false }) {
	const { uid } = useParams();

	const { data, isLoading, isError, error } = useGetMetadatoQuery({
		uid,
		isTemporal,
	});

	if (!uid) return <Error message="No se ha seleccionado un metadato" />;

	if (isLoading) return <Spinner size={20} />;
	if (isError) return <Error message={error} />;

	return <Edit data={data} isTemporal={isTemporal} />;
}
export const Edit = ({ data, isTemporal }: { data: IMetadatos; isTemporal: boolean }) => {
	const [editData, setEditData] = useState<boolean>(false);

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
			<Toggle
				size="sm"
				variant="primary"
				checked={editData}
				onChange={() => setEditData(!editData)}
			>
				Editar
			</Toggle>
			<Create record={data.data} onEdit={editData} isTemporal={isTemporal} />
		</div>
	);
};
