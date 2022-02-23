import { Factors } from "./factors/factors";

export interface HomologationState {
  type: string;
  items: Array<Factors | any>;
}
