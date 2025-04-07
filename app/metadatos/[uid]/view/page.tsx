/** @format */
"use client";

import Error from "@/components/error";
import Layout from "@/components/navbar/index";
import useStatusStore from "@/store/api.config";
// import blankDocument from "@assets/blank.pdf";
import useMedatados from "@/store/metadatos/index";
import { useEffect, useState } from "react";
import { use } from "react";
import { MetadatosProps } from "../interface";
export default function DocumentViewer({
	params,
	width = window.innerWidth,
	height = window.innerHeight * 0.8,
	type = "cedula",
}: any) {
	const uid = params?.uid as string | undefined;
	const [file, setFile] = useState("/assets/blank.pdf");
	const { isSuccess, isLoading, isError, message } = useStatusStore(
		(state) => state,
	);
	const [template, setTemplate] = useState(true);
	const { viewMetadatoReport } = useMedatados((state) => state);
	const response = async () => {
		const { data } = (await viewMetadatoReport(uid as string)) as any;

		setFile(URL.createObjectURL(data));
		setTemplate(false);
	};

	useEffect(() => {
		if (uid && file === "/assets/blank.pdf") {
			response();
		}
	}, [file, uid]);
	// useEffect(() => {
	// 	if (isSuccess && file === "public/assets/blank.pdf") {
	// 		setFile(URL.createObjectURL(isSuccess));
	// 		setTemplate(false);
	// 	}
	// }, [isSuccess]);
	// const { data, isLoading, isError, error } = useViewMetadatoReportQuery({ uid });

	// useEffect(() => {
	// 	if (data !== undefined && template) {
	// 		setFile(URL.createObjectURL(data));
	// 		setTemplate(false);
	// 	}
	// }, [data, template]);
	// if (!uid) return <Error message="No se ha seleccionado un metadato" />;
	// //if (isError) return <Error message={error?.data} />;
	// if (isLoading) return <Spinner size={20} />;

	return (
		<Layout>
			<iframe
				title="PDF Viewer"
				className="w-full aspect-video max-h-screen"
				data-type="application/pdf"
				width={width}
				height={height}
				seamless={true}
				src={`${file}#zoom=${window.innerWidth * 0.05}`}
				allow="clipboard-write; encrypted-media;"
				allowFullScreen
			/>
		</Layout>
	);
}
