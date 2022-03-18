/** @format */

import { FC } from "react";
import { selector } from "../../features/homologation/slice";
import { useAppSelector } from "../../hooks/store";
import { toFancyNumber } from "../../utils/utils";

export const AdjustedValue: FC = () => {
	const { averageUnitCost } = useAppSelector(selector);
	return (
		<table className="mt-3 table table-sm table-responsive table-responsive-sm table-hover table-bordered table-striped">
			<thead>
				<tr>
					<th>VALOR AJUSTADO:</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{toFancyNumber(averageUnitCost)}</td>
				</tr>
			</tbody>
		</table>
	);
};
