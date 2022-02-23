import { ChangeEventHandler } from "react";
export interface FancyInputProps {
  index: number;
  name: string;
  value: number;
  isCurrency: boolean;
  isPercentage: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
