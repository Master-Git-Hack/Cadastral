/** @format */

"use client";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import catalogo from "../catologos/index";
import useMedatados from "@/store/metadatos/index";
import moment from "moment";

export const Section9 = ({ editable = true }: any) => {
	const { setMetadatos: setData, ...data } = useMedatados((state) => state);
	const handleInputChange = ({ currentTarget }) =>
		setData({ ...data, [currentTarget.name]: currentTarget.value });

	const findSelectValue = (name: string) => {
		const [code, label, description] = String(data[name] ?? "")?.split(". ");
		return catalogo?.[name]?.find((item) => item.code === code);
	};
	const findLanguageValue = catalogo.md_dataidentification_language.find(
		(item) => item.code === data.md_dataidentification_language,
	);

	return (
		<>
			<TableHeader>
				<TableRow>
					<TableHead className="flex-row text-2xl text-black dark:text-white" colSpan={1}>
						9
					</TableHead>
					<TableHead
						className="flex-row justify-center text-center text-2xl text-black dark:text-white"
						colSpan={11}
					>
						Información de metadatos
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						9.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del estándar de metadatos
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="metadatastandardname"
							value={data.metadatastandardname}
							onChange={handleInputChange}
							type="text"
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
						9.3
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Idioma de los metadatos
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						{findLanguageValue?.label}
					</TableCell>
				</TableRow>

				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						9.4.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre de la organización
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="inf_metadata_ci_responsibleparty_organisationname"
							value={data?.inf_metadata_ci_responsibleparty_organisationname}
							onChange={handleInputChange}
							type="text"
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
						9.4.4
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Teléfono
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="inf_metadata_ci_responsibleparty_voice"
							value={data?.inf_metadata_ci_responsibleparty_voice}
							onChange={handleInputChange}
							type="text"
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
						9.4.6
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Dirección
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="ci_responsibleparty_deliverypoint"
							value={data?.ci_responsibleparty_deliverypoint}
							onChange={handleInputChange}
							type="text"
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
						9.4.7
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Ciudad
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="ci_responsibleparty_city"
							value={data?.ci_responsibleparty_city}
							onChange={handleInputChange}
							type="text"
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
						9.4.8
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Área administrativa
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						Guanajuato
					</TableCell>
				</TableRow>

				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						9.4.9
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Código postal
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="ci_responsibleparty_postalcode"
							value={data?.ci_responsibleparty_postalcode}
							onChange={handleInputChange}
							type="text"
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
						9.4.10
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						País
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="ci_responsibleparty_country"
							value={data?.ci_responsibleparty_country}
							onChange={handleInputChange}
							type="text"
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
						9.4.11
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Dirección de correo electrónico del contacto
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="ci_responsibleparty_electronicmailaddress"
							value={data?.ci_responsibleparty_electronicmailaddress}
							onChange={handleInputChange}
							type="text"
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
						9.4.12
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Rol
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Select
							name="inf_metadata_ci_responsibleparty_role"
							value={data.inf_metadata_ci_responsibleparty_role}
							onValueChange={(inf_metadata_ci_responsibleparty_role) =>
								setData({ ...data, inf_metadata_ci_responsibleparty_role })
							}
							disabled={!editable}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione una Categoria" />
							</SelectTrigger>
							<SelectContent>
								{catalogo?.ci_responsibleparty_role?.map(
									({ code, label, description }) => (
										<SelectItem value={`${code}. ${label}. ${description}`}>
											{label}
										</SelectItem>
									),
								)}
							</SelectContent>
						</Select>

						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.ci_responsibleparty_role[
								findSelectValue("ci_responsibleparty_role")?.code - 1
							]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						9.5
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Fecha de Publicación
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						{moment(data.datestamp ?? new Date())
							.format("YYYY-MM-DD")
							.toString()}
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						9.6
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Conjunto de caracteres
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						{data.md_dataidentification_characterset}
					</TableCell>
				</TableRow>
			</TableBody>
		</>
	);
};
