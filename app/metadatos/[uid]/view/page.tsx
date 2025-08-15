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
export default function DocumentViewer({ params, type = "cedula" }: any) {
	const uid = params?.uid as string | undefined;
	const [file, setFile] = useState("/assets/blank.pdf");
	const { isSuccess, isLoading, isError, message } = useStatusStore(
		(state) => state,
	);
	const [template, setTemplate] = useState(true);
	const { viewMetadatoReport } = useMedatados((state) => state);
	const [clientWidth, setClientWidth] = useState<number | null>(null);
	const [clientHeight, setClientHeight] = useState<number | null>(null);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setClientWidth(window.innerWidth);
			setClientHeight(window.innerHeight * 0.8);
		}
	}, []);
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
	return (
		<Layout>
			<iframe
				title="PDF Viewer"
				className="w-full aspect-video max-h-screen"
				data-type="application/pdf"
				width={clientWidth ?? 800}
				height={clientHeight ?? 600}
				seamless={true}
				src={clientWidth ? `${file}#zoom=${clientWidth * 0.05}` : file}
				allow="clipboard-write; encrypted-media;"
				allowFullScreen
			/>
		</Layout>
	);
}
