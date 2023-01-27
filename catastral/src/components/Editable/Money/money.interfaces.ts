import { Input } from "../editable.interfaces";

export interface MoneyProps extends Input{
    label?: string;
    value: number;
    decimals?: number;
    justifyContent?: "flex-start" | "center" | "flex-end";
}