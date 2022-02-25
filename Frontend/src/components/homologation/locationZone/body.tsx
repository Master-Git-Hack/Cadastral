import { FC, Fragment } from "react";
import { LocationZone } from "../../../types/homologation/factors/location_zone";
import { FancyInput } from "../../inputs/fancyInput";
import { Selector } from "../../inputs/selector";
import { symbols, Symbols } from "../../../types/homologation/factors/symbols";

export const Body: FC<{
  title: string;
  type: string;
  rows: Array<LocationZone>;
  columns: string[];
  onChange: Function;
}> = (props) => (
  <Fragment>
    {props.rows.map((row: LocationZone, index: number) => (
      <tr
        key={`Table-Factor-por-${props.title}-row-${index}`}
        id={`Table-Factor-por-${props.title}-row-${index}`}
      >
        <td
          key={`Table-Factor-por-${props.title}-row-${index}-porcentaje`}
          id={`Table-Factor-por-${props.title}-row-${index}-porcentaje`}
        >
          <FancyInput
            key={`Table-Factor-por-${props.title}-row-${index}-porcentaje-input`}
            index={index}
            name="porcentaje"
            value={Number(row.percentage)}
            isCurrency={false}
            isPercentage={true}
            onChange={(event: any) => {}}
          />
        </td>
        <td key={`Table-Factor-por-${props.title}-row-${index}-${props.type}`}>
          <input
            key={`Table-Factor-por-${props.title}-row-${index}-${props.type}-input`}
            id={`Table-Factor-por-${props.title}-row-${index}-${props.type}-input`}
            type="text"
            className="form-control"
            onChange={(event: any) => props.onChange()}
          />
        </td>
        {props.columns.map((column: string, id: number) => (
          <td key={`Table-Factor-por-${props.title}-row-${index}-${column}`}>
            <Selector
              key={`Table-Factor-por-${props.title}-row-${index}-${column}-selector-${id}`}
              id={id}
              name={column}
              subject={row[column] as Symbols}
              selector={symbols}
              onChange={(event: any) => props.onChange()}
            />
          </td>
        ))}
      </tr>
    ))}
  </Fragment>
);
