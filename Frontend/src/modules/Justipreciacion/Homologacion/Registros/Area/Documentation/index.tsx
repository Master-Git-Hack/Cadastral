/** @format */

import { Input } from "../../../../../../components/Input";

import { LinkPreviewed } from "../../../../../../components/LinkPreview";
import { Modal } from "../../../../../../components/Modal";
import { Component } from "../../../../../../components/Table";
import { useAppDispatch, useAppSelector } from "../../../../../../redux";
import {
	getHomologaciones,
	setAreaAverageLotArea,
	setAreaData,
	setAreaAddress,
	setAreaAddressExtra,
	setAreaAddressExtraFile,
	setSalesCostData,
	setCommercialData,
	setPercentageData,
	setPercentageTotal,
} from "../../../../../../redux/justipreciacion/homologacion";

import { convert2Base64 } from "../../../../../../utils/file";
const { Text, Fancy, EnabledInputNumber, File } = Input;
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
		const { document, reference } = extras;
		return (
			<tr key={`area properties to handle address information ${index}`}>
				<td>C{item.id}</td>
				<td>
					<Text
						isArea
						value={address.street}
						onChange={(value) => {
							dispatch(setAreaAddress({ index, key: "street", value }));
						}}
					/>
				</td>
				<td style={{ minWidth: 100 }}>
					<EnabledInputNumber
						value={address.streetNumber}
						onChange={(value: number): void => {
							dispatch(setAreaAddress({ index, key: "streetNumber", value }));
						}}
						checked={address.hasNoStreetNumber}
						setChecked={(checked: boolean): void => {
							const value = checked;

							dispatch(
								setAreaAddress({
									index,
									key: "hasNoStreetNumber",
									value,
								}),
							);
							!checked &&
								dispatch(setAreaAddress({ index, key: "streetNumber", value: 0 }));
						}}
					/>
				</td>

				<td>
					<Text
						isArea
						value={address.colony}
						onChange={(value) => {
							dispatch(setAreaAddress({ index, key: "colony", value }));
						}}
					/>
				</td>
				<td>{zone.name}</td>
				{type && <td>{options[index].label}</td>}
				{!type && (
					<td>
						<Fancy
							name=""
							label=""
							value={SalesCost.data[index].value}
							onChange={({ currentTarget: { valueAsNumber } }) => {
								dispatch(
									setSalesCostData({
										index,
										key: "value",
										value: !isNaN(valueAsNumber) ? valueAsNumber : 0,
									}),
								);
							}}
							isCurrency
							classNameDecorator="text-center bg-light"
						/>
					</td>
				)}
				<td>
					<div className="d-flex flex-row">
						<label htmlFor={`date ${index}`} className="invisible disabled" />
						<Text
							type="date"
							value={extras.date}
							onChange={(value) => {
								dispatch(setAreaAddressExtra({ index, key: "date", value }));
							}}
						/>
					</div>
				</td>
				{!type && <td>{options[index].label}</td>}
				<td>
					<Text
						isArea
						value={extras.observations}
						onChange={(value) => {
							dispatch(setAreaAddressExtra({ index, key: "observations", value }));
						}}
					/>
				</td>
				<Consults index={index} reference={reference} document={document} />
			</tr>
		);
	});
};

const Consults = (props: any) => {
	const dispatch = useAppDispatch();
	const { index, reference, document } = props;
	return (
		<td>
			<Modal
				action={`Consulta C${index + 1}`}
				header={<h3>Referencias para C{index + 1}</h3>}
				appearance="link"
				size="sm"
			>
				<div className="mb-5 pb-5" style={{ minHeight: 300 }}>
					Ingrese las referencias necesarias para complementar la información (link o
					descripción):
					<LinkPreviewed
						onChange={(value: string): void => {
							dispatch(setAreaAddressExtra({ index, key: "reference", value }));
						}}
						value={reference}
					/>
					<span className="my-2">
						En caso de ser requerido puede agregar un archivo complementario para
						adjuntar:
					</span>
					<div className="d-flex flex-fill justify-content-center ">
						<File
							filename={document.filename}
							file={document.file}
							onChange={async (event) => {
								const { files } = event.currentTarget;
								if (files !== null && files.length > 0) {
									const { name } = files[0];
									dispatch(
										setAreaAddressExtraFile({
											index,
											value: {
												filename: name,
												file: await convert2Base64(files[0]),
											},
										}),
									);
								}
							}}
							remove={() => {
								dispatch(
									setAreaAddressExtraFile({
										index,
										value: {
											filename: "",
											file: null,
										},
									}),
								);
							}}
						/>
					</div>
				</div>
			</Modal>
		</td>
	);
};

export const Documentation = () => {
	const { record, factors } = useAppSelector(getHomologaciones);
	const { Usage, Building } = factors;
	const type = record.type.includes("TERRENO");
	const options = type ? Usage.data : Building.data;
	return (
		<Component
			name="Area Documentation"
			header={header(type)}
			customBody={Body(type, options)}
		/>
	);
};
