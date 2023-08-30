/** @format */

import { HTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const variants = cva("rounded-lg  text-sm", {
	variants: {
		variant: {
			default:
				"w-full text-gray-900 dark:text-white bg-white focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
			primary:
				"w-full focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800",
			secondary:
				"w-full  focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
			outline:
				"text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
			dark: "w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
			light: "w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
			success:
				"w-full focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
			warning:
				"w-full focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800",
			danger: "w-full focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
			info: "w-full focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800",
		},
		size: {
			default: "p-2.5 text-sm h-5 w-4",
			sm: "p-2 text-xs h-4 w-3",
			md: "p-3 text-sm h-6 w-5",
			lg: "p-4 text-base h-7 w-6",
		},
		rounded: {
			default: "rounded-lg",
			none: "rounded-none",
		},
		validation: {
			default: "bg-white",
			success: "bg-green-100 hover:bg-green-200",
			warning: "bg-yellow-100 hover:bg-yellow-200",
			danger: "bg-red-100 hover:bg-red-200",
			info: "bg-cyan-100 hover:bg-cyan-200",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		rounded: "none",
	},
});
export const variantsArea = cva("block rounded-lg text-sm", {
	variants: {
		variant: {
			default:
				"text-gray-900 dark:text-white bg-white focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
			primary:
				"focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-blue-800",
			secondary:
				"focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800",
			outline:
				"text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
			dark: "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
			light: "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
			success:
				"focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
			warning:
				"focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800",
			danger: "focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
			info: "focus:outline-none text-gray-900 dark:text-white focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800",
		},
	},
	defaultVariants: { variant: "default" },
});
export interface InputProps
	extends HTMLAttributes<HTMLInputElement>,
		VariantProps<typeof variants> {}
export interface AreaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof variantsArea> {}

export interface SelectProps
	extends HTMLAttributes<HTMLSelectElement>,
		VariantProps<typeof variants> {
	customChildren?: ReactNode;
	options?: Array<{ value?: unknown; label: string; tooltip?: string }>;
	width?: string;
}
