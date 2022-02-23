import {FC, useState} from "react";
import LocationZone from "./LocationZone"
import Table from "./Table";

function Factors(props: {
  typeFactor: string;
  typeLocation:string,
}) {
  const { typeFactor, typeLocation } =
    props;
    const periphery: Array<any> = [
      {
          type: "URBANO",
          value: 1.1,
      },
      {
        type: "SUBURBANO",
        value: 1.05,
      },
      {
        type: "RÚSTICO",
        value: 1.0,
      },
      {
        type: "RURAL",
        value: 0.95,
      },
    ];
    const type_form: Array<any> = [
      {
        type: "REGULAR",
        value: 1.0,
      },
      {
        type: "IRREGULAR LIGERO",
        value: typeFactor === "TERRENO" ? 0.97 : 0.98,
      },
      {
        type: "P.I. DE 4 LADOS",
        value: typeFactor === "TERRENO" ? 0.95 : 0.96,
      },
      {
        type: "P.I. DE 5 LADOS",
        value: typeFactor === "TERRENO" ? 0.93 : 0.94,
      },
      {
        type: "P.I. DE 6 LADOS",
        value: typeFactor === "TERRENO" ? 0.9 : 0.92,
      },
      {
        type: "IRREGULAR PESADO",
        value: typeFactor === "TERRENO" ? 0.85 : 0.9,
      },//pendiente
    ];
    const usage: Array<any> = [
      {
        type: "HABITACIONAL",
        value: 1.0,
      },
      {
        type: "COMERCIAL",
        value: 1.03,
      },
      {
        type: "MIXTO H-C",
        value: 1.05,
      },
      {
        type: "INDUSTRIAL",
        value: 1.07,
      },
      {
        type: "MIXTO I-H",
        value: 0.97,
      },
      {
        type: "MIXTO I-C",
        value: 1.09,
      },
      {
        type: "SERVICIOS",
        value: 1.04,
      },
    ];
    const topography: Array<any> = [
      {
        type: "PLANA",
        value: 1.0,
      },
      {
        type: "PENDIENTE LIGERA",
        value: typeFactor === "TERRENO" ? 0.97 : 0.98,
      },
      {
        type: "PENDIENTE INCLINADA",
        value: typeFactor === "TERRENO" ? 0.94 : 0.96,
      },
      {
        type: "PENDIENTE ACCIDENTADA",
        value: typeFactor === "TERRENO" ? 0.91 : 0.94,
      },
    ];
    const level: Array<any> = [
      {
        type: "SOTANO 1",
        value: 0.9,
      },
      {
        type: "SOTANO 2",
        value: 0.95,
      },
      {
        type: "P.B. NIVEL DE CALLE",
        value: 1.0,
      },
      {
        type: "P.A. NIVEL DE CALLE",
        value: 1.0,
      },
    ];
    const quality: Array<any> = [
      {
        type: "PRECARIA",
        value: 0.91,
      },
      {
        type: "BAJA",
        value: 0.94,
      },
      {
        type: "ECONOMICA",
        value: 0.97,
      },
      {
        type: "COMERCIAL",
        value: 1.0,
      },
      {
        type: "MEDIA COMÚN",
        value: 1.03,
      },
      {
        type: "MEDIA ALTA",
        value: 1.06,
      },
      {
        type: "ALTA",
        value: 1.09,
      },
      {
        type: "LUJO",
        value: 1.12,
      },
    ];
    const project: Array<any> = [
      {
        type: "EXCELENTE",
        value: 1.06,
      },
      {
        type: "MUY BUENO",
        value: 1.03,
      },
      {
        type: "FUNCIONAL",
        value: 1.0,
      },
      {
        type: "ADECUADO",
        value: 0.98,
      },
      {
        type: "REGULAR",
        value: 0.96,
      },
      {
        type: "INADECUADO",
        value: 0.94,
      },
      {
        type: "DEFICIENTE",
        value: 0.92,
      },
      {
        type: "OBSOLETO",
        value: 0.9,
      },
      {
        type: "INEXISTENTE",
        value: 0.88,
      },
    ];
    const building: Array<any> = [
      {
        type: "RESIDENCIAL PLUS",
        value: 1.08,
      },
      {
        type: "RESIDENCIAL",
        value: 1.06,
      },
      {
        type: "SEMILUJO",
        value: 1.04,
      },
      {
        type: "MEDIA",
        value: 1.02,
      },
      {
        type: "MEDIA COMÚN",
        value: 1.0,
      },
      {
        type: "INTERÉS SOCIAL ALTA",
        value: 0.98,
      },
      {
        type: "INTERÉS SOCIAL MEDIA",
        value: 0.96,
      },
      {
        type: "INTERÉS SOCIAL BAJA",
        value: 0.94,
      },
      {
        type: "ECONÓMICA ALTA",
        value: 0.92,
      },
      {
        type: "ECONÓMICA BAJA",
        value: 0.9,
      },
      {
        type: "MÍNIMA",
        value: 0.88,
      },
    ];
    const symbols: Array<any> = [
      {
        type: "+",
        value: 1,
      },
      {
        type: "=",
        value: 0,
      },
      {
        type: "-",
        value: -1,
      },
    ];
    const factors = {
      classification: periphery,
      type_form,
      usage,
      topography,
      level,
      quality,
      project,
      building,
      symbols,
    };
    const template = {
      id: 0,
      classification: {
        subject: periphery[0],
        current: periphery[0],
      },
      type_form: {
        subject: type_form[0],
        current: type_form[0],
      },
      usage: {
        subject: usage[0],
        current: usage[0],
      },
      topography: {
        subject: topography[0],
        current: topography[0],
      },
      level: {
        subject: level[0],
        current: level[0],
      },
      quality: {
        subject: quality[0],
        current: quality[0],
      },
      project: {
        subject: project[0],
        current: project[0],
      },
      building: {
        subject: project[0],
        current: project[0],
      },
      location: 0,
      zone: 0,
    } as any;
    const [data, setData] = useState([{...template,
      location: {
        C1:factors.symbols[0],
        percentage: 0,
        location_zone:"",
        addNextRow: true,
      },
      zone: {
        C1:factors.symbols[0],
        percentage: 0,
        location_zone:"",
        addNextRow: true,
    },}]);
    const toFancyNumber: Function = (
      number: number,
      isCurrency = false,
      isPercentage = false
    ) =>
      new Intl.NumberFormat("es-MX", {
        style: isCurrency ? "currency" : isPercentage ? "percent" : "decimal",
        minimumFractionDigits: 2,
        currency: isCurrency ? "MXN" : undefined,
      }).format(isPercentage && !isCurrency ? number / 100 : number);
    const roundToDecena: Function = (number: number, digits = 2) =>
      (Math.round(number / 10) * 10).toFixed(0);
      console.log(data);

  const LocZone: FC<{}> = () => 
    (<LocationZone
    key="location-zone-component"
    type={typeLocation}
    symbols={factors.symbols}
    data={data}
    setData={setData}
    toFancyNumber={toFancyNumber}
  />);
  


  const Classification: FC<{}> = () => (
    <Table
      key="factor-classification-component"
      title="CLASIFICACIÓN"
      name="classification"
      collection={factors.classification}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const TypeForm: FC<{}> = () => (
    <Table
      key="factor-form-component"
      title="FORMA"
      name="type_form"
      collection={factors.type_form}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Usage: FC<{}> = () => (
    <Table
      key="factor-usage-component"
      title="USO"
      name="usage"
      collection={factors.usage}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Topography: FC<{}> = () => (
    <Table
    key="factor-topography-component"
      title="TOPOGRAFÍA"
      name="topography"
      collection={factors.topography}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Level: FC = () => (
    <Table
    key="factor-level-component"
      title="NIVEL"
      name="level"
      collection={factors.level}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Quality: FC<{}> = () => (
    <Table
    key="factor-quality-component"
      title="CALIDAD"
      name="quality"
      collection={factors.quality}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Project: FC<{}> = () => (
    <Table
    key="factor-project-component"
      title="PROYECTO"
      name="project"
      collection={factors.project}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Building: FC<{}> = () => (
    <Table
    key="factor-building-component"
      title="CONSTRUCCIÓN"
      name="building"
      collection={factors.building}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );
  const Actions: FC<{}> = () => (
    <tr className="row">
      <td colSpan={12} rowSpan={1} className="col text-start">
        <button
          name="add"
          className="btn btn-sm btn-success"
          onClick={() => {
            const aux_template: any = {...template,
              location: {
                C1:factors.symbols[0],
                percentage: 0,
                location_zone:'',
              },
              zone: {
                C1:factors.symbols[0],
                percentage: 0,
                location_zone:'',
              },
            };
            Array.from({length:data.length},(_,i) =>
            {
              const name = `C${i+2}`;
              aux_template[typeLocation][name] = factors.symbols[0];
              return name
            });
            setData([...data.map(
              (row:any,index:number)=>index === 0 ? {
                ...row, 
                [typeLocation]:{
                  ...row[typeLocation],
                  ...aux_template[typeLocation]
                }
              }:
                  row
                  ), 
                  { ...template, id: data.length }])
          }}
        >
          Agregar nueva fila
        </button>
      </td>
      {data.length > 1 ?(
        <td colSpan={12} rowSpan={1} className="col text-end">
        <button
          name="delete"
          className="btn btn-sm btn-outline-danger "
          onClick={() =>
            setData(data.length > 1 ? data.slice(0, data.length - 1).map((row:any, index:number) => {
              delete row[typeLocation][`C${data.length}`];
              return row;
            }) : data)
          }
        >
          Eliminar ultima fila
        </button>
        </td>
      ):null}
      
    </tr>
  );

  return (
    <table className="table table-sm table-responsive table-responsive-sm table-stripped">
      <thead>
        <Actions key="superior-actions"/>
      </thead>
      <tbody className="align-self-middle align-middle text-center">
        <tr className="row">
          {/**
          <td colSpan={6} className="col">
            <LocZone key="factor-location-zone"/>
          </td>
          */}
          <td colSpan={6} rowSpan={1} className="col ">
            <Classification key="factor-classification"/>
          </td>
          <td colSpan={6} rowSpan={1} className="col ">
            <TypeForm key="factor-type"/>
          </td>
          <td colSpan={6} rowSpan={1} className="col ">
            <Usage key="factor-usage"/>
          </td>
          <td colSpan={6} rowSpan={1} className="col ">
            <Topography key="factor-topography"/>
          </td>
        </tr>
        {typeFactor === "TERRENO" ? (
          <tr className="row">
            <td colSpan={6} rowSpan={1} className="col ">
              <Level key="factor-level-by-ground"/>
            </td>
            <td colSpan={6} rowSpan={1} className="col ">
              <Quality key="factor-quality-by-ground"/>
            </td>
            <td colSpan={6} rowSpan={1} className="col ">
              <Project key="factor-project-by-ground"/>
            </td>
            <td colSpan={6} rowSpan={1} className="col ">
              <Building key="factor-building-by-ground"/>
            </td>
          </tr>
        ) : null}
      </tbody>
      <tfoot>
        <Actions key="inferior-actions"/>
      </tfoot>
    </table>
  );
}

export default Factors;
