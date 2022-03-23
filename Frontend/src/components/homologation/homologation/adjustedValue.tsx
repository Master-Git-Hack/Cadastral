/** @format */

import { FC } from "react";
import { selector } from "../../../features/homologation/slice";
import { useAppSelector } from "../../../hooks/store";
import { toFancyNumber,roundToTenth } from "../../../utils/utils";

export const AdjustedValue: FC = () => {
	const {status, homologation,averageUnitCost } = useAppSelector(selector);
	const {result} = homologation.salesCosts.averageUnitCost
	return (
		<table className="mt-3 table table-sm table-responsive table-responsive-sm table-hover table-bordered table-striped">
			<thead>
				<tr>
					<th>VALOR AJUSTADO:</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{
					toFancyNumber(
						status!=="exists" ?
						roundToTenth(Number(result.toFixed(0)),1):
						averageUnitCost)
					}</td>
				</tr>
			</tbody>
		</table>
	);
};
