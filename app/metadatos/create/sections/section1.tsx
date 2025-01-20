/** @format */

"use client";
// /** @format */
// import { useState, useEffect } from "react";
// import { Table } from "flowbite-react";
import { Chips } from "primereact/chips";
// import Input from "@components/Input";
// import { Dropdown } from "primereact/dropdown";
import catalogo from "../catologos/index";
import { MultiSelect } from "primereact/multiselect";
// export const Section1 = ({ data, setData, editable = true }: any) => {
// 	useEffect(() => {
// 		if (
// 			(data.db_name &&
// 				data.schema_name &&
// 				data.table_name !== data.ci_onlineresource_linkage) ||
// 			data.ci_onlineresource_linkage === ""
// 		)
// 			setData((prev) => ({
// 				...prev,
// 				ci_onlineresource_linkage: `postgresql://user:password@server/${data.db_name}/${data.schema_name}/${data.table_name}`,
// 				entity_detail: `postgresql://user:password@server/${data.db_name}/${data.schema_name}/${data.table_name}`,
// 			}));
// 	}, [data.db_name, data.schema_name, data.table]);
// 	const handleInputChange = ({ currentTarget }) =>
// 		setData({ ...data, [currentTarget.name]: currentTarget.value });
// 	const handleSelectChange = ({
// 		target: {
// 			name,
// 			value: { code, label, description },
// 		},
// 	}) => setData({ ...data, [name]: `${code}. ${label}. ${description}` });
// 	const findSelectValue = (name: string) => {
// 		const [code] = String(data[name] ?? "")?.split(".");
// 		return catalogo?.[name]?.find((item) => item.code === code);
// 	};
// 	const findLanguageValue = catalogo.md_dataidentification_language.find(
// 		(item) => item.code === data.md_dataidentification_language,
// 	);

// 	const handleMultiSelect = (e) => {
// 		const { name } = e.target;
// 		const items = e.value.filter((item) => {
// 			return item.code && item.label !== "undefined" && item.description !== "undefined";
// 		});
// 		setData({
// 			...data,
// 			[name]: items.map((item) => `${item.code}. ${item.label}. ${item.description}`),
// 		});
// 	};
// 	const findMultiSelect = (name: string) => {
// 		const input = data[name] ?? [];
// 		const result = input
// 			.map((item) => {
// 				const [code, label, description] = item.split(". ").map((text, index) => {
// 					if (index === 0 && text.trim()) {
// 						return text.trim();
// 					} else if (index !== 0 && text.trim() !== "undefined") {
// 						return text.trim();
// 					}
// 					return null;
// 				});

