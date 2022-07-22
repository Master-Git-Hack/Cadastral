/** @format */

import { Fragment, useEffect, useRef } from "react";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import {
	getHomologacion as getState,
	updateFactorStateCommon,
	updateDocumentationStateArea,
	updateDocumentationStateSalesCost,
	updateDocumentationStateWeightingPercentage,
} from "../../../../../features/justipreciacion/homologacionSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import { toBase64, isUrlValid, asFancyNumber } from "../../../../../utils/utils";
import { FancyInput } from "../../../../inputs/fancyInput";

import { TooltipComponent } from "../../../../tooltip/tooltip";
import FileSaver from "file-saver";
import { ModalComponent } from "../../../../../components/views/Modal";
import {
	setInitialState,
	getJustipreciacion,
} from "../../../../../features/justipreciacion/justipreciacionSlice";
import { JustifyChange } from "../../../../views/JustifyChange";
import { PillComponent } from "../../../../pill/pill";
import { TableComponent } from "../../../../table/TableComponent";

export default function Area() {
	useEffect(() => {
		window.resizeTo(1250, 500);
	}, []);
	return (
		<div className="d-flex flex-column justify-content-center">
			<div className="my-1 d-flex flex-column justify-content-center">
				<AreaDocumentation />
			</div>
			<div className="my-1 d-flex flex-column justify-content-center">
				<AreaCalculation />
			</div>
		</div>
	);
}
export const AreaCalculation = () => {
	const dispatch = useAppDispatch();
	const { documentation, factors, record } = useAppSelector(getState);
	const { Area, SalesCost, WeightingPercentage } = documentation;
	const { data, subject } = Area;
	const { Surface, Commercial } = factors;
	const { name, root } = Surface;
	const { type } = record;
	const { cna_edad, cna_superficie } = useAppSelector(getJustipreciacion);
	useEffect(() => {
		window.resizeTo(1250, 500);
	}, []);
	const percentage = WeightingPercentage.total;
	useEffect(() => {
		if (subject.value !== cna_superficie) {
			dispatch(setInitialState({ type, cna_superficie: subject.value, cna_edad }));
		}
	}, [subject.value]);

	return (
		<TableComponent
			name={"Surface"}
			header={[]}
			customHeader={
				<tr>
					<th>#</th>
					<th>
						{type.includes("TERRENO") ? (
							SalesCost.tag
						) : (
							<>
								Sup. Terreno ( $ / m<sup>2</sup> )
							</>
						)}
					</th>

					<th>
						{Area.name}(m<sup>2</sup>)
					</th>
					<th className=" align-middle text-brake">
						Precio Unitario ( $ / m<sup>2</sup> )
					</th>

					<th className=" align-middle text-brake">Factor de Superficie</th>

					<th className=" align-middle text-brake" style={{ maxWidth: 130 }}>
						Factor de Comercialización
					</th>
					<th className=" align-middle text-brake">
						Ponderación
						<br />
						<PillComponent
							style={
								percentage === 100
									? "success"
									: percentage > 100
									? "danger"
									: "warning"
							}
							value={asFancyNumber(percentage, { isPercentage: true })}
						/>
					</th>
				</tr>
			}
			body={[]}
			customBody={data.map((item: any, index: number) => (
				<tr key={`row of columns to handle area operations ${index}`}>
					<td>C{item.id}</td>
					<td>
						<FancyInput
							index={index}
							name={type.includes("TERRENO") ? "salesCost" : "surface"}
							value={
								type.includes("TERRENO")
									? SalesCost.data[index].value
									: item.surface
							}
							onChange={(event: any) =>
								dispatch(
									type.includes("TERRENO")
										? updateDocumentationStateSalesCost({
												key: "data",
												index,
												object: "value",
												value: Number(event.target.value),
										  })
										: updateDocumentationStateArea({
												key: "data",
												index,
												object: "surface",
												value: Number(event.target.value),
										  }),
								)
							}
							isCurrency={type.includes("TERRENO")}
						/>
					</td>
					<td>
						<FancyInput
							index={index}
							name="area"
							value={item.value}
							onChange={(event) =>
								dispatch(
									updateDocumentationStateArea({
										key: "data",
										index,
										object: "value",
										value: Number(event.target.value),
									}),
								)
							}
						/>
					</td>
					<td>
						{asFancyNumber(SalesCost.data[index].unitaryCost, { isCurrency: true })}
					</td>
					<td>
						<TooltipComponent
							id={`fancyInput-displayed-${index}-surface`}
							placement="bottom"
							tooltip={
								<>
									<sup>{Surface.root.value}</sup>&radic;
									<small style={{ textDecoration: "overline" }}>
										{`(${item.value}`}&divide;
										{`${Area.averageLotArea.value})`}
									</small>
								</>
							}
							component={
								<div id={`fancyInput-displayed-${index}-surface`}>
									{asFancyNumber(Surface.data[index].value)}
								</div>
							}
						/>
					</td>
					<td style={{ maxWidth: 130 }}>
						<FancyInput
							index={index}
							name="commercial"
							value={Commercial.data[index].value}
							onChange={(event) =>
								dispatch(
									updateFactorStateCommon({
										key: "Commercial",
										index,
										object: "data",
										value: {
											value: Number(event.target.value),
										},
									}),
								)
							}
							style={`text-center`}
						/>
					</td>
					<td style={{ maxWidth: 100 }}>
						<FancyInput
							index={index}
							name="weightingPercentage"
							value={WeightingPercentage.data[index].value}
							onChange={(event) =>
								dispatch(
									updateDocumentationStateWeightingPercentage({
										key: "data",
										index,
										object: "value",
										value: Number(event.target.value),
									}),
								)
							}
							isPercentage={true}
							style={`text-center`}
						/>
					</td>
				</tr>
			))}
			hasFooter={true}
			customFooter={
				<tr>
					<td colSpan={type.includes("TERRENO") ? 2 : 1}>SUJETO</td>
					{!type.includes("TERRENO") && (
						<td>
							<FancyInput
								index={0}
								name="area subject"
								value={subject.value}
								onChange={(event) =>
									dispatch(
										updateDocumentationStateArea({
											key: "subject",
											object: "value",
											value: Number(event.target.value),
										}),
									)
								}
							/>
						</td>
					)}
					<td>{asFancyNumber(Area.averageLotArea.value)}</td>
					<td colSpan={4}>
						<div className="d-flex flex-row">
							<span className="my-auto me-auto">
								m<sup>2</sup>
							</span>
							<JustifyChange
								btnType="link"
								actionToDo="Cambiar Raíz: Factor de Superficie"
								name={name}
								enabled={root.enabled}
								setEnabled={(event: any) => {
									const enabled = event.currentTarget.checked;

									dispatch(
										updateFactorStateCommon({
											key: "Surface",
											object: "root",
											value: {
												value: enabled ? root.value : 8,
												enabled,
												observations: enabled ? root.observations : "",
											},
										}),
									);
								}}
								comment={root.observations}
								setComment={(event: any) =>
									dispatch(
										updateFactorStateCommon({
											key: "Surface",
											object: "root",
											value: {
												value: root.value,
												enabled: root.enabled,
												observations: event.currentTarget.value,
											},
										}),
									)
								}
								ComponentToJustify={
									<>
										Valor actual: Raíz {root.value} (
										<small>
											<strong>
												<sup>{root.value}</sup>&radic;{" "}
												<span style={{ textDecoration: "overline" }}>
													x
												</span>{" "}
											</strong>
										</small>
										)
										<SelectRootValue
											initialValue={6}
											name={`Raíz surface`}
											value={root.value}
											onChange={(event: any) =>
												root.enabled &&
												dispatch(
													updateFactorStateCommon({
														key: "Surface",
														object: "root",
														value: {
															value: Number(
																event.currentTarget.value,
															),
															enabled: root.enabled,
															observations: root.observations,
														},
													}),
												)
											}
										/>
									</>
								}
							/>
						</div>
					</td>
				</tr>
			}
		/>
	);
};

export const AreaDocumentation = () => {
	const dispatch = useAppDispatch();
	const { documentation, handlers, record, factors } = useAppSelector(getState);
	const { Area, SalesCost } = documentation;
	const { data } = Area;
	const { Usage, Building } = factors;
	//const typeOptions = handlers.Area.typeOptions(record.type);
	const { type } = record;
	const typeOptions = type.includes("TERRENO") ? Usage.data : Building.data;
	const header = () => {
		const data = ["#", "Calle", "Numero", "Colonia", "Municipio"];
		type.includes("TERRENO") && data.push("Uso de Suelo");
		!type.includes("TERRENO") && data.push("Precio de Renta");
		data.push("Fecha");
		!type.includes("TERRENO") && data.push("Tipo de Construcción");
		data.push("Caracteristicas");
		data.push("Consulta");
		return data;
	};

	const handleUpdateAddress = (index: number, item: string, value: any) =>
		dispatch(
			updateDocumentationStateArea({
				key: "data",
				index,
				object: "address",
				item,
				value,
			}),
		);
	return (
		<TableComponent
			name={"Area Documentation"}
			header={header()}
			body={[]}
			customBody={data.map((item: any, index: number) => (
				<tr key={`area properties to handle address information ${index}`}>
					<td>C{item.id}</td>
					<td style={{ minWidth: 150 }}>
						<textarea
							rows={3}
							className="form-control form-control-sm"
							value={item.address.street}
							onChange={(event: any) =>
								handleUpdateAddress(index, "street", event.currentTarget.value)
							}
						/>
					</td>
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
									checked={item.address.hasNoStreetNumber}
									onChange={(event: any) =>
										handleUpdateAddress(
											index,
											"hasNoStreetNumber",
											event.currentTarget.checked,
										)
									}
								/>
								<label
									htmlFor={`btncheck${index}`}
									className={`btn btn-sm mx-auto ${
										!item.address.hasNoStreetNumber
											? "rounded-start btn-outline-primary"
											: "btn-link"
									}`}
								>
									{item.address.hasNoStreetNumber ? "Sin Numero" : "S/N"}
								</label>
							</>
							{!item.address.hasNoStreetNumber && (
								<input
									type="number"
									className="form-control form-control-sm rounded-end"
									value={item.address.streetNumber}
									style={{ minWidth: 100 }}
									onChange={(event: any) =>
										handleUpdateAddress(
											index,
											"streetNumber",
											event.currentTarget.valueAsNumber,
										)
									}
								/>
							)}
						</div>
					</td>
					<td style={{ minWidth: 100 }}>
						<textarea
							className="form-control form-control-sm"
							value={item.address.colony}
							rows={3}
							onChange={(event: any) =>
								handleUpdateAddress(index, "colony", event.currentTarget.value)
							}
						/>
					</td>
					<td>{item.address.zone.name}</td>

					{type.includes("TERRENO") && <td>{typeOptions[index].type}</td>}
					{!type.includes("TERRENO") && (
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
					)}
					<td style={{ maxWidth: 150 }}>
						<input
							type="date"
							className="form-control form-control-sm"
							value={item.address.extras.date}
							onChange={(event: any) =>
								handleUpdateAddress(index, "extras", {
									...item.address.extras,
									date: event.currentTarget.value,
								})
							}
						/>
					</td>
					{!type.includes("TERRENO") && <td>{typeOptions[index].type}</td>}
					<td className="flex-wrap">
						<textarea
							rows={3}
							className="form-control form-control-sm"
							value={item.address.extras.observations}
							onChange={(event: any) =>
								handleUpdateAddress(index, "extras", {
									...item.address.extras,
									observations: event.currentTarget.value,
								})
							}
						/>
					</td>
					<td>
						<ModalComponent
							Header={`Consulta C${index + 1}`}
							actionToDo={`Consulta C${item.id}`}
							btnType="link"
							Body={
								<div className="d-flex flex-column flex-fill justify-content-center">
									<textarea
										rows={3}
										className="form-control form-control-sm me-1"
										value={item.address.extras.reference}
										placeholder="Link o Información Complementaria"
										onChange={(event: any) =>
											handleUpdateAddress(index, "extras", {
												...item.address.extras,
												reference: event.target.value,
											})
										}
									/>
									{isUrlValid(item.address.extras.reference) && (
										<LinkPreview url={item.address.extras.reference} />
									)}
									<HandleDocuments
										index={index}
										extras={item.address.extras}
										setFile={async (event: any) =>
											handleUpdateAddress(index, "extras", {
												...item.address.extras,
												document: {
													filename: event.target.files[0].name,
													data: await toBase64(event.target.files[0]),
												},
											})
										}
										deleteFile={() =>
											handleUpdateAddress(index, "extras", {
												...item.address.extras,
												document: {
													filename: "",
													data: null,
												},
											})
										}
									/>
								</div>
							}
						/>
					</td>
				</tr>
			))}
		/>
	);
};
const HandleDocuments = (props: { index: number; extras: any; setFile: any; deleteFile: any }) => {
	const id = `formFileSm-${props.index}`;
	const currentReference = useRef<any>(null);
	return (
		<div className="input-group input-group-sm mt-2">
			<input
				ref={currentReference}
				className="form-control form-control-sm"
				id={id}
				type="file"
				name={props.extras.document.filename}
				disabled={props.extras.document.data !== null}
				onChange={props.setFile}
			/>

			{props.extras.document.data && (
				<>
					<button
						className="btn btn-sm btn-success "
						onClick={() =>
							FileSaver.saveAs(
								props.extras.document.data,
								props.extras.document.filename,
							)
						}
					>
						Descargar
					</button>
					<button
						className="btn btn-sm btn-outline-danger"
						onClick={() => {
							if (currentReference.current) {
								currentReference.current.value = "";
							}
							props.deleteFile();
						}}
					>
						Eliminar
					</button>
				</>
			)}
		</div>
	);
};
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
	const { factors, documentation, handlers } = useAppSelector(getState);
	const { subject, data } = documentation.Area;
	const { options, findLocation } = handlers.Area;
	const { Zone } = factors;
	return (
		<TableComponent
			name="zone Extra Information"
			header={[]}
			customHeader={
				<HeaderZone
					subject={subject}
					options={options}
					findLocation={findLocation}
					dispatch={dispatch}
				/>
			}
			body={[]}
			customBody={
				<BodyZone
					data={data}
					zone={Zone}
					factor1={subject.factors[0].type}
					factor2={subject.factors[1].type}
					options={options}
					dispatch={dispatch}
					findLocation={findLocation}
				/>
			}
		/>
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
}) =>
	props.data.map((item: any, index: number) => {
		const showNumberWithDecimals = (value: number, percentage: boolean, colSpan?: number) => (
			<td colSpan={colSpan ?? 1}>{asFancyNumber(value, { isPercentage: percentage })}</td>
		);
		return (
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
				{showNumberWithDecimals(
					item.address.zone[props.factor1],
					props.factor1.includes("percentage"),
					3,
				)}

				{showNumberWithDecimals(
					Number(item.address.extras.factor1.toFixed(2)),
					props.factor1.includes("percentage"),
				)}
				{showNumberWithDecimals(
					!props.factor2.includes("useZoneResults")
						? item.address.extras.factor2
						: props.zone.data[index].value,
					props.factor1.includes("percentage"),
					3,
				)}
				{showNumberWithDecimals(
					Number(item.address.extras.factor2.toFixed(2)),

					props.factor2.includes("percentage"),
				)}

				{showNumberWithDecimals(
					Number(props.zone.results[index].factor1.toFixed(2)),
					false,
				)}
			</tr>
		);
	});
