import {useState, useEffect} from "react";
import FancyInput from "../inputs/FancyInput";
import Selector from "../inputs/Selector";
export default function LocationZone(props:
    {
        type: string,
        data: Array<any>,
        symbols: Array<any>,
        setData: Function,
        toFancyNumber: Function,
    }){
    
    const { type, data, setData, toFancyNumber, symbols } = props;
    const rows = data.filter((row:any)=>row[type]).map((row:any)=>row[type])
    const currentName = type === "location" ? "UBICACIÓN" : "ZONA";
    const _template = {
      location: {
        percentage: 0,
        location_zone:'',
        addNextRow: true,
      },
      zone: {
        percentage: 0,
        location_zone:'',
        addNextRow: true,
      },
    } as any
    const columns = Array.from({length: data.length}, (_, i) => {
      const name = `C${i + 1}`
      _template[type][name]=symbols[0]
      return name
    });
    const updateData = (index: number, name: string, value: any) => setData([...data.slice(0,index),{...data[index],[type]:{...data[index][type],[name]:value}},...data.slice(index+1)])
    const updateDataBySelection = (index: number, name: string, value: any) => {
      value = symbols.find((object)=>object.value===Number(value));
      updateData(index,name,value);
    }
    const percentage = rows.reduce((prev:number,current:any)=>prev+current.percentage,0);
    const addRow = (index:number) => setData(data.map((row:any,id:number)=>id === index ? {...row,[type]:{...row[type], addNextRow:false}} : id === index+1 ? {...row,[type]:_template[type]} : row));
//setData([...data.slice(0,rows.length),{...data[rows.length],[type]:_template[type]},...data.slice(rows.length+1)]);

    const removeRow = (index:number) => setData((data.map((row:any,id:number)=>id === index-1 ? {...row,[type]:{...row[type], addNextRow:true}} : id === index ? {...row,[type]:0} : row)));

    return(
      <table className="table table-sm table-responsive table-responsive-sm table-bordered">
        <tbody className="align-self-middle align-middle text-center">
          <tr>
            <td colSpan={columns.length+3}>FACTOR POR {currentName}</td>
          </tr>
          <tr >
            <td >
              <span>Porcentaje</span>
              <br/>
              <span
                className={`badge rounded-pill bg-${percentage === 100 ? "success" : percentage > 100 ? "danger" : "warning"}`}
              >{percentage}</span>
            </td>
            <td className="bg-warning">
              {currentName}
            </td>
            {columns.map((column:string, index:number) => <td key={index}>{column}</td>)}
            <td>Acción</td>
          </tr>
          {rows.map((row:any, index:number) => (
          <tr key={index}>
            <td>
              <FancyInput
                key={index}
                index={index}
                currentName="percentage"
                currentValue={row.percentage}
                handleCurrentChange={(event:any) => updateData(index,event.target.name,Number(event.target.value))}
                isCurrency={false}
                isPercentage
                toFancyNumber={toFancyNumber}
              />
            </td>
            <td>
              <input 
              type="text" 
              name="location_zone" 
              id={`location_zone-${index}`}
              className="form-control"
              value={row.location_zone}
              onChange={(event:any) => updateData(index,event.target.name,event.target.value)}
              />
            </td>
            {Object.keys(row).filter((column:string)=>column.startsWith("C")).map((column:string, id:number) => (<td key={`responsive-columns-location-zone${id}-${index}`}>
              <Selector
                key={`selector-location-zone-${id}-${index}`}
                subject={row[column]}
                selector={symbols}
                currentName={column}
                handleChange={(event:any) => updateDataBySelection(index,event.target.name,event.target.value)}
                styles="bg-light"
              />

            </td>))}
            <td>
              {row.addNextRow ? <button className="btn btn-sm btn-outline-primary"
                onClick={() => addRow(index)}
              >+</button>: <button className="btn btn-sm btn-outline-danger" onClick={() => removeRow(index)}>-</button>}
              
              
            </td>
          </tr>))}
        </tbody>
    </table>)
}