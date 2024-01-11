/** @format */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMetadatoQuery } from "@api/Metadatos";
import { IMetadatos } from "@api/Metadatos/types";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Create from "./create";
import Toggle from "@components/Toggle";

export default function EditMetadatos() {
	const { uid } = useParams();
	const { data, isLoading, isError, error } = useGetMetadatoQuery({ uid });
	if (!uid) return <Error message="No se ha seleccionado un metadato" />;

	if (isLoading) return <Spinner size={20} />;
	if (isError) return <Error message={error} />;

	return <Edit data={data} />;
}
export const Edit = ({ data }: { data: IMetadatos }) => {
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
			<Create record={data} onEdit={editData} />
		</div>
	);
};
