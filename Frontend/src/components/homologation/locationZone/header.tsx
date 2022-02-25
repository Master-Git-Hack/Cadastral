import { FC, Fragment } from "react";
export const ColumnsHeader: FC<{
  index: number;
  title: string;
  columns: string[];
}> = (props) => (
  <Fragment>
    {props.columns.map((column: string, index: number) => (
      <td
        key={`Table-Factor-por-${props.title}-header-${props.index}-${column}-${index}`}
        id={`Table-Factor-por-${props.title}-header-${props.index}-${column}-${index}`}
      >
        {column}
      </td>
    ))}
  </Fragment>
);
