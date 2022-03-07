import { FC, Fragment } from "react";
export const Columns: FC<{
  columns: Array<{
    key: number;
    name: string;
    value: any;
  }>;
  style?: string;
}> = (props) => (
  <Fragment>
    {props.columns.map((column, index: number) => (
      <td className={props.style} key={`${column.name}-${column.key}-${index}`}>
        {column.value}
      </td>
    ))}
  </Fragment>
);
