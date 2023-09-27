/** @format */

import { useState, useRef } from "react";
import { Tooltip } from "primereact/tooltip";
import { Button } from "flowbite-react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Card, Table, Select, Label } from "flowbite-react";
import { useParams } from "react-router-dom";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { getNow } from "@utils/datetime";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
const comercial = {
	Documental: [
		{
			label: "Antecedentes",
			children: [
				{
					label: "Revisar dentro de las bases de Catastro si existe algún registro realizado anteriormente del mismo inmueble.",
				},
				{ label: "Verificar que se este usando el formato vigente del avalúo." },
			],
			value: 5,
		},
		{
			label: "Fecha de Servicio",
			children: [{ label: "Revisar que la fecha coincida en todo el documento." }],
			value: 2,
		},
		{
			label: "Folios",
			children: [
				{
					label: "Revisar que los folios de solicitud y su fecha correspondan a los capturados en el avalúo.",
				},
				{
					label: "Revisar, para los casos de embargo o peritajes, el número de expediente dentro del servicio.",
				},
			],
			value: 3,
		},
		{
			label: "Solicitante",
			children: [
				{
					label: "Revisar que el nombre del solicitante corresponda con el capturado en el oficio de solicitud.",
				},
				{
					label: "Revisar que el propietario corresponda con la información legal proporcionada.",
				},
			],
			value: 5,
		},
		{
			label: "Observaciones",
			children: [{ label: "Verificar que las notas sean consistentes con el avalúo." }],
			value: 5,
		},
		{
			label: "Documentos",
			children: [
				{
					label: "Verificar que en documentación se cuente con la información completa y acorde al tipo de inmueble valuado.",
				},
				{ label: "Verificar que la información sea legible." },
				{
					label: "Verificar que la información sea la correcta y que corresponde al inmueble valuado.",
				},
				{ label: "Verificar que se incluya el soporte del cálculo de áreas." },
			],
			value: 3,
		},
		{
			label: "Impresión",
			children: [
				{
					label: "Revisión y ortografía de todo el documento previo a la impresión del servicio.",
				},
				{
					label: "No deberán existir hojas en blanco en la impresión, así como tampoco hojas que prácticamente toda esta en blanco (tiene muy pocos renglones escritos), se deberá ajustar el archivo.",
				},
				{ label: "Verificar los pie de páginas y la paginación para que estén correctos." },
				{
					label: "Verificar que los textos están completos en las celdas, en ocasiones se cortan dichos textos por no ajustar las celdas.",
				},
				{
					label: "Verificar que no aparezcan símbolos raros en el documento (#REF, ###, etc.).",
				},
				{
					label: "Verificar que el documento NO tenga celdas en colores que se quedan de algunas revisiones.",
				},
				{
					label: "Verificar que las fotos y anexos queden dentro de los recuadros establecidos  y que el pie de foto describa correctamente la foto que se anexa.",
				},
			],
			value: 4,
		},
		{
			label: "Otro",
			children: [{ label: "OTRO" }],
			value: 1,
		},
	],
	Técnico: [{ label: "", children: [], value: 0 }],
};
const listLetter = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ControlPoint = ({ index, expanded, type }) => {
	const panel = useRef(null);
	const [show, setShow] = useState(false);
	const { label, children, value } = comercial[type][index];
	return (
		<div
			className="flex flex-row  w-max"
			onMouseEnter={(e) => panel.current.toggle(e)}
			onMouseLeave={(e) => panel.current.toggle(null)}
		>
			<span className=" flex flex-col font-bold text-lg me-2">{index + 1}</span>
			<span className="flex flex-col font-thin text-lg capitalize">{label}</span>
			<OverlayPanel ref={panel} dismissable>
				<Card className="border-none shadow-none">
					<h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
						{label}
					</h5>
					<p className="text-base text-gray-500 dark:text-gray-400 sm:text-lg">
						{children.map(({ label: req }: any, subIndex: number) => (
							<p key={`${index}.${subIndex + 1}`} className=" text-sm">
								<span className="font-semibold ">{`${listLetter[subIndex]}).- `}</span>
								<span className="font-thin">{req}</span>
							</p>
						))}
					</p>
					<p className="text-base text-gray-500 dark:text-gray-400 sm:text-lg">
						<p>
							<span className="mb-1 text-xs me-2">Valor:</span>
							<span className="-mt-1 font-sans text-sm font-semibold ">{value}</span>
						</p>
					</p>
				</Card>
			</OverlayPanel>
		</div>
	);
};
const Header = ({ level }) => {
	const [selected, setSelected] = useState(false);
	const [selected2, setSelected2] = useState(false);
	const [selected3, setSelected3] = useState(false);
	return (
		<Table.Head className="bg-white dark:border-gray-700 dark:bg-gray-800">
			<Table.HeadCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				Punto de Control
			</Table.HeadCell>

			<Table.HeadCell>Cumplimiento</Table.HeadCell>
			{selected && <Table.HeadCell>Fecha</Table.HeadCell>}
			<Table.HeadCell>Ponderación</Table.HeadCell>
			{level >= 2 && (
				<>
					{!selected2 && <Table.HeadCell>Comentarios de Jefatura</Table.HeadCell>}
					<Table.HeadCell>Cumplimiento #</Table.HeadCell>
					{selected2 && <Table.HeadCell>Fecha N</Table.HeadCell>}
					<Table.HeadCell>Validación de Control</Table.HeadCell>
				</>
			)}
			{level === 3 && (
				<>
					{!selected3 && <Table.HeadCell>Comentarios de Coordinación</Table.HeadCell>}
					<Table.HeadCell>Cumplimiento #</Table.HeadCell>
					{selected3 && <Table.HeadCell>Fecha N</Table.HeadCell>}
					<Table.HeadCell>Validación de Control</Table.HeadCell>
				</>
			)}
		</Table.Head>
	);
};
const Row = ({ level, index, type }) => {
	const [selected, setSelected] = useState(true);
	const [selected2, setSelected2] = useState(true);
	const [selected3, setSelected3] = useState(true);
	const { value } = comercial[type][index];
	return (
		<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 overflow-x-auto max-w-screen-xl h-full">
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				<ControlPoint index={index} type={type} />
			</Table.Cell>

			<Table.Cell>
				<Label
					className={`grow-0 btn btn-sm btn-circle swap swap-rotate w-8 ${
						selected
							? "bg-green-400 ring-emerald-600 ring-offset-emerald-600 hover:text-emerald-600"
							: "bg-rose-400 ring-rose-600 ring-offset-rose-600 hover:text-rose-600"
					} hover:ring-2 hover:ring-offset-4  hover:animate-pulse text-white dark:text-black`}
				>
					<input
						type="checkbox"
						className="hidden"
						checked={selected}
						onClick={() => setSelected(!selected)}
						disabled={level > 1}
					/>

					<i className={`pi ${selected ? "pi-check swap-on " : "pi-times swap-off "}`} />
				</Label>
			</Table.Cell>
			{selected && (
				<Table.Cell>
					<small>{getNow()}</small>
				</Table.Cell>
			)}
			<Table.Cell>
				<strong>{selected ? value : 0}%</strong>
			</Table.Cell>
			{level >= 2 && (
				<>
					{!selected2 && (
						<Table.Cell>
							<InputTextarea disabled={level > 2} />
						</Table.Cell>
					)}
					<Table.Cell>
						<Label
							className={`grow-0 btn btn-sm btn-circle swap swap-rotate w-8 ${
								selected2
									? "bg-green-400 ring-emerald-600 ring-offset-emerald-600 hover:text-emerald-600"
									: "bg-rose-400 ring-rose-600 ring-offset-rose-600 hover:text-rose-600"
							} hover:ring-2 hover:ring-offset-4  hover:animate-pulse text-white dark:text-black`}
						>
							<input
								type="checkbox"
								className="hidden"
								checked={selected2}
								onClick={() => setSelected2(!selected2)}
								disabled={level > 2}
							/>

							<i
								className={`pi ${
									selected2 ? "pi-check swap-on " : "pi-times swap-off "
								}`}
							/>
						</Label>
					</Table.Cell>
					{selected2 && (
						<Table.Cell>
							<small>{getNow()}</small>
						</Table.Cell>
					)}
					<Table.Cell>
						<strong>{selected2 ? value : 0}%</strong>
					</Table.Cell>
				</>
			)}
			{level === 3 && (
				<>
					{!selected3 && (
						<Table.Cell>
							<InputTextarea />
						</Table.Cell>
					)}
					<Table.Cell>
						<Label
							className={`grow-0 btn btn-sm btn-circle swap swap-rotate w-8 ${
								selected3
									? "bg-green-400 ring-emerald-600 ring-offset-emerald-600 hover:text-emerald-600"
									: "bg-rose-400 ring-rose-600 ring-offset-rose-600 hover:text-rose-600"
							} hover:ring-2 hover:ring-offset-4  hover:animate-pulse text-white dark:text-black`}
						>
							<input
								type="checkbox"
								className="hidden"
								checked={selected3}
								onClick={() => setSelected3(!selected3)}
							/>

							<i
								className={`pi ${
									selected3 ? "pi-check swap-on " : "pi-times swap-off "
								}`}
							/>
						</Label>
					</Table.Cell>
					{!selected3 && (
						<Table.Cell>
							<InputTextarea />
						</Table.Cell>
					)}
					<Table.Cell>
						<Label
							className={`grow-0 btn btn-sm btn-circle swap swap-rotate w-8 ${
								selected3
									? "bg-green-400 ring-emerald-600 ring-offset-emerald-600 hover:text-emerald-600"
									: "bg-rose-400 ring-rose-600 ring-offset-rose-600 hover:text-rose-600"
							} hover:ring-2 hover:ring-offset-4  hover:animate-pulse text-white dark:text-black`}
						>
							<input
								type="checkbox"
								className="hidden"
								checked={selected3}
								onClick={() => setSelected3(!selected3)}
							/>

							<i
								className={`pi ${
									selected3 ? "pi-check swap-on " : "pi-times swap-off "
								}`}
							/>
						</Label>
					</Table.Cell>
					{selected3 && (
						<Table.Cell>
							<small>{getNow()}</small>
						</Table.Cell>
					)}
					<Table.Cell>
						<strong>{selected3 ? value : 0}%</strong>
					</Table.Cell>
				</>
			)}
		</Table.Row>
	);
};
const tipoBien = [
	{ name: "CASA HABITACIÓN" },
	{ name: "BODEGA INDUSTRIAL" },
	{ name: "NAVE INDUSTRIAL" },
	{ name: "OFICINAS" },
	{ name: "LOCAL COMERCIAL" },
	{ name: "PLAZA-CENTRO COMERCIAL" },
	{ name: "EDIFICIO DE OFICINAS" },
	{ name: "COMPLEJO DE OFICINAS" },
	{ name: "TERRENO" },
	{ name: "TERRENO CON CONSTRUCCIONES" },
];
export default function Create({ options, level = 3 }) {
	const { type } = useParams();
	const [current, setCurrent] = useState([]);
	const [selected, setSelected] = useState(false);
	const [expanded, setExpanded] = useState(true);
	const [requirement, setRequirement] = useState("Documental");
	const [blocked, setBlocked] = useState<boolean>(true);

	return (
		<Card>
			<h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
				{type === "comercial" ? "Revisión Comercial" : "Revisión Justipreciación"}
			</h5>
			<p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg inline-flex items-center justify-between">
				<div className="flex flex-row gap-2 mt-1">
					<div className="max-w-md flex-col">
						<span className="p-float-label max-w-md flex-col w-80">
							<InputMask
								id="registro"
								className="input input-sm input-bordered w-full max-w-xs"
							/>
							<Label htmlFor="registro" value="Registro: " />
						</span>
					</div>
					<div>
						<span className="p-float-label max-w-md flex-col w-80">
							<Dropdown
								id="bien"
								optionValue="name"
								options={tipoBien}
								optionLabel="name"
								pt={{
									root: {
										className: "w-full max-w-xs",
									},
									input: {
										className: "input input-sm  input-bordered ",
									},
									trigger: {
										className: "flex flex-row justify-end -me-2",
									},
								}}
							/>
							<Label htmlFor="bien" value="Tipo de Bien: " />
						</span>
					</div>
					<div>
						<span className="p-float-label max-w-md flex-col w-80">
							<InputText
								id="valuador"
								value={"Einar Jhordany Serna Valdivia (eserna@guanajuato.gob.mx)"}
								className="w-full max-w-xs input input-sm  input-bordered"
								disabled
							/>
							<Label htmlFor="valuador" value="Valuador: " />
						</span>
					</div>
					<div>
						<span className="p-float-label max-w-md flex-col w-80">
							<Dropdown
								id="jefatura"
								optionValue="name"
								options={tipoBien}
								optionLabel="name"
								pt={{
									root: {
										className: "w-full max-w-xs",
									},
									input: {
										className: "input input-sm  input-bordered ",
									},
									trigger: {
										className: "flex flex-row justify-end -me-2",
									},
								}}
							/>
							<Label htmlFor="jefatura" value="Jefatura: " />
						</span>
					</div>
				</div>
				<Button
					color="light"
					pill
					className="btn btn-xs bg-transparent"
					onClick={() => {
						setCurrent([]);
					}}
				>
					<i className="pi pi-plus-circle mx-2 self-center  hover:animate-bounce" />
					Agregar Cumplimiento
				</Button>
			</p>
			<p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg inline-flex items-center justify-start">
				<div className="btn-group btn-group-horizontal">
					{["Documental", "Técnico"].map((req: string) => (
						<button
							className={`btn btn-xs btn-ghost ${
								req === requirement ? "btn-active" : ""
							}`}
							onClick={() => setRequirement(req)}
						>
							{req}
						</button>
					))}
				</div>
			</p>

			<div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0 ">
				<Table striped hoverable className="table-xs">
					{/* <Table.Head>
						<Header level={level} />
					</Table.Head> */}
					<Table.Body className="overflow-x-hidden">
						{comercial[requirement].map((_, index: number) => (
							<Row key={index} index={index} type={requirement} level={level} />
						))}
					</Table.Body>
				</Table>
			</div>
			<p className=" inline-flex  justify-end">
				<Button
					color="success"
					pill
					className="btn btn-xs "
					onClick={() => {
						setCurrent([]);
					}}
				>
					<i className="pi pi-save mx-2 self-center  hover:animate-bounce" />
					Guardar
				</Button>
			</p>
		</Card>
	);
}
/**
 * <div className="card bg-base-200 shadow-xl w-full">
				<div className="card-header flex flex-row justify-end m-4">
					<Button
						color="light"
						pill
						onClick={() => {
							setCurrent([]);
						}}
					>
						<i className="pi pi-plus-circle mx-2  hover:animate-bounce" />
						<span>Agregar Cumplimiento</span>
					</Button>
				</div>
				<div className="card-body flex flex-row items-center gap-4">
					<div className="flex flex-col">
						{comercial[requirement].map((props: any, index: number) => (
							<Item {...props} index={index} key={index} expanded={expanded} />
						))}
					</div>
					<div className="flex flex-col">
						<label
							className={` grow-0 btn btn-sm btn-circle swap swap-rotate w-8 hover:ring-2 hover:ring-offset-4  text-black dark:text-white text-black`}
						>
							
							<input
								type="checkbox"
								className="hidden"
								checked={expanded}
								onClick={() => setExpanded(!expanded)}
							/>

							<i
								className={`pi pi-arrow-right relative  transform transition-transform duration-300
								 ${expanded ? "rotate-180" : ""}`}
							/>
						</label>
					</div>

					<div className="flex flex-col">
						{comercial[requirement].map((_, index: number) => (
							<div className="flex flex-row h-14 items-center gap-3" key={index}>
								<div className="flex flex-col w-2/12">
									<label
										className={`grow-0 btn btn-sm btn-circle swap swap-rotate w-8 ${
											selected
												? "bg-green-400 ring-emerald-600 ring-offset-emerald-600 hover:text-emerald-600"
												: "bg-rose-400 ring-rose-600 ring-offset-rose-600 hover:text-rose-600"
										} hover:ring-2 hover:ring-offset-4  hover:animate-pulse text-white dark:text-black`}
									>
										
										<input
											type="checkbox"
											className="hidden"
											checked={selected}
											onClick={() => setSelected(!selected)}
											disabled={level > 1}
										/>

										<i
											className={`pi ${
												selected
													? "pi-check swap-on "
													: "pi-times swap-off "
											}`}
										/>
									</label>
								</div>

								{level >= 2 && (
									<div className="flex flex-row w-5/12 gap-2">
										<div className="flex flex-col">
											<textarea
												key={index}
												className=" flex flex-row my-1.5 textarea textarea-bordered disabled:opacity-50"
												placeholder="..."
												rows={1}
												disabled={level > 2}
											/>
										</div>
										<div className="flex flex-col">
											<textarea
												key={index}
												className=" flex flex-row my-1.5 textarea textarea-bordered "
												placeholder="..."
												rows={1}
												disabled={level > 2}
											/>
										</div>
									</div>
								)}

								{level === 3 && (
									<div className="flex flex-row w-5/12 gap-2">
										<div className="flex flex-col">
											<textarea
												key={index}
												className=" flex flex-row my-1.5 textarea textarea-bordered disabled:opacity-50"
												placeholder="..."
												rows={1}
											/>
										</div>
										<div className="flex flex-col">
											<textarea
												key={index}
												className=" flex flex-row my-1.5 textarea textarea-bordered "
												placeholder="..."
												rows={1}
											/>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
				<div className="card-footer flex flex-row justify-end m-4">
					<Button
						color="success"
						pill
						onClick={() => {
							setCurrent([]);
						}}
					>
						<i className="pi pi-save mx-2  hover:animate-bounce" />
						<span>Guardar</span>
					</Button>
				</div>
			</div>
 */
