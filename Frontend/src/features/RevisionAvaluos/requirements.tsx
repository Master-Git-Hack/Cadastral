/** @format */

import { useState } from "react";

import { Sidebar } from "flowbite-react";
import { Splitter, SplitterPanel } from "primereact/splitter";
const documentalComercial = [
	{
		label: "antecedentes",
		children: [{ id: 1 }],
	},
	{
		label: "fecha_de_servicio",
		children: [],
	},
	{
		label: "folios",
		children: [],
	},
	{
		label: "solicitante",
		children: [],
	},
	{
		label: "observaciones",
		children: [],
	},
	{
		label: "documentos",
		children: [],
	},
	{
		label: "impresion",
		children: [],
	},
	{
		label: "otro",
		children: [],
	},
];
const Item = ({ id, cumplimiento, ponderacion }) => <div className="card w-fit flex"></div>;
export default function Requirements({ options, type, requirement = "documental" }) {
	const [current, setCurrent] = useState([]);
	const [selected, setSelected] = useState(false);
	return (
		<Splitter className="h-full">
			<SplitterPanel
				className="flex align-items-center justify-content-center"
				size={25}
				minSize={5}
			>
				<Sidebar>
					<Sidebar.Items>
						<Sidebar.ItemGroup className="list-decimal p-6 divide-y divide-slate-200 ">
							{requirement === "documental" ? (
								documentalComercial.map(({ label, children }) => (
									<Sidebar.Item
										key={label}
										href={`#${label}`}
										onClick={() => setCurrent(children)}
									>
										{label
											?.split("_")
											?.map(
												(word: string) =>
													word.charAt(0).toUpperCase() + word.slice(1),
											)
											.join(" ")}
									</Sidebar.Item>
								))
							) : (
								<></>
							)}
						</Sidebar.ItemGroup>
					</Sidebar.Items>
				</Sidebar>
			</SplitterPanel>
			<SplitterPanel
				className="flex align-items-center justify-content-center flex-col w-screen max-w-full
				"
				size={75}
				minSize={75}
			>
				{current.map((data, index: number) => (
					<Item {...data} key={index} />
				))}
				<div className="w-full join">
					<div className="inline-flex items-center join-item">
						<p
							className="text-2xl cursor-pointer font-thin"
							onClick={() => setSelected(!selected)}
						>
							some text
						</p>
						<label
							className={`mx-4 btn btn-sm btn-circle swap swap-rotate w-8 ${
								selected
									? "bg-green-400 ring-emerald-600 ring-offset-emerald-600 hover:text-emerald-600"
									: "bg-rose-400 ring-rose-600 ring-offset-rose-600 hover:text-rose-600"
							} hover:ring-2 hover:ring-offset-4  hover:animate-pulse text-white dark:text-black`}
						>
							{/* this hidden checkbox controls the state */}
							<input
								type="checkbox"
								className="hidden"
								checked={selected}
								onClick={() => setSelected(!selected)}
							/>

							<i
								className={`pi ${
									selected ? "pi-check swap-on " : "pi-times swap-off "
								}`}
							/>
						</label>
						<textarea
							className="textarea focus:textarea-bordered hover:textarea-bordered textarea-xs w-full max-w-xs font-thin join-item "
							rows={1}
							placeholder="Observaciones"
						/>
					</div>
				</div>
				<div className="w-full join">
					<div className="inline-flex items-center join-item">
						<p
							className="text-2xl cursor-pointer font-thin"
							onClick={() => setSelected(!selected)}
						>
							some text
						</p>
						<label
							className={`mx-4 btn btn-sm btn-circle swap swap-rotate w-8 ${
								selected
									? "bg-green-400 ring-emerald-600 ring-offset-emerald-600 hover:text-emerald-600"
									: "bg-rose-400 ring-rose-600 ring-offset-rose-600 hover:text-rose-600"
							} hover:ring-2 hover:ring-offset-4  hover:animate-pulse text-white dark:text-black`}
						>
							{/* this hidden checkbox controls the state */}
							<input
								type="checkbox"
								className="hidden"
								checked={selected}
								onClick={() => setSelected(!selected)}
							/>

							<i
								className={`pi ${
									selected ? "pi-check swap-on " : "pi-times swap-off "
								}`}
							/>
						</label>
						<textarea
							className="textarea focus:textarea-bordered hover:textarea-bordered textarea-xs w-full max-w-xs font-thin join-item "
							rows={1}
							placeholder="Observaciones"
						/>
					</div>
				</div>
			</SplitterPanel>
		</Splitter>
	);
}
