/** @format */

import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { InputNumber } from "primereact/inputnumber";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import catalogo from "../catologos/index";
import useMedatados from "@/store/metadatos/index.ts";
export const Section4 = ({ editable = true }: any) => {
	const { setMetadatos: setData, ...data } = useMedatados((state) => state);
	const handleInputChange = ({ target }) => setData({ ...data, [target.name]: target.value });

	const findSelectValue = (name: string) => {
		const [code, label, description] = String(data[name] ?? "")?.split(". ");
		return catalogo?.[name]?.find((item) => item.code === code);
	};

	return (
		<>
			<TableHeader>
				<TableRow>
					<TableHead colSpan={1}>4</TableHead>
					<TableHead className="text-center title" colSpan={11}>
						Localización geográfica del conjunto de datos espaciales o producto
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 border-bottom border-none">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1
					</TableCell>
					<TableCell colSpan={11} className=" text-black dark:text-white w-11/12">
						Localización geográfica del conjunto de datos espaciales o producto
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Coordenada límite al Oeste
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.westboundlongitude}
							onValueChange={handleInputChange}
							name="westboundlongitude"
							className="w-full md:w-14rem "
							maxFractionDigits={8}
							min={-180}
							step={0.0000001}
							max={180}
							inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							suffix="°"
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{"-180,0 <= valor de longitud al Oeste <= 180,0"}
						</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Coordenada límite al Este
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.eastboundlongitude}
							onValueChange={handleInputChange}
							name="eastboundlongitude"
							className="w-full md:w-14rem "
							maxFractionDigits={8}
							step={0.0000001}
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
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{"-180,0 <= valor de longitud al Este <= 180,0"}
						</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1.3
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Coordenada límite al Sur
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.southboundlatitude}
							onValueChange={handleInputChange}
							name="southboundlatitude"
							className="w-full md:w-14rem "
							// className={`w-full md:w-14rem ${
							// 	data.northboundlatitude < data.southboundlatitude &&
							// 	"border border-red-500"
							// }`}
							maxFractionDigits={8}
							step={0.0000001}
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
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{
								"-90,0 <= valor de latitud al Sur <= 90,0; valor de latitud al Sur <= valor de latitud al Norte"
							}
						</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.1.4
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Coordenada límite al Norte
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.northboundlatitude}
							onValueChange={handleInputChange}
							name="northboundlatitude"
							className="w-full md:w-14rem "
							// className={`w-full md:w-14rem ${
							// 	data.northboundlatitude < data.southboundlatitude &&
							// 	"border border-red-500"
							// }`}
							maxFractionDigits={8}
							step={0.0000001}
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
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{
								"-90,0 <= valor de latitud al Norte <= 90,0; valor de latitud al Norte >= valor de latitud al Sur"
							}
						</small>
					</TableCell>
				</TableRow>

				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						4.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Tipo de representación espacial
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Select
							name="spatialrepresentationtype"
							value={data.spatialrepresentationtype}
							onValueChange={(spatialrepresentationtype) =>
								setData({ ...data, spatialrepresentationtype })
							}
							disabled={!editable}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione una Categoria" />
							</SelectTrigger>
							<SelectContent>
								{catalogo.spatialrepresentationtype.map(
									({ code, label, description }) => (
										<SelectItem
											value={`${code}. ${label}. ${description}`}
											key={code}
										>
											{label}
										</SelectItem>
									),
								)}
							</SelectContent>
						</Select>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.spatialrepresentationtype[
								findSelectValue("spatialrepresentationtype")?.code - 1
							]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</TableCell>
				</TableRow>
			</TableBody>
		</>
	);
};
