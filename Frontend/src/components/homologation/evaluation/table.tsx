import {FC,Fragment} from "react";
import { toFancyNumber, roundToTenth } from "../../../utils/utils";
import {Row} from "./row"
export function Table(props:any){
    const HeadersBegin: FC = (props:any) => (
        <tr>
            <th colSpan={1} rowSpan={2}>
                Oferta
            </th>
            {new URLSearchParams(window.location.search)
            .get("tipo")
            ?.toUpperCase() === "TERRENO" ?
                <Fragment>
                    <th colSpan={3} rowSpan={2}>
                        Precio de Venta
                    </th>
                    <th colSpan={1} rowSpan={2} >
                        Área (m<sup>2</sup>)
                    </th>
                    
                </Fragment> 
            :
                <Fragment>
                    <th colSpan={2} rowSpan={2} >
                        Sup. Terreno (m<sup>2</sup>)
                    </th>
                    <th colSpan={2} rowSpan={2} >
                        Sup. Construcción (m<sup>2</sup>)
                    </th>
                </Fragment>
            }
            <th colSpan={3} rowSpan={2}>
                Precio Unitario ($/m<sup>2</sup>)
            </th>
            <th colSpan={props.headerForFactors.length+1} rowSpan={1} >
                Factores de {props.title}
            </th>
            <th colSpan={1} rowSpan={2}>
                F.Re.
            </th>
            <th colSpan={1} rowSpan={2}>
                Pond.
            </th>
            <th colSpan={6} rowSpan={2}>
                Valor Unitario Resultante ($/m<sup>2</sup>)
            </th>

        </tr>
    )
    const HeadersForFactors: FC = (props:any) => (
        <tr>
            {props.headerForFactors.map((header:string,index:number) =><th key={index} colSpan={1} rowSpan={1} >{header}</th>)}
        </tr>
    )
    const Footer: FC = () => (
        <Fragment>
            {
                new URLSearchParams(window.location.search)
                .get("tipo")
                ?.toUpperCase() === "TERRENO" ?
                    <tfoot>
                        <tr>
                            <td className="text-end" colSpan={4} rowSpan={2}>
                                Área de lote moda
                            </td>
                            <td className="text-center" colSpan={1} rowSpan={2}>
                                {toFancyNumber(props.averageLotArea,false,false,2)}
                            </td>
                            <td colSpan={props.headerForFactors.length-1} rowSpan={2} className="text-start">
                                m<sup>2</sup>
                            </td>
                            <td colSpan={4} rowSpan={1} className="text-end">
                                Valor Unitario Promedio
                            </td>
                            <td className="text-center" colSpan={6} rowSpan={1}>
                                {toFancyNumber(props.averageUnitValue,true,false,2)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-end" colSpan={4} rowSpan={1}>
                                Valor Unitario Aplicable en Numeros Rendondos
                            </td>
                            <td className="text-center" colSpan={6} rowSpan={1}>
                                <strong>{toFancyNumber(roundToTenth(props.averageUnitValue),true,false,2)}</strong>
                            </td>
                        </tr>
                    </tfoot>
                :
                    <tfoot>
                        <tr>
                            <td className="text-end" colSpan={1} rowSpan={2}>
                                Sujeto
                            </td>
                            <td className="text-center" colSpan={2} rowSpan={2}>
                                {toFancyNumber(props.landSurface,false,false,2)}
                            </td>
                            <td className="text-center" colSpan={2} rowSpan={2}>
                                {toFancyNumber(props.constructionSurface,false,false,2)}
                            </td>
                            <td colSpan={props.headerForFactors.length-2} rowSpan={2} className="text-start">
                                m<sup>2</sup>
                            </td>
                            <td colSpan={4} rowSpan={1} className="text-end">
                                Valor Unitario Ponderado Homologado
                            </td>
                            <td className="text-center" colSpan={7} rowSpan={1}>
                                {toFancyNumber(props.averageUnitValue,true,false,2)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-end" colSpan={4} rowSpan={1}>
                                Valor Unitario Aplicable en Numeros Rendondos
                            </td>
                            <td className="text-center" colSpan={7} rowSpan={1}>
                                <strong>{toFancyNumber(roundToTenth(props.averageUnitValue),true,false,2)}</strong>
                            </td>
                        </tr>
                    </tfoot>
            }
        </Fragment>
    )
    return(
        <table
            className="table table-sm table-responsive table-responsive-sm table-striped table-borderless table-hover"
        >
            <thead>
                <HeadersBegin {...props}/>
                <HeadersForFactors {...props} />
            </thead>
            <tbody>
                {
                    props.items.map((item:any,index:number)=>
                        <Row
                            key = { index }
                            index={ index }
                            headerForFactors={ props.headerForFactors }
                            salesCost = { item.salesCost }
                            area = {item.area}
                            unitCost = { item.unitCost }
                            surface = { item.surface }
                            building = { item.building }
                            level = { item.level }
                            location = { item.location }
                            zone = { item.zone }
                            classification = { item.classification }
                            project = { item.project }
                            quality = { item.quality }
                            topography = { item.topography }
                            typeForm = { item.typeForm }
                            usage= { item.usage }
                            weightingPercentage = { item.weightingPercentage }
                            resultingTypeApprovalFactor ={ item.resultingTypeApprovalFactor}
                            resultingUnitaryCost = { item.resultingUnitaryCost }
                        />
                    )
                }
            </tbody>
            <Footer {...props} />
        </table>
    )
}