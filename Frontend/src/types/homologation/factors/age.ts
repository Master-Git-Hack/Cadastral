import { FactorState } from "./factor";
interface Age extends FactorState {
  type: string;
  value: number;
}
export interface FactorAge {
  subject?: Age;
  current: Age;
}
