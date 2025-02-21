/** @format */

import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Input from "@/components/Input";
import { InputNumber } from "primereact/inputnumber";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import catalogo from "../catologos/index";
import useMedatados from "@/store/metadatos/index";
export const Section5 = ({ editable = true }: any) => {
	const { setMetadatos: setData, ...data } = useMedatados((state) => state);
	const handleInputChange = ({ target }) =>
		setData({ ...data, [target.name]: target.value });
	const handleSelectChange = ({
		target: {
			name,
			value: { code, label, description },
		},
	}) => setData({ ...data, [name]: `${code}. ${label}. ${description}` });
	const findSelectValue = (name: string) => {
		const [code, label, description] = String(data[name] ?? "").split(". ");
		return catalogo?.[name]?.find((item) => item.code === code);
	}
	const findLanguageValue = catalogo.md_dataidentification_language.find(
		(item) => item.code === data.md_dataidentification_language,
	);
	const spatialrepresentationtype = findSelectValue(
		"spatialrepresentationtype",
	)?.label;
	const enabled =
		spatialrepresentationtype === "Vector" ||
		spatialrepresentationtype === "Raster" ||
		spatialrepresentationtype === "TIN";
	const justNumbers = (value: string) => {
		if (!value) return 0;
		return Number.parseFloat(String(value)?.replace(/[^0-9.]/g, ""));
	};
	return (
		<>
			<TableHeader>
				<TableRow>
					<TableHead colSpan={1}>5</TableHead>
					<TableHead className="text-center title" colSpan={11}>
						Sistema de Referencia
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{/*enabled && (
					<>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Sistema de Referencia Horizontal
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.1
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Coordenadas Geográficas
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.1.1
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de latitud
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.latres}
									onValueChange={handleInputChange}
									name="latres"
									className={`w-full md:w-14rem ${
										data.latres <= 0 && "border border-red-500"
									}`}
									maxFractionDigits={7}
									step={0.0000001}
									min={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"Resolución de latitud > 0.0"}</small>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.1.2
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de longitud
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.longres ?? 1}
									onValueChange={handleInputChange}
									name="longres"
									className={`w-full md:w-14rem ${
										data.longres <= 0 && "border border-red-500"
									}`}
									maxFractionDigits={7}
									step={0.0000001}
									min={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"Resolución de latitud > 0.0"}</small>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.1.3
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Unidades de coordenadas geográficas
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<Dropdown
									name="geounit"
									options={catalogo.geounit}
									value={findSelectValue("geounit")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
									disabled={!editable}
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Coordenadas Planas
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Proyección Cartográfica
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Cónica Conforme de Lambert
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.1
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Paralelo estándar
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={justNumbers(data.lambertc_stdparll) }
									onValueChange={handleInputChange}
									name="lambertc_stdparll"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									min={-90}
									max={90}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"-90 a 90"}</small>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.2
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Longitud del meridiano central
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.lambertc_longcm }
									onValueChange={handleInputChange}
									name="lambertc_longcm"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									min={-180}
									max={180}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"-180 a 180"}</small>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.3
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Latitud del origen de proyección
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercatort_latprjo }
									onValueChange={handleInputChange}
									name="mercatort_latprjo"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									min={-90}
									max={90}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
								<span className="underline me-1">Descripción:</span>
								<small className="font-xs">{"-90 a 90"}</small>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.4
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Falso este
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercator_feast }
									onValueChange={handleInputChange}
									name="mercator_feast"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.1.5
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Falso norte
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercator_fnorth }
									onValueChange={handleInputChange}
									name="mercator_fnorth"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.2
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Transversa de Mercator
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.2.1
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Factor de escala en el meridiano central
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercator_sfec }
									onValueChange={handleInputChange}
									name="mercator_sfec"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									min={-180}
									max={180}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.1.2.2
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Longitud del meridiano central
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.mercator_sfec }
									onValueChange={handleInputChange}
									name="mercator_sfec"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									min={-180}
									max={180}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.2
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Sistema de Coordenadas de Cuadrícula
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.2.1.1
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Número de zona UTM
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.utm_zone ?? 14}
									onValueChange={handleInputChange}
									name="mercator_sfec"
									className="w-full md:w-14rem "
									maxFractionDigits={0}
									min={1}
									max={60}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									deccurl --location 'https://api-sandbox.lyft.net/oauth/token' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic eWxCSjBVeFJSdzBpOlNBTkRCT1gtVHBwMDZFclJjSlNBVVVVNkhLeFJvaG82dWk1ZmdxZjM=' \
--data '    {
    "grant_type": "client_credentials",
    "scope": "rides.read"
}'rementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Plana Local
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.local_planar}
									onValueChange={handleInputChange}
									name="mercator_sfec"
									className="w-full md:w-14rem "
									maxFractionDigits={0}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									inccurl --location 'https://api-sandbox.lyft.net/oauth/token' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic eWxCSjBVeFJSdzBpOlNBTkRCT1gtVHBwMDZFclJjSlNBVVVVNkhLeFJvaG82dWk1ZmdxZjM=' \
--data '    {
    "grant_type": "client_credentials",
    "scope": "rides.read"
}'rementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3.1
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Descripción de la Plana Local
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<Input.Area
									name="local_desc"
									type="text"
									variant="outline"
									size="lg"
									value={data.local_desc}
									onChange={handleInputChange}
									disabled={!editable}
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="curl --location 'https://api-sandbox.lyft.net/oauth/token' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic eWxCSjBVeFJSdzBpOlNBTkRCT1gtVHBwMDZFclJjSlNBVVVVNkhLeFJvaG82dWk1ZmdxZjM=' \
--data '    {
    "grant_type": "client_credentials",
    "scope": "rides.read"
}'row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3.2
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Información de Georreferencia de la Plana Local
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<Input.Area
									name="local_geo_inf"
									type="text"
									variant="outline"
									size="lg"
									value={data.local_geo_inf}
									onChange={handleInputChange}
									disabled={!editable}
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3.4
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Información de coordenadas planas
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3.4.1
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Método codificado de coordenada plana
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<Dropdown
									name="coord_repres"
									options={catalogo.coord_repres}
									value={findSelectValue("coord_repres")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
									disabled={!editable}
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3.4.2.2.1
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de abscisa
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.absres }
									onValueChange={handleInputChange}
									name="ordres"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.3.4.2.2.2
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de ordenada
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.ordres }
									onValueChange={handleInputChange}
									name="ordres"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Representación de distancia y rumbo
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3.1
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de distancia
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.distance_res }
									onValueChange={handleInputChange}
									name="distance_res"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3.2
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Resolución de rumbo
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.bearing_res }
									onValueChange={handleInputChange}
									name="bearing_res"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3.3
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Unidades de rumbo
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<Dropdown
									name="bearing_uni"
									options={catalogo.bearing_uni}
									value={findSelectValue("bearing_uni")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
									disabled={!editable}
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3.4
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Dirección del rumbo de referencia
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<Dropdown
									name="ref_bearing_dir"
									options={catalogo.ref_bearing_dir}
									value={findSelectValue("ref_bearing_dir")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
									disabled={!editable}
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3.5
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Meridiano del rumbo de referencia
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<Dropdown
									name="ref_bearing_mer"
									options={catalogo.ref_bearing_mer}
									value={findSelectValue("ref_bearing_mer")}
									onChange={handleSelectChange}
									placeholder="Seleccione una Categoria"
									className="w-full md:w-14rem"
									disabled={!editable}
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.3
							</TableCell>
							<TableCell
								colSpan={11}
								className=" text-black dark:text-white w-11/12"
							>
								Coordenadas Locales
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.3.1
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Descripción Local
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<Input.Area
									name="local_desc"
									type="text"
									variant="outline"
									size="lg"
									value={data.local_desc}
									onChange={handleInputChange}
									disabled={!editable}
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.3.2
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Información de Georreferenciación Local
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<Input.Area
									name="local_geo_inf"
									type="text"
									variant="outline"
									size="lg"
									value={data.local_geo_inf}
									onChange={handleInputChange}
									disabled={!editable}
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.2.4.3.4
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Dirección del rumbo de referencia
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
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
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.4.2
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Nombre del elipsoide
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
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
							</TableCell>
						</TableRow>

						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.4.3
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Semieje mayor
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.semiaxis ?? 1}
									onValueChange={handleInputChange}
									name="semiaxis"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
						<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<TableCell
								scope="row"
								colSpan={1}
								className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
							>
								5.1.4.4
							</TableCell>
							<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
								Factor de denominador de achatamiento
							</TableCell>
							<TableCell colSpan={9} className=" w-9/12">
								<InputNumber
									value={data.denflat }
									onValueChange={handleInputChange}
									name="denflat"
									className="w-full md:w-14rem "
									maxFractionDigits={7}
									step={0.0000001}
									inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
									buttonLayout="horizontal"
									decrementButtonClassName="p-button-info"
									incrementButtonClassName="p-button-info"
									incrementButtonIcon="pi pi-plus"
									decrementButtonIcon="pi pi-minus"
									showButtons
								/>
							</TableCell>
						</TableRow>
					</>
				)*/}
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 border-bottom border-none">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1
					</TableCell>
					<TableCell
						colSpan={11}
						className=" text-black dark:text-white w-11/12"
					>
						Sistema de Referencia Horizontal
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 border-bottom border-none">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.2
					</TableCell>
					<TableCell
						colSpan={11}
						className=" text-black dark:text-white w-11/12"
					>
						Coordenadas Planas
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.2.2.1.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Número de Zona UTM
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.utm_zone}
							onValueChange={handleInputChange}
							name="utm_zone"
							className={`w-full md:w-14rem ${
								data.utm_zone <= 0 && "border border-red-500"
							}`}
							maxFractionDigits={0}
							step={1}
							min={1}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">{"Resolución de latitud > 0.0"}</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.2.2.1.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Factor de escala en el meridiano central
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						{data.utm_sfctrmer}
						{/* <InputNumber
							value={data.utm_sfctrmer}
							onValueChange={handleInputChange}
							name="utm_sfctrmer"
							className={`w-full md:w-14rem ${
								data.utm_sfctrmer <= 0 && "border border-red-500"
							}`}
							maxFractionDigits={0}
							step={1}
							min={1}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">{"Resolución de latitud > 0.0"}</small> */}
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.2.2.1.3
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Longitud del meridiano central
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.utm_longcm}
							onValueChange={handleInputChange}
							name="utm_longcm"
							className={`w-full md:w-14rem `}
							maxFractionDigits={0}
							step={1}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							Para sistemas de referencia WGS84 UTM zona 14N (EPSG:32614) y
							México ITRF2008 UTM zona 14N: <strong>-99.00</strong>
						</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.2.2.1.4
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Latitud del origen de proyección
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.utm_latprjo}
							onValueChange={handleInputChange}
							name="utm_latprjo"
							className={`w-full md:w-14rem `}
							maxFractionDigits={0}
							step={1}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.2.2.1.5
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Falso este
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.utm_feast}
							onValueChange={handleInputChange}
							name="utm_feast"
							className="w-full md:w-14rem"
							maxFractionDigits={0}
							step={1}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.2.2.1.6
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Falso norte
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.utm_fnorth}
							onValueChange={handleInputChange}
							name="utm_fnorth"
							className={`w-full md:w-14rem `}
							maxFractionDigits={0}
							step={1}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.2.4.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del datum horizontal
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Select
							name="horizdn"
							value={data.horizdn}
							onValueChange={(horizdn) => setData({ ...data, horizdn })}
							disabled={!editable}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione una Categoria" />
							</SelectTrigger>
							<SelectContent>
								{catalogo.horizdn.map(({ code, label, description }) => (
									<SelectItem value={`${code}. ${label}. ${description}`} key={`${code}. ${label}. ${description}`}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.4.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del elipsoide
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Select
							name="ellips"
							value={data.ellips}
							onValueChange={(ellips) => setData({ ...data, ellips })}
							disabled={!editable}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione una Categoria" />
							</SelectTrigger>
							<SelectContent>
								{catalogo.ellips.map(({ code, label, description }) => (
									<SelectItem value={`${code}. ${label}. ${description}`} key={`${code}. ${label}. ${description}`}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</TableCell>
				</TableRow>

				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.4.3
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Semieje mayor
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.semiaxis ?? 1}
							onValueChange={handleInputChange}
							name="semiaxis"
							className="w-full md:w-14rem "
							maxFractionDigits={7}
							step={0.0000001}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.1.4.4
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Factor de denominador de achatamiento
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.denflat ?? 1}
							onValueChange={handleInputChange}
							name="denflat"
							className="w-full md:w-14rem "
							maxFractionDigits={12}
							step={0.000000000001}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				{/* <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2
					</TableCell>
					<TableCell colSpan={11} className=" text-black dark:text-white w-11/12">
						Sistema de Referencia Vertical
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.1.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del datum de altitud
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
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
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.1.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Resolución de altitud
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.altres ?? 1}
							onValueChange={handleInputChange}
							name="semiaxis"
							className="w-full md:w-14rem "
							maxFractionDigits={7}
							step={0.0000001}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
						/>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.1.3
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Unidades de distancia de altitud
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
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
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.1.4
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Método codificado de altitud
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Dropdown
							name="altdatum"
							options={catalogo.altdatum}
							value={findSelectValue("altdatum")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.2.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del datum de profundidad
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
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
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.2.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Resolución de profundidad
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<InputNumber
							value={data.depthres ?? 1}
							onValueChange={handleInputChange}
							name="depthres"
							className="w-full md:w-14rem "
							maxFractionDigits={7}
							step={0.0000001}
							inputClassName="text-gray-900 dark:bg-white focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center"
							buttonLayout="horizontal"
							decrementButtonClassName="p-button-info"
							incrementButtonClassName="p-button-info"
							incrementButtonIcon="pi pi-plus"
							decrementButtonIcon="pi pi-minus"
							showButtons
						/>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						5.2.2.3
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Unidades de distancia de profundidad
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
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
					</TableCell>
				</TableRow> */}
			</TableBody>
		</>
	);
};
