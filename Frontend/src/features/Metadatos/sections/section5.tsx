/** @format */

// export const section5 = {
// 	: "",
// 	utm_zone: "",
// 	local_desc: "",
// 	local_geo_inf: "",
// 	coord_repres: "",
// 	ordres: "",
// 	absres: "",
// 	distance_res: "",
// 	bearing_res: "",
// 	bearing_uni: "",
// 	ref_bearing_dir: "",
// 	ref_bearing_mer: "",
// 	plandu: "",
// 	horizdn: "",
// 	ellips: "",
// 	semiaxis: "",
// 	altenc: "",
// 	altres: "",
// 	altunits: "",
// 	altdatum: "",
// 	depthdn: "",
// 	depthres: "",
// 	depthdu: "",
// };
import { Table } from "flowbite-react";
import Input from "@components/Input";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";

export const Section5 = ({ data, setData, editable = true }: any) => {
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
	const spatialrepresentationtype = findSelectValue("spatialrepresentationtype")?.label;
	const enabled =
		spatialrepresentationtype === "Vector" ||
		spatialrepresentationtype === "Raster" ||
		spatialrepresentationtype === "TIN";
	const justNumbers = (value: string) => parseFloat(value.replace(/[^0-9.]/g, ""));
	return (
		<>
			<Table.Head>
				<Table.HeadCell
					className="flex-row text-2xl text-black dark:text-white"
					colSpan={1}
				>
					5
				</Table.HeadCell>
				<Table.HeadCell
					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
					colSpan={11}
				>
					Sistema de Referencia
				</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				{enabled && (
					<>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Sistema de Referencia Horizontal
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.1
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Coordenadas Geográficas
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.1.1
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de latitud
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.latres}
									onValueChange={handleInputChange}
									name="latres"
									className={`w-full md:w-14rem ${
										data.latres <= 0 && "border border-red-500"
									}`}
									maxFractionDigits={2}
									min={0.01}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"Resolución de latitud > 0.0"}</small>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.1.2
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de longitud
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.longres ?? 1}
									onValueChange={handleInputChange}
									name="longres"
									className={`w-full md:w-14rem ${
										data.longres <= 0 && "border border-red-500"
									}`}
									maxFractionDigits={2}
									min={0.01}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"Resolución de latitud > 0.0"}</small>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.1.3
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Unidades de coordenadas geográficas
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Dropdown
									name="geounit"
									options={catalogo.geounit}
									value={findSelectValue("geounit")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
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
								5.1.2
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Coordenadas Planas
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Proyección Cartográfica
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Cónica Conforme de Lambert
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.1
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Paralelo estándar
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={justNumbers(data.lambertc_stdparll) ?? 0}
									onValueChange={handleInputChange}
									name="lambertc_stdparll"
									className="w-full md:w-14rem "
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
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"-90 a 90"}</small>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.2
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Longitud del meridiano central
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.lambertc_longcm ?? 0}
									onValueChange={handleInputChange}
									name="lambertc_longcm"
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
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"-180 a 180"}</small>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.3
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Latitud del origen de proyección
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercatort_latprjo ?? 0}
									onValueChange={handleInputChange}
									name="mercatort_latprjo"
									className="w-full md:w-14rem "
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
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"-90 a 90"}</small>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.4
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Falso este
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercator_feast ?? 0}
									onValueChange={handleInputChange}
									name="mercator_feast"
									className="w-full md:w-14rem "
									maxFractionDigits={2}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.5
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Falso norte
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercator_fnorth ?? 0}
									onValueChange={handleInputChange}
									name="mercator_fnorth"
									className="w-full md:w-14rem "
									maxFractionDigits={2}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.2
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Transversa de Mercator
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.2.1
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Factor de escala en el meridiano central
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercator_sfec ?? 0}
									onValueChange={handleInputChange}
									name="mercator_sfec"
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
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.2.2
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Longitud del meridiano central
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercator_sfec ?? 0}
									onValueChange={handleInputChange}
									name="mercator_sfec"
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
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.2
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Sistema de Coordenadas de Cuadrícula
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.2.1.1
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Número de zona UTM
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.utm_zone ?? 0}
									onValueChange={handleInputChange}
									name="mercator_sfec"
									className="w-full md:w-14rem "
									maxFractionDigits={0}
									min={1}
									max={60}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Plana Local
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.local_planar}
									onValueChange={handleInputChange}
									name="mercator_sfec"
									className="w-full md:w-14rem "
									maxFractionDigits={0}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3.1
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Descripción de la Plana Local
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Input.Area
									name="local_desc"
									type="text"
									variant="outline"
									size="lg"
									value={data.local_desc}
									onChange={handleInputChange}
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
								5.1.2.3.2
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Información de Georreferencia de la Plana Local
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Input.Area
									name="local_geo_inf"
									type="text"
									variant="outline"
									size="lg"
									value={data.local_geo_inf}
									onChange={handleInputChange}
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
								5.1.2.3.4
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Información de coordenadas planas
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3.4.1
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Método codificado de coordenada plana
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Dropdown
									name="coord_repres"
									options={catalogo.coord_repres}
									value={findSelectValue("coord_repres")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
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
								5.1.2.3.4.2.2.1
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de abscisa
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.absres ?? 0}
									onValueChange={handleInputChange}
									name="ordres"
									className="w-full md:w-14rem "
									maxFractionDigits={2}
									min={0.01}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3.4.2.2.2
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de ordenada
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.ordres ?? 0}
									onValueChange={handleInputChange}
									name="ordres"
									className="w-full md:w-14rem "
									maxFractionDigits={2}
									min={0.01}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Representación de distancia y rumbo
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3.1
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de distancia
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.distance_res ?? 0}
									onValueChange={handleInputChange}
									name="distance_res"
									className="w-full md:w-14rem "
									maxFractionDigits={2}
									min={0.01}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3.2
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de rumbo
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.bearing_res ?? 0}
									onValueChange={handleInputChange}
									name="bearing_res"
									className="w-full md:w-14rem "
									maxFractionDigits={2}
									min={0.01}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3.3
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Unidades de rumbo
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Dropdown
									name="bearing_uni"
									options={catalogo.bearing_uni}
									value={findSelectValue("bearing_uni")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
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
								5.1.2.4.3.4
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Dirección del rumbo de referencia
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Dropdown
									name="ref_bearing_dir"
									options={catalogo.ref_bearing_dir}
									value={findSelectValue("ref_bearing_dir")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
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
								5.1.2.4.3.5
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Meridiano del rumbo de referencia
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Dropdown
									name="ref_bearing_mer"
									options={catalogo.ref_bearing_mer}
									value={findSelectValue("ref_bearing_mer")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
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
								5.1.3
							</Table.Cell>
							<Table.Cell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Coordenadas Locales
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.3.1
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Descripción Local
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Input.Area
									name="local_desc"
									type="text"
									variant="outline"
									size="lg"
									value={data.local_desc}
									onChange={handleInputChange}
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
								5.1.3.2
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Información de Georreferenciación Local
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Input.Area
									name="local_geo_inf"
									type="text"
									variant="outline"
									size="lg"
									value={data.local_geo_inf}
									onChange={handleInputChange}
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
								5.1.2.4.3.4
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Dirección del rumbo de referencia
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Dropdown
									name="horizdn"
									editable
									options={catalogo.horizdn}
									value={findSelectValue("horizdn")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
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
								5.1.4.2
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Nombre del elipsoide
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<Dropdown
									name="ellips"
									editable
									options={catalogo.ellips}
									value={findSelectValue("ellips")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
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
								5.1.4.3
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Semieje mayor
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.semiaxis ?? 1}
									onValueChange={handleInputChange}
									name="semiaxis"
									className="w-full md:w-14rem "
									maxFractionDigits={2}
									min={0.01}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.4.4
							</Table.Cell>
							<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
								Factor de denominador de achatamiento
							</Table.Cell>
							<Table.Cell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.denflat ?? 0}
									onValueChange={handleInputChange}
									name="denflat"
									className="w-full md:w-14rem "
									maxFractionDigits={2}
									inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</Table.Cell>
						</Table.Row>
					</>
				)}
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Sistema de Referencia Vertical
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.1.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del datum de altitud
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Dropdown
							name="altenc"
							editable
							options={catalogo.altenc}
							value={findSelectValue("altenc")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
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
						5.2.1.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Resolución de altitud
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.altres ?? 1}
							onValueChange={handleInputChange}
							name="semiaxis"
							className="w-full md:w-14rem "
							maxFractionDigits={2}
							min={0.01}
							inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.1.3
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Unidades de distancia de altitud
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Dropdown
							name="altunits"
							editable
							options={catalogo.altunits}
							value={findSelectValue("altunits")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
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
						5.2.1.4
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Método codificado de altitud
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Dropdown
							name="altdatum"
							options={catalogo.altdatum}
							value={findSelectValue("altdatum")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
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
						5.2.2.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del datum de profundidad
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Dropdown
							name="depthdn"
							options={catalogo.depthdn}
							editable
							value={findSelectValue("depthdn")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
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
						5.2.2.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Resolución de profundidad
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.depthres ?? 1}
							onValueChange={handleInputChange}
							name="depthres"
							className="w-full md:w-14rem "
							maxFractionDigits={2}
							min={0.01}
							inputClassName="text-gray-900 dark:bg-white focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.2.3
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Unidades de distancia de profundidad
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Dropdown
							name="depthdu"
							options={catalogo.depthdu}
							editable
							value={findSelectValue("depthdu")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</>
	);
};
