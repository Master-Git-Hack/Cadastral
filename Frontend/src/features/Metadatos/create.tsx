/** @format */
import { useState, useEffect, ChangeEventHandler } from "react";
import { template } from "./types";
import { IMetadatos } from "@api/Metadatos/types";

import FileButton from "@components/Button/file";

import Alert from "@components/Alerts";
import { jsonToXml } from "@utils/xml";
import { useXml2jsonMutation, useJson2xmlMutation } from "@api/ParseFile";
import Stepper from "@components/Stepper";
import { Dropdown } from "primereact/dropdown";
import { Table, Button } from "flowbite-react";
import moment from "moment";
import {
	usePostMetadatoMutation,
	usePatchMetadatoMutation,
	usePostTemporalMutation,
	usePatchTemporalMutation,
} from "@api/Metadatos";
import { useGetCatastroQuery } from "@api/Schemas";
import { Section1 } from "./sections/section1";
import { Section2 } from "./sections/section2";
import { Section3 } from "./sections/section3";
import { Section4 } from "./sections/section4";
import { Section5 } from "./sections/section5";
import { Section6 } from "./sections/section6";
import { Section7 } from "./sections/section7";
import { Section8 } from "./sections/section8";
import { Section9 } from "./sections/section9";
import Spinner from "@components/Spinner";
import Error from "../Error";
import { useParams } from "react-router-dom";
import { addNotification, rmNotification, getNotifications } from "@reducers/Notifications";
import { useAppDispatch, useAppSelector } from "@redux/provider";
const baseAlert = (record: any, isTmp: boolean): object => {
	const action = record !== undefined ? "Actualizar" : "Guardar";

	const alert = {
		titleText: `¿Está seguro de ${action} el registro?`,
		showCancelButton: true,
		confirmButtonText: `${action}`,
		showDenyButton: true,
		denyButtonText: `${action} tmp`,
		confirmColor: "success",
		denyColor: "secondary",
		cancelColor: "danger",
		customClass: {
			actions: "my-actions",
			cancelButton: "order-1 me-16",
			confirmButton: "order-3 ",
			denyButton: "order-2 ",
			input: "disabled:opacity-75 border-0 border-transparent outline-transparent ring-transparent text-white placeholder-white",
		},
		focusConfirm: true,
		input: "hidden",
		inputAttributes: {
			hidden: true,
			enabled: false,
		},
		returnInputValueOnDeny: true,
	};
	if (!isTmp && action === "Actualizar") {
		//delete deny button and denyButtonText
		delete alert.showDenyButton;
		delete alert.denyButtonText;
	}
	return alert;
};

