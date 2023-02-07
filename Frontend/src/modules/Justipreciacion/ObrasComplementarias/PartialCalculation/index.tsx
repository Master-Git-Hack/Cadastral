/** @format */

import { ChangeEvent } from "react";
import { SelectUnit } from "../../../../components/Custom/SelectUnit";
import { Text } from "../../../../components/Input";
import { Fancy } from "../../../../components/Input/Fancy";
import { Custom as Select } from "../../../../components/Input/Select";
import { Component } from "../../../../components/Table";
import { Tooltip } from "../../../../components/Tooltip";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import {
	getOC,
	setPartialAge,
	setPartialAgeFactor,
	setPartialCalculation,
	setPartialTotalByUnit,
} from "../../../../redux/justipreciacion/obrasComplementarias";
import { asFancyNumber } from "../../../../utils/number";

export const PartialCalculation = () => {
	const {
		Documentation,
		Calculation,
		total,
		handlers: {
			calculo: { options },
		},
	} = useAppSelector(getOC);
	const dispatch = useAppDispatch();
	return (
		<Component
			name={"Obras Complementarias"}
			header={[
				"Descripción",
				"Tipo",
				"Estado de Conservación",
				"Edad",
				"VUT",
				"Cantidad",
				"Unidad",
				"Valor Unitario de Reposición",
				"Factor de Edad",
				"Factor de Estado de Conservación",
				"Factor Unitario de Reposición",
				"Importe",
			]}
			customBody={Calculation.map(
				(
					{ title, type, conservation, age, vut, repositionValue, total }: any,
					index: number,
				) => {
					const { area, totalByUnit } = Documentation[index];
					//const { total } = area;
					return (
						<tr key={`${index}`}>
							<td>
								<Text
									isArea
									onChange={(value: string) =>
										dispatch(
											setPartialCalculation({ index, key: "title", value }),
										)
									}
									value={title}
								/>
							</td>
							<td>
								<Select
									data={[
										"IE - Instalaciones Especiales",
										"IA - Instalaciones Auxiliares",
										"OC - Obras Complementarias",
									].map((label: string) => ({ label, value: label }))}
									value={type}
									block
									searchable={false}
									onSelect={(value: any) =>
										dispatch(
											setPartialCalculation({ index, key: "type", value }),
										)
									}
								/>
							</td>
							<td>
								<Select
									data={options.map(({ value, id }: any) => ({
										label: id,
										value,
									}))}
									value={conservation.value}
									block
									searchable={false}
									onSelect={(item: any) => {
										const value = options.find(
											({ value }: any) => value === item,
										);
										dispatch(
											setPartialCalculation({
												index,
												key: "conservation",
												value,
											}),
										);
									}}
								/>
							</td>
							<td>
								<Fancy
									value={age.value}
									onChange={({ currentTarget: { valueAsNumber } }) =>
										dispatch(
											setPartialAgeFactor({
												index,
												key: "value",
												value: valueAsNumber,
											}),
										)
									}
									name={`age value ${index}`}
									label={`age value ${index}`}
								/>
							</td>
							<td>
								<Fancy
									value={vut}
									onChange={({ currentTarget: { valueAsNumber } }) =>
										dispatch(
											setPartialCalculation({
												index,
												key: "vut",
												value: valueAsNumber,
											}),
										)
									}
									name={`vut ${index}`}
									label={`vut ${index}`}
								/>
							</td>
							<td>
								<Fancy
									value={area.total}
									onChange={({ currentTarget: { valueAsNumber } }) =>
										dispatch(
											setPartialAge({
												index,
												key: "total",
												value: valueAsNumber,
											}),
										)
									}
									name={`area total ${index}`}
									label={`area total ${index}`}
								/>
							</td>
							<td>
								<SelectUnit
									currentItem={area.unit}
									onSelect={(value: string) =>
										dispatch(
											setPartialAge({
												index,
												key: "unit",
												value,
											}),
										)
									}
								/>
							</td>
							<td>
								<Fancy
									value={totalByUnit}
									onChange={({ currentTarget: { valueAsNumber } }) =>
										dispatch(
											setPartialTotalByUnit({
												index,

												value: valueAsNumber,
											}),
										)
									}
									isCurrency
									name={`reposition value ${index}`}
									label={`reposition value ${index}`}
								/>
							</td>
							<td>{asFancyNumber(age.factor)}</td>
							<td>
								<Tooltip
									tooltip={conservation.label}
									id={`tooltip for conservation label in ${index}`}
									trigger="hover"
								>
									<div id={`tooltip for conservation label in ${index}`}>
										{asFancyNumber(conservation.value)}
									</div>
								</Tooltip>
							</td>
							<td>{asFancyNumber(repositionValue, { isCurrency: true })}</td>
							<td>{asFancyNumber(total, { isCurrency: true })}</td>
						</tr>
					);
				},
			)}
			hasFooter
			customFooter={
				<tr>
					<td colSpan={11} className="text-end">
						<strong>VALOR TOTAL INST. ESPECIALES:</strong>
					</td>
					<td>{asFancyNumber(total, { isCurrency: true })}</td>
				</tr>
			}
		/>
	);
};
