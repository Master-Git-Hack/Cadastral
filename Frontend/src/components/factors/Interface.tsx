import React, { useState, useEffect } from "react";
import FancyInput from "../inputs/FancyInput";
import Selector from "../inputs/Selector";
import Table from "./Table";

function Factors(props: {
  template: any;
  type_factor: string;
  data: Array<any>;
  setData: Function;
  factors: any;
  toFancyNumber: Function;
}) {
  const { template, type_factor, factors, toFancyNumber, data, setData } =
    props;
  console.log(process.env);
  const Evaluation: React.FC<{
    type: string;
    columns: number;
  }> = (props: { type: string; columns: number }) => {
    const { columns, type } = props;
    let rowTemplate = {
      id: 0,
      percentage: 0,
      location: "",
      addNextRow: true,
    };
    const columnsToUse = Array.from({ length: columns }, (_, i) => {
      const name = `C${i + 1}`;
      rowTemplate = { ...rowTemplate, [name]: factors.symbols[0] };
      return name;
    });
    const [percentage, setPercentage] = useState(0);
    const [rows, setRows] = useState([rowTemplate]);
    const results = rows.map((row: any) =>
      columnsToUse.map((column: any) => {
        return {
          [column]:
            row[column].value === -1
              ? (row.percentage / 100) * -1
              : row[column].value
              ? row.percentage / 100
              : 0,
        };
      })
    );

    const sumOfSameColumns = columnsToUse.map((column: string, i: number) =>
      results
        .map((row: any) => Object.values<any>(row)[i][column])
        .reduce((previous: number, current: number) => previous + current, 1)
    );

    useEffect(() => {
      setPercentage(
        rows
          .map((row: any) => row.percentage)
          .reduce((previous: number, current: number) => previous + current, 0)
      );
    }, [rows]);
    useEffect(() => {
      console.log(
        data.map((row: any, index: number) => ({
          ...row,
          [type === "UBICACIÓN" ? "location" : "zone"]: sumOfSameColumns[index],
        }))
      );
      console.log(
        data.map((row: any, index: number) => ({
          ...row,
          [type === "UBICACIÓN" ? "location" : "zone"]: rows[index],
        }))
      );
    }, [rows, type, sumOfSameColumns]);
    //console.log(sumOfSameColumns.map((column:number,index:number)=>data[index].location=column));
    return (
      <table className="table table-sm table-responsive table-responsive-sm table-bordered ">
        <tbody className="align-self-middle align-middle text-center">
          <tr>
            <td colSpan={Object.keys(rowTemplate).length}>FACTOR POR {type}</td>
          </tr>
          <tr>
            <td>
              <span>Porcentaje</span>
              <br />
              <span
                className={
                  percentage === 100
                    ? "text-success"
                    : percentage > 100
                    ? "text-danger"
                    : "text-warning"
                }
              >
                {percentage}
              </span>
            </td>
            <td className="bg-warning">{type}</td>
            {columnsToUse.map((column: string, index: number) => (
              <td key={`symbol-column-${index}`}>{column}</td>
            ))}
            <td>
              <span>Acción</span>
            </td>
          </tr>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <FancyInput
                  index={index + 1}
                  currentName="percentage"
                  currentValue={row.percentage}
                  handleCurrentChange={(event: any) => {
                    setRows(
                      rows.map((r: any, id: number) =>
                        index === id
                          ? { ...r, percentage: Number(event.target.value) }
                          : r
                      )
                    );
                  }}
                  isCurrency={false}
                  isPercentage
                  toFancyNumber={toFancyNumber}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="UBICACIÓN"
                  value={row.location}
                  onChange={(event: any) => {
                    setRows(
                      rows.map((r: any, id: number) =>
                        index === id
                          ? { ...r, location: event.target.value.toUpperCase() }
                          : r
                      )
                    );
                  }}
                />
              </td>
              {columnsToUse.map((column, i) => (
                <td key={i}>
                  <Selector
                    currentName={column}
                    subject={[column]}
                    selector={factors.symbols}
                    handleChange={(event: any) => {
                      setRows(
                        rows.map((r: any, id: number) =>
                          index === id
                            ? {
                                ...r,
                                [column]: factors.symbols.find(
                                  (obj: any) =>
                                    obj.value === Number(event.target.value)
                                ),
                              }
                            : r
                        )
                      );
                    }}
                    styles="bg-light text-center"
                  />
                </td>
              ))}
              <td>
                {row.addNextRow ? (
                  <button
                    className="btn btn-outline-success"
                    onClick={() =>
                      setRows([
                        ...rows.map((r, i) =>
                          index === i ? { ...r, addNextRow: false } : r
                        ),
                        { ...rowTemplate, id: rows.length },
                      ])
                    }
                  >
                    +
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      setRows([...rows.filter((obj, i) => i !== index)])
                    }
                  >
                    -
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} />
            {sumOfSameColumns.map((column: string, index: number) => (
              <td key={`symbol-column-${index}`}>{column}</td>
            ))}
          </tr>
        </tfoot>
      </table>
    );
  };
  const Zone: React.FC<{}> = () => {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <Selector
                currentName="municipalities"
                subject={{ type: undefined, value: undefined }}
                selector={[{}]}
                handleChange={(event: any) => {
                  console.log(event.target.value);
                }}
                styles="bg-light text-center"
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  const Classification: React.FC<{}> = () => (
    <Table
      title="CLASIFICACIÓN"
      name="classification"
      collection={factors.classification}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const TypeForm: React.FC<{}> = () => (
    <Table
      title="FORMA"
      name="type_form"
      collection={factors.type_form}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Usage: React.FC<{}> = () => (
    <Table
      title="USO"
      name="usage"
      collection={factors.usage}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Topography: React.FC<{}> = () => (
    <Table
      title="TOPOGRAFÍA"
      name="topography"
      collection={factors.topography}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Level: React.FC = () => (
    <Table
      title="NIVEL"
      name="level"
      collection={factors.level}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Quality: React.FC<{}> = () => (
    <Table
      title="CALIDAD"
      name="quality"
      collection={factors.quality}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Project: React.FC<{}> = () => (
    <Table
      title="PROYECTO"
      name="project"
      collection={factors.project}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );

  const Building: React.FC<{}> = () => (
    <Table
      title="CONSTRUCCIÓN"
      name="building"
      collection={factors.building}
      rows={data}
      setData={setData}
      toFancyNumber={toFancyNumber}
    />
  );
  const Actions: React.FC<{}> = () => (
    <tr className="row">
      <td colSpan={12} rowSpan={1} className="col text-start">
        <button
          className="btn btn-sm btn-success"
          onClick={() => setData([...data, { ...template, id: data.length }])}
        >
          Agregar nueva fila
        </button>
      </td>
      <td colSpan={12} rowSpan={1} className="col text-end">
        <button
          className="btn btn-sm btn-outline-danger "
          onClick={() =>
            setData(data.length > 1 ? data.slice(0, data.length - 1) : data)
          }
        >
          Eliminar ultima fila
        </button>
      </td>
    </tr>
  );
  return (
    <table className="table table-sm table-responsive table-responsive-sm table-stripped">
      <thead>
        <Actions />
      </thead>
      <tbody className="align-self-middle align-middle text-center">
        <tr className="row">
          <td colSpan={6} className="col">
            <Evaluation type="UBICACIÓN" columns={data.length} />
          </td>
          <td colSpan={6} rowSpan={1} className="col ">
            <Classification />
          </td>
          <td colSpan={6} rowSpan={1} className="col ">
            <TypeForm />
          </td>
          <td colSpan={6} rowSpan={1} className="col ">
            <Usage />
          </td>
          <td colSpan={6} rowSpan={1} className="col ">
            <Topography />
          </td>
        </tr>
        {type_factor === "TERRENO" ? (
          <tr className="row">
            <td colSpan={6} rowSpan={1} className="col ">
              <Level />
            </td>
            <td colSpan={6} rowSpan={1} className="col ">
              <Quality />
            </td>
            <td colSpan={6} rowSpan={1} className="col ">
              <Project />
            </td>
            <td colSpan={6} rowSpan={1} className="col ">
              <Building />
            </td>
          </tr>
        ) : null}
      </tbody>
      <tfoot>
        <Actions />
      </tfoot>
    </table>
  );
}

export default Factors;
