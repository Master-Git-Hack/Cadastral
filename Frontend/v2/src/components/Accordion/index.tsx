/** @format */

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { Root, Item, Trigger, Header, Content } from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@lib/utils/ui";

const Accordion = Root;

const AccordionItem = forwardRef<ElementRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
	({ className, ...props }, ref) => (
		<Item ref={ref} className={cn("border-b", className)} {...props} />
	),
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
	ElementRef<typeof Trigger>,
	ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
	<Header className="flex">
		<Trigger
			ref={ref}
			className={cn(
				"flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronDownIcon className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 dark:text-zinc-400" />
		</Trigger>
	</Header>
));
AccordionTrigger.displayName = Trigger.displayName;

const AccordionContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
	<Content
		ref={ref}
		className={cn(
			"overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
			className,
		)}
		{...props}
	>
		<div className="pb-4 pt-0">{children}</div>
	</Content>
));
AccordionContent.displayName = Content.displayName;

export default {
	Accordion: {
		Component: Accordion,
		Item: AccordionItem,
		Trigger: AccordionTrigger,
		Content: AccordionContent,
	},
	Component: Accordion,
	Item: AccordionItem,
	Trigger: AccordionTrigger,
	Content: AccordionContent,
};
