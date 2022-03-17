/** @format */

import { FC,useState,useEffect } from "react";
import { selector, setZone } from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toFancyNumber } from "../../../utils/utils";

export const ZoneTable: FC = () => {
	const { districtIndicators } = useAppSelector(selector);
	const dispatch = useAppDispatch();
	const [name,setName] = useState("totalPopulation");
	const [subject,setSubject]=useState(districtIndicators[0])
	useEffect(()=>{
		dispatch(setZone({
			itemName:"subject",
			value:{
				delegation:subject.delegation,
				type:name,
				value:subject[name]
			}
		}))
	},[subject,name])
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-bordered table-stripped table-hover">
			<thead className="align-self-middle align-middle text-center">
				<tr>

					<th colSpan={3} rowSpan={1}>
						<select
						 className="form-select form-select-sm"
						 value={name}
						 onChange={(event)=>setName(event.target.value)}
						>
							<option value="totalPopulation">POBLACIÓN TOTAL</option>

							<option value="populationDensity">DENSIDAD DE POBLACIÓN</option>

							<option value="economicallyActivePopulation">
								POBLACIÓN ECONÓMICAMENTE ACTIVA
							</option>

							<option value="percentage">
								PORCENTAJE (Relación entre Pob. Económicamente activa y Pob. Total)
							</option>
							<option value="inhabitedDwellings">TOTAL DE VIVIENDAS HABITADAS</option>

						</select>
					</th>
					<th colSpan={1} rowSpan={1}>
						Factor 1
					</th>
					<th colSpan={1} rowSpan={1}>
					<select
						 className="form-select form-select-sm"
						>
							<option value="totalPopulation">POBLACIÓN TOTAL</option>

							<option value="populationDensity">DENSIDAD DE POBLACIÓN</option>

							<option value="economicallyActivePopulation">
								POBLACIÓN ECONÓMICAMENTE ACTIVA
							</option>

							<option value="percentage">
								PORCENTAJE (Relación entre Pob. Económicamente activa y Pob. Total)
							</option>
							<option value="inhabitedDwellings">TOTAL DE VIVIENDAS HABITADAS</option>

							<option value="zone">FACTOR DE ZONA CALCULADO</option>
						</select>
					</th>
					<th colSpan={1} rowSpan={1}>
						Factor 2
					</th>
					<th colSpan={1} rowSpan={1}>
						Factor resultante 1 indicador(F. Zona)
					</th>
				</tr>
			</thead>
			<tbody className="align-self-middle align-middle text-center">
				<tr>
					<td>SUJETO</td>
					<td>
						{" "}
						<select 
							className="form-select form-select-sm"
							value={subject.id}
							onChange={(event)=>setSubject(districtIndicators[Number(event.target.value)-1])}
						>
						{districtIndicators.map((item: any, index: number) => (
							<option key={`factor intermunicipio ${index}`} value={item.id}>
								{item.district}
							</option>
						))}
						</select>
					</td>
					<td colSpan={6}> {toFancyNumber(subject[name],false,name==="percentage"?true:false,2)}</td>
				</tr>
				{/*map Object(item:any,index:number)
            <tr key={`factor intermunicipio ${type} ${index}`}>
                <td>C{index + 1}</td>
                <td><Selector/></td>
                <td>{toFancyNumber(object selected)}</td>
                <td>{toFancyNumber(factor1 )}</td>
                <td><Selector/></td>
                <td>{toFancyNumber(object selected)}</td>
                <td>{toFancyNumber(factor2 )}</td>
                <td>{toFancyNumber(factorResultante1 )}</td>
                <td>{toFancyNumber(factorResultante2 )}</td>
            </tr>
               */}
			</tbody>
			<tfoot>
				<tr>
					<td colSpan={2}>raíz factor 1</td>
					<td colSpan={2}>
						<select />
					</td>
					<td colSpan={2}>raíz factor 2</td>
					<td colSpan={2}>
						<select />
					</td>
				</tr>
			</tfoot>
		</table>
	);
};
const SelectionComponent: FC<{ name: string }> = (props) => {
	const { districtIndicators } = useAppSelector(selector);
	return (
		<select>
			{districtIndicators.map((item: any, index: number) => (
				<option key={`factor intermunicipio ${index}`} value={index}>
					{}
				</option>
			))}
		</select>
	);
};
