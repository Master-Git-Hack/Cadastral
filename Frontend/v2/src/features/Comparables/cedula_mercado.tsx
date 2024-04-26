/** @format */
import { useNavigate } from "react-router";

import "primereact/resources/themes/tailwind-light/theme.css";
import { Table, Button, Tooltip } from "flowbite-react";
import { NavLink, useParams } from "react-router-dom";
import { useGetComparablesQuery, useDeleteComparableMutation } from "@api/Comparables";
import Spinner from "@components/Spinner";
import Error from "../Error";
import Alert from "@components/Alerts";
// import Checkbox from "@components/Checkbox";
import { Checkbox } from "primereact/checkbox";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/provider";
import { getComparables, setComparables } from "../../store/reducers/Comparables";
export default function Comparables() {
	const { cedula_mercado } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, isError, error } = useGetComparablesQuery({ cedula_mercado });

	const dispatch = useAppDispatch();

	const [ids, setIDs] = useState<number[]>(data?.data.map(({ id }: any) => id));

	if (isError) return <Error message={error?.data} />;
	if (isLoading) return <Spinner size={20} />;
	useEffect(() => {
		dispatch(setComparables({ key: "ids", value: ids }));
	}, [ids]);
	return (
		<div>
			<div className="flex flex-row justify-between my-3 mx-2">
				<NavLink to={`/comparables`}>
					<Button pill color="light">
						Atras
					</Button>
				</NavLink>
				<div className="flex flex-row gap-2">
					<Button pill color="success">
						<Tooltip content="Solo se integraran aquellos registros seleccionados al archivo">
							Descargar
						</Tooltip>
					</Button>
					<NavLink to={`view`}>
						<Button pill>
							<Tooltip content="Solo se mostraran aquellos registros seleccionados">
								Previsualizar
							</Tooltip>
						</Button>
					</NavLink>
					<NavLink to={`crear`}>
						<Button pill color="light">
							Crear Nuevo Comparable
						</Button>
					</NavLink>
				</div>
			</div>

			<Table striped hoverable className="overflow-y-auto ">
				<Table.Head>
					<Table.HeadCell className="text-center">#</Table.HeadCell>
					<Table.HeadCell className="text-center">Seleccionar</Table.HeadCell>
					<Table.HeadCell className="text-center">Tipo</Table.HeadCell>
					<Table.HeadCell className="text-center">Comparable</Table.HeadCell>
					<Table.HeadCell className="text-center">
						<span className="sr-only">Editar</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{data?.data?.map(({ id, tipo, id_comparable_catcom }, index) => (
						<Table.Row
							className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:cursor-pointer text-center"
							key={index}
							onClick={() => {
								if (ids.includes(id)) {
									setIDs(ids.filter((_id) => _id !== id));
								} else {
									setIDs([...ids, id]);
								}
							}}
						>
							<Table.Cell>
								<p className=" text-center cursor-text">{id}</p>
							</Table.Cell>
							<Table.Cell className="text-center">
								<Checkbox
									checked={ids.includes(id)}
									onChange={() => {
										if (ids.includes(id)) {
											setIDs(ids.filter((_id) => _id !== id));
										} else {
											setIDs([...ids, id]);
										}
									}}
								/>
							</Table.Cell>
							<Table.Cell>
								<p className=" text-center cursor-text">{tipo}</p>
							</Table.Cell>
							<Table.Cell>
								<p className=" text-center cursor-text">{id_comparable_catcom}</p>
							</Table.Cell>
							<Table.Cell className="px-6 py-4 text-right">
								{/* <NavLink
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									to={`view/${id}/mercado/${tipo}`}
								>
									Mercado
								</NavLink>
								<span className="mx-2">/</span>
								<NavLink
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									to={`view/${id}/cedula/${tipo}`}
								>
									Cedúla Mercado
								</NavLink>
								<span className="mx-2">/</span> */}

								<button
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
									onClick={() =>
										Alert.Warning({
											titleText: "Advertencia",
											messageText:
												"Esta seguro que desea eliminar este registro",
										}).then(
											({ isConfirmed }) =>
												isConfirmed &&
												// deleteTemporal({ uid }) &&
												navigate(0),
										)
									}
								>
									Eliminar
								</button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}
