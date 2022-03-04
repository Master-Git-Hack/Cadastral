import { FancyInput } from "../inputs/fancyInput";
import { toFancyNumber } from "../../utils/utils";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import {
  selectHomologation,
  setSingleFactor,
} from "../../features/homologations/homologationsSlice";
export const Ages: FC = (props: any) => {
  const { items } = useAppSelector(selectHomologation);
  const dispatch = useAppDispatch();
  const subject = items[0].age.subject;
  const factorCalculation = (value: number) =>
    1 - (subject.value - value) * 0.01;
  const handleChanges = (
    transaction: any,
    itemID: number,
    isSubject: boolean = false
  ) =>
    dispatch(
      setSingleFactor({
        itemName: "age",
        itemID,
        transaction: {
          type: "",
          value: transaction,
        },
        isSubject,
      })
    );
  return (
    <table className="table table-sm table-responsive table-responsive-sm table-stripped table-bordered table-hover">
      <tbody className="align-self-middle align-middle text-center">
        <tr>
          <td colSpan={6}>FACTOR POR EDAD</td>
        </tr>
        <tr>
          <td colSpan={1} rowSpan={1}>
            #
          </td>
          <td colSpan={2} rowSpan={1}>
            Edades
          </td>
          <td colSpan={1} rowSpan={2}>
            Factores
          </td>
        </tr>
        <tr>
          <td colSpan={1} rowSpan={1}>
            Sujeto
          </td>
          <td colSpan={2} rowSpan={1} className="bg-warning">
            <FancyInput
              index={props.index}
              name="age"
              value={subject.value}
              isCurrency={false}
              isPercentage={false}
              onChange={(event) =>
                handleChanges(Number(event.target.value), 0, true)
              }
            />
          </td>
        </tr>
        {items
          .map((item) => item.age)
          .map((item, index: number) => (
            <tr key={index}>
              <td colSpan={1} rowSpan={1}>
                C{index + 1}
              </td>
              <td colSpan={2} rowSpan={1}>
                <FancyInput
                  index={index}
                  name="age"
                  value={item.current.value}
                  isCurrency={false}
                  isPercentage={false}
                  onChange={(event) =>
                    handleChanges(Number(event.target.value), index)
                  }
                />
              </td>
              <td colSpan={1} rowSpan={1}>
                {toFancyNumber(
                  factorCalculation(item.current.value),
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
