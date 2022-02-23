import React, { useState } from "react";

function Subject(props: any): JSX.Element {
  const { type } = props;
  const [rows, setRows] = useState({});
  const actual_usage = "####";
  return (
    <table className="table table-sm table-bordered">
      <thead className="table-light text-center align-self-middle align-middle">
        <tr>
          <th colSpan={19} scope="col" className="bg-info">
            SUJETO
          </th>
          <th colSpan={6} scope="col" className="bg-warning">
            {type === "Analysis"
              ? "TERRENO"
              : type === "Rents"
              ? "CONSTRUCCIÓN"
              : null}
          </th>
        </tr>
      </thead>
      {type === "Analysis" ? (
        <tbody className="text-center align-self-middle align-middle">
          <tr>
            <td colSpan={2}>
              <span>TOPOGRAFIA:</span>
            </td>
            <td colSpan={4}>
              <span>####</span>
            </td>
            <td colSpan={4}>
              <span>NÚMERO DE FRENTES:</span>
            </td>
            <td colSpan={2}>
              <span>####</span>
            </td>
            <td colSpan={7}>
              <span>SUPERFICIE TOTAL DEL TERRENO:</span>
            </td>
            <td colSpan={5}>
              <span>####</span>
            </td>
            <td colSpan={1}>
              <span>
                m<sup>2</sup>
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <span>FORMA:</span>
            </td>
            <td colSpan={4}>
              <span>####</span>
            </td>
            <td colSpan={4}>
              <span>USO:</span>
            </td>
            <td colSpan={2}>
              <span>####</span>
            </td>
            <td colSpan={2}>
              <span>UBICACIÓN:</span>
            </td>
            <td colSpan={11}>
              <span>####</span>
            </td>
          </tr>
        </tbody>
      ) : type === "Rents" ? (
        <tbody className="text-center align-self-middle align-middle">
          <tr>
            <td colSpan={2} rowSpan={2}>
              <span>USO ACTUAL:</span>
            </td>
            <td colSpan={7} rowSpan={2}>
              <span>{actual_usage}</span>
            </td>
            <td colSpan={5}>
              <span>REFERENCIA:</span>
            </td>
            <td colSpan={2}>
              <span>TIPO A</span>
            </td>
            <td colSpan={2}>
              <span>TIPO B</span>
            </td>
            <td colSpan={2}>
              <span>TIPO C</span>
            </td>
            <td colSpan={6}>
              <span>PONDERADA</span>
            </td>
          </tr>
          <tr>
            <td colSpan={5}>
              <span>EDAD ESTIMADA (EN AÑOS):</span>
            </td>
            <td colSpan={2}>
              <span>####</span>
            </td>
            <td colSpan={2}>
              <span>####</span>
            </td>
            <td colSpan={2}>
              <span>####</span>
            </td>
            <td colSpan={6} rowSpan={2}>
              <span>####</span>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <span>RÉGIMEN DE PROPIEDAD:</span>
            </td>
            <td colSpan={5}>
              <span>####</span>
            </td>
            <td colSpan={5}>
              <span>VIDA ÚTIL PROBABLE:</span>
            </td>
            <td colSpan={2}>
              <span>####</span>
            </td>
            <td colSpan={2}>
              <span>####</span>
            </td>
            <td colSpan={2}>
              <span>####</span>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <span>NÚMERO DE NIVELES:</span>
            </td>
            <td colSpan={2}>
              <span>####</span>
            </td>
            <td colSpan={4}>
              <span>TIPO DE BIEN:</span>
            </td>
            <td colSpan={5}>
              <span>##LOCAL, OFICINA, CAFETERIA, ETC##</span>
            </td>
            <td colSpan={11} />
          </tr>
        </tbody>
      ) : null}
    </table>
  );
}
export default Subject;