export default function Create({ onEdit = true, record = undefined }) {
	const params = useParams();
	const isTmp = params?.type === "temporal";
	const { uid } = params;
	const { notifications } = useAppSelector(getNotifications);
	const dispatch = useAppDispatch();
	const { data: catastro } = useGetCatastroQuery(null);
	const [data, setData] = useState<IMetadatos>(record ?? template);
	const [imported, setImported] = useState<boolean>(false);

	const [file, setFile] = useState<File | undefined>(undefined);
	const [convertXmlToJson, xmlToJsonResult] = useXml2jsonMutation();

	const [indexPage, setIndexPage] = useState<number>(0);
	const [createRecord, { isLoadingCreate, isErrorCreate, errorMessageCreate }] =
		usePostMetadatoMutation();
	const [updateRecord, { isLoadingUpdate, isErrorUpdate, errorMessageUpdate }] =
		usePatchMetadatoMutation();
	const [createTemporal, { isLoadingCreateTemporal, isErrorCreateTemporal }] =
		usePostTemporalMutation();
	const [updateTemporal, { isLoadingUpdateTemporal, isErrorUpdateTemporal }] =
		usePatchTemporalMutation();
	useEffect(() => {
		if (xmlToJsonResult.isSuccess && !imported) {
			setImported(true);
			const base = data;
			const newData = xmlToJsonResult.data.data;
			for (const key in base) {
				if (base?.hasOwnProperty(key) && newData?.hasOwnProperty(key)) {
					console.log(
						key,
						base[key],
						newData[key],
						typeof base[key],
						typeof newData[key],
					);
					// Verificar si el tipo de dato es el mismo
					if (typeof base[key] === typeof newData[key]) {
						if (typeof newData[key] === "string" && typeof base[key] === "number") {
							base[key] = justNumbers(newData[key]);
						}
						base[key] = newData[key];
					}
					if (
						["datestamp", "date_creation","date","publication_date","update_date","data_last_update"].includes(key) &&
						(newData[key] === undefined || newData[key]?.trim() === "")
					) {
						base[key] = moment().format("YYYY-MM-DD").toString();
					}
				}
			}
			setData(base);
		}
	}, [xmlToJsonResult]);
	useEffect(() => {
		if (uid !== undefined && !data.hasOwnProperty("uid")) {
			setData({ ...data, uid });
		}
	}, [uid]);
	const justNumbers = (value: string) => parseFloat(value.replace(/[^0-9.]/g, ""));
	const handleSelectChange = ({ value }) =>
		setData({ ...data, table_name: value.label, schema_name: value.parent });

	if (isLoadingCreate || isLoadingUpdate || isLoadingCreateTemporal || isLoadingUpdateTemporal)
		return <Spinner size={20} />;
	if (isErrorCreate || isErrorUpdate)
		return <Error message={errorMessageCreate ?? errorMessageUpdate} />;
	const groupedItemTemplate = (option) => {
		return (
			<div className="flex align-items-center">
				<div>{option.label}</div>
			</div>
		);
	};
	const handleNotification = (
		summary: string,
		detail: string = "",
		severity: string = "error",
	) => {
		const index = notifications.findIndex(({ summary }: any) => summary === summary);
		if (index === -1 && detail !== "") {
			dispatch(
				addNotification({
					summary,
					detail,
					severity,
				}),
			);
		} else if (notifications[index]?.id !== undefined) {
			const { id } = notifications[index];
			dispatch(rmNotification(id));
		}
	};
	const checkProp = (key: string, value: any) => {
		if (value.toString().trim() === "" || value === undefined || value === null)
			handleNotification(key, "Este campo es obligatorio");
		else if (key === "absres" && value < 0)
			handleNotification(key, "Este campo debe ser mayor a 0");
		else if (key === "bearing_res" && value < 0)
			handleNotification(key, "Este campo debe ser mayor a 0");
		else if (key === "depthres" && value < 0)
			handleNotification(key, "Este campo debe ser mayor a 0");
		else if (key === "distance_res" && value < 0)
			handleNotification(key, "Este campo debe ser mayor a 0");
		else if (key === "eastboundlongitude" && (value < -180 || value > 180))
			handleNotification(key, "Este campo debe estar entre -180 y 180");
		else if (key === "lambertc_longcm" && (value < -180 || value > 180))
			handleNotification(key, "Este campo debe estar entre -180 y 180");
		else if (key === "lambertc_stdparll" && (value < -90 || value > 90))
			handleNotification(key, "Este campo debe estar entre -90 y 90");
		else if (key === "northboundlatitude" && (value < -90 || value > 90))
			handleNotification(key, "Este campo debe estar entre -90 y 90");
		else if (key === "ordres" && value < 0)
			handleNotification(key, "Este campo debe ser mayor a 0");
		else if (key === "semiaxis" && value < 0)
			handleNotification(key, "Este campo debe ser mayor a 0");
		else if (key === "southboundlatitude" && (value < -90 || value > 90))
			handleNotification(key, "Este campo debe estar entre -90 y 90");
		else if (key === "utm_zone" && (value < 1 || value > 60))
			handleNotification(key, "Este campo debe estar entre 1 y 60");
		else if (key === "westboundlongitude" && (value < -180 || value > 180))
			handleNotification(key, "Este campo debe estar entre -180 y 180");
		// else if (["bearing_uni","geounit","coord_repres","ref_bearing_dir","ref_bearing_mer"].includes(key) && includes_values[key].includes(value)) handleNotification(key, `Este campo debe ser uno de los siguientes valores: ${includes_values[key].join(", ")}`);
		else handleNotification(key);
	};
	const checkData = () => {
		//iter over data json object to check value o some keys

		const keys = [
			"absres",
			"bearing_res",
			"bearing_uni",
			"coord_repres",
			"depthres",
			"distance_res",
			"eastboundlongitude",
			"geounit",
			"lambertc_longcm",
			"lambertc_stdparll",
			"latres",
			"longres",
			"mercator_sfec",
			"mercatort_latprjo",
			"northboundlatitude",
			"ordres",
			"ref_bearing_dir",
			"ref_bearing_mer",
			"semiaxis",
			"southboundlatitude",
			"utm_zone",
			"westboundlongitude",
		];

		//
		for (const key of keys) {
			try {
				checkProp(key, data[key]);
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<div className="p-4 bg-white dark:bg-black  max-h-full">
			<Table>
				<Table.Body>
					{/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell
							scope="row"
							colSpan={1}
							className="whitespace-nowrap dark:text-white"
						/>
						<Table.Cell colSpan={2} className="w-3/12 text-black dark:text-white">
							Nombre del Schema de la Base de Datos
						</Table.Cell>
						<Table.Cell colSpan={9} className="w-full">
							<Dropdown
								name="schema_name"
								options={catastro?.data.schemas}
								value={data.schema_name}
								onChange={handleSelectChange}
								placeholder="Seleccione un Schema"
								className="w-full md:w-14rem"
								disabled={!onEdit}
							/>
						</Table.Cell>
					</Table.Row> */}
					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell
							scope="row"
							colSpan={1}
							className="whitespace-nowrap dark:text-white"
						/>
						<Table.Cell colSpan={2} className="text-black dark:text-white">
							Nombre de la Tabla de la Base de Datos
						</Table.Cell>
						<Table.Cell colSpan={10}>
							<Dropdown
								name="table_name"
								value={catastro?.data
									.find(({ label }) => label === data.schema_name)
									?.items.find(({ label }) => label === data.table_name)}
								onChange={handleSelectChange}
								options={catastro?.data}
								optionLabel="label"
								optionGroupLabel="label"
								optionGroupChildren="items"
								optionGroupTemplate={groupedItemTemplate}
								className="w-full md:w-14rem"
								placeholder="Seleccione una Tabla"
								disabled={!onEdit}
							/>
						</Table.Cell>
					</Table.Row>

					<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
						<Table.Cell scope="row" colSpan={4} />
						<Table.Cell
							scope="row"
							className="flex flex-row justify-start items-center "
							colSpan={8}
						>
							<FileButton
								size="sm"
								className="w-1/4"
								useFilename
								fileType="xml"
								customSaveFile={(filename: string) => jsonToXml(file, filename)}
								onChange={(file: File) => {
									const formData = new FormData();
									formData.append("file", file);

									convertXmlToJson(formData);
								}}
							>
								Importar información de archivio XML
							</FileButton>
						</Table.Cell>
						<Table.Cell
							scope="row"
							className="flex flex-row justify-end items-center -mt-20"
							colSpan={1}
						>
							<Button
								pill
								color="green"
								onClick={() =>
									Alert(baseAlert(record, isTmp)).then((resp: any) => {
										if (resp.isConfirmed) {
											//checkData();
											if (notifications.length === 0) {
												if (record !== undefined) {
													updateRecord({ data, uid: data.uid ?? uid });
												} else {
													createRecord({ data });
												}
											} else
												Alert({
													titleText: "Atención",
													text: "¡Hay errores en el formulario; por favor, revise las notificaciones en la barra de navegacióncd!",
													icon: "warning",
												});
										} else if (resp.isDenied) {
											if (record !== undefined) {
												updateTemporal({
													data: {
														uid,
														datos: data,
													},
												});
											} else {
												createTemporal({
													data: {
														datos: data,
													},
												});
											}
										}
										return resp;
									})
								}
							>
								Guardar
							</Button>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<div className="flex flex-row justify-between my-5">
				<div className="flex-col">
					{indexPage > 0 && (
						<Button
							color="light"
							pill
							className="mt-1 "
							onClick={() => setIndexPage(indexPage - 1)}
						>
							Anterior {indexPage}
						</Button>
					)}
				</div>

				<div className="flex-col">
					{indexPage < 8 && (
						<Button
							color="light"
							pill
							className="mt-1 "
							onClick={() => setIndexPage(indexPage + 1)}
						>
							Siguiente {indexPage + 2}
						</Button>
					)}
				</div>
			</div>
			<div className=" ">
				<Table hoverable>
					{indexPage === 0 && (
						<Section1 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 1 && (
						<Section2 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 2 && (
						<Section3 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 3 && (
						<Section4 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 4 && (
						<Section5 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 5 && (
						<Section6 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 6 && (
						<Section7 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 7 && (
						<Section8 data={data} setData={setData} editable={onEdit} />
					)}
					{indexPage === 8 && (
						<Section9 data={data} setData={setData} editable={onEdit} />
					)}
				</Table>
			</div>
			<div className="flex flex-row justify-center items-center">
				<Stepper
					className="mt-10 w-8/12"
					activeIndex={indexPage}
					onClick={(index: number) => setIndexPage(index)}
					items={[
						{
							label: { children: "Identificación" },
						},
						{
							label: { children: "Fechas Relacionadas" },
						},
						{
							label: { children: "Unidad Responsable" },
						},
						{
							label: { children: "Localización Geográfica" },
						},
						{
							label: { children: "Referencia" },
						},

						{
							label: { children: "Calidad" },
						},
						{
							label: { children: "Entidades/Atributos" },
						},
						{
							label: { children: "Distribución" },
						},
						{
							label: { children: "Información Metadatos" },
						},
					]}
				/>
			</div>
		</div>
	);
}
