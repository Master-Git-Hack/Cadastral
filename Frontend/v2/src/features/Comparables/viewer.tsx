/** @format */

import Spinner from "@components/Spinner";
import Alert from "@components/Alerts";
import blankDocument from "../../assets/blank.pdf";
import { usePreviewMutation } from "@api/Comparables";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Error from "../Error";
import Input from "@components/Input";
import { Button, Table } from "flowbite-react";
import { Reports } from "./reports";
export const DocumentViewer = ({
	width = window.innerWidth,
	height = window.innerHeight * 0.8,
}: any) => {
	const { id, cedula_mercado, as_report, tipo } = useParams();
	// if (isError) {
	//
	// 	return <Error message={error?.data} />;
	// }
	// if (isLoading) return <Spinner size={20} />;

	return (
		<div className="flex-col my-3 items-center justify-center h-full">
			<div className="flex flex-row justify-between">
				<NavLink to={`/comparables/cedulas/${cedula_mercado}`}>
					<Button pill color="light">
						Atras
					</Button>
				</NavLink>
			</div>
			<Reports as_report={as_report} data={[{ tipo: "TERRENO" }]} />
			<div className="flex flex-row justify-end">
				<Button pill color="success">
					Descargar
				</Button>
			</div>
		</div>
	);
};
export default DocumentViewer;
