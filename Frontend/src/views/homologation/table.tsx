import { Selector } from "../../components/inputs/selector";
import { TableProps } from "../../types/homologation/table/table";
import { toFancyNumber } from "../../utils/utils";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { selectHomologation } from "../../features/homologations/homologationsSlice";
import { FC, ChangeEventHandler } from "react";
export const Table: FC<TableProps> = (props) => {
  const { items } = useAppSelector(selectHomologation);
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => null;
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
            colSpan={6}
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
              subject={items[0][props.name].subject}
              selector={props.collection}
              onChange={handleChange}
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
                id={`${props.name}-${props.id}-body-row-${index}-current`}
                colSpan={1}
                rowSpan={1}
              >
                <Selector
                  id={props.id + index}
                  name={props.name}
                  subject={item.current}
                  selector={props.collection}
                  onChange={handleChange}
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
            </tr>
          ))}
      </tbody>
    </table>
  );
};
