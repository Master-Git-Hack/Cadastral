/** @format */

import { Component } from "../../../../components/Table";
import { Tooltip } from "../../../../components/Tooltip";
import { useAppSelector } from "../../../../redux";
import { getDocumentation } from "../../../../redux/justipreciacion/homologacion";
import { average, standardDeviation, asFancyNumber } from "../../../../utils/number";

export const NaturalValues = () => {
	const { SalesCost } = useAppSelector(getDocumentation);
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
	const desviacion = Number(standardDeviation(homologado).toFixed(2));
	const coeficiente = Number(((desviacion / media) * 100).toFixed(0));
	return (
		<Component
			name="Valores Naturales"
			header={["Comparable", "Valor Natural", "Valor Homologado", "Resultado"]}
			customBody={data.map((item: any, index: number) => (
				<tr key={`tabla de valores naturales ${index}`}>
					<td>C{index + 1}</td>
					<td>{asFancyNumber(item.natural, { isCurrency: true })}</td>
					<td>{asFancyNumber(item.homologado, { isCurrency: true })}</td>
					<td>
						<Tooltip
							id={`factor resultante ${index}`}
							trigger="hover"
							tooltip={
								"Alertamiento cuando el factor resultante esta fuera del +-30%."
							}
						>
							<div
								className={` ${
									item.homologado < item.natural * 0.7 &&
									item.homologado > item.natural * 1.3
										? " text-white bg-danger"
										: " text-white bg-success"
								} bg-opacity-75`}
							>
								{asFancyNumber(item.resultado)}
							</div>
						</Tooltip>
					</td>
				</tr>
			))}
			hasFooter
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
						<td className="border border-white">
							<strong>{resultadoNatural}</strong>
						</td>
						<td className="border border-white text-center">
							<Tooltip
								id={`resultado homologado`}
								trigger="hover"
								tooltip={
									"Relación entre el máximo y mínimo valor homologado. Alertamiento cuando la disperción es mayor al +-20%."
								}
							>
								<div
									className={`${
										resultadoHomologado < resultadoNatural * 0.8 &&
										resultadoHomologado > resultadoNatural * 1.2
											? "bg-danger"
											: "bg-success"
									} text-white bg-opacity-75`}
								>
									<strong>{resultadoHomologado}</strong>
								</div>
							</Tooltip>
						</td>
					</tr>
					<tr>
						<td colSpan={3} className="border border-white text-end">
							RANGO (NATURAL Y HOMOLOGADO):
						</td>
						<td className="border border-white text-end">
							<Tooltip
								id={"resultado"}
								trigger="hover"
								tooltip={
									"Alertamiento cuando la dispersión sobre el máximo y mínimo homologado es mayor a la dispersión natural."
								}
							>
								<div
									className={`border border-white ${
										resultadoHomologado < resultadoNatural
											? "bg-success"
											: "bg-danger"
									} text-white text-center bg-opacity-75`}
								>
									{resultadoHomologado}
								</div>
							</Tooltip>
						</td>
					</tr>
					<tr>
						<td colSpan={3} className="border border-white text-end">
							DESVIACIÓN ESTANDAR:
						</td>
						<td className="border border-white">
							{asFancyNumber(!isNaN(desviacion) ? desviacion : 1, {
								isCurrency: true,
							})}
						</td>
					</tr>
					<tr>
						<td colSpan={3} className="border border-white text-end">
							MEDIA:
						</td>
						<td className="border border-white">
							{asFancyNumber(!isNaN(media) ? media : 1, { isCurrency: true })}
						</td>
					</tr>
					<tr>
						<td colSpan={3} className="border border-white text-end">
							COEFICIENTE DE VARIACIÓN:
						</td>
						<td
							className={`border border-white ${
								(!isNaN(coeficiente) ? coeficiente : 1) < 10
									? "bg-success"
									: "bg-danger"
							} text-white text-center bg-opacity-75`}
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
};
