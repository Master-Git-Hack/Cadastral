/** @format */
import { Fragment } from "react";
import {
	getState,
	updateDocumentationStateArea,
	updateDocumentationStateSalesCost,
} from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toBase64, toFancyNumber } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";
import { Table, Body, Header } from "../../table/Table";
import FileSaver from "file-saver";
export default function AreaDocumentation() {
	const dispatch = useAppDispatch();
	const { Area, SalesCost } = useAppSelector(getState).documentation;
	const { data, typeOptions } = Area;
	const { type } = useAppSelector(getState).record.homologacion;
	return (
		<Table>
			<Header>
				<tr>
					<th>Oferta</th>
					<th>Calle</th>
					<th>Numero</th>
					<th>Colonia</th>
					<th>Municipio</th>
					{type === "TERRENO" ? <th>Uso de Suelo</th> : null}
					{type !== "TERRENO" ? <th>Precio de Renta</th> : null}
					<th>Fecha</th>
					{type !== "TERRENO" ? <th>Tipo de Construcción</th> : null}
					<th>Caracteristicas</th>
					<th>Consulta</th>
				</tr>
			</Header>
			<Body>
				{data.map((item: any, index: number) => (
					<tr key={`area properties to handle address information ${index}`}>
						<td>C{item.id}</td>
						<td>
							<textarea
								className="form-control form-control-sm"
								value={item.address.street}
								onChange={(event: any) =>
									dispatch(
										updateDocumentationStateArea({
											key: "data",
											index,
											object: "address",
											item: "street",
											value: event.target.value,
										}),
									)
								}
							/>
						</td>
						<td>
							<div className="mx-2" style={{ minWidth: 125 }}>
								{!item.address.hasNoStreetNumber ? (
									<div className="mb-2">
										<input
											type="number"
											className="form-control form-control-sm"
											value={item.address.streetNumber}
											onChange={(event: any) =>
												dispatch(
													updateDocumentationStateArea({
														key: "data",
														index,
														object: "address",
														item: "streetNumber",
														value: Number(event.target.value),
													}),
												)
											}
										/>
									</div>
								) : null}
								<div className="form-check form-switch form-check-sm form-switch-sm">
									<input
										className="form-check-input form-check-input-sm "
										type="checkbox"
										checked={item.address.hasNoStreetNumber}
										onChange={(event: any) =>
											dispatch(
												updateDocumentationStateArea({
													key: "data",
													index,
													object: "address",
													item: "hasNoStreetNumber",
													value: event.target.checked,
												}),
											)
										}
									/>
									Sin Numero
								</div>
							</div>
						</td>
						<td>
							<textarea
								className="form-control form-control-sm"
								value={item.address.colony}
								onChange={(event: any) =>
									dispatch(
										updateDocumentationStateArea({
											key: "data",
											index,
											object: "colony",
											value: event.target.value,
										}),
									)
								}
							/>
						</td>
						<td>{item.address.zone.name}</td>
						{type.includes("TERRENO") ? (
							<td>
								<SelectTypeOption
									options={typeOptions}
									value={item.address.extras.type}
									onChange={(event: any) =>
										dispatch(
											updateDocumentationStateArea({
												key: "data",
												index,
												object: "address",
												item: "extras",
												value: {
													...item.address.extras,
													type: event.target.value,
												},
											}),
										)
									}
									name="usageType"
								/>
							</td>
						) : null}
						{!type.includes("TERRENO") ? (
							<td style={{ minWidth: 135 }}>
								<FancyInput
									index={index}
									name="salesCosts"
									value={SalesCost.data[index].value}
									onChange={(event) =>
										dispatch(
											updateDocumentationStateSalesCost({
												key: "data",
												index,
												object: "value",
												value: Number(event.target.value),
											}),
										)
									}
									isCurrency={true}
									isPercentage={false}
									style={`text-center`}
								/>
							</td>
						) : null}
						<td style={{ maxWidth: 150 }}>
							<input
								type="date"
								className="form-control form-control-sm"
								value={item.address.extras.date}
								onChange={(event: any) =>
									dispatch(
										updateDocumentationStateArea({
											key: "data",
											index,
											object: "address",
											item: "extras",
											value: {
												...item.address.extras,
												date: event.target.value,
											},
										}),
									)
								}
							/>
						</td>
						{!type.includes("TERRENO") ? (
							<td>
								<SelectTypeOption
									options={typeOptions}
									value={item.address.extras.type}
									onChange={(event: any) =>
										dispatch(
											updateDocumentationStateArea({
												key: "data",
												index,
												object: "address",
												item: "extras",
												value: {
													...item.address.extras,
													type: event.target.value,
												},
											}),
										)
									}
									name="usageType"
								/>
							</td>
						) : null}
						<td>
							<textarea
								rows={1}
								className="form-control form-control-sm"
								value={item.address.extras.observations}
								onChange={(event: any) =>
									dispatch(
										updateDocumentationStateArea({
											key: "data",
											index,
											object: "address",
											item: "extras",
											value: {
												...item.address.extras,
												observations: event.target.value,
											},
										}),
									)
								}
							/>
						</td>
						<td>
							<textarea
								className="form-control form-control-sm"
								value={item.address.extras.reference}
								onChange={(event: any) =>
									dispatch(
										updateDocumentationStateArea({
											key: "data",
											index,
											object: "address",
											item: "extras",
											value: {
												...item.address.extras,
												reference: event.target.value,
											},
										}),
									)
								}
							/>
							{/*
							<HandleDocuments 
								index={index} 
								extras={item.address.extras} 
								dispatch={dispatch}
							/> 
							*/}
						</td>
					</tr>
				))}
			</Body>
		</Table>
	);
}
const HandleDocuments = (props: { index: number; extras: any; dispatch: Function }) => (
	<div className="mt-2">
		<input
			className="form-control form-control-sm"
			id={`formFileSm-${props.index}`}
			type="file"
			onChange={async (event: any) => {
				const dataFile = await toBase64(event.target.files[0]);
				props.dispatch(
					updateDocumentationStateArea({
						key: "data",
						index: props.index,
						object: "address",
						item: "extras",
						value: {
							...props.extras,
							document: {
								filename: event.target.files[0].name,
								data: dataFile,
							},
						},
					}),
				);
			}}
		/>
		{props.extras.document.data ? (
			<button
				className="btn btn-link"
				onClick={() =>
					FileSaver.saveAs(props.extras.document.data, props.extras.document.filename)
				}
			>
				Descargar
			</button>
		) : null}
	</div>
);
const SelectTypeOption = (props: { options: any; value: string; onChange: any; name: string }) => (
	<select className="form-select form-select-sm" value={props.value} onChange={props.onChange}>
		{props.options.map((item: any, index: number) => (
			<option key={`options for ${props.name} ${index}`} value={item.type}>
				{item.type}
			</option>
		))}
	</select>
);
export const ZoneExtraInformationTable = () => {
	const dispatch = useAppDispatch();
	const { subject, data, options, findLocation } = useAppSelector(getState).documentation.Area;
	const { Zone } = useAppSelector(getState).factors;
	return (
		<div className="col d-flex justify-content-center">
			<Table>
				<HeaderZone
					subject={subject}
					options={options}
					findLocation={findLocation}
					dispatch={dispatch}
				/>
				<BodyZone
					data={data}
					zone={Zone}
					factor1={subject.factors[0].type}
					factor2={subject.factors[1].type}
					options={options}
					dispatch={dispatch}
					findLocation={findLocation}
				/>
			</Table>
		</div>
	);
};
const BodyZone = (props: {
	data: any;
	zone: any;
	options: any;
	factor1: string;
	factor2: string;
	findLocation: Function;
	dispatch: Function;
}) => (
	<Body>
		{props.data.map((item: any, index: number) => (
			<tr key={`BodyItem for zone extra information ${index} `}>
				<td>C{item.id}</td>
				<td colSpan={3}>
					<SelectLocation
						index={index}
						name={item.address.zone.name}
						value={item.address.zone.name}
						onChange={(event: any) => {
							const value = props.findLocation(event.target.value, props.options);
							props.dispatch(
								updateDocumentationStateArea({
									key: "data",
									index,
									object: "address",
									item: "zone",
									value,
								}),
							);
						}}
					/>
				</td>
				<td colSpan={3}>
					{toFancyNumber(
						item.address.zone[props.factor1],
						false,
						props.factor1.includes("percentage") ? true : false,
					)}
				</td>
				<td>
					{toFancyNumber(
						Number(item.address.extras.factor1.toFixed(2)),
						false,
						props.factor1.includes("percentage") ? true : false,
						2,
					)}
				</td>

				<td colSpan={3}>
					{toFancyNumber(
						!props.factor2.includes("useZoneResults")
							? item.address.extras.factor2
							: props.zone.data[index].value,
						false,
						props.factor1.includes("percentage") ? true : false,
					)}
				</td>
				<td>
					{toFancyNumber(
						Number(item.address.extras.factor2.toFixed(2)),
						false,
						props.factor2.includes("percentage") ? true : false,
						2,
					)}
				</td>

				<td>{toFancyNumber(Number(props.zone.results[index].factor1.toFixed(2)))}</td>
			</tr>
		))}
	</Body>
);
const HeaderZone = (props: {
	subject: any;
	options: any;
	findLocation: Function;
	dispatch: Function;
}) => {
	const colSpan = props.subject.factors.length * 4 + 1;
	return (
		<Header>
			<tr>
				{props.subject.factors.map((factor: any, index: number) => (
					<Fragment key={`columns for header at intermunicipio evaluation ${index}`}>
						<th colSpan={2}>Raíz {factor.id}</th>
						<th colSpan={6}>
							<SelectRootValue
								name={`Raíz ${factor.id} ${index}`}
								value={factor.root}
								onChange={(event: any) =>
									props.dispatch(
										updateDocumentationStateArea({
											key: "subject",
											object: "factors",
											index,
											item: "root",
											value: Number(event.target.value),
										}),
									)
								}
							/>
						</th>
					</Fragment>
				))}
			</tr>
			<tr>
				<th colSpan={4} />
				<th colSpan={3}>
					<SelectFactorsHeader
						value={props.subject.factors[0].type}
						onChange={(event: any) =>
							props.dispatch(
								updateDocumentationStateArea({
									key: "subject",
									object: "factors",
									index: 0,
									item: "type",

									value: event.target.value,
								}),
							)
						}
						hasZoneAttribute={false}
					/>
				</th>
				<th>Factor 1</th>
				{props.subject.factors.map((factor: any, index: number) =>
					index > 0 ? (
						<Fragment key={`columns for header at intermunicipio evaluation ${index}`}>
							<th colSpan={3}>
								<SelectFactorsHeader
									value={factor.type}
									onChange={(event: any) =>
										props.dispatch(
											updateDocumentationStateArea({
												key: "subject",
												object: "factors",
												index,
												item: "type",
												value: event.target.value,
											}),
										)
									}
									hasZoneAttribute={true}
								/>
							</th>
							<th>Factor {factor.id}</th>
						</Fragment>
					) : null,
				)}
				<th>Factor resultante 1 indicador (F. Zona)</th>
			</tr>
			<tr>
				<th>SUJETO</th>
				<th colSpan={3}>
					<SelectLocation
						index={0}
						name="SUJETO"
						value={props.subject.zone.name}
						onChange={(event: any) => {
							const value = props.findLocation(event.target.value, props.options);
							props.dispatch(
								updateDocumentationStateArea({
									key: "subject",
									object: "zone",
									value,
								}),
							);
						}}
					/>
				</th>
				<th colSpan={colSpan}>
					{toFancyNumber(
						props.subject.zone[props.subject.factors[0].type],
						false,
						(props.subject.factors[0].type.includes("percentage")
							? true
							: false) as boolean,
						0,
					)}
				</th>
			</tr>
		</Header>
	);
};
export const SelectLocation = (props: {
	index: number;
	name: string;
	value: any;
	onChange: any;
}) => {
	const { options } = useAppSelector(getState).documentation.Area;
	return (
		<select
			className="form-select form-select-sm"
			value={props.value}
			onChange={props.onChange}
		>
			{options.map((item: any, index: number) => (
				<option
					key={`table for guanajuato locations ${props.name} ${item.name} ${index}`}
					value={item.name}
				>
					{item.name}
				</option>
			))}
		</select>
	);
};
const RootOptions = (props: { name: string }) => {
	const options = [];
	for (let i = 2; i <= 12; i++) options.push(i);
	return (
		<>
			{options.map((item: any) => (
				<option key={`root selection for ${props.name} ${item}`} value={item}>
					&#x221A;{item} (Raíz)
				</option>
			))}
		</>
	);
};
export const SelectRootValue = (props: { name: string; value: number; onChange: any }) => (
	<select className="form-select form-select-sm" value={props.value} onChange={props.onChange}>
		<RootOptions name={props.name} />
	</select>
);
const SelectFactorsHeader = (props: {
	value: string;
	onChange: any;
	hasZoneAttribute: boolean;
}) => (
	<select className="form-select form-select-sm" value={props.value} onChange={props.onChange}>
		<option value="economicallyActivePopulation">Poblacion Economicamente Activa</option>
		<option value="inhabitedDwellings">Total de Viviendas Habitadas</option>
		<option value="percentage">Porcentaje poblacion activa</option>
		<option value="populationDensity">Densidad de Poblacion</option>
		<option value="totalPopulation">Poblacion Total</option>
		{props.hasZoneAttribute ? (
			<option value="useZoneResults">Factor de Zona Calculado</option>
		) : null}
	</select>
);
