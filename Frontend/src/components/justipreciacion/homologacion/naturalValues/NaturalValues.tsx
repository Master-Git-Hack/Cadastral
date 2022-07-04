/** @format */

import { getHomologacion } from "../../../../features/justipreciacion/homologacionSlice";
import { useAppSelector } from "../../../../hooks/store";
import { toFancyNumber, average, standartDeviation } from "../../../../utils/utils";
import { Table, Body, Footer, Header } from "../../../table/Table";

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
	const percentage = Number(((1 - homologado[0] / homologado[length]) * 100).toFixed(0));
	const resultadoNatural = Number((natural[length] / natural[0]).toFixed(2)),
		resultadoHomologado = Number((homologado[length] / homologado[0]).toFixed(2));
	const media = Number(average(homologado).toFixed(2));
	const desviacion = Number(standartDeviation(homologado).toFixed(2));
	const coeficiente = Number(((desviacion / media) * 100).toFixed(0));
	return (
		<div>
			<Table>
				<Header>
					<tr>
						<th>Comparable</th>
						<th>Valor Natural</th>
						<th>Valor Homologado</th>
						<th>Resultado</th>
					</tr>
				</Header>
				<Body>
					{data.map((item: any, index: number) => (
						<tr key={`tabla de valor natural ${index}`}>
							<td>C{index + 1}</td>
							<td>{toFancyNumber(item.natural, true)}</td>
							<td>{toFancyNumber(item.homologado, 2)}</td>
							<td>{item.resultado}</td>
						</tr>
					))}
				</Body>
				<Footer>
					<tr>
						<td>MÁXIMO</td>
						<td>{toFancyNumber(natural[length], true)}</td>
						<td>{toFancyNumber(homologado[length], true)}</td>
						<td rowSpan={3} className="">
							<h4>{toFancyNumber(percentage, false, true, 0)}</h4>
						</td>
					</tr>
					<tr>
						<td>MÍNIMO</td>
						<td>{toFancyNumber(natural[0], true)}</td>
						<td>{toFancyNumber(homologado[0], true)}</td>
					</tr>
					<tr>
						<td />
						<td>
							<strong>{resultadoNatural}</strong>
						</td>
						<td>
							<strong>{resultadoHomologado}</strong>
						</td>
					</tr>
				</Footer>
			</Table>
			<div className="row m-1 text-center">
				<div className="col-11 col-sm-11 text-end">RANGO NATURAL Y HOMOLOGADO:</div>
				<div className="col-1 col-sm-1 border mx-auto">{resultadoHomologado}</div>
			</div>
			<div className="row m-1 text-center">
				<div className="col-11 col-sm-11 text-end">DESVIACIÓN ESTANDAR:</div>
				<div className="col-1 col-sm-1 mx-auto">{toFancyNumber(desviacion, true)}</div>
			</div>
			<div className="row m-1 text-center">
				<div className="col-11 col-sm-11 text-end">MEDIA:</div>
				<div className="col-1 col-sm-1 mx-auto">{toFancyNumber(media, true)}</div>
			</div>
			<div className="row m-1 text-center">
				<div className="col-11 col-sm-11 text-end">COEFICIENTE DE VARIACIÓN:</div>
				<div className="col-1 col-sm-1 border mx-auto">
					{toFancyNumber(coeficiente, false, true, 0)}
				</div>
			</div>
		</div>
	);
}
