import { ChangeEventHandler, MouseEvent } from "react";
import PropTypes from "prop-types";
import FancyInput from "../inputs/FancyInput";

function Rows(props: {
  index: number;
  currentRow: any;
  rows: Array<any>;
  extraColumns: Array<any>;
  average_lot_area: number;
  setRows: Function;
  addRow: Function;
  deleteRow: Function;
  toFancyNumber: Function;
}): JSX.Element {
  const {
    index,
    currentRow,
    rows,
    average_lot_area,
    setRows,
    addRow,
    deleteRow,
    toFancyNumber,
  } = props;
  const { sales_cost, area, factors, weighting_percentage, addNextRow } =
    currentRow;

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

  const unitary_cost: number =
    area && sales_cost ? sales_cost / area : 0.000_000_000_000_001;

  const surface: number = (area / average_lot_area) ** (1 / 12);

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

  const resulting_unitary_cost: number =
    resulting_type_approval_factor && unitary_cost
      ? resulting_type_approval_factor * unitary_cost
      : 0.000_000_000_000_001;

  const handleChange: any = (e: any): void =>
    setRows(
      rows.map((row, id) =>
        id === index ? { ...row, [e.target.name]: Number(e.target.value) } : row
      )
    );

  const handleChangeFactors: any = (e: any): void =>
    setRows(
      rows.map((row, id) =>
        id === index
          ? {
              ...row,
              factors: {
                ...row.factors,
                [e.target.name]: Number(e.target.value),
              },
            }
          : row
      )
    );

  const handleAddRow: any = (event: MouseEvent<HTMLButtonElement>) => addRow();

  const handleDeleteRow: any = (event: MouseEvent<HTMLButtonElement>) =>
    deleteRow(index);

  return (
    <tr>
      <td
        colSpan={1}
        className="justify-content-center align-self-center align-middle text-center "
      >
        {`C${index + 1}`}
      </td>
      <td colSpan={3}>
        <FancyInput
          index={index}
          currentName="sales_cost"
          currentValue={sales_cost}
          handleCurrentChange={handleChange}
          isCurrency
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="area"
          currentValue={area}
          handleCurrentChange={handleChange}
          isCurrency={false}
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td
        colSpan={3}
        className="justify-content-center align-self-center align-middle text-center text-muted"
      >
        {toFancyNumber(unitary_cost, true, false)}
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="classification"
          currentValue={classification}
          handleCurrentChange={handleChangeFactors}
          isCurrency={false}
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="location"
          currentValue={location}
          handleCurrentChange={handleChangeFactors}
          isCurrency={false}
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="type_form"
          currentValue={type_form}
          handleCurrentChange={handleChangeFactors}
          isCurrency={false}
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="use"
          currentValue={use}
          handleCurrentChange={handleChangeFactors}
          isCurrency={false}
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="zone"
          currentValue={zone}
          handleCurrentChange={handleChangeFactors}
          isCurrency={false}
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="topology"
          currentValue={topology}
          handleCurrentChange={handleChangeFactors}
          isCurrency={false}
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td
        colSpan={1}
        className="justify-content-center align-self-center align-middle text-center text-muted"
      >
        {Number(toFancyNumber(surface, false, false)).toFixed(2)}
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="others"
          currentValue={others}
          handleCurrentChange={handleChangeFactors}
          isCurrency={false}
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="purchase"
          currentValue={purchase}
          handleCurrentChange={handleChangeFactors}
          isCurrency={false}
          isPercentage={false}
          toFancyNumber={toFancyNumber}
        />
      </td>
      <td
        colSpan={1}
        className="justify-content-center align-self-center align-middle text-center text-muted"
      >
        {Number(
          toFancyNumber(resulting_type_approval_factor, false, false)
        ).toFixed(2)}
      </td>
      <td colSpan={1}>
        <FancyInput
          index={index + 1}
          currentName="weighting_percentage"
          currentValue={weighting_percentage}
          handleCurrentChange={handleChange}
          isCurrency={false}
          isPercentage
          toFancyNumber={toFancyNumber}
        />
      </td>

      <td
        colSpan={6}
        className="justify-content-center align-self-center align-middle text-center text-muted"
      >
        {toFancyNumber(resulting_unitary_cost, true, false)}
      </td>
      {props?.extraColumns
        ?.map((column, id) =>
          id === index
            ? Object.keys(column).map((key, idx) => (
                <td
                  key={`key-${idx}`}
                  colSpan={1}
                  className="justify-content-center align-self-center align-middle text-center text-muted"
                >
                  <FancyInput
                    index={index + 1}
                    currentName={key}
                    currentValue={column[key]}
                    handleCurrentChange={handleChange}
                    isCurrency={false}
                    isPercentage={false}
                    toFancyNumber={toFancyNumber}
                  />
                </td>
              ))
            : undefined
        )
        .filter((currentElement) => currentElement !== undefined)}
      <td
        colSpan={6}
        className="justify-content-center align-self-center align-middle text-center text-muted"
      >
        {addNextRow ? (
          <button
            className="btn btn-outline-success btn-sm"
            onClick={handleAddRow}
          >
            +
          </button>
        ) : (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleDeleteRow}
          >
            -
          </button>
        )}
      </td>
    </tr>
  );
}

Rows.propTypes = {
  index: PropTypes.number.isRequired,
  currentRow: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  extraColumns: PropTypes.array,
  average_lot_area: PropTypes.number.isRequired,
  setRows: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  toFancyNumber: PropTypes.func.isRequired,
};

export default Rows;
