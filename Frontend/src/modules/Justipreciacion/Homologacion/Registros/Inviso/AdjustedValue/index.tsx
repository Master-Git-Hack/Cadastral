/** @format */

import { useEffect } from "react";
import { Table } from "../../../../../../components/Table";
import { RoundedSelection } from "../../../../../../components/Custom/RoundedSelection";
import { useAppSelector, useAppDispatch } from "../../../../../../redux";
import { asFancyNumber } from "../../../../../../utils/number";
import {
	getHomologaciones,
	setRoundedResult,
} from "../../../../../../redux/justipreciacion/homologacion";
import { JustifyChanges } from "../../../../../../components/Custom/JustifyChanges";
import { renta, terreno } from "../../../../../../redux/justipreciacion";

/** @format */
export const AdjustedValue = () => {
	const { record, documentation } = useAppSelector(getHomologaciones);
	const {
		adjustedValue,
		roundedResult: { value, enabled, observations },
	} = documentation.SalesCost.averageUnitCost;

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(record.type.includes("TERRENO") ? terreno(adjustedValue) : renta(adjustedValue));
	}, [adjustedValue]);

	const options = ["Sin Redondeo", "A la Unidad", "A la Decena", "A la Centena", "Al Millar"];
	return (
		<div className="my-5">
			<Table.Component
				name="Valor Ajustado"
				header={["VALOR AJUSTADO", asFancyNumber(adjustedValue, { isCurrency: true })]}
				customBody={
					<tr>
						<td colSpan={2}>
							<JustifyChanges
								size="sm"
								action={`Tipo de redondeo: ${options[value + 1]}`}
								name="Valor Ajustado"
								editable={enabled}
								setEditable={(checked: boolean) => {
									dispatch(setRoundedResult({ key: "enabled", value: checked }));
									!checked &&
										dispatch(
											setRoundedResult({ key: "observations", value: "" }),
										) &&
										dispatch(setRoundedResult({ key: "value", value: 1 }));
								}}
								comment={observations}
								setComment={(value: string) =>
									dispatch(setRoundedResult({ key: "observations", value }))
								}
							>
								<RoundedSelection
									currentItem={value}
									disabled={false}
									onSelect={(currentItem: number) =>
										dispatch(
											setRoundedResult({ key: "value", value: currentItem }),
										)
									}
								/>
							</JustifyChanges>
						</td>
					</tr>
				}
			/>
		</div>
	);
};
