import React, { useState } from "react";
import Rows from "../analysis/Rows";

function Analysis(props: {
  title: string;
  columns: Array<any>;
  toFancyNumber: Function;
  roundToDecena: Function;
}): JSX.Element {
  const { title, columns, toFancyNumber, roundToDecena } = props;
  const baseColumns = {
    offer: 1,
    sales_cost: 1,
    area: 1,
    unitary_cost: 1,
    factors: {
      classification: 1,
      location: 1,
      type_form: 1,
      use: 1,
      zone: 1,
      topology: 1,
      others: 1,
      purchase: 1,
      surface: 1,
    },
    resulting_type_approval_factor: 1,
    weighting_percentage: 100,
    addNextRow: true,
  };
  const [rows, setRows] = useState([baseColumns]);

  const average_lot_area: number =
    rows
      .map((row) => row.area)
      .reduce((previous, current) => previous + Number(current), 0) /
    rows.length;

  const unitary_cost: Function = () =>
    setRows(
      rows.map((row, index) => {
        const { area, sales_cost } = row;
        const unitary_cost: number =
          area && sales_cost ? sales_cost / area : 0.000_000_000_000_001;
        return { ...row, unitary_cost };
      })
    );
  const superficie: Function = () =>
    setRows(
      rows.map((row, index) => {
        const { area } = row;
        const superficie: number = (area / average_lot_area) ** (1 / 12);
        return { ...row, factors: { ...row.factors, superficie } };
      })
    );

  const resulting_type_approval_factor: Function = () =>
    setRows(
      rows.map((row, index) => {
        const { factors } = row;
        const {
          classification,
          location,
          type_form,
          use,
          zone,
          topology,
          purchase,
          others,
        } = factors;
        const surface: number = factors?.surface;
        const resulting_type_approval_factor: number =
          classification &&
          location &&
          type_form &&
          use &&
          zone &&
          topology &&
          purchase &&
          others &&
          surface
            ? classification *
              location *
              type_form *
              use *
              zone *
              topology *
              purchase *
              others *
              surface
            : 0.000_000_000_000_001;
        return { ...row, resulting_type_approval_factor };
      })
    );

  const resulting_unitary_cost: Function = () =>
    setRows(
      rows.map((row, index) => {
        const { resulting_type_approval_factor, unitary_cost } = row;
        const resulting_unitary_cost: number =
          resulting_type_approval_factor && unitary_cost
            ? resulting_type_approval_factor * unitary_cost
            : 0.000_000_000_000_001;
        return { ...row, resulting_unitary_cost };
      })
    );

  const average_unitary_value: number = rows
    .map((row, id) => {
      const { area, sales_cost, factors, weighting_percentage } = row;
      const {
        classification,
        location,
        type_form,
        use,
        zone,
        topology,
        purchase,
        others,
      } = factors;
      const unitary_cost =
        area && sales_cost ? sales_cost / area : 0.000_000_000_000_001;
      const surface = (area / average_lot_area) ** (1 / 12);
      const resulting_type_approval_factor =
        classification &&
        location &&
        type_form &&
        use &&
        zone &&
        topology &&
        purchase &&
        others &&
        surface
          ? classification *
            location *
            type_form *
            use *
            zone *
            topology *
            purchase *
            others *
            surface
          : 0.000_000_000_000_001;

      const resulting_unitary_cost =
        resulting_type_approval_factor && unitary_cost
          ? resulting_type_approval_factor * unitary_cost
          : 0.000_000_000_000_001;
      return {
        resulting_unitary_cost: Number(resulting_unitary_cost),
        weighting_percentage,
      };
    })
    .reduce(
      (previous, current) =>
        previous +
        current.resulting_unitary_cost * (current.weighting_percentage / 100),
      0
    );

  const validate_weighting_percentage: number = rows
    .map((row) => Number(row.weighting_percentage))
    .reduce((previous, current) => previous + current / 100, 0);
  const addRow: Function = () =>
    setRows([
      ...rows.map((row, index) =>
        index + 1 === rows.length ? { ...row, addNextRow: false } : row
      ),
      { ...baseColumns, offer: rows.length + 1 },
    ]);
  const deleteRow: Function = (index: number) =>
    setRows(rows.filter((row, id) => id !== index));

  return (
    <table className="table table-sm table-hover table-bordered">
      <thead className="table-light text-center align-self-middle align-middle">
        <tr>
          <th className="bg-warning" colSpan={31}>
            {title}
          </th>
        </tr>
        <tr>
          <th colSpan={1} rowSpan={2} scope="col">
            Oferta
          </th>
          <th colSpan={3} rowSpan={2} scope="col">
            Precio de Venta
          </th>
          <th colSpan={1} rowSpan={2} scope="col">
            Área (m<sup>2</sup>)
          </th>
          <th colSpan={3} rowSpan={2} scope="col">
            Precio Unitario (m<sup>2</sup>)
          </th>
          <th colSpan={9} rowSpan={1} scope="col">
            Factor de HOMOLOGACIÓN
          </th>
          <th colSpan={1} rowSpan={2} scope="col">
            F.Ho. Re.
          </th>
          <th colSpan={1} rowSpan={2} scope="col">
            <span>Ponderación</span>
            <br />
            <span
              className={
                validate_weighting_percentage === 1
                  ? "text-success"
                  : validate_weighting_percentage < 1
                  ? "text-warning"
                  : "text-danger"
              }
            >
              {validate_weighting_percentage * 100}
            </span>
          </th>
          <th colSpan={6} rowSpan={2} scope="col">
            Valor Unitario Resultante ($ &divide; m<sup>2</sup>)
          </th>
          {Object.keys(columns[0]).map((key, index) => (
            <th
              colSpan={1}
              rowSpan={2}
              scope="col"
              key={`header-${key}-${index}`}
            >
              {key}
            </th>
          ))}
          <th colSpan={6} rowSpan={2} scope="col">
            Acciones
          </th>
        </tr>
        <tr>
          <th>FClas.</th>
          <th>FUbi.</th>
          <th>FFo.</th>
          <th>Fuso</th>
          <th>FZo.</th>
          <th>FTop.</th>
          <th>FSup.</th>
          <th>FOtro</th>
          <th>FCom</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <Rows
            key={index}
            index={index}
            currentRow={row}
            rows={rows}
            extraColumns={columns}
            average_lot_area={average_lot_area}
            setRows={setRows}
            addRow={addRow}
            deleteRow={deleteRow}
            toFancyNumber={toFancyNumber}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className="text-end" rowSpan={2}>
            <span>Área de Lote Moda</span>
          </td>
          <td colSpan={1} className="text-center" rowSpan={2}>
            <span className="text-muted">
              {toFancyNumber(average_lot_area, false, false)}
            </span>
          </td>
          <td colSpan={10} className="text-start" rowSpan={2}>
            <span>
              m<sup>2</sup>
            </span>
          </td>
          <td colSpan={4} className="text-end">
            <span>Valor Unitario Promedio</span>
          </td>
          <td colSpan={6} className="text-center">
            <span className="text-muted">
              {toFancyNumber(average_unitary_value, true, false)}
            </span>
          </td>
          {Object.keys(columns[0]).map((key, index) => (
            <th
              colSpan={1}
              rowSpan={2}
              scope="col"
              key={`footer-${key}-${index}`}
            />
          ))}
          <td colSpan={6} rowSpan={2} />
        </tr>
        <tr>
          <td colSpan={4} className="text-end">
            <span>Valor Unitario Aplicable en Números Redondos</span>
          </td>
          <td colSpan={6} className="text-center">
            <span className="text-muted">
              {toFancyNumber(
                roundToDecena(average_unitary_value, 2),
                true,
                false
              )}
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
export default Analysis;
