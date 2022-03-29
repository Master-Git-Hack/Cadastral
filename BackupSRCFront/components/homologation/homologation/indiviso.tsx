/** @format */

import {
	selector,
	setHomologationAreaSubject,
	setIndiviso,
} from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toFancyNumber } from "../../../utils/utils";
import { FancyInput } from "../../inputs/fancyInput";

export const Indiviso = () => {
	const dispatch = useAppDispatch();
	const { type, homologation } = useAppSelector(selector);
	const { indiviso } = homologation;
	const { subject } = homologation.areas;
	return type === "TERRENO" ? (
		<table className="mt-3 table table-sm table-responsive table-responsive-sm table-hover table-bordered table-striped">
			<tbody className="align-self-middle align-middle text-center">
				<tr>
					<td colSpan={2}>CALCULO DE TERRENO POR INDIVISO</td>
				</tr>
				<tr>
					<td className="text-start">SUPERFICIE DE CONSTRUCCIÓN</td>
					<td>
						<FancyInput
							index={0}
							name="indiviso surface"
							value={indiviso.surface}
							onChange={(e) =>
								dispatch(
									setIndiviso({
										itemName: "surface",
										value: Number(e.target.value),
									}),
								)
							}
						/>
					</td>
				</tr>
				<tr>
					<td className="text-start">CONSTRUCCIÓN PRIVATIVA</td>
					<td>
						<FancyInput
							index={0}
							name="indiviso private"
							value={indiviso.private}
							onChange={(e) =>
								dispatch(
									setIndiviso({
										itemName: "private",
										value: Number(e.target.value),
									}),
								)
							}
						/>
					</td>
				</tr>
				<tr>
					<td className="text-start">INDIVISO</td>
					<td>{toFancyNumber(indiviso.indiviso)}</td>
				</tr>
				<tr>
					<td className="text-start">SUPERFICIE TOTAL DE TERRENO</td>
					<td>
						<FancyInput
							index={0}
							name="areaSubject"
							value={subject.value}
							onChange={(event) =>
								dispatch(
									setHomologationAreaSubject({
										value: Number(event.target.value),
									}),
								)
							}
						/>
					</td>
				</tr>
				<tr>
					<td className="text-start">SUPERFICIE DE TERRENO SEGUN INDIVISO</td>
					<td>{toFancyNumber(indiviso.result)}</td>
				</tr>
				<tr>
					<td colSpan={2}>
						TERRENO QUE LE CORRESPONDE AL LOCAL DE ACUERDO CON EL INDIVISO CALCULADO POR
						EL PERITO
					</td>
				</tr>
			</tbody>
		</table>
	) : null;
};
