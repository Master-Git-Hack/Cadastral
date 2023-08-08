/** @format */

import { forwardRef, ElementRef, reactNode } from "react";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@utils/ui";
import { cva, type VariantProps } from "class-variance-authority";

import { Checkbox as Component, CheckboxProps as CheckProps } from "primereact/checkbox";
const labelVariants = cva(
	"flex items-center justify-center pt-1 text-current  text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);
interface CheckboxProps extends CheckProps, VariantProps<typeof labelVariants> {
	children: string | reactNode | reactNode[];
}
export const Checkbox = forwardRef<ElementRef<typeof Component>, CheckboxProps>(
	({ className, children, ...props }, ref) => (
		<div className="flex items-center mb-4">
			<Component
				ref={ref}
				className={cn(
					"ms-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
					className,
				)}
				{...props}
			>
				<Indicator className={cn("flex items-center justify-center text-current")}>
					<CheckIcon className="h-4 w-4" />
				</Indicator>
			</Component>
			<label className={cn(labelVariants())}>{children}</label>
		</div>
	),
);
Checkbox.displayName = Root.displayName;

export default Checkbox;
