/** @format */

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@lib/utils/ui";

export const Checkbox = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
	({ className, ...props }, ref) => (
		<Root
			ref={ref}
			className={cn(
				"peer h-4 w-4 shrink-0 rounded-sm border border-zinc-200 border-zinc-900 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50 dark:border-zinc-800 dark:border-zinc-50 dark:focus-visible:ring-zinc-800 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900",
				className,
			)}
			{...props}
		>
			<Indicator className={cn("flex items-center justify-center text-current")}>
				<CheckIcon className="h-4 w-4" />
			</Indicator>
		</Root>
	),
);
Checkbox.displayName = Root.displayName;

export default { Checkbox };
