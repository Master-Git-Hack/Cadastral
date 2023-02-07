/** @format */

import { TableRow, TableCell } from "@mui/material";
import { Table } from "../../../components/Table";
import { Select } from "../../../components/Select";
import { ChangeEvent } from "react";
export const Comun = ({ name }) => {
	const test = { label: "Some value", value: 1 };
	return (
		<Table
			table={{ size: "small", padding: "none" }}
			head={{
				children: (
					<>
						<TableRow>
							<TableCell align="center" colSpan={4}>
								<strong>{name}</strong>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell align="center">#</TableCell>
							<TableCell align="center">Clasificación</TableCell>
							<TableCell align="center">Calificación</TableCell>
							<TableCell align="center" rowSpan={2}>
								Factores
							</TableCell>
						</TableRow>
						<TableRow sx={{ background: "#FFF3CD", m: 1 }}>
							<TableCell align="center">SUJETO</TableCell>
							<TableCell align="center">
								<Select
									value={test}
									options={[test, { label: "Some other value", value: 2 }]}
									onChange={() => {}}
								/>
							</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</>
				),
			}}
		>
			<TableRow>
				<TableCell align="center">#</TableCell>
				<TableCell align="center">
					{" "}
					<Select value={undefined} options={[]} onChange={() => {}} size="small" />
				</TableCell>
				<TableCell align="center">Calificación</TableCell>
				<TableCell align="center">Factores</TableCell>
			</TableRow>
		</Table>
	);
};
