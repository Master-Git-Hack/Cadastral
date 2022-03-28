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
	const { type, homologation, districtIndicators, factors } = useAppSelector(selector);
	const { areas, salesCosts } = homologation;
	const { analytics } = factors.zone;
	const dispatch = useAppDispatch();
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-hover table-striped table-bordered">
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
					{type !== "TERRENO" ? <th>Tipo de Construcción</th> : null}
					<th>Caracteristicas</th>
					<th>Consulta</th>
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
							<div className="mx-2" style={{ minWidth: 125 }}>
								{!item.address.streetWithoutNumber ? (
									<div className="mb-2">
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
									</div>
								) : null}
								<div className="form-check form-switch form-check-sm form-switch-sm">
									<input
										className="form-check-input form-check-input-sm "
										type="checkbox"
										checked={item.address.streetWithoutNumber}
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
									Sin Numero
								</div>
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
						<td>{analytics[index].district.district}</td>
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
						<td style={{ maxWidth: 150 }}>
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
							<div className="mt-2">
								<input
									className="form-control form-control-sm"
									id={`formFileSm-${index}`}
									type="file"
								/>
							</div>
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
