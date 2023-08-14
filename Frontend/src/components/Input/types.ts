/** @format */

import { HTMLAttributes } from 'react'
import { cva, type VariantProps } from "class-variance-authority";

export const variants = cva("w-full rounded-lg",{
        variants: {
            variant: {
                default: "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500  text-gray-900 dark:text-white",
                primary: "bg-blue-100 border-blue-300 text-blue-900 focus:ring-blue-500 text-gray-900 dark:text-white",
                warning: " bg-yellow-100 border-yellow-300 text-yellow-900 focus:ring-yellow-500 text-gray-900 dark:text-white",
                danger: " bg-red-100 border-red-300 text-red-900 focus:ring-red-500 text-gray-900 dark:text-white",
                success: " bg-green-100 border-green-300 text-green-900 focus:ring-green-500 text-gray-900 dark:text-white",
                info: " bg-cyan-100 border-cyan-300 text-cyan-900 focus:ring-cyan-500 text-gray-900 dark:text-white",
                light: "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 dark:bg-gray-200 dark:border-gray-400 dark:text-gray-800 dark:focus:ring-blue-600  text-gray-900 dark:text-white",
                dark: "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:focus:ring-blue-600 text-white  dark:text-gray-100",

            },
            size: {
                default: "w-full p-2.5 text-sm h-5 w-4",
				sm: "w-full p-2 text-xs h-4 w-3",
				md: "w-full p-3 text-sm h-6 w-5",
                lg: "w-full p-4 text-base h-7 w-6",

		},
			
		
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
})
export interface InputProps extends HTMLAttributes<HTMLInputElement>,VariantProps<typeof variants> {

 }