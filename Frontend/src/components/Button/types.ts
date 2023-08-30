/** @format */

import { aligns } from "./types";
import { cva, type VariantProps } from "class-variance-authority";

import { ButtonHTMLAttributes, ReactNode, ChangeEventHandler } from "react";

export const aligns = cva("justify-self-auto", {
	variants: {
		align: {
			start: "justify-self-start",
			center: "justify-self-center",
			end: "justify-self-end",
		},
	},
	defaultVariants: { align: "center" },
});
export const variants = cva(" text-sm ", {
	variants: {
		variant: {
			default:
				"w-full text-white dark:text-white bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
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
		outline: {},
		align: {
			default: "justify-self-auto",
			start: "justify-self-start",
			center: "justify-self-center",
			end: "justify-self-end",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
		rounded: "none",
		align: "default",
	},
});
export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof variants> {
	aligns?: VariantProps<typeof aligns>;
}

interface OptionProps {
	label: string;
	value: string;
	icon?: ReactNode;
	iconPosition?: "left" | "right";
	color: "green" | "red" | "blue" | "yellow" | "cyan" | "purple" | "gray" | "white";
}
export interface DropdownButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof variants> {
	options: OptionProps[];
	aligns?: VariantProps<typeof aligns>;
	onChange(event: ChangeEventHandler<HTMLInputElement>): void;
}
export interface FileButtonProps extends DropdownButtonProps {
	useFilename?: boolean;
	fileType?: string;
	currentFile?: File | null;
	onChange?(files: File | null): void;
	customSaveFile?(filename: string): void;
}
