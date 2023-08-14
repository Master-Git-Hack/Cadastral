import { HTMLAttributes } from 'react'
import { cva, type VariantProps } from "class-variance-authority";
export const variants = cva("bg-gray-200 rounded-full peer peer-focus:ring-4 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute  after:bg-white after:border-gray-300 after:border after:rounded-full  after:transition-all dark:border-gray-600",{
        variants: {
            variant: {
                default: "peer-checked:bg-gray-600 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800",
                primary: "peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800  peer-checked:bg-blue-600",
                warning: "peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800  peer-checked:bg-yellow-600",
                danger: " peer-focus:ring-red-300 dark:peer-focus:ring-red-800   peer-checked:bg-red-600",
                success: "peer-focus:ring-green-300 dark:peer-focus:ring-green-800  peer-checked:bg-green-600",
                info: "peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800   peer-checked:bg-teal-600",
                light: "peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800  peer-checked:bg-gray-600",
                dark: "peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800  peer-checked:bg-gray-600",

            },
            size: {
                default: "w-11 h-6  after:top-[2px] after:left-[2px] after:h-5 after:w-5",
                sm: "w-9 h-5  after:top-[2px] after:left-[2px] after:h-4 after:w-4",
                lg: "w-14 h-7 after:top-0.5 after:left-[4px] after:h-6 after:w-6",

            },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
})
export interface ToggleProps extends HTMLAttributes<HTMLInputElement>,VariantProps<typeof variants> {

 }