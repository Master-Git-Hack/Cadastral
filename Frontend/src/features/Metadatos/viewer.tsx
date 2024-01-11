/** @format */

import Spinner from "@components/Spinner";
import Alert from "@components/Alerts";
import blankDocument from "../../assets/blank.pdf";
import { useViewMetadatoReportQuery } from "@api/Metadatos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error";
export const DocumentViewer = ({
	width = window.innerWidth,
	height = window.innerHeight * 0.8,
}: any) => {
	const { uid } = useParams();
	const [file, setFile] = useState(blankDocument);
	const [template, setTemplate] = useState(true);
	const { data, isLoading, isError, error } = useViewMetadatoReportQuery({ uid });

	useEffect(() => {
		if (data !== undefined && template) {
			setFile(URL.createObjectURL(data));
			setTemplate(false);
		}
	}, [data, template]);
	if (!uid) return <Error message="No se ha seleccionado un metadato" />;
	//if (isError) return <Error message={error?.data} />;
	if (isLoading) return <Spinner size={20} />;

	return (
		<div className="flex items-center justify-center h-full">
			<iframe
				title="PDF Viewer"
				className="w-full aspect-video h-full"
				data-type="application/pdf"
				width={width}
				height={height}
				seamless={true}
				src={`${file}#zoom=${window.innerWidth * 0.05}`}
				allow="clipboard-write; encrypted-media;"
				allowFullScreen
			/>
		</div>
	);
};
export default DocumentViewer;
