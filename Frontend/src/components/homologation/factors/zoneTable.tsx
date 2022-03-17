/** @format */

import { FC,useState,useEffect } from "react";
import { selector, setZone ,setZoneSubjectFactors} from "../../../features/homologation/slice";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { toFancyNumber } from "../../../utils/utils";

export const ZoneTable: FC = () => {
	const { districtIndicators,factors } = useAppSelector(selector);
	const {analytics,subject} = factors.zone
	const dispatch = useAppDispatch();
	const {data}=analytics
	const [district,setDistrict]=useState(districtIndicators[0])
	return (
		<table className="table table-sm table-responsive table-responsive-sm table-bordered table-stripped table-hover">
			<thead className="align-self-middle align-middle text-center">
				<tr>

					<th colSpan={3} rowSpan={1}>
						<select
						 className="form-select form-select-sm"
						 value={subject.type}
						 onChange={(event)=>{
							dispatch(setZoneSubjectFactors({
								itemName:"factor1",
								value:{
									type:event.target.value,
									value:district[event.target.value]
								}
							}))
						 }}
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
						 value={data[1].type}
						 onChange={(event)=>{
							dispatch(setZoneSubjectFactors({
								itemName:"factor2",
								value:{
									type:event.target.value
								}
							}))
						 }}
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
						<select 
							className="form-select form-select-sm"
							value={subject.district}
							onChange={(event)=>dispatch(setZoneSubjectFactors({
								itemName:"district",
								value:event.target.value
							}))}
						>
						{districtIndicators.map((item: any, index: number) => (
							<option key={`factor intermunicipio ${index}`} value={item.district}>
								{item.district}
							</option>
						))}
						</select>
					</td>
					<td colSpan={6}> {toFancyNumber(subject[name],false,name==="percentage"?true:false,2)}</td>
				</tr>
				{analytics.map((item:any,index:any)=>
				<tr
					key={`analitycs for zone using interdistrict innformation`}
				>
					<td>
						C{index+1}
					</td>
					<td
						colSpan={2}
					>
						<select
							className="form-select form-select-sm"
							value={item.type}
							onChange={(event)=>{}}
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
					</td>
					<td>
					{toFancyNumber(item.value,false,item.type==="percentage"?true:false,2)}
					</td>
					<td>
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
					</td>
					<td>{toFancyNumber(item.value,false,item.type==="percentage"?true:false,2)}</td>
					<td>0</td>
				</tr>)}
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
