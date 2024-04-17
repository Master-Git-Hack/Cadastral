/** @format */

// export const section2 = {
// 	datestamp: "",
// 	datetype: "",
// 	date_creation: "",
// 	inpname: "",
// };
import { Table } from "flowbite-react";
import Input from "@components/Input";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";
import moment from "moment";
export const Section2 = ({ data, setData, editable = true }: any) => {
	const handleInputChange = ({ currentTarget }) =>
		setData({ ...data, [currentTarget.name]: currentTarget.value });
	const handleSelectChange = ({
		target: {
			name,
			value: { code, label, description },
		},
	}) => setData({ ...data, [name]: `${code}. ${label}. ${description}` });
	const findSelectValue = (name: string) => {
		const [code] = String(data[name] ?? "")?.split(".");
		return catalogo?.[name]?.find((item) => item.code === code);
	};
	const findLanguageValue = catalogo.md_dataidentification_language.find(
		(item) => item.code === data.md_dataidentification_language,
	);
	console.log();
	return (
		<>
			<Table.Head>
				<Table.HeadCell
					className="flex-row text-2xl text-black dark:text-white"
					colSpan={1}
				>
					2
				</Table.HeadCell>
				<Table.HeadCell
					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
					colSpan={11}
				>
					Fechas relacionadas con el conjunto de datos espaciales o producto
				</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						2.1
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Fechas y eventos
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						2.1.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white ">
						Fecha de referencia del conjunto de datos espaciales o producto
					</Table.Cell>
					<Table.Cell colSpan={9} className="w-9/12">
						<Calendar
							value={moment(data.datestamp).format("YYYY-MM-DD").toString()}
							dateFormat="yy-mm-dd"
							showButtonBar
							onChange={(e) =>
								setData({
									...data,
									datestamp: e.value,
								})
							}
							className=" w-full md:w-14rem"
							disabled={!editable}
							inputClassName="text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full md:w-14rem"
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						2.1.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white ">
						Tipo de fecha
					</Table.Cell>
					<Table.Cell colSpan={9} className="w-9/12">
						<Dropdown
							name="datetype"
							options={catalogo.datetype}
							value={findSelectValue("datetype")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.datetype[findSelectValue("datetype")?.code - 1 ?? 0]
								?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						2.2
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Fechas de los insumos tomados para la elaboración del producto o conjunto de
						datos espaciales
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						2.2.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white ">
						Fecha de creación de los insumos
					</Table.Cell>
					<Table.Cell colSpan={9} className="w-9/12">
						<Calendar
							autoZIndex
							value={data.date_creation}
							dateFormat="yy-mm-dd"
							visible
							showButtonBar
							onChange={(e) =>
								setData({
									...data,
									date_creation: moment(e.value).format("YYYY-MM-DD").toString(),
								})
							}
							className=" w-full md:w-14rem text-black"
							disabled={!editable}
							inputClassName="text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full md:w-14rem"
						/>
						<small className="font-xs">{data.date_creation}</small>
					</Table.Cell>
				</Table.Row>

				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						2.2.4
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white ">
						Nombre del insumo
					</Table.Cell>
					<Table.Cell colSpan={9} className="w-9/12">
						<Input.Area
							name="ipname"
							type="text"
							variant="outline"
							placeholder="Palabras o frases usadas para describir algún aspecto del conjunto de datos espaciales o producto y que pueden ser utilizadas como referencia para búsquedas."
							size="lg"
							value={data.inpname}
							onChange={(e) =>
								setData({
									...data,
									inpname: e.value,
								})
							}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</>
	);
};
