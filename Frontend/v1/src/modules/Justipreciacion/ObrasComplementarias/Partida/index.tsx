import { useAppDispatch, useAppSelector } from "../../../../redux";
import {
	getOC,
	setPartida,
} from "../../../../redux/justipreciacion/obrasComplementarias";
import { Text } from "../../../../components/Input";
import { Col, Divider, Grid, Row, Table } from "rsuite";
import { Button, Danger, Success } from "../../../../components/Button";
import { SelectUnit } from "../../../../components/Custom/SelectUnit";
import { asFancyNumber } from "../../../../utils/number";
import { Switch } from "../../../../components/Input/Switch";
import { HidePage } from "../../../../components/HidePage";
import { Image } from "rsuite";
import { useState,useEffect } from "react";
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
	const [rows, setRows] = useState<IEmsamble[]>(ensambles);
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				dispatch(setPartida({ image: reader.result, ensambles: rows }));
			};
			reader.readAsDataURL(file);
		}
	};
	
	

	const addRow = () => {
		setRows([...rows, { name: "", cost: 0, enabled: true }]);
	};
	const removeRow = () => {
		if (rows.length > 1) {
			const newRows = [...rows];
			newRows.pop();
			setRows(newRows);
		}
	}
	useEffect(() => {
		dispatch(setPartida({ ensambles: rows, image: imagePreview }));
	}, [rows]);
	const updateRow = <K extends keyof IEmsamble>(
		index: number,
		target: K,
		value: IEmsamble[K],
	) => {
		const newRows = [...rows]; // Crear una copia del array
		newRows[index] = { ...newRows[index], [target]: value }; // Crear una copia del objeto y actualizar la propiedad
		setRows(newRows); // Actualizar el estado
	};

	return (
		<div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
			{/* Imagen a la izquierda */}
			<div style={{ flex: "1", display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Image
					rounded
					src={typeof imagePreview === "string" ? imagePreview : undefined}
					alt="imagen de la partida"
					style={{
						width: "100%",
						height: "auto",
						maxHeight: "400px",
						objectFit: "contain",
						border: "1px solid #ccc",
						borderRadius: "8px",
					}}
				/>
			</div>
	
			{/* Tabla dinámica a la derecha */}
			<div style={{ flex: "2" }}>
			<Input
				type="file"
				accept="image/*"
				onChange={(value, event) => handleImageChange(event)} // Ajusta para pasar el evento correctamente
				style={{ width: "100%", border: "none", outline: "none" }}
			/>
				<table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
					<thead>
						<tr style={{ backgroundColor: "#f2f2f2" }}>
							<th style={{ border: "1px solid #ccc", padding: "8px" }} />
							<th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center"  }} >#</th>
							<th style={{ border: "1px solid #ccc", padding: "8px" }}>Partida</th>
							<th style={{ border: "1px solid #ccc", padding: "8px", textAlign: "right" }}>Costo Directo</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row, index) => (
							<tr key={index}>
								<td style={{ border: "1px solid #ccc", padding: "8px" }}>
									<input
										type="checkbox"
										checked={row.enabled}
										onChange={(e) =>
											updateRow(index, "enabled", e.target.checked || false)
										}
										style={{ width: "100%" }}
									/>
								</td>
								<td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
									{index + 1}
								</td>
								<td style={{ border: "1px solid #ccc", padding: "8px" }}>
									<Input
										type="text"
										value={row.name}
										onChange={(value) => updateRow(index, "name", value)}
										style={{ width: "100%", border: "none", outline: "none" }}
									/>
								</td>
								<td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "right" }}>
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
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={2} style={{ textAlign: "right", padding: "8px" }}></td>
							<td style={{ textAlign: "center", padding: "8px" }}>
								{asFancyNumber(
									rows.reduce(
										(sum, row) => (row.enabled ? sum + row.cost : sum),
										0,
									),
									{ isCurrency: true }
								)}
							</td>
						</tr>
					</tfoot>
				</table>
	
				{/* Botones separados */}
				<div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
					<button
						onClick={removeRow}
						style={{
							padding: "8px 16px",
							backgroundColor: "#d9534f",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
						onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c9302c")}
						onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#d9534f")}
					>
						Remover Fila
					</button>
					<button
						onClick={addRow}
						style={{
							padding: "8px 16px",
							backgroundColor: "#5cb85c",
							color: "white",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
						onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4cae4c")}
						onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5cb85c")}
					>
						Agregar Fila
					</button>
				</div>
			</div>
		</div>
	);
};
export default Component;
