/** @format */
// export const section8 = {
// 	md_format: "",
// 	edition: "",
// };
import { Table } from "flowbite-react";
import Input from "@components/Input";
import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";

export const Section8 = ({ data, setData, editable = true }: any) => {
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
					8
				</Table.HeadCell>
				<Table.HeadCell
					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
					colSpan={11}
				>
					Distribución
				</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						8.4
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white">
						Formato de distribución
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						8.4.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del formato
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Input
							name="md_format"
							value={data.md_format}
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
						8.4.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Versión del formato
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Input
							name="edition"
							value={data.edition}
							onChange={handleInputChange}
							type="text"
							variant="outline"
							size="lg"
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</>
	);
};
