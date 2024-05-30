/** @format */

import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import "primereact/resources/themes/tailwind-light/theme.css";
import { Table, Button, Tooltip } from "flowbite-react";
import { NavLink, useParams } from "react-router-dom";
import { usePostComparableMutation } from "@api/Comparables";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Alert from "@components/Alerts";
import Input from "@components/Input";
import Select from "@components/Input/select";
import { Toggle } from "@components/Toggle";
const initialState = (id_cedula_mercado: number) => ({
	tipo: "Terreno",
	id_cedula_mercado,
	id_comparable_catcom: "",
});
const currentEnv = import.meta.env.MODE;
const devUrl = import.meta.env.VITE_API_URL_DEV;
const prodUrl = import.meta.env.VITE_API_URL_PROD;
export const baseUrl = currentEnv === "development" ? devUrl : prodUrl;
export default function Create() {
	const { cedula_mercado, username } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState(initialState(parseInt(cedula_mercado)));

	const handleInputChange = ({ target }) => setData({ ...data, [target.name]: target.value });

	const [
		postComparable,
		{ isLoading: isLoadingPost, isError: isErrorPost, error: errorPost, isSuccess },
	] = usePostComparableMutation();

	if (isErrorPost) return <Error message={errorPost?.data} />;
	if (isLoadingPost) return <Spinner size={20} />;
	return (
		<div
			className={` ${username ? "w-full min-h-screen bg-white dark:bg-black antialiased tracking-tight px-3" : "px-5"} `}
		>
			<div className="flex flex-row py-2">
				<NavLink
					to={
						username
							? `/modules/comparables/${username}/cedulas/${cedula_mercado}`
							: `/comparables/cedulas/${cedula_mercado}`
					}
				>
					<Button pill color="light">
						Regresar
					</Button>
				</NavLink>
			</div>
			<Table striped hoverable>
				<Table.Body>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>Tipo</strong>
						</Table.Cell>
						<Table.Cell>
							<Select
								name="tipo"
								defaultValue={data.tipo}
								onClick={(tipo: string) => setData({ ...data, tipo })}
								options={[
									{ value: "TERRENO", label: "Terreno" },
									{ value: "RENTA", label: "Renta" },
									{ value: "VENTA", label: "Venta" },
								]}
							/>
						</Table.Cell>
					</Table.Row>
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell>
							<strong>ID Comparable</strong>
						</Table.Cell>
						<Table.Cell>
							<Input
								min={1}
								name="id_comparable_catcom"
								type="number"
								variant="outline"
								size="lg"
								value={data.id_comparable_catcom}
								onChange={handleInputChange}
							/>
						</Table.Cell>
					</Table.Row>

					{/* <Table.Row>
						<Table.Cell>
							<strong>Preview</strong>
						</Table.Cell>
						<Table.Cell>
							<figure className="max-w-auto">
								<img
									className="h-auto max-w-full rounded-lg mx-auto"
									src={`${baseUrl}/comparables/preview/image/${data.id_comparable_catcom}/200/200`}
									alt="Microlocalización"
								/>
								<figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
									Microlocalización
								</figcaption>
							</figure>
						</Table.Cell>
					</Table.Row> */}
				</Table.Body>
			</Table>
			<div className="flex flex-row-reverse py-2">
				<Button
					pill
					color="success"
					onClick={() => {
						Alert.Question({
							titleText: "¿Esta seguro de la información?",
							confirmButtonText: "Guardar",
							showCancelButton: true,
							cancelButtonText: "Cancelar",
						})
							.then(({ isConfirmed }) => {
								if (isConfirmed) {
									postComparable({ ...data, username });
									setData(initialState(parseInt(cedula_mercado)));
								}
							})
							.finally(() =>
								setTimeout(
									() =>
										navigate({
											pathname: `${username ? "/modules/" : "/"}comparables${username ? `/${username}/` : "/"}cedulas/${cedula_mercado}`,
											search: "backward=1",
										}),
									500,
								),
							);
					}}
				>
					Guardar
				</Button>
			</div>
		</div>
	);
}
