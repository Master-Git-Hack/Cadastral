/** @format */

import ReactTooltip from "react-tooltip";
import {
	getOC as getState,
	updateCalculous,
} from "../../../../features/justipreciacion/obrasComplementariasSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { toFancyNumber } from "../../../../utils/utils";
import { FancyInput } from "../../../inputs/fancyInput";
import { Body, Footer, Header, Table } from "../../../table/Table";

/** @format */
export default function Calculous() {
	const { documentation, calculous, total, handlers } = useAppSelector(getState);
	const { options } = handlers.calculous;
	const dispatch = useAppDispatch();
	return (
		<Table>
			<Header>
				<tr>
					<th className="text-truncate text-wrap">Descripción</th>
					<th className="text-truncate text-wrap">Tipo</th>
					<th className="text-truncate text-wrap">Estado de Conservación</th>
					<th className="text-truncate text-wrap">Edad</th>
					<th className="text-truncate text-wrap">VUT</th>
					<th className="text-truncate text-wrap">Cantidad</th>
					<th className="text-truncate text-wrap">Unidad</th>
					<th className="text-truncate text-wrap">Valor Unitario de Reposición Nuevo</th>
					<th className="text-truncate text-wrap">Factor de Edad</th>
					<th className="text-truncate text-wrap">Factor de Estado de Conservación</th>
					<th className="text-truncate text-wrap">
						Valor Unitario de Reposición Reposición
					</th>
					<th className="text-truncate text-wrap">Importe</th>
				</tr>
			</Header>
			<Body>
				{calculous.map((item: any, index: number) => (
					<tr key={`calculous for complementary works table row${index}`}>
						<td>
							<p className="text-wrap">{documentation[index].name}</p>
						</td>
						<td>
							<select
								className="form-select form-select-sm"
								value={item.type}
								onChange={(event) =>
									dispatch(
										updateCalculous({
											index,
											key: "type",
											value: event.target.value,
										}),
									)
								}
							>
								<option value="IE - Instalaciones Especiales">
									IE - Instalaciones Especiales
								</option>
								<option value="EA -  Elementos Accesorios">
									EA - Elementos Accesorios
								</option>
								<option value="OC -  Obras Complementarias">
									OC - Obras Complementarias
								</option>
							</select>
						</td>
						<td>
							<select
								className="form-select form-select-sm"
								value={item.stateOfConservation.id}
								onChange={(event) =>
									dispatch(
										updateCalculous({
											index,
											key: "stateOfConservation",
											value: options.find(
												(opt: any) => opt.id === Number(event.target.value),
											),
										}),
									)
								}
							>
								{options.map((option: any, indx: number) => (
									<option
										key={`option for calculation state of conservation factor ${index} ${indx}`}
										value={option.id}
									>
										{option.id}
									</option>
								))}
							</select>
						</td>
						<td style={{ minWidth: 70 }}>
							<FancyInput
								index={index}
								name="age.value"
								value={item.age.value}
								onChange={(event: any) =>
									dispatch(
										updateCalculous({
											index,
											key: "age",
											subKey: "value",
											value: Number(event.target.value),
										}),
									)
								}
							/>
						</td>
						<td style={{ minWidth: 70 }}>
							<FancyInput
								index={index}
								name="vut"
								value={item.vut}
								onChange={(event: any) =>
									dispatch(
										updateCalculous({
											index,
											key: "vut",
											value: Number(event.target.value),
										}),
									)
								}
							/>
						</td>
						<td>{documentation[index].area.total}</td>
						<td>{documentation[index].area.unity}</td>
						<td>
							{toFancyNumber(
								Number(documentation[index].value.result.value.toFixed(0)),
								true,
							)}
						</td>
						<td>
							<span
								documentation-tip
								documentation-for={`age factor real value ${index}`}
							>
								{toFancyNumber(Number(item.age.factor.toFixed(3)), false, false, 3)}
							</span>
							<ReactTooltip
								id={`age factor real value ${index}`}
								place="bottom"
								type="light"
								effect="float"
							>
								<span>{item.age.factor}</span>
							</ReactTooltip>
						</td>
						<td>
							<span
								documentation-tip
								documentation-for={`state of conservation factor value explain ${index}`}
							>
								{toFancyNumber(Number(item.stateOfConservation.value.toFixed(3)))}
							</span>
							<ReactTooltip
								id={`state of conservation factor value explain ${index}`}
								place="bottom"
								type="light"
								effect="float"
							>
								<span>{item.stateOfConservation.type}</span>
							</ReactTooltip>
						</td>
						<td>{toFancyNumber(Number(item.subTotal.toFixed(2)), true)}</td>
						<td>{toFancyNumber(Number(item.total.toFixed(2)), true)}</td>
					</tr>
				))}
			</Body>
			<Footer>
				<tr>
					<td colSpan={11} className="text-end">
						VALOR TOTAL INST. ESPECIALES:
					</td>
					<td colSpan={1}>{toFancyNumber(Number(total.toFixed(2)), true)}</td>
				</tr>
			</Footer>
		</Table>
	);
}
