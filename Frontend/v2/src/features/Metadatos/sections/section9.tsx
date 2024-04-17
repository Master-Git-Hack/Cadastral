/** @format */
// export const section9 = {
// 	metadatastandardname: "",
// 	metadatastandardversion: "",
// 	date: "",
// };
import { Table } from "flowbite-react";
import Input from "@components/Input";
import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";
import { Calendar } from "primereact/calendar";
import moment from "moment";
export const Section9 = ({ data, setData, editable }: any) => {
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
	return (
		<>
			<Table.Head>
				<Table.HeadCell
					className="flex-row text-2xl text-black dark:text-white"
					colSpan={1}
				>
					9
				</Table.HeadCell>
				<Table.HeadCell
					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
					colSpan={11}
				>
					Información de metadatos
				</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						9.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del estándar de metadatos
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Input
							name="metadatastandardname"
							value={data.metadatastandardname}
							onChange={handleInputChange}
							type="text"
							variant="outline"
							size="lg"
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>

				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						9.3
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Idioma de los Metadatos
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Input
							name="metadatastandardversion"
							value={data.md_dataidentification_language}
							onChange={handleInputChange}
							type="text"
							variant="outline"
							size="lg"
							disabled
						/>
					</Table.Cell>
				</Table.Row>

				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						9.5
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Fecha de los metadatos
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Calendar
							value={moment(data.metadatastandardversion)
								.format("YYYY-MM-DD")
								.toString()}
							dateFormat="yy-mm-dd"
							showButtonBar
							onChange={(e) =>
								setData({
									...data,
									date: e.value,
								})
							}
							className=" w-full md:w-14rem"
							disabled
							inputClassName="text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full md:w-14rem"
						/>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</>
	);
};
