/** @format */

import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@utils/index";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
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
export const Section2 = ({ editable = true }: any) => {
	const { setMetadatos: setData, ...data } = useMedatados((state) => state);

	const findSelectValue = (name: string) => {
		const [code, label, description] = String(data[name] ?? "").split(". ");
		return catalogo?.[name]?.find((item) => item.code === code);
	}

	return (
		<>
			<TableHeader>
				<TableRow className="border-bottom border-none">
					<TableHead colSpan={1}>2</TableHead>
					<TableHead className="text-center title" colSpan={11}>
						Fechas relacionadas con el conjunto de datos espaciales o producto
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						2.1
					</TableCell>
					<TableCell
						colSpan={11}
						className=" text-black dark:text-white w-11/12"
					>
						Fechas y eventos
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						2.1.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Fecha de referencia del conjunto de datos espaciales o producto
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-full justify-start text-left font-normal",
										!data.date && "text-muted-foreground",
									)}
									disabled={!editable}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{data.date ? (
										moment(data.date).format("YYYY-MM-DD").toString()
									) : (
										<span>Selecciona una Fecha</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									locale={es}
									selected={data.date}
									onSelect={(e) =>
										setData({
											...data,
											date: moment(e).format("YYYY-MM-DD").toString(),
										})
									}
									isSelected={data.date}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</TableCell>
				</TableRow>
				<TableRow className="border-bottom border-none">
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						2.1.2
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Tipo de fecha
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Select
							name="datetype"
							value={data.datetype}
							onValueChange={(datetype) => setData({ ...data, datetype })}
							disabled={!editable}
						>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione una Categoria" />
							</SelectTrigger>
							<SelectContent>
								{catalogo.datetype.map(({ code, label, description }) => (
									<SelectItem value={`${code}. ${label}. ${description}`} key={`${code}. ${label}. ${description}`}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<span className="underline me-1">Descripción:</span>
						<small className="font-xs">
							{catalogo.datetype[findSelectValue("datetype")?.code - 1]
								?.description ??
								"Seleccione una opción para ver su descripción correspondiente"}
						</small>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white w-1/12"
					>
						2.2
					</TableCell>
					<TableCell
						colSpan={11}
						className=" text-black dark:text-white w-11/12"
					>
						Fechas de los insumos tomados para la elaboración del producto o
						conjunto de datos espaciales
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						2.2.1
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Fecha de creación de los insumos
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						{/* <Calendar
							autoZIndex
							value={data.date_creation}
							dateFormat="yy-mm-dd"
							visible
							showButtonBar
							onChange={(e) =>
								setData({
									...data,
									date_creation: moment(e.value).format("YYYY-MM-DD").toString(),
								})
							}
							className=" w-full md:w-14rem text-black"
							disabled={!editable}
							inputClassName="text-gray-900 focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full md:w-14rem"
						/> */}
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-full justify-start text-left font-normal",
										!data.date_creation && "text-muted-foreground",
									)}
									disabled={!editable}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{data.date_creation ? (
										moment(data.date_creation).format("YYYY-MM-DD").toString()
									) : (
										<span>Selecciona una Fecha</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									locale={es}
									selected={data.date_creation}
									onSelect={(e) =>
										setData({
											...data,
											date_creation: moment(e).format("YYYY-MM-DD").toString(),
										})
									}
									isSelected={data.date_creation}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell
						scope="row"
						colSpan={1}
						className="text-gray-900 whitespace-nowrap dark:text-white "
					>
						2.2.4
					</TableCell>
					<TableCell colSpan={2} className=" text-black dark:text-white ">
						Nombre del insumo
					</TableCell>
					<TableCell colSpan={9} className="w-9/12">
						<Textarea
							name="inpname"
							placeholder="Palabras o frases usadas para describir algún aspecto del conjunto de datos espaciales o producto y que pueden ser utilizadas como referencia para búsquedas."
							value={data.inpname}
							onChange={(e) =>
								setData({
									...data,
									inpname: e.target.value,
									inp_name: e.target.value,
								})
							}
							disabled={!editable}
						/>
					</TableCell>
				</TableRow>
			</TableBody>
		</>
	);
};
