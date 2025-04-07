import { useAppDispatch, useAppSelector } from "../../../../redux";
import {
	addDataRow,
	getOC,
	rmDataRow,
	setCalc,
	setDoc,
	setDocData,
} from "../../../../redux/justipreciacion/obrasComplementarias";
import { Text } from "../../../../components/Input";
import { Col, Divider, Grid, Row, Table } from "rsuite";
import { Button, Danger, Success } from "../../../../components/Button";
import { SelectUnit } from "../../../../components/Custom/SelectUnit";
import { asFancyNumber } from "../../../../utils/number";
import { Switch } from "../../../../components/Input/Switch";
import { HidePage } from "../../../../components/HidePage";
import { Image } from "rsuite";
import { useState } from "react";
import { FlexboxGrid } from "rsuite";
import { Input } from 'rsuite';
import { Fancy } from "../../../../components/Input/Fancy";
const { Column, HeaderCell, Cell } = Table;

const headerStyle = { padding: 4, backgroundColor: "#e2e3e5", color: "black" };
interface IEmsamble {
	name: string;
	cost: number;
	enabled: boolean;
}
const Component = () => {
	const dispatch = useAppDispatch();
	const { Partida } = useAppSelector(getOC);
	const { ensambles, image } = Partida || {
		ensambles: [
			{
				name: "",
				cost: 0,
				enabled: true,
			},
		],
		image: "https://placehold.co/600x400",
	};
	const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
		image,
	);
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				dispatch(setDocData({ image: reader.result }));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageRemove = () => {
		setImagePreview(null);
		dispatch(setDocData({ image: "" }));
	};

	const [rows, setRows] = useState<IEmsamble[]>(ensambles);

	const addRow = () => {
		setRows([...rows, { name: "", cost: 0, enabled: true }]);
	};

	const updateRow = <K extends keyof IEmsamble>(
		index: number,
		target: K,
		value: IEmsamble[K],
	) => {
		const newRows: IEmsamble[] = [...rows];
		newRows[index][target] = value;
		setRows(newRows);
	};

	return (
		<div className="show-grid">
			<FlexboxGrid>
				<FlexboxGrid.Item colspan={6}>
					<input type="file" onChange={handleImageChange} />
					<Image
						rounded
						src={typeof imagePreview === "string" ? imagePreview : undefined}
						alt="imagen de la partida"
						width={500}
					/>
				</FlexboxGrid.Item>
				<FlexboxGrid.Item colspan={18}><table className="w-full border-collapse border border-gray-300 shadow-md">
					<thead>
						<tr className="bg-gray-200">
							<th className="border p-2" />
							<th className="border p-2">Partida</th>
							<th className="border p-2 text-right">Costo Directo</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row, index) => (
							<tr key={index} className="border">
								<td className="border p-2">
								
									<input
										type="checkbox"
										checked={row.enabled}
										onChange={(e) =>
											updateRow(index, "enabled", e.target.checked || false)
										}
										className="w-full border-none outline-none"
									/>
								</td>
								<td className="border p-2">
								<Input type="text"
										value={row.name}
										onChange={(value) => updateRow(index, "name", value)}
										className="w-full border-none outline-none" />
									
								</td>
								<td className="border p-2 text-right">
									<Fancy
										index={index}
										name="costo"
										label="costo"
										value={row.cost}
										onChange={({ currentTarget: { valueAsNumber } }) =>
											updateRow(
												index,
												"cost",
												!isNaN(valueAsNumber) ? valueAsNumber : 0,
											)
										}
										isCurrency
									/>
								{/* <Input type="number"
										value={row.cost}
										onChange={(value) => updateRow(index, "cost", !isNaN(parseFloat(value)) ? parseFloat(value) : 0)}
										placeholder="0.00"
										className="w-full border-none outline-none" /> */}
									
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={2} className="text-right"></td>
							<td className="text-center">
								{asFancyNumber(rows.reduce(
									(sum, row) => (row.enabled ? sum + row.cost : sum),
									0,
								),{isCurrency:true})}
							</td>
						</tr>
					</tfoot>
				</table>
				<button
					onClick={addRow}
					className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
				>
					Agregar Fila
				</button>
				</FlexboxGrid.Item>
			</FlexboxGrid>{" "}
			
			<div className="w-1/3 flex justify-center items-center"></div>
			{/* Right Table */}
			<div className="w-2/3">
				

				{/* Add Row Button */}
			
			</div>
		</div>
	);
};
export default Component;
