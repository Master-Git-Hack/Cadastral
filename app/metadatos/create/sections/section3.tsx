/** @format */

import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import catalogo from "../catologos/index";
import { Input } from "@/components/ui/input";
import useMedatados from "@/store/metadatos/index";
export const Section3 = ({ editable = true }: any) => {
	const { setMetadatos: setData, ...data } = useMedatados((state) => state);
	const handleInputChange = ({ currentTarget }) =>
		setData({ ...data, [currentTarget.name]: currentTarget.value });

	const findSelectValue = (name: string) => {
		const [code, label, description] = String(data[name] ?? "")?.split(". ");
		return catalogo?.[name]?.find((item) => item.code === code);
	};

	return (
		<>
			<TableHeader>
				<TableHead colSpan={1}>3</TableHead>
				<TableHead className="text-center title" colSpan={11}>
					Unidad del estado responsable del conjunto de datos espaciales o
					producto
				</TableHead>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell scope="row" colSpan={1}>
						3.1
					</TableCell>
					<TableCell colSpan={2}>Nombre de la persona de contacto</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_individualname"
							type="text"
							placeholder="Nombre de la persona responsable (productor) dando apellido y nombre."
							value={data.ci_responsibleparty_individualname}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Nombre de la organización
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_organisationname"
							type="text"
							placeholder="Nombre de la organización responsable"
							value={data.ci_responsibleparty_organisationname}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell scope="row" colSpan={1}>
						3.3
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Puesto del contacto
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_positionname"
							type="text"
							placeholder="Cargo de la persona responsable"
							value={data.ci_responsibleparty_positionname}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.4
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Teléfono
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_voice"
							type="text"
							placeholder="Teléfono de la persona responsable"
							value={data.ci_responsibleparty_voice}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.8
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Área administrativa
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_administrativearea"
							type="text"
							placeholder="Área de la persona responsable"
							value={data.ci_responsibleparty_administrativearea}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.12
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Enlace en línea (dirección de Internet de referencia)
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Input
							name="ci_responsibleparty_linkage"
							type="url"
							placeholder="http://www.inegi.org.mx/normatividad_geografica"
							value={data.ci_responsibleparty_linkage}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						3.13
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Rol
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Select
							name="ci_responsibleparty_role"
							value={data.ci_responsibleparty_role}
							onValueChange={(ci_responsibleparty_role) =>
								setData({ ...data, ci_responsibleparty_role })
							}
							disabled={!editable}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione una opción" />
							</SelectTrigger>
							<SelectContent>
								{catalogo.ci_responsibleparty_role.map(
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
			</TableBody>
		</>
	);
};
