import { FC, useState, Fragment } from "react";
import { FancyInput } from "../../../inputs/fancyInput";
import { useAppDispatch } from "../../../../hooks/hooks";
import {
  setLocationZoneValueLocationZone,
  setPercentageLocationZone,
} from "../../../../features/homologations/homologationsSlice";
export const Row: FC<{
  index: number;
  title: string;
  type: string;
  percentage: number;
  locationZone: string;
}> = (props) => {
  const [percentage, setPercentage] = useState(Number(props.percentage));
  const [locationZone, setLocationZone] = useState(props.locationZone);
  //console.log(props.index, event.target.name, event.target.value as number)
  const dispatch = useAppDispatch();

  return (
    <Fragment key={`Table-Factor-por-${props.title}-row-${props.index}`}>
      <td
        key={`Table-Factor-por-${props.title}-row-${props.index}-porcentaje`}
        id={`Table-Factor-por-${props.title}-row-${props.index}-porcentaje`}
      >
        <FancyInput
          key={`Table-Factor-por-${props.title}-row-${props.index}-porcentaje-input`}
          index={props.index}
          name="porcentaje"
          value={percentage}
          isCurrency={false}
          isPercentage={true}
          onChange={(event: any) =>
            setPercentage((prevState) => {
              setTimeout(() => {
                dispatch(
                  setPercentageLocationZone({
                    itemID: props.index,
                    itemName: props.type === "location" ? "location" : "zone",
                    transaction: Number(event.target.value),
                  })
                );
              }, 1000);
              return Number(event.target.value);
            })
          }
        />
      </td>
      <td
        key={`Table-Factor-por-${props.title}-row-${props.index}-${props.type}`}
      >
        <input
          key={`Table-Factor-por-${props.title}-row-${props.index}-${props.type}-input`}
          id={`Table-Factor-por-${props.title}-row-${props.index}-${props.type}-input`}
          type="text"
          value={locationZone}
          className="form-control"
          onChange={(event: any) =>
            setLocationZone((prevState) => {
              dispatch(
                setLocationZoneValueLocationZone({
                  itemID: props.index,
                  itemName: props.type === "location" ? "location" : "zone",
                  transaction: event.target.value,
                })
              );

              return event.target.value;
            })
          }
          autoFocus
        />
      </td>
    </Fragment>
  );
};
