import { ChangeEventHandler } from "react";
import { FactorState } from "../factors/factor";
import { Factors } from "../factors/factors";
export interface TableProps {
  id: number;
  title: string;
  name: string;
  collection: Array<FactorState | any>;
  style?: string;
}
