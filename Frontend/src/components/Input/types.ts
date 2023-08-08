/** @format */

import { ReactNode } from "react";
import { InputMaskProps } from "primereact/inputmask";
import { InputNumberProps } from "primereact/inputnumber";
import { InputSwitchProps } from "primereact/inputswitch";
import { InputTextProps } from "primereact/inputtext";

export const BASE_STYLE =
	"flex h-9 w-full rounded-md border border-zinc-200 border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-800 hover:border-blue-400 hover:ring-1 hover:ring-blue-400 ";

export interface MaskProps extends InputMaskProps {}
export interface SwitchProps extends InputSwitchProps {}
export interface NumberProps extends InputNumberProps {}
export interface TextProps extends InputTextProps {
	icon: ReactNode | ReactNode[];
	button: ReactNode;
}
