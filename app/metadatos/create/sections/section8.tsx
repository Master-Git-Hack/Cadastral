/** @format */
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import catalogo from "../catologos/index";
import { MultiSelect } from "primereact/multiselect";
import useMedatados from "@/store/metadatos/index.ts";
export const Section8 = ({ editable = true }: any) => {
	const { setMetadatos: setData, ...data } = useMedatados((state) => state);
	const handleInputChange = ({ currentTarget }) =>
		setData({ ...data, [currentTarget.name]: currentTarget.value });

	const handleMultiSelect = (e) => {
		const { name } = e.target;
		const items = e.value.filter((item) => {
			return item.code && item.label !== "undefined" && item.description !== "undefined";
		});
		const current = items.map((item) => `${item.code}. ${item.label}. ${item.description}`);
		setData({
			...data,
			accessconstraints: current,
			useconstraints: current,
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
					<TableHead colSpan={1}>8</TableHead>
					<TableHead className="text-center title" colSpan={11}>
						Distribución
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
						8.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Restricciones de acceso
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Textarea
							name="accessconstraints"
							value={data.accessconstraints}
							onChange={handleInputChange}
							// variant="outline"
							// size="lg"
							disabled={true}
						/>
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						8.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Restricciones de uso
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<MultiSelect
							name="useconstraints"
							options={catalogo.useconstraints}
							value={findMultiSelect("useconstraints")}
							onChange={handleMultiSelect}
							placeholder="Seleccione una Categoria"
							disabled={!editable}
							className="w-full md:w-14rem"
							// selectionLimit={2}
							// maxSelectedLabels={2}
							display="chip"
							// selectAll={false}
							// showSelectAll={false}
						/>
						{/* <Input
							name="useconstraints"
							value={data.useconstraints}
							onChange={handleInputChange}
							type="text"
							variant="outline"
							size="lg"
							disabled={!editable}
						/> */}
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						8.3
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Responsabilidad de distribución
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Textarea
							name="otherconstraints"
							value={data.otherconstraints}
							onChange={handleInputChange}
							// variant="outline"
							// size="lg"
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
				{/* <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white"
					>
						8.4
					</TableCell>
					<TableCell colSpan={11} className=" text-black dark:text-white">
						Formato de distribución
					</TableCell>
				</TableRow>
				<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						8.4.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Nombre del formato
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="md_format"
							value={data.md_format}
							onChange={handleInputChange}
							type="text"
							variant="outline"
							size="lg"
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
						8.4.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Versión del formato
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="edition"
							value={data.edition}
							onChange={handleInputChange}
							type="text"
							variant="outline"
							size="lg"
							disabled={!editable}
						/>
					</TableCell>
				</TableRow> */}
			</TableBody>
		</>
	);
};
