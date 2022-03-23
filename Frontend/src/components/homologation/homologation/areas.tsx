/** @format */

import { FC } from "react";
import {
	selector,
	setHomologation,
	setHomologationAddress,
	setZone,
} from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { FancyInput } from "../../inputs/fancyInput";
export const Areas: FC = () => {
	const { type, homologation, districtIndicators,factors } = useAppSelector(selector);
	const { areas, salesCosts } = homologation;
	const {analytics} = factors.zone;
	const dispatch = useAppDispatch();
	const findDistrict = (district: string) =>
		districtIndicators.find((d) => d.district === district);
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-hover table-stripped table-bordered">
			<thead className="align-self-middle align-middle text-center">
				<tr>
					<th>Oferta</th>
					<th>Calle</th>
					<th>Numero</th>
					<th>Colonia</th>
					<th>Municipio</th>
					{type === "TERRENO" ? <th>Uso de Suelo</th> : null}
					{type !== "TERRENO" ? <th>Precio de Renta</th> : null}
					<th>Fecha</th>
					<th>Caracteristicas</th>
					{type !== "TERRENO" ? <th>Tipo de Construcción</th> : null}
					<th>Link de Consulta</th>
				</tr>
			</thead>
			<tbody className="align-self-middle align-middle text-center">
				{areas.data.map((item: any, index: number) => (
					<tr key={`area properties to handle address ${index}`}>
						<td>C{index + 1}</td>
						<td>
							<input
								type="text"
								className="form-control form-control-sm"
								value={item.address.street}
								onChange={(event) =>
									dispatch(
										setHomologationAddress({
											itemName: "street",
											itemID: index,
											value: event.target.value,
										}),
									)
								}
							/>
						</td>
						<td>
							<div className="mx-3">
								{!item.address.streetWithoutNumber ? (
									<input
										type="number"
										className="form-control form-control-sm"
										value={item.address.streetNumber}
										onChange={(event) =>
											dispatch(
												setHomologationAddress({
													itemName: "streetNumber",
													itemID: index,
													value: Number(event.target.value),
												}),
											)
										}
									/>
								) : null}
								<br />
							</div>
							<div className="form-check form-switch form-check-sm form-switch-sm">
								<input
									className="form-check-input form-check-input-sm "
									type="checkbox"
									value={item.address.streetWithoutNumber}
									onChange={(event) =>
										dispatch(
											setHomologationAddress({
												itemName: "streetWithoutNumber",
												itemID: index,
												value: event.target.checked,
											}),
										)
									}
								/>
								<label
									className="form-check-label form-check-label-sm"
									htmlFor="flexSwitchCheckDefault"
								>
									Sin Numero
								</label>
							</div>
						</td>
						<td>
							<input
								type="text"
								className="form-control form-control-sm"
								value={item.address.suburb}
								onChange={(event) =>
									dispatch(
										setHomologationAddress({
											itemName: "suburb",
											itemID: index,
											value: event.target.value,
										}),
									)
								}
							/>
						</td>
						<td>
							<DistrictSelect
								index={index}
								name="district"
								value={analytics[index].district.district}
								onChange={(event: any) =>{
									const response = findDistrict(event.target.value);
									dispatch(
										setZone({
											itemName: "analytics",
											subItemName: "district",
											itemID: index,
											value: response,
										}),
									);
								}
									
								}
							/>
						</td>
						{type === "TERRENO" ? (
							<td>
								<input
									type="text"
									className="form-control form-control-sm"
									value={item.address.type}
									onChange={(event: any) =>
										dispatch(
											setHomologationAddress({
												itemName: "type",
												itemID: index,
												value: event.target.value,
											}),
										)
									}
								/>
							</td>
						) : null}
						{type !== "TERRENO" ? (
							<td>
								<FancyInput
									index={index}
									name="salesCosts"
									value={salesCosts.data[index].value}
									onChange={(event) =>
										dispatch(
											setHomologation({
												itemName: "salesCosts",
												itemID: index,
												value: Number(event.target.value),
											}),
										)
									}
									isCurrency={true}
									isPercentage={false}
								/>
							</td>
						) : null}
						<td>
							<input
								type="date"
								className="form-control form-control-sm"
								value={item.address.date}
								onChange={(event) =>
									dispatch(
										setHomologationAddress({
											itemName: "date",
											itemID: index,
											value: event.target.value,
										}),
									)
								}
							/>
						</td>

						{type !== "TERRENO" ? (
							<td>
								<input
									type="text"
									className="form-control form-control-sm"
									value={item.address.type}
									onChange={(event: any) =>
										dispatch(
											setHomologationAddress({
												itemName: "type",
												itemID: index,
												value: event.target.value,
											}),
										)
									}
								/>
							</td>
						) : null}
						<td>
							<textarea
								rows={1}
								className="form-control form-control-sm"
								value={item.address.characteristics}
								onChange={(event: any) =>
									dispatch(
										setHomologationAddress({
											itemName: "characteristics",
											itemID: index,
											value: event.target.value,
										}),
									)
								}
							/>
						</td>
						<td>
							<input
								type="text"
								className="form-control form-control-sm"
								value={item.address.link}
								onChange={(event: any) =>
									dispatch(
										setHomologationAddress({
											itemName: "link",
											itemID: index,
											value: event.target.value,
										}),
									)
								}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
const DistrictSelect: FC<{ name: string; index: number; value: any; onChange: any }> = (props) => {
	const { districtIndicators } = useAppSelector(selector);
	return (
		<select
			className="form-select form-select-sm"
			value={props.value}
			onChange={props.onChange}
		>
			{districtIndicators.map((item: any, index: number) => (
				<option
					key={`option for district indicator ${props.name}-${props.index} ${index}`}
					value={item.district}
				>
					{item.district}
				</option>
			))}
		</select>
	);
};
