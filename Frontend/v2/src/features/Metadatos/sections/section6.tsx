/** @format */

// export const section6 = {
// 	level: "",
// 	dq_quantitativeresult: "",
// 	dq_completeness_nameofmeasure: "",
// 	dq_completeness_measuredescription: "",
// 	positionalaccuracy_valueunit: "",
// 	statement: "",
// 	li_processstep: "",
// 	li_source: "",
// };
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import Input from "@components/Input";
import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";
import { InputNumber } from "primereact/inputnumber";
import { Chips } from "primereact/chips";

export const Section6 = ({ data, setData, editable = true }: any) => {
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
			<Table.Head>
				<Table.HeadCell
					className="flex-row text-2xl text-black dark:text-white"
					colSpan={1}
				>
					6
				</Table.HeadCell>
				<Table.HeadCell
					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
					colSpan={11}
				>
					Calidad de la información
				</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.1
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Alcance o ámbito
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.1.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nivel
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Dropdown
							name="level"
							options={catalogo.level}
							value={findSelectValue("level")}
							onChange={handleSelectChange}
							placeholder="Seleccione una Categoria"
							className="w-full md:w-14rem"
							disabled={!editable}
						/>
						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.level[findSelectValue("level")?.code - 1 ?? 0]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Reporte
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.1
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Completitud
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.1.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del subcriterio de calidad evaluado
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
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
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre de la prueba
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
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
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Descripción de la prueba
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
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
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.3
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Resultado
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.3.1
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Resultado Cuantitativo
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.3.1.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Unidad de Valor
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
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
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.2.2.1.3.1.2
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Valor
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
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
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.3
					</Table.Cell>
					<Table.Cell colSpan={11} className=" text-black dark:text-white w-11/12">
						Linaje
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.3.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Enunciado
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Input.Area
							value={data.li_source_description}
							name="li_source_description"
							onChange={handleInputChange}
							variant="outline"
							size="lg"
							className=" w-full md:w-14rem"
						/>
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.3.2.1
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Descripcion
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
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
					</Table.Cell>
				</Table.Row>
				<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<Table.Cell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						6.3.3
					</Table.Cell>
					<Table.Cell colSpan={2} className=" text-black dark:text-white w-2/12">
						Fuente
					</Table.Cell>
					<Table.Cell colSpan={9} className=" w-9/12">
						<Input
							value={data.li_source}
							name="li_source"
							onChange={handleInputChange}
							variant="outline"
							size="lg"
							type="text"
							className=" w-full md:w-14rem"
						/>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</>
	);
};
