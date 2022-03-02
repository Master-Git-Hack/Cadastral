import { FC } from "react";
import { toFancyNumber, defineResults } from "../../utils/utils";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  selectHomologation,
  caseLocationZoneAddRow,
  caseLocationZoneRemoveRow,
  setCompareSubjectLocationZone,
} from "../../features/homologations/homologationsSlice";
import { ColumnsHeader } from "./locationZone/header";
import { Body } from "./locationZone/body";

export const LocationZoneComponent: FC<{
  id: number;
  title: string;
  type: string;
}> = (props) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectHomologation);

  console.log("test=>", defineResults(items));

  const rows = items[0][props.type];
  const columns = Object.keys(rows[0]).filter((key: string) =>
    key.includes("C")
  );
  const colSpan =
    (columns.length + 2) % 2 === 0 ? columns.length + 2 : columns.length + 3;
  const result = columns.map((column: string) =>
    rows
      .map((row: any) => ({
        percentage: row.percentage,
        [column]: row[column],
      }))
      .reduce(
        (previous: number, current: any) =>
          previous + (current.percentage / 100) * current[column].value,
        1
      )
  );
  const percentage = rows
    .map((row: any) => row.percentage)
    .reduce((previous: number, current: number) => previous + current, 0);

  const Actions: FC = () => (
    <tr
      key={`Table-Factor-por-${props.title}-actions`}
      id={`Table-Factor-por-${props.title}-actions`}
    >
      <td
        key={`Table-Factor-por-${props.title}-actions-add`}
        id={`Table-Factor-por-${props.title}-actions-add`}
        className="text-start"
        colSpan={colSpan / 2}
      >
        <button
          key={`Table-Factor-por-${props.title}-actions-add-button`}
          id={`Table-Factor-por-${props.title}-actions-add-button`}
          className="btn btn-sm btn-outline-primary"
          onClick={() =>
            dispatch(
              caseLocationZoneAddRow({
                itemName: props.type === "location" ? "location" : "zone",
              })
            )
          }
        >
          Agregar fila
        </button>
      </td>
      <td
        key={`Table-Factor-por-${props.title}-actions-remove`}
        id={`Table-Factor-por-${props.title}-actions-remove`}
        className="text-end"
        colSpan={colSpan / 2}
      >
        <button
          key={`Table-Factor-por-${props.title}-actions-remove-button`}
          id={`Table-Factor-por-${props.title}-actions-remove-button`}
          className="btn btn-sm btn-outline-danger"
          onClick={() =>
            dispatch(
              caseLocationZoneRemoveRow({
                itemName: props.type === "location" ? "location" : "zone",
              })
            )
          }
        >
          Remover ultima fila
        </button>
      </td>
    </tr>
  );
  return (
    <table
      className="table table-sm table-responsive table-responsive-sm table-bordered table-striped table-hover"
      key={`Table-Factor-por-${props.title}`}
      id={`Table-Factor-por-${props.title}`}
    >
      <tbody
        key={`Table-Factor-por-${props.title}-body`}
        id={`Table-Factor-por-${props.title}-body`}
        className="align-self-middle align-middle text-center"
      >
        <tr
          key={`Table-Factor-por-${props.title}-header`}
          id={`Table-Factor-por-${props.title}-header`}
        >
          <td
            key={`Table-Factor-por-${props.title}-header-title`}
            id={`Table-Factor-por-${props.title}-header-title`}
            colSpan={colSpan}
          >
            FACTOR POR {props.title}
          </td>
        </tr>

        <Actions key={`Table-Factor-por-${props.title}-actions`} />

        <tr
          key={`Table-Factor-por-${props.title}-header-2`}
          id={`Table-Factor-por-${props.title}-header-2`}
        >
          <td
            key={`Table-Factor-por-${props.title}-header-2-porcentaje`}
            id={`Table-Factor-por-${props.title}-header-2-porcentaje`}
          >
            Porcentaje &nbsp;
            <span
              className={`badge rounded-pill bg-${
                percentage === 0 || percentage > 100
                  ? "danger"
                  : percentage === 100
                  ? "success"
                  : "warning"
              }`}
            >
              {toFancyNumber(percentage, false, true)}
            </span>
          </td>
          <td
            key={`Table-Factor-por-${props.title}-header-2-${props.type}`}
            id={`Table-Factor-por-${props.title}-header-2-${props.type}`}
            className="bg-warning"
          >
            {props.title}
          </td>
          <ColumnsHeader
            key="Table-Factor-por-${props.title-header-responsive"
            index={0}
            title={props.title}
            columns={columns}
          />
        </tr>
        <Body
          key={`Table-Factor-por-${props.title}-body`}
          title={props.title}
          type={props.type}
          rows={rows}
          columns={columns}
          dispatch={dispatch}
          handleCompareSubject={setCompareSubjectLocationZone}
        />

        <tr>
          <td colSpan={2} />
          {result.map((r: number, index: number) => (
            <td key={index}>{toFancyNumber(r, false, false, 2)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
