/** @format */
import { NavLink, redirect } from "react-router-dom";

import "primereact/resources/themes/tailwind-light/theme.css";
//import { Table } from "@components/Table";
import { ScrollPanel } from "primereact/scrollpanel";
import Spinner from "@components/Spinner";
import Alert from "@components/Alerts";
import Error from "../Error";
import { Table, Button } from "flowbite-react";
import { Dropdown } from "@components/Button/dropdown";
import { useNavigate } from "react-router-dom";
export const Valuador = () => {
	const navigate = useNavigate();
	return (
		<div className="overflow-auto">
			<div className="flex  flex-row-reverse w-full py-2">
				<div className="justify-end">
					<Dropdown
						onClick={(type) => navigate(`/revision-avaluos/${type}/nuevo-registro`)}
						options={[
							{
								id: 1,
								value: "comercial",
								label: "Comercial",
							},
							{
								id: 2,
								value: "justipreciacion",
								label: "Justipreciación",
							},
						]}
					>
						Nuevo Registro
					</Dropdown>
				</div>
			</div>
			<Table striped hoverable className="table-pin-rows table-pin-cols">
				<Table.Head>
					<Table.HeadCell>
						#<span className="sr-only">ID</span>
					</Table.HeadCell>
					<Table.HeadCell>Tipo de Revisión</Table.HeadCell>
					<Table.HeadCell>Registro</Table.HeadCell>
					<Table.HeadCell>Tipo de Bien</Table.HeadCell>
					<Table.HeadCell>Total de Ponderación Documental</Table.HeadCell>
					<Table.HeadCell>Total de Ponderación Técnica</Table.HeadCell>
					<Table.HeadCell>Resultado Ponderado</Table.HeadCell>
					<Table.HeadCell>Observaciones</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Editar</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body></Table.Body>
			</Table>
		</div>
	);
};
export const Revisor = () => {};
export const Revisiones = () => {
	return (
		<>
			<Valuador />
		</>
	);
};
export default Revisiones;
