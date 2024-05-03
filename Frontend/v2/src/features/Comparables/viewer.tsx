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
import { useAppSelector } from "../../store/provider";
import { getComparables } from "../../store/reducers/Comparables";
import { Toggle } from "@components/Toggle";
import { usePreviewQuery } from "@api/Comparables";
export const DocumentViewer = () => {
	const { id, cedula_mercado, tipo } = useParams();
	const { ids } = useAppSelector(getComparables);
	const [as_report, setAsReport] = useState(true);
	const { data, isLoading, isError, error } = usePreviewQuery({ cedula_mercado, data: ids });
	if (isError) return <Error message={error?.data} />;
	if (isLoading) return <Spinner size={20} />;
	return (
		<div className="flex-col my-3 items-center justify-center h-full">
			<div className="flex flex-row justify-between">
				<NavLink to={`/comparables/cedulas/${cedula_mercado}`}>
					<Button pill color="light">
						Atras
					</Button>
				</NavLink>
				<div>
					<Toggle value={as_report} onChange={() => setAsReport(!as_report)}>
						{as_report ? "Cédulas de " : ""} Mercado
					</Toggle>
				</div>
			</div>
			<Reports as_report={as_report} data={data} />
			<div className="flex flex-row justify-end">
				<Button pill color="success">
					Descargar
				</Button>
			</div>
		</div>
	);
};
export default DocumentViewer;
