/** @format */

import { Table } from "../../../../components/Table/Table";
import { useAppDispatch, useAppSelector } from "../../../../hooks/Redux";
import { getHomologaciones } from "../../../../Slices/Justipreciacion/Homologacion/homologaciones.slice";
import { Input } from "../../../../components/Input/Input";
import { Modal } from "../../../../components/Modal/Modal";
import { utils } from "../../../../utils/utils";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
const header = (type: boolean) => {
	const data = ["#", "Calle", "Numero", "Colonia", "Municipio"];
	type && data.push("Uso de Suelo");
	!type && data.push("Precio de Renta");
	data.push("Fecha");
	!type && data.push("Tipo de Construcción");
	data.push("Caracteristicas");
	data.push("Consulta");
	return data;
};
const Body = (type: boolean, options: any) => {
	const dispatch = useAppDispatch();
	const { documentation, record, factors } = useAppSelector(getHomologaciones);
	const { Area, SalesCost } = documentation;
	const { data } = Area;

	return data.map((item: any, index: number) => {
		const { address } = item;
		const { zone, extras } = address;
		const { document } = extras;
		return (
			<tr key={`area properties to handle address information ${index}`}>
				<td>C{item.id}</td>
				<td>
					<Input.Area
						name=""
						label=""
						value={address.street}
						onChange={(event) => {
							console.log(event.currentTarget.value);
						}}
					/>
				</td>
				<Street
					index={index}
					streetNumber={address.streetNumber}
					hasNoStreetNumber={address.hasNoStreetNumber}
				/>
				<td>
					<Input.Area
						name=""
						label=""
						value={address.colony}
						onChange={(event) => {
							console.log(event.currentTarget.value);
						}}
					/>
				</td>
				<td>{zone.name}</td>
				{type && <td>{options[index].type}</td>}
				{!type && (
					<td>
						<Input.Fancy
							name=""
							label=""
							value={0}
							onChange={(event) => {
								console.log(event.currentTarget.valueAsNumber);
							}}
							isCurrency
							classNameDecorator="text-center bg-light"
						/>
					</td>
				)}
				<td>
					<div className="d-flex flex-row">
						<label htmlFor={`date ${index}`} className="invisible disabled" />
						<input
							id={`date ${index}`}
							className="form-control form-control-sm"
							type="date"
							value={extras.date}
							onChange={(event) => {
								console.log(event.currentTarget.value);
							}}
						/>
					</div>
				</td>
				{!type && <td>{options[index].type}</td>}
				<td>
					<Input.Area
						name=""
						label=""
						value={extras.observations}
						onChange={(event) => {
							console.log(event.currentTarget.value);
						}}
					/>
				</td>
				<Consults index={index} reference={extras.reference} document={document} />
			</tr>
		);
	});
};
const Street = (props: any) => {
	const { index, hasNoStreetNumber, streetNumber } = props;
	const dispatch = useAppDispatch();
	return (
		<td>
			<div
				className="input-group my-auto"
				role="group"
				aria-label="Basic checkbox toggle button group"
			>
				<>
					<input
						id={`btncheck${index}`}
						className="btn-check"
						type="checkbox"
						checked={hasNoStreetNumber}
						onChange={(event: any) => {}}
					/>
					<label
						htmlFor={`btncheck${index}`}
						className={`btn btn-sm mx-auto ${
							!hasNoStreetNumber ? "rounded-start btn-outline-primary" : "btn-link"
						}`}
					>
						{hasNoStreetNumber ? "Sin Numero" : "S/N"}
					</label>
				</>
				{!hasNoStreetNumber && (
					<input
						type="number"
						className="form-control form-control-sm rounded-end"
						value={streetNumber}
						style={{ minWidth: 100 }}
						onChange={(event: any) => {}}
					/>
				)}
			</div>
		</td>
	);
};
const Consults = (props: any) => {
	const dispatch = useAppDispatch();
	const { index, reference, document } = props;
	return (
		<td>
			<Modal.Regular
				actionToDo={`Consulta C${index + 1}`}
				title={`Referencias para C${index + 1}`}
				btnType="link"
			>
				<Input.Area
					name=""
					label="Referencias"
					className="mb-2"
					value={reference}
					onChange={(event) => {
						console.log(event.currentTarget.value);
					}}
				/>
				<>{utils.isURLValid(reference) && <LinkPreview url={reference} />}</>
				<Input.File
					name=""
					label=""
					filename={document.filename}
					value={document.data}
					onChange={async (event) => {
						const { files } = event.currentTarget;
						if (files !== null && files.length > 0) {
							const data = await utils.convert2Base64(files[0]);
						}
					}}
					remove={() => {}}
				/>
			</Modal.Regular>
		</td>
	);
};

export const Documentation = () => {
	const { record, factors } = useAppSelector(getHomologaciones);
	const { Usage, Building } = factors;
	const type = record.type.includes("TERRENO");
	const options = type ? Usage.data : Building.data;
	return (
		<Table.Component
			name="Area Documentation"
			header={header(type)}
			customBody={Body(type, options)}
		/>
	);
};
