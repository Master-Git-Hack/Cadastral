import { HTMLAttributes } from 'react'
import { cva, type VariantProps } from "class-variance-authority";
export const bodyVariants = cva("[&_tr:last-child]:border-0",{
    variants: {
        variant: {
            default: "",
            primary: "",
            warning: "",
            danger: "",
            success: "",
            info: "",
            light: "",
            dark: "",

        },
        size: {
            default: "",
            sm: "",
            lg: "",

        },
},
defaultVariants: {
    variant: "default",
    size: "default",
},
})
export interface BodyProps extends HTMLAttributes<HTMLTableSectionElement>,VariantProps<typeof bodyVariants> {}
export const captionVariants = cva("mt-4 text-sm text-zinc-500 dark:text-zinc-400",{
    variants: {
        variant: {
            default: "",
            primary: "",
            warning: "",
            danger: "",
            success: "",
            info: "",
            light: "",
            dark: "",

        },
        size: {
            default: "",
            sm: "",
            lg: "",

        },
},
defaultVariants: {
    variant: "default",
    size: "default",
},
})
export interface CaptionProps extends HTMLAttributes<HTMLTableCaptionElement>, VariantProps<typeof captionVariants> { }
export const cellVariants = cva("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",{
    variants: {
        variant: {
            default: "",
            primary: "",
            warning: "",
            danger: "",
            success: "",
            info: "",
            light: "",
            dark: "",

        },
        size: {
            default: "",
            sm: "",
            lg: "",

        },
},
defaultVariants: {
    variant: "default",
    size: "default",
},
})
export interface CellProps extends HTMLAttributes<HTMLTableCellElement>, VariantProps<typeof cellVariants> { }
export const footerVariants = cva("bg-zinc-900 font-medium text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",{
    variants: {
        variant: {
            default: "",
            primary: "",
            warning: "",
            danger: "",
            success: "",
            info: "",
            light: "",
            dark: "",

        },
        size: {
            default: "",
            sm: "",
            lg: "",

        },
},
defaultVariants: {
    variant: "default",
    size: "default",
},
})
export interface FooterProps extends HTMLAttributes<HTMLTableSectionElement>, VariantProps<typeof footerVariants> { }
export const headVariants = cva("",{
    variants: {
        variant: {
            default: "",
            primary: "",
            warning: "",
            danger: "",
            success: "",
            info: "",
            light: "",
            dark: "",

        },
        size: {
            default: "",
            sm: "",
            lg: "",

        },
},
defaultVariants: {
    variant: "default",
    size: "default",
},
})
export interface HeadProps extends HTMLAttributes<HTMLTableSectionElement>, VariantProps<typeof headVariants> { }
export const headerVariants = cva("h-10 px-2 text-left align-middle font-medium text-zinc-500 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] dark:text-zinc-400",{
    variants: {
        variant: {
            default: "",
            primary: "",
            warning: "",
            danger: "",
            success: "",
            info: "",
            light: "",
            dark: "",

        },
        size: {
            default: "px-6 py-3",
            sm: "",
            lg: "",

        },
},
defaultVariants: {
    variant: "default",
    size: "default",
},
})
export interface HeaderProps extends HTMLAttributes<HTMLTableSectionElement>, VariantProps<typeof headerVariants> { }
export const rowVariants = cva("text-xs uppercase ",{
    variants: {
        variant: {
            default: "text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
            primary: " text-white bg-zinc-500 dark:bg-zinc-400 dark:text-zinc-50",
            warning: " text-white bg-yellow-500 dark:bg-yellow-400 dark:text-yellow-50",
            danger: " text-white bg-red-500 dark:bg-red-400 dark:text-red-50",
            success: " text-white bg-green-500 dark:bg-green-400 dark:text-green-50",
            info: " text-white bg-blue-500 dark:bg-blue-400 dark:text-blue-50",
            light: " text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
            dark: " text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400",

        },
        
},
defaultVariants: {
    variant: "default",
    
},
})
export interface RowProps extends HTMLAttributes<HTMLTableRowElement>, VariantProps<typeof rowVariants> { }

export const tableVariants = cva("w-full",{
    variants: {
        variant: {
            default: "bg-white dark:bg-gray-800 dark:border-gray-700",
            primary: " bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800",
            warning: " bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-800",
            danger: " bg-red-50 dark:bg-red-900 dark:border-red-800",
            success: " bg-green-50 dark:bg-green-900 dark:border-green-800",
            info: " bg-blue-50 dark:bg-blue-900 dark:border-blue-800",
            light: "    bg-white dark:bg-gray-800 dark:border-gray-700",
            dark: " bg-gray-50 dark:bg-gray-900 dark:border-gray-800",

        },
        size: {
            default: " text-sm",
            sm: " text-sm",
            lg: " text-lg",

        },
        
},
defaultVariants: {
    variant: "default",
    size: "default",
},
})
export interface TableProps extends HTMLAttributes<HTMLTableElement>, VariantProps<typeof tableVariants> { }
