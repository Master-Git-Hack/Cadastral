/** @format */
// export const section7 = {
// 	entity_detail: "",
// 	graphfilename: "",
// };
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import useMedatados from "@/store/metadatos/index";

export const Section7 = ({ editable = true }: any) => {
	const { setMetadatos: setData, ...data } = useMedatados((state) => state);
	const handleInputChange = ({ currentTarget }) =>
		setData({ ...data, [currentTarget.name]: currentTarget.value });

	return (
		<>
			<TableHeader>
				<TableRow>
					<TableHead colSpan={1}>7</TableHead>
					<TableHead className="text-center title" colSpan={11}>
						Entidades y Atributos
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
						7.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Descripción general de entidades y atributos
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Textarea
							name="schemaascii"
							value={data.schemaascii}
							onChange={handleInputChange}
							// variant="outline"
							// size="lg"
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
						7.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white w-2/12">
						Cita del detalle de entidades y atributos
					</TableCell>
					<TableCell colSpan={9} className=" w-9/12">
						<Input
							name="entity_detail"
							value={data.entity_detail}
							onChange={handleInputChange}
							type="text"
							// variant="outline"
							// size="lg"
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
			</TableBody>
		</>
	);
};
