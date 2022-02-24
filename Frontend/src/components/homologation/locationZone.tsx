import { FC, useState } from "react";
import { FancyInput } from "../../components/inputs/fancyInput";
import { Factors } from "../../types/homologation/factors/factors";
import {LocationZone } from "../../types/homologation/factors/location_zone";
import { Selector } from "../../components/inputs/selector";
import { symbols } from "../../types/homologation/factors/symbols";
import { toFancyNumber } from "../../utils/utils";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  selectHomologation,
  setSingleFactor,
} from "../../features/homologations/homologationsSlice";
export const LocationZoneComponent: FC<{
  id: number;
  title: string;
  type: string;
}> = (props) => {
  const { items } = useAppSelector(selectHomologation);
  const rows = items.filter((row:Factors | any)=>row[props.type]).map((row:Factors | any)=>row[props.type]);  
  console.log(rows)
  return(
    <table>
    </table>
  );
};
