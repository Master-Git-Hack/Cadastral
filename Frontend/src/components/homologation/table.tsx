import { Selector } from "../inputs/selector";
import { TableProps } from "../../types/homologation/table/table";
import { toFancyNumber, findFactor } from "../../utils/utils";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  selectHomologation,
  setSingleFactor,
} from "../../features/homologations/homologationsSlice";
import { FC } from "react";

export const Table: FC<TableProps> = (props) => {
  const { items } = useAppSelector(selectHomologation);
  const dispatch = useAppDispatch();

  const handleChange = (
    transaction: any,
    itemID: number,
    isSubject: boolean = false
  ) => {
    transaction = findFactor(transaction, props.collection);
    dispatch(
      setSingleFactor({
        itemName: props.name,
        itemID,
        isSubject,
        transaction,
      })
    );
  };
  const subject = items[0][props.name].subject;
  return (
    <table
      key={`table-${props.title}-${props.name}-${props.id}`}
      className="table table-sm table-responsive table-responsive-sm table-striped table-bordered table-hover"
    >
      <tbody
        id={`table-${props.title}-${props.name}-${props.id}-body`}
        className="align-self-middle align-middle text-center"
      >
        <tr id={`table-${props.title}-${props.name}-${props.id}-header-title`}>
          <td id={props.title} colSpan={6} rowSpan={1}>
            FACTOR POR {props.title}
          </td>
        </tr>
        <tr id={`table-${props.title}-${props.name}-${props.id}-headers`}>
          <td
            id={`${props.name}-${props.id}-headers-#`}
            colSpan={1}
            rowSpan={1}
          >
            #
          </td>
          <td
            id={`${props.name}-${props.id}-headers-Tipo`}
            colSpan={1}
            rowSpan={1}
          >
            Tipo
          </td>
          <td
            id={`${props.name}-${props.id}-headers-Calificación`}
            colSpan={1}
            rowSpan={1}
          >
            Calificación
          </td>
          <td
            id={`${props.name}-${props.id}-headers-Factores`}
            colSpan={1}
            rowSpan={2}
          >
            Factores
          </td>
        </tr>
        <tr
          id={`table-${props.title}-${props.name}-${props.id}-bodyElementsToUse`}
        >
          <td
            id={`${props.name}-${props.id}-bodyElementsToUse-SUJETO`}
            colSpan={1}
            rowSpan={1}
          >
            SUJETO
          </td>
          <td
            id={`${props.name}-${props.id}-bodyElementsToUse-subject`}
            colSpan={1}
            rowSpan={1}
          >
            <Selector
              id={props.id}
              name="subject"
              subject={subject}
              selector={props.collection}
              onChange={(event) =>
                handleChange(Number(event.target.value), 0, true)
              }
              style={`bg-warning`}
            />
          </td>
          <td
            id={`${props.name}-${props.id}-bodyElementsToUse-subjectValue`}
            colSpan={1}
            rowSpan={1}
          >
            {toFancyNumber(items[0][props.name].subject.value)}
          </td>
        </tr>
        {items
          .map((item) => item[props.name])
          .map((item, index: number) => (
            <tr
              id={`table-${props.title}-${props.name}-${props.id}-body-row-${index}`}
              key={`table-${props.title}-${props.name}-${props.id}-bodyElementsToRender-${index}`}
            >
              <td
                id={`${props.name}-${props.id}-body-row-${index}-#`}
                colSpan={1}
                rowSpan={1}
              >
                C{index + 1}
              </td>
              <td
                id={`${props.name}-${props.id}-body-row-${index}-current`}
                colSpan={1}
                rowSpan={1}
              >
                <Selector
                  id={props.id + index}
                  name={props.name}
                  subject={item.current}
                  selector={props.collection}
                  onChange={(event) =>
                    handleChange(Number(event.target.value), index)
                  }
                  style={`bg-light`}
                />
              </td>
              <td
                id={`${props.name}-${props.id}-body-row-${index}-value`}
                colSpan={1}
                rowSpan={1}
              >
                {toFancyNumber(
                  item.current.value ? item.current.value : 0,
                  false,
                  false,
                  2
                )}
              </td>
              <td
                id={`${props.name}-${props.id}-body-row-${index}-divisor`}
                colSpan={1}
                rowSpan={1}
              >
                {toFancyNumber(
                  subject.value / item.current.value
                    ? subject.value / item.current.value
                    : 0,
                  false,
                  false,
                  2
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