const HeaderZone = (props: {
	subject: any;
	options: any;
	findLocation: Function;
	dispatch: Function;
}) => {
	const colSpan = props.subject.factors.length * 4 + 1;
	return (
		<>
			<tr>
				{props.subject.factors.map((factor: any, index: number) => (
					<Fragment key={`columns for header at intermunicipio evaluation ${index}`}>
						<th colSpan={2}>Raíz {factor.id}</th>
						<th colSpan={6}>
							<SelectRootValue
								initialValue={2}
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
				<th colSpan={7}>
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
				{props.subject.factors.map(
					(factor: any, index: number) =>
						index > 0 && (
							<Fragment
								key={`columns for header at intermunicipio evaluation ${index}`}
							>
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
						),
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
					{asFancyNumber(props.subject.zone[props.subject.factors[0].type], {
						isPercentage: props.subject.factors[0].type.includes("percentage"),
					})}
				</th>
			</tr>
		</>
	);
};
export const SelectLocation = (props: {
	index: number;
	name: string;
	value: any;
	onChange: any;
}) => {
	const { options } = useAppSelector(getState).handlers.Area;
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
const RootOptions = (props: { name: string; initialValue: number }) => {
	const options = [];
	for (let i = props.initialValue; i <= 12; i++) options.push(i);
	return (
		<>
			{options.map((item: any) => (
				<option key={`root selection for ${props.name} ${item}`} value={item}>
					{item}&#x221A; (Raíz {item})
				</option>
			))}
		</>
	);
};
export const SelectRootValue = (props: {
	name: string;
	value: number;
	onChange: any;
	initialValue: number;
}) => (
	<select className="form-select form-select-sm" value={props.value} onChange={props.onChange}>
		<RootOptions {...props} />
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
