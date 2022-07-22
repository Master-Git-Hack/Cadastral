/** @format */

import { getHomologacion } from "../../../../features/justipreciacion/homologacionSlice";
import { useAppSelector } from "../../../../hooks/store";
import { asFancyNumber, average, standartDeviation } from "../../../../utils/utils";
import { TableComponent } from "../../../table/TableComponent";
import { TooltipComponent } from "../../../tooltip/tooltip";

export default function NaturalValues() {
	const { SalesCost } = useAppSelector(getHomologacion).documentation;
	const length = SalesCost.data.length - 1;
	const natural = [] as Array<number>,
		homologado = [] as Array<number>,
		data = SalesCost.data.map((item: any, index: number) => {
			const naturalValue = Number(item.unitaryCost.toFixed(2));
			const homologadoValue = Number(SalesCost.results[index].value.toFixed(2));
			const resultado = Number((homologadoValue / naturalValue).toFixed(2));
			natural.push(naturalValue);
			homologado.push(homologadoValue);
			return { natural: naturalValue, homologado: homologadoValue, resultado };
		});
	natural.sort((a: number, b: number) => a - b);
	homologado.sort((a: number, b: number) => a - b);

	const resultadoNatural = Number((natural[length] / natural[0]).toFixed(2)),
		resultadoHomologado = Number((homologado[length] / homologado[0]).toFixed(2));
	const media = Number(average(homologado).toFixed(2));
	const desviacion = Number(standartDeviation(homologado).toFixed(2));
	const coeficiente = Number(((desviacion / media) * 100).toFixed(0));
	return (
		<TableComponent
			name="Natural Values"
			header={["Comparable", "Valor Natural", "Valor Homologado", "Resultado"]}
			body={[]}
			customBody={data.map((item: any, index: number) => (
				<tr key={`tabla de valor natural ${index}`}>
					<td>C{index + 1}</td>
					<td>{asFancyNumber(item.natural, { isCurrency: true })}</td>
					<td>{asFancyNumber(item.homologado, { isCurrency: true })}</td>

					<TooltipComponent
						id={`factor resultante ${index}`}
						placement={"left"}
						tooltip={"Alertamiento cuando el factor resultante esta fuera del +-30%."}
						component={
							<td
								className={`text-white ${
									item.homologado < item.natural * 0.7 &&
									item.homologado > item.natural * 1.3
										? "bg-danger"
										: "bg-success"
								}`}
							>
								{asFancyNumber(item.resultado)}
							</td>
						}
					/>
				</tr>
			))}
			hasFooter={true}
			customFooter={
				<>
					<tr className="border border-white">
						<td>MÍNIMO</td>
						<td>{asFancyNumber(natural[0])}</td>
						<td>{asFancyNumber(homologado[0], { isCurrency: true })}</td>
						<td rowSpan={3} />
					</tr>
					<tr className="border border-white">
						<td>MÁXIMO</td>
						<td>{asFancyNumber(natural[length], { isCurrency: true })}</td>
						<td>{asFancyNumber(homologado[length], { isCurrency: true })}</td>
					</tr>
					<tr className="border border-white">
						<td />
						<td>
							<strong>{resultadoNatural}</strong>
						</td>
						<TooltipComponent
							id={`resultado homologado`}
							placement={"left"}
							tooltip={
								"Relación entre el máximo y mínimo valor homologado. Alertamiento cuando la disperción es mayor al +-20%."
							}
							component={
								<td
									className={`${
										resultadoHomologado < resultadoNatural * 0.8 &&
										resultadoHomologado > resultadoNatural * 1.2
											? "bg-danger"
											: "bg-success"
									} text-white`}
								>
									<strong>{resultadoHomologado}</strong>
								</td>
							}
						/>
					</tr>
					<tr>
						<td colSpan={3} className="border border-white text-end">
							RANGO (NATURAL Y HOMOLOGADO):
						</td>
						<TooltipComponent
							id={"resultado"}
							placement={"left"}
							tooltip={
								"Alertamiento cuando la dispersión sobre el máximo y mínimo homologado es mayor a la dispersión natural."
							}
							component={
								<td
									className={`border ${
										resultadoHomologado < resultadoNatural
											? "bg-success"
											: "bg-danger"
									} text-white text-center`}
								>
									{resultadoHomologado}
								</td>
							}
						/>
					</tr>
					<tr>
						<td colSpan={3} className="border border-white text-end">
							DESVIACIÓN ESTANDAR:
						</td>
						<td className="border">
							{asFancyNumber(!isNaN(desviacion) ? desviacion : 1, {
								isCurrency: true,
							})}
						</td>
					</tr>
					<tr>
						<td colSpan={3} className="border border-white text-end">
							MEDIA:
						</td>
						<td className="border">
							{asFancyNumber(!isNaN(media) ? media : 1, { isCurrency: true })}
						</td>
					</tr>
					<tr>
						<td colSpan={3} className="border border-white text-end">
							COEFICIENTE DE VARIACIÓN:
						</td>
						<td
							className={`border ${
								(!isNaN(coeficiente) ? coeficiente : 1) < 10
									? "bg-success"
									: "bg-danger"
							} text-white text-center`}
						>
							{asFancyNumber(!isNaN(coeficiente) ? coeficiente : 1, {
								isPercentage: true,
								decimals: 0,
							})}
						</td>
					</tr>
				</>
			}
		/>
	);
}
