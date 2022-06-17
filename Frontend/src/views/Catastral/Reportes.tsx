/** @format */
import { useEffect, useState } from "react";
import { SaveButton } from "../../components/inputs/saveButton";
import { getAvaluos } from "../../features/catastral/avaluosSlice";
import { Container } from "../../components/views/Container";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { Spinner } from "../../components/spinner/spinner";
import { DocumentProperties } from "../../components/catastral/reportes/documentProperties";
export default function Reportes() {
	const { reports } = useAppSelector(getAvaluos);
	const dispatch = useAppDispatch();
	const [documents, setDocuments] = useState([]);
	return (
		<Container
			Title="Catastral:"
			titleStrong="Reportes por lotes"
			startAt={1}
			dataLimit={1}
			pageLimit={documents.length}
			data={[DocumentProperties({ data: { reports }, dispatch })]}
			SaveButton={
				<SaveButton registro="" actionClick={() => {}} customText="Descargar Documento" />
			}
			Errors={[]}
			showErrors={false}
			fixedTop={false}
			width={1200}
			height={1024}
			AddButton={<button className="btn btn-sm btn-outline-success">Agregar</button>}
			RemoveButton={
				<button className="btn btn-sm btn-link text-danger">
					Eliminar Ultimo Documento
				</button>
			}
		/>
	);
}
