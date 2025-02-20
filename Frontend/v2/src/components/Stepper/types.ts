/** @format */

import { HTMLAttributes, HtmlHTMLAttributes, ReactNode, SVGProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export interface Icon extends SVGProps<SVGSVGElement> {}
export interface Label extends HTMLAttributes<HTMLSpanElement> {}

export interface Items extends HtmlHTMLAttributes<HTMLLIElement> {
	label: Label;
	icon?: Icon;
}
export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
	activeIndex: number;
	readOnly?: boolean;
	items: Items[];
	onClick?: (index: number) => number;
}
