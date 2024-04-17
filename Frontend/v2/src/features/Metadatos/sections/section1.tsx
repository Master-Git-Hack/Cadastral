/** @format */

import { Table } from "flowbite-react";
import Input from "@components/Input";
import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";

export const Section1 = ({ data, setData, editable = true }: any) => {
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
					1
				</Table.HeadCell>
				<Table.HeadCell
					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
					colSpan={11}
				>
					Identificación del conjunto de datos espaciales o producto
				</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						1.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Título del conjunto de datos espaciales o producto
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Input
							name="title"
							type="text"
							variant="outline"
							size="lg"
							placeholder="Nombre y/o clave por los que se conoce al conjunto de datos espaciales o producto."
							value={data.title}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Propósito
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Input.Area
							name="purpose"
							type="text"
							variant="outline"
							size="lg"
							placeholder="Resumen de las intenciones por las cuales fue desarrollado el conjunto de datos espaciales o producto."
							value={data.purpose}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.3
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Descripción del conjunto de datos espaciales o producto
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Input.Area
							name="abstract"
							placeholder="Descripción del contenido del(os) recurso(s) considerando además alguna información complementaria."
							type="text"
							variant="outline"
							size="lg"
							value={data.abstract}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.4
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Idioma del conjunto de datos espaciales o producto
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Dropdown
							name="md_dataidentification_language"
							options={catalogo.md_dataidentification_language}
							value={findLanguageValue}
							onChange={({ target: { name, value } }) =>
								setData({ ...data, [name]: value.code })
							}
							placeholder="Seleccione un Idioma"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.5
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white">
						Categoría del tema del conjunto de datos espaciales o producto
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.5.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Tema principal del conjunto de datos espaciales o producto
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Dropdown
							name="topiccategory"
							options={catalogo.topiccategory}
							value={findSelectValue("topiccategory")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.topiccategory[findSelectValue("topiccategory")?.code - 1 ?? 0]
								?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</Table.Cell>
				</Table.Row>

				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.5.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Grupo de datos del conjunto de datos espaciales o producto
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Dropdown
							name="groupcategory"
							options={catalogo.groupcategory}
							value={findSelectValue("groupcategory")}
							onChange={handleSelectChange}
							placeholder="Seleccione un Grupo de Datos"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.groupcategory[findSelectValue("groupcategory")?.code - 1 ?? 0]
								?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.6
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Palabra clave
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Input
							name="keyword"
							type="text"
							variant="outline"
							placeholder="Palabras o frases usadas para describir algún aspecto del conjunto de datos espaciales o producto y que pueden ser utilizadas como referencia para búsquedas."
							size="lg"
							value={data.keyword}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.10
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Forma de presentación de los datos espaciales
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Dropdown
							name="presentationform"
							options={catalogo.presentationform}
							value={findSelectValue("presentationform")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Forma de Presentación"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.presentationform[
								findSelectValue("presentationform")?.code - 1 ?? 0
							]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.11
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white">
						Enlace en línea
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.11.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						URL del recurso
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Input
							name="ci_onlineresource_linkage"
							type="url"
							variant="outline"
							size="lg"
							placeholder="http://www.inegi.org.mx, ftp://inegi.org.mx/mapa.jpg"
							value={data.ci_onlineresource_linkage}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.12
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Frecuencia de mantenimiento y actualización
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Dropdown
							name="maintenanceandupdatefrequency"
							options={catalogo.maintenanceandupdatefrequency}
							value={findSelectValue("maintenanceandupdatefrequency")}
							onChange={handleSelectChange}
							placeholder="Seleccione la Frecuencia de Actualización"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.maintenanceandupdatefrequency[
								findSelectValue("maintenanceandupdatefrequency")?.code - 1 ?? 0
							]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.13
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Conjunto de caracteres
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Dropdown
							name="md_dataidentification_characterset"
							options={catalogo.md_dataidentification_characterset}
							value={findSelectValue("md_dataidentification_characterset")}
							onChange={handleSelectChange}
							placeholder="Seleccione un conjunto"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.md_dataidentification_characterset[
								findSelectValue("md_dataidentification_characterset")?.code - 1 ?? 0
							]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						1.15
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white">
						Uso específico
					</Table.Cell>
					<Table.Cell colSpan={9}>
						<Input.Area
							name="ci_onlineresource_linkage"
							variant="outline"
							size="lg"
							placeholder="Descripción de la manera en la cual el conjunto de datos espaciales o producto es o ha sido utilizado"
							value={data.ci_onlineresource_linkage}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</>
	);
};