// 				if (code && label !== "undefined" && description !== "undefined") {
// 					return { code, label, description };
// 				}
// 				return null;
// 			})
// 			.filter((item) => item !== null);
// 		return result;
// 	};
// 	return (
// 		<>
// 			<Table.Head>
// 				<Table.HeadCell
// 					className="flex-row text-2xl text-black dark:text-white"
// 					colSpan={1} className="w-[25px] text-center"
// 				>
// 					1
// 				</Table.HeadCell>
// 				<Table.HeadCell
// 					className="flex-row justify-center text-center text-2xl text-black dark:text-white"
// 					colSpan={11}
// 				>
// 					Identificación del conjunto de datos espaciales o producto
// 				</Table.HeadCell>
// 			</Table.Head>
// 			<Table.Body>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
// 						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
// 					>
// 						1.1
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center " className=" text-black dark:text-white w-2/12">
// 						Título del conjunto de datos espaciales o producto
// 					</TableCell>
// 					<TableCell colSpan={9} className=" w-9/12">
// 						<Input
// 							name="title"
// 							type="text"
// 							variant="outline"
// 							size="lg"
// 							placeholder="Nombre y/o clave por los que se conoce al conjunto de datos espaciales o producto."
// 							value={data.title}
// 							onChange={handleInputChange}
// 							disabled={!editable}
// 						/>
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.2
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Propósito
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<Textarea
// 							name="purpose"
// 							type="text"
// 							variant="outline"
// 							size="lg"
// 							placeholder="Resumen de las intenciones por las cuales fue desarrollado el conjunto de datos espaciales o producto."
// 							value={data.purpose}
// 							onChange={handleInputChange}
// 							disabled={!editable}
// 						/>
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.3
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Descripción del conjunto de datos espaciales o producto
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<Textarea
// 							name="abstract"
// 							placeholder="Descripción del contenido del(os) recurso(s) considerando además alguna información complementaria."
// 							type="text"
// 							variant="outline"
// 							size="lg"
// 							value={data.abstract}
// 							onChange={handleInputChange}
// 							disabled={!editable}
// 						/>
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.4
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Idioma del conjunto de datos espaciales o producto
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<Dropdown
// 							name="md_dataidentification_language"
// 							options={catalogo.md_dataidentification_language}
// 							value={findLanguageValue}
// 							onChange={({ target: { name, value } }) =>
// 								setData({ ...data, [name]: value.code })
// 							}
// 							placeholder="Seleccione un Idioma"
// 							className="w-full md:w-14rem"
// 							disabled={!editable}
// 						/>
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.5
// 					</TableCell>
// 					<TableCell colSpan={11}>
// 						Categoría del tema del conjunto de datos espaciales o producto
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.5.1
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Tema principal del conjunto de datos espaciales o producto
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<MultiSelect
// 							name="topiccategory"
// 							options={catalogo.topiccategory}
// 							value={findMultiSelect("topiccategory")}
// 							onChange={handleMultiSelect}
// 							placeholder="Seleccione una Categoria"
// 							disabled={!editable}
// 							className="w-full md:w-14rem"
// 							display="chip"
// 							selectAll={false}
// 							showSelectAll={false}
// 						/>
// 					</TableCell>
// 				</TableRow>

// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.5.2
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Grupo de datos del conjunto de datos espaciales o producto
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<Dropdown
// 							name="groupcategory"
// 							options={catalogo.groupcategory}
// 							value={findSelectValue("groupcategory")}
// 							onChange={handleSelectChange}
// 							placeholder="Seleccione un Grupo de Datos"
// 							className="w-full md:w-14rem"
// 							disabled={!editable}
// 						/>
// 						<span className="underline me-1">Descripción:</span>
// 						<small className="font-xs">
// 							{catalogo.groupcategory[findSelectValue("groupcategory")?.code - 1]
// 								?.description ??
// 								"Seleccione una opción para ver su descripción correspondiente"}
// 						</small>
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.6
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Palabra clave
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<Chips
// 							name="keyword"
// 							value={data.keyword}
// 							onChange={(e) => setData((prev) => ({ ...prev, keyword: e.value }))}
// 							placeholder="Palabras o frases usadas para describir algún aspecto del conjunto de datos espaciales o producto y que pueden ser utilizadas como referencia para búsquedas."
// 							disabled={!editable}
// 							allowDuplicate={false}
// 							pt={{
// 								root: {
// 									className: "w-full md:w-14rem",
// 								},
// 								container: {
// 									className: "w-full md:w-14rem",
// 								},
// 							}}
// 						/>
// 						{/* <Input
// 							name="keyword"
// 							type="text"
// 							variant="outline"
// 							placeholder="Palabras o frases usadas para describir algún aspecto del conjunto de datos espaciales o producto y que pueden ser utilizadas como referencia para búsquedas."
// 							size="lg"
// 							value={data.keyword}
// 							onChange={handleInputChange}
// 							disabled={!editable}
// 						/> */}
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.10
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Forma de presentación de los datos espaciales
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<MultiSelect
// 							name="presentationform"
// 							options={catalogo.presentationform}
// 							value={findMultiSelect("presentationform")}
// 							onChange={handleMultiSelect}
// 							placeholder="Seleccione una Categoria"
// 							disabled={!editable}
// 							className="w-full md:w-14rem"
// 							selectionLimit={2}
// 							maxSelectedLabels={2}
// 							display="chip"
// 							selectAll={false}
// 							showSelectAll={false}
// 						/>
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.11
// 					</TableCell>
// 					<TableCell colSpan={11}>
// 						Enlace en línea
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.11.1
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						URL del recurso
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<Input
// 							name="ci_onlineresource_linkage"
// 							type="url"
// 							variant="outline"
// 							size="lg"
// 							placeholder="http://www.inegi.org.mx, ftp://inegi.org.mx/mapa.jpg"
// 							value={data.ci_onlineresource_linkage}
// 							onChange={(e) => {
// 								setData({ ...data, ci_onlineresource_linkage: e.target.value });
// 							}}
// 							disabled={!editable}
// 						/>
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.12
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Frecuencia de mantenimiento y actualización
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<Dropdown
// 							name="maintenanceandupdatefrequency"
// 							options={catalogo.maintenanceandupdatefrequency}
// 							value={findSelectValue("maintenanceandupdatefrequency")}
// 							onChange={handleSelectChange}
// 							placeholder="Seleccione la Frecuencia de Actualización"
// 							className="w-full md:w-14rem"
// 							disabled={!editable}
// 						/>
// 						<span className="underline me-1">Descripción:</span>
// 						<small className="font-xs">
// 							{catalogo.maintenanceandupdatefrequency[
// 								findSelectValue("maintenanceandupdatefrequency")?.code - 1
// 							]?.description ??
// 								"Seleccione una opción para ver su descripción correspondiente"}
// 						</small>
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.13
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Conjunto de caracteres
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<Dropdown
// 							name="md_dataidentification_characterset"
// 							options={catalogo.md_dataidentification_characterset}
// 							value={findSelectValue("md_dataidentification_characterset")}
// 							onChange={handleSelectChange}
// 							placeholder="Seleccione un conjunto"
// 							className="w-full md:w-14rem"
// 							disabled={!editable}
// 						/>
// 						<span className="underline me-1">Descripción:</span>
// 						<small className="font-xs">
// 							{catalogo.md_dataidentification_characterset[
// 								findSelectValue("md_dataidentification_characterset")?.code - 1
// 							]?.description ??
// 								"Seleccione una opción para ver su descripción correspondiente"}
// 						</small>
// 					</TableCell>
// 				</TableRow>
// 				<TableRow >
// 					<TableCell
//
// 						colSpan={1} className="w-[25px] text-center"
//
// 					>
// 						1.15
// 					</TableCell>
// 					<TableCell colSpan={2} className="w-[25px] text-center ">
// 						Uso específico
// 					</TableCell>
// 					<TableCell colSpan={9}>
// 						<Textarea
// 							name="specuse"
// 							variant="outline"
// 							size="lg"
// 							placeholder="Descripción de la manera en la cual el conjunto de datos espaciales o producto es o ha sido utilizado"
// 							value={data.specuse}
// 							onChange={handleInputChange}
// 							disabled={!editable}
// 						/>
// 					</TableCell>
// 				</TableRow>
// 			</Table.Body>
// 		</>
// 	);
// };
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useMedatados from "@/store/metadatos/index.ts";
import { useEffect } from "react";
export const Section1 = ({ editable = true }) => {
	const { setMetadatos: setData, ...data } = useMedatados((state) => state);

	useEffect(() => {
		if (
			(data.db_name &&
				data.schema_name &&
				data.table_name !== data.ci_onlineresource_linkage) ||
			data.ci_onlineresource_linkage === ""
		)
			setData({
				...data,
				ci_onlineresource_linkage: `postgresql://user:password@server/${data.db_name}/${data.schema_name}/${data.table_name}`,
				entity_detail: `postgresql://user:password@server/${data.db_name}/${data.schema_name}/${data.table_name}`,
			});
	}, [data.db_name, data.schema_name, data.table]);
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

	const handleMultiSelect = (e) => {
		const { name } = e.target;
		const items = e.value.filter((item) => {
			return item.code && item.label !== "undefined" && item.description !== "undefined";
		});
		setData({
			...data,
			[name]: items.map((item) => `${item.code}. ${item.label}. ${item.description}`),
		});
	};
	const findMultiSelect = (name: string) => {
		const input = data[name] ?? [];
		const result = input
			.map((item) => {
				const [code, label, description] = item.split(". ").map((text, index) => {
					if (index === 0 && text.trim()) {
						return text.trim();
					} else if (index !== 0 && text.trim() !== "undefined") {
						return text.trim();
					}
					return null;
				});

				if (code && label !== "undefined" && description !== "undefined") {
					return { code, label, description };
				}
				return null;
			})
			.filter((item) => item !== null);
		return result;
	};

	return (
		<>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[25px]" colSpan={1}>
						1
					</TableHead>
					<TableHead colSpan={11} className="text-center title">
						Identificación del conjunto de datos espaciales o producto
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.1
					</TableCell>
					<TableCell colSpan={2} className="w-[25px] ">
						Título del conjunto de datos espaciales o producto
					</TableCell>
					<TableCell colSpan={9}>
						<Input
							name="title"
							type="text"
							// variant="outline"
							// size="lg"
							placeholder="Nombre y/o clave por los que se conoce al conjunto de datos espaciales o producto."
							value={data.title}
							onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.1
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]">
						Título del conjunto de datos espaciales o producto
					</TableCell>
					<TableCell colSpan={9}>
						<Textarea
							name="title"
							// variant="outline"
							rows={1}
							placeholder="Resumen de las intenciones por las cuales fue desarrollado el conjunto de datos espaciales o producto."
							// value={data.purpose}
							// onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.3
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						Descripción del conjunto de datos espaciales o producto
					</TableCell>
					<TableCell colSpan={9}>
						<Textarea
							name="abstract"
							placeholder="Descripción del contenido del(os) recurso(s) considerando además alguna información complementaria."
							// type="text"
							// variant="outline"
							// size="lg"
							// value={data.abstract}
							// onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.4
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						Idioma del conjunto de datos espaciales o producto
					</TableCell>
					<TableCell colSpan={9}>
						<Select
							name="md_dataidentification_language"
							// value={findLanguageValue}
							onValueChange={(value) => console.log(value)}
							disabled={!editable}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione un Idioma" />
							</SelectTrigger>
							<SelectContent>
								{catalogo.md_dataidentification_language.map(({ code, label }) => (
									<SelectItem value={code} key={code}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{/* <Dropdown
							name="md_dataidentification_language"
							options={catalogo.md_dataidentification_language}
							value={findLanguageValue}
							onChange={({ target: { name, value } }) =>
								setData({ ...data, [name]: value.code })
							}
							placeholder=""
							className="w-full md:w-14rem"
							disabled={!editable}
						/> */}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.5
					</TableCell>
					<TableCell colSpan={11}>
						Categoría del tema del conjunto de datos espaciales o producto
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.5.1
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						Tema principal del conjunto de datos espaciales o producto
					</TableCell>
					<TableCell colSpan={9}>
						<MultiSelect
							name="topiccategory"
							options={catalogo.topiccategory}
							// value={findMultiSelect("topiccategory")}
							// onChange={handleMultiSelect}
							placeholder="Seleccione una Categoria"
							disabled={!editable}
							className="w-full md:w-14rem border border-gray-50"
							display="chip"
							selectAll={false}
							showSelectAll={false}
						/>
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.5.2
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						Grupo de datos del conjunto de datos espaciales o producto
					</TableCell>
					<TableCell colSpan={9}>
						<Select
							name="groupcategory"
							// value={findSelectValue("groupcategory")}
							onValueChange={(value) => console.log(value)}
							disabled={!editable}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione un Grupo de Datos" />
							</SelectTrigger>
							<SelectContent>
								{catalogo.groupcategory.map(({ code, label }) => (
									<SelectItem value={code} key={code}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{/* <Dropdown
							name="groupcategory"
							options={catalogo.groupcategory}
							value={findSelectValue("groupcategory")}
							onChange={handleSelectChange}
							placeholder="Seleccione un Grupo de Datos"
							className="w-full md:w-14rem"
							disabled={!editable}
						/> */}
						<span className="underline me-1">Descripción:</span>
						{/* <small className="font-xs">
							{catalogo.groupcategory[findSelectValue("groupcategory")?.code - 1]
								?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small> */}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.6
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						Palabra clave
					</TableCell>
					<TableCell colSpan={9}>
						<Chips
							name="keyword"
							// value={data.keyword}
							// onChange={(e) => setData((prev) => ({ ...prev, keyword: e.value }))}
							placeholder="Palabras o frases usadas para describir algún aspecto del conjunto de datos espaciales o producto y que pueden ser utilizadas como referencia para búsquedas."
							disabled={!editable}
							allowDuplicate={false}
							pt={{
								root: {
									className: "w-full md:w-14rem",
								},
								container: {
									className: "w-full md:w-14rem",
								},
							}}
						/>
						{/* <Input
							name="keyword"
							type="text"
							variant="outline"
							placeholder="Palabras o frases usadas para describir algún aspecto del conjunto de datos espaciales o producto y que pueden ser utilizadas como referencia para búsquedas."
							size="lg"
							value={data.keyword}
							onChange={handleInputChange}
							disabled={!editable}
						/> */}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.10
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						Forma de presentación de los datos espaciales
					</TableCell>
					<TableCell colSpan={9}>
						<MultiSelect
							name="presentationform"
							options={catalogo.presentationform}
							// value={findMultiSelect("presentationform")}
							// onChange={handleMultiSelect}
							placeholder="Seleccione una Categoria"
							disabled={!editable}
							className="w-full md:w-14rem"
							selectionLimit={2}
							maxSelectedLabels={2}
							display="chip"
							selectAll={false}
							showSelectAll={false}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.11
					</TableCell>
					<TableCell colSpan={11}>Enlace en línea</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.11.1
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						URL del recurso
					</TableCell>
					<TableCell colSpan={9}>
						<Input
							name="ci_onlineresource_linkage"
							type="url"
							// variant="outline"
							// size="lg"
							placeholder="http://www.inegi.org.mx, ftp://inegi.org.mx/mapa.jpg"
							// value={data.ci_onlineresource_linkage}
							// onChange={(e) => {
							// 	setData({ ...data, ci_onlineresource_linkage: e.target.value });
							// }}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.12
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						Frecuencia de mantenimiento y actualización
					</TableCell>
					<TableCell colSpan={9}>
						{/* <Dropdown
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
								findSelectValue("maintenanceandupdatefrequency")?.code - 1
							]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small> */}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.13
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						Conjunto de caracteres
					</TableCell>
					<TableCell colSpan={9}>
						{/* <Dropdown
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
								findSelectValue("md_dataidentification_characterset")?.code - 1
							]?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small> */}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell colSpan={1} className="w-[25px] text-center">
						1.15
					</TableCell>
					<TableCell colSpan={2} className="w-[25px]  ">
						Uso específico
					</TableCell>
					<TableCell colSpan={9}>
						<Textarea
							name="specuse"
							// variant="outline"
							// size="lg"
							placeholder="Descripción de la manera en la cual el conjunto de datos espaciales o producto es o ha sido utilizado"
							// value={data.specuse}
							// onChange={handleInputChange}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
			</TableBody>
		</>
	);
};
export default Section1;
