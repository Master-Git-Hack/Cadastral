import { FC, Fragment, useState, useEffect } from "react";
import { LocationZone } from "../../../types/homologation/factors/location_zone";
import { FancyInput } from "../../inputs/fancyInput";
import { Selector } from "../../inputs/selector";
import { symbols, Symbols } from "../../../types/homologation/factors/symbols";
import { findFactor } from "../../../utils/utils";
import { Row } from "./body/row";
export const Body: FC<{
  title: string;
  type: string;
  rows: Array<LocationZone>;
  columns: string[];
  dispatch: any;
  handleCompareSubject: Function;
}> = (props) => (
  <Fragment>
    {props.rows.map((row: LocationZone, index: number) => (
      <tr
        key={`Table-Factor-por-${props.title}-row-${index}`}
        id={`Table-Factor-por-${props.title}-row-${index}`}
      >
        <Row
          index={index}
          title={props.title}
          type={props.type}
          percentage={row.percentage as number}
          locationZone={row.location_zone as string}
        />
        {props.columns.map((column: string, id: number) => (
          <td key={`Table-Factor-por-${props.title}-row-${index}-${column}`}>
            <Selector
              key={`Table-Factor-por-${props.title}-row-${index}-${column}-selector-${id}`}
              id={id}
              name={column}
              subject={row[column] as Symbols}
              selector={symbols}
              onChange={(event: any) =>
                props.dispatch(
                  props.handleCompareSubject({
                    itemID: index,
                    itemName: props.type,
                    itemColumn: column,
                    transaction: findFactor(
                      Number(event.target.value),
                      symbols
                    ),
                  })
                )
              }
            />
          </td>
        ))}
      </tr>
    ))}
  </Fragment>
);
