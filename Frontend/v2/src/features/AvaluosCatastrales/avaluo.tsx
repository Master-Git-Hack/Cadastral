/** @format */

import { Table } from "flowbite-react";
import Input from "@components/Input";
import moment from "moment";
export const Avaluo = ({ collection, from, to, year, setRegistro, styles }) => (
	<Table striped className="text-center">
		<Table.Head>
			<Table.HeadCell colSpan={4}>Registro</Table.HeadCell>
		</Table.Head>
		<Table.Head>
			<Table.HeadCell>Grupo</Table.HeadCell>
			<Table.HeadCell>Desde</Table.HeadCell>
			<Table.HeadCell>Hasta</Table.HeadCell>
			<Table.HeadCell>Año</Table.HeadCell>
		</Table.Head>
		<Table.Body>
			<Table.Row>
				<Table.Cell>
					<Input
						type="number"
						name="collection"
						onChange={setRegistro}
						value={collection}
						min={1}
					/>
				</Table.Cell>
				<Table.Cell>
					<Input type="number" name="from" onChange={setRegistro} value={from} min={1} />
				</Table.Cell>
				<Table.Cell>
					<Input type="number" name="to" onChange={setRegistro} value={to} min={1} />
				</Table.Cell>
				<Table.Cell>
					<Input
						type="number"
						name="year"
						onChange={setRegistro}
						value={year}
						max={moment().year() % 100}
						min={10}
					/>
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell colSpan={4}>
					<strong className="font-light">
						CAT.{collection}-{from}_{year} - CAT.{collection}-{to}_{year}
					</strong>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table>
);
