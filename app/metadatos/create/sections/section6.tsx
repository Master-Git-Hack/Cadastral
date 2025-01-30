/** @format */

import { useState, useEffect } from "react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import catalogo from "../catologos/index";

import useMedatados from "@/store/metadatos/index";
export const Section6 = ({ editable = true }: any) => {
	const { setMetadatos: setData, ...data } = useMedatados((state) => state);
	const handleInputChange = ({ currentTarget }) =>
		setData({ ...data, [currentTarget.name]: currentTarget.value });

	const findSelectValue = (name: string) => {
		const [code, label, description] = String(data[name] ?? "")?.split(". ");
		return catalogo?.[name]?.find((item) => item.code === code);
	};

	const [positionalaccuracy_value, setDataValue] = useState(
		data.positionalaccuracy_value ??
			data.temporalaccuracy_value ??
			data.thematicaccuracy_value ??
			"",
	);
	useEffect(() => {
		if (
			data.positionalaccuracy_value !== positionalaccuracy_value &&
			data.positionalaccuracy_value !== undefined
		)
			setDataValue(data.positionalaccuracy_value);
	}, [data]);
	return (
		<>
			<TableHeader>
				<TableRow>
					<TableHead colSpan={1}>6</TableHead>
					<TableHead className="text-center title" colSpan={11}>
						Calidad de la información
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
						6.1
					</TableCell>
					<TableCell colSpan={11} className=" text-black dark:text-white w-11/12">
						Alcance o ámbito
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.1.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nivel
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Select
							name="level"
							value={data.level}
							onValueChange={(level) => setData({ ...data, level })}
							disabled={!editable}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione una Categoria" />
							</SelectTrigger>
							<SelectContent>
								{catalogo.level.map(({ code, label, description }) => (
									<SelectItem value={`${code}. ${label}. ${description}`}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.level[findSelectValue("level")?.code - 1]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</TableCell>
				</TableRow>
				{/*
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2
					</TableCell>
					<TableCell colSpan={11} className=" text-black dark:text-white w-11/12">
						Reporte
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.1
					</TableCell>
					<TableCell colSpan={11} className=" text-black dark:text-white w-11/12">
						Completitud
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.1.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del subcriterio de calidad evaluado
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							value={data.dq_quantitativeresult}
							onChange={handleInputChange}
							name="dq_quantitativeresult"
							className="w-full md:w-14rem"
							type="text"
							variant="outline"
							size="lg"
						/>
						<span className="underline me-1">Revisar:</span>
						<small className="font-xs">6.2.3.1, 6.2.4.1, 6.2.5.1</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre de la prueba
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							value={
								data.dq_completeness_nameofmeasure ??
								data.dq_logicconsistency_nameofmeasure ??
								data.positionalaccuracy_nameofmeasure ??
								data.temporalaccuracy_nameofmeasure ??
								data.thematicaccuracy_nameofmeasure
							}
							onChange={({ currentTarget }) =>
								setData({
									...data,
									dq_completeness_nameofmeasure: currentTarget.value,
									dq_logicconsistency_nameofmeasure: currentTarget.value,
									positionalaccuracy_nameofmeasure: currentTarget.value,
									temporalaccuracy_nameofmeasure: currentTarget.value,
									thematicaccuracy_nameofmeasure: currentTarget.value,
								})
							}
							className="w-full md:w-14rem"
							type="text"
							variant="outline"
							size="lg"
						/>
						<span className="underline me-1">Revisar:</span>
						<small className="font-xs">6.2.3.1.1, 6.2.4.1.1, 6.2.5.1.1</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Descripción de la prueba
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input.Area
							value={
								data.dq_completeness_nameofdescription ??
								data.dq_logicconsistency_measuredescription ??
								data.positionalaccuracy_measuredescription ??
								data.temporalaccuracy_measuredescription ??
								data.thematicaccuracy_measuredescription ??
								""
							}
							onChange={({ currentTarget }) =>
								setData({
									...data,
									dq_completeness_nameofdescription: currentTarget.value,
									dq_logicconsistency_measuredescription: currentTarget.value,
									positionalaccuracy_measuredescription: currentTarget.value,
									temporalaccuracy_measuredescription: currentTarget.value,
									thematicaccuracy_measuredescription: currentTarget.value,
								})
							}
							className="w-full md:w-14rem"
							variant="outline"
							size="lg"
						/>
						<span className="underline me-1">Revisar:</span>
						<small className="font-xs">6.2.3.1.2, 6.2.4.1.2, 6.2.5.1.2</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.3
					</TableCell>
					<TableCell colSpan={11} className=" text-black dark:text-white w-11/12">
						Resultado
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.3.1
					</TableCell>
					<TableCell colSpan={11} className=" text-black dark:text-white w-11/12">
						Resultado Cuantitativo
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.3.1.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Unidad de Valor
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Dropdown
							name="positionalaccuracy_valueunit"
							options={catalogo.valueunit}
							value={findSelectValue("positionalaccuracy_valueunit")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>

						<span className="underline me-1">Revisar:</span>
						<small className="font-xs">
							6.2.3.1.3.1.1, 6.2.4.1.3.1.1, 6.2.5.1.3.1.1
						</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.3.1.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Valor
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Chips
							value={positionalaccuracy_value
								.split("|")
								.filter((item) => item.trim() !== "")}
							onChange={({ target }) => {
								const value = target.value
									.filter((item) => item.trim() !== "")
									.join("|");
								setData({
									...data,
									positionalaccuracy_value: value,
									temporalaccuracy_value: value,
									thematicaccuracy_value: value,
								});
							}}
							pt={{
								container: {
									className:
										"text-gray-900 focus:outline-none dark:bg-white bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center w-full md:w-14rem",
								},
								input: {
									className:
										"text-gray-900 focus:outline-none dark:bg-white bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center w-full md:w-14rem",
								},
							}}
							className="text-gray-900 focus:outline-none dark:bg-white bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center w-full md:w-14rem"
						/>
						<span className="underline me-1">Revisar:</span>
						<small className="font-xs">
							6.2.3.1.3.1.2, 6.2.4.1.3.1.2, 6.2.5.1.3.1.2
						</small>
					</TableCell>
				</TableRow> */}
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800 border-bottom border-none">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.3
					</TableCell>
					<TableCell colSpan={11} className=" text-black dark:text-white w-11/12">
						Linaje
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.3.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Enunciado
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Textarea
							value={data.li_source_description}
							name="li_source_description"
							onChange={handleInputChange}
							// variant="outline"
							// size="lg"
							className=" w-full md:w-14rem"
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
						6.3.2.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Descripción del proceso
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Textarea
							value={data.li_processstep_description}
							name="li_processstep_description"
							onChange={handleInputChange}
							// variant="outline"
							// size="lg"
							className=" w-full md:w-14rem"
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
						6.3.2.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Descripcion
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input.Area
							value={data.li_processstep_description}
							name="li_processstep_description"
							onChange={handleInputChange}
							variant="outline"
							size="lg"
							className=" w-full md:w-14rem"
						/>
						<span className="underline me-1">Revisar:</span>
						<small className="font-xs">6.3.3.1</small>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.3.3
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Fuente
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							value={data.li_source}
							name="li_source"
							onChange={handleInputChange}
							variant="outline"
							size="lg"
							type="text"
							className=" w-full md:w-14rem"
						/>
					</TableCell>
				</TableRow> */}
			</TableBody>
		</>
	);
};
