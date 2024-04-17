/** @format */

// export const section4 = {
// 	westboundlongitude: "",
// 	eastboundlongitude: "",
// 	southboundlatitude: "",
// 	northboundlatitude: "",
// 	spatialrepresentationtype: "",
// };
import { Table } from "flowbite-react";
import Input from "@components/Input";
import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";
import { InputNumber } from "primereact/inputnumber";
export const Section4 = ({ data, setData, editable = true }: any) => {
	const handleInputChange = ({ target }) => setData({ ...data, [target.name]: target.value });
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
					4
				</Table.HeadCell>
				<Table.HeadCell
					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
					colSpan={11}
				>
					Localización geográfica del conjunto de datos espaciales o producto
				</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Localización geográfica del conjunto de datos espaciales o producto
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Coordenada límite al Oeste
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.westboundlongitude}
							onValueChange={handleInputChange}
							name="westboundlongitude"
							className="w-full md:w-14rem "
							maxFractionDigits={2}
							min={-180}
							max={180}
							inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							suffix="°"
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{"-180,0 <= valor de longitud al Oeste <= 180,0"}
						</small>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Coordenada límite al Este
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.eastboundlongitude}
							onValueChange={handleInputChange}
							name="eastboundlongitude"
							className="w-full md:w-14rem "
							maxFractionDigits={2}
							min={-180}
							max={180}
							inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							suffix="°"
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{"-180,0 <= valor de longitud al Este <= 180,0"}
						</small>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1.3
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Coordenada límite al Sur
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.southboundlatitude}
							onValueChange={handleInputChange}
							name="southboundlatitude"
							className={`w-full md:w-14rem ${
								data.northboundlatitude < data.southboundlatitude &&
								"border border-red-500"
							}`}
							maxFractionDigits={2}
							min={-90}
							max={90}
							inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							suffix="°"
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{
								"-90,0 <= valor de latitud al Sur <= 90,0; valor de latitud al Sur <= valor de latitud al Norte"
							}
						</small>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1.4
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Coordenada límite al Norte
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.northboundlatitude}
							onValueChange={handleInputChange}
							name="northboundlatitude"
							className={`w-full md:w-14rem ${
								data.northboundlatitude < data.southboundlatitude &&
								"border border-red-500"
							}`}
							maxFractionDigits={2}
							min={-90}
							max={90}
							inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							suffix="°"
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{
								"-90,0 <= valor de latitud al Norte <= 90,0; valor de latitud al Norte >= valor de latitud al Sur"
							}
						</small>
					</Table.Cell>
				</Table.Row>

				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Tipo de representación espacial
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Dropdown
							name="spatialrepresentationtype"
							options={catalogo.spatialrepresentationtype}
							value={findSelectValue("spatialrepresentationtype")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.spatialrepresentationtype[
								findSelectValue("spatialrepresentationtype")?.code - 1 ?? 0
							]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</>
	);
};
