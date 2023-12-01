/** @format */

// export const section3 = {
// 	ci_responsibleparty_individualname: "",
// 	ci_responsibleparty_organisationname: "",
// 	ci_responsibleparty_positionname: "",
// 	ci_responsibleparty_linkage: "",
// 	ci_responsibleparty_role: "",
// };
import { Table } from "flowbite-react";

import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";
import Input from "@components/Input";
export const Section3 = ({ data, setData, editable = true }: any) => {
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
					3
				</Table.HeadCell>
				<Table.HeadCell
					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
					colSpan={11}
				>
					Unidad del estado responsable del conjunto de datos espaciales o producto
				</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white ">
						Nombre de la persona de contacto
					</Table.Cell>
					<Table.Cell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_individualname"
							type="text"
							variant="outline"
							placeholder="Nombre de la persona responsable (productor) dando apellido y nombre."
							size="lg"
							value={data.ci_responsibleparty_individualname}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>

				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white ">
						Nombre de la organización
					</Table.Cell>
					<Table.Cell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_organisationname"
							type="text"
							variant="outline"
							placeholder="Nombre de la organización responsable"
							size="lg"
							value={data.ci_responsibleparty_organisationname}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.3
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white ">
						Puesto del contacto
					</Table.Cell>
					<Table.Cell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_positionname"
							type="text"
							variant="outline"
							placeholder="Cargo de la persona responsable"
							size="lg"
							value={data.ci_responsibleparty_positionname}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.12
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white ">
						Enlace en línea (dirección de Internet de referencia)
					</Table.Cell>
					<Table.Cell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_linkage"
							type="url"
							variant="outline"
							placeholder="http://www.inegi.org.mx/normatividad_geografica"
							size="lg"
							value={data.ci_responsibleparty_linkage}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.13
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white ">
						Rol
					</Table.Cell>
					<Table.Cell colSpan={9} className="w-9/12">
						<Dropdown
							name="ci_responsibleparty_role"
							placeholder="Seleccione una opción"
							options={catalogo.ci_responsibleparty_role}
							value={findSelectValue("ci_responsibleparty_role")}
							onChange={handleSelectChange}
							disabled={!editable}
							className="w-full md:w-14rem"
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.ci_responsibleparty_role[
								findSelectValue("ci_responsibleparty_role")?.code - 1 ?? 0
							]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</>
	);
};
