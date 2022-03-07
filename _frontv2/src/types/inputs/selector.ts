import { ChangeEventHandler } from "react";
import { FactorState } from "../homologation/factors/factor";
export interface SelectorProps {
  id: number;
  name: string;
  subject: FactorState;
  selector: Array<FactorState | any>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  style?: string;
}
