/** @format */

import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons";
import {
	Menu,
	Group,
	Portal,
	Sub,
	RadioGroup,
	Root,
	Trigger,
	SubTrigger,
	SubContent,
	Content,
	Item,
	CheckboxItem,
	RadioItem,
	Label,
	Separator,
	ItemIndicator,
} from "@radix-ui/react-menubar";

import { cn } from "@lib/utils/ui";

const MenubarMenu = Menu;

const MenubarGroup = Group;

const MenubarPortal = Portal;

const MenubarSub = Sub;

const MenubarRadioGroup = RadioGroup;

const Menubar = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
	({ className, ...props }, ref) => (
		<Root
			ref={ref}
			className={cn(
				"flex h-9 items-center space-x-1 rounded-md border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
				className,
			)}
			{...props}
		/>
	),
);
Menubar.displayName = Root.displayName;

const MenubarTrigger = forwardRef<
	ElementRef<typeof Trigger>,
	ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
	<Trigger
		ref={ref}
		className={cn(
			"flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-900 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-50",
			className,
		)}
		{...props}
	/>
));
MenubarTrigger.displayName = Trigger.displayName;

const MenubarSubTrigger = forwardRef<
	ElementRef<typeof SubTrigger>,
	ComponentPropsWithoutRef<typeof SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<SubTrigger
		ref={ref}
		className={cn(
			"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-900 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-50",
			inset && "pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRightIcon className="ml-auto h-4 w-4" />
	</SubTrigger>
));
MenubarSubTrigger.displayName = SubTrigger.displayName;

const MenubarSubContent = forwardRef<
	ElementRef<typeof SubContent>,
	ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => (
	<SubContent
		ref={ref}
		className={cn(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
			className,
		)}
		{...props}
	/>
));
MenubarSubContent.displayName = SubContent.displayName;

const MenubarContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
	<Portal>
		<Content
			ref={ref}
			align={align}
			alignOffset={alignOffset}
			sideOffset={sideOffset}
			className={cn(
				"z-50 min-w-[12rem] overflow-hidden rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
				className,
			)}
			{...props}
		/>
	</Portal>
));
MenubarContent.displayName = Content.displayName;

const MenubarItem = forwardRef<
	ElementRef<typeof Item>,
	ComponentPropsWithoutRef<typeof Item> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<Item
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));
MenubarItem.displayName = Item.displayName;

const MenubarCheckboxItem = forwardRef<
	ElementRef<typeof CheckboxItem>,
	ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<CheckboxItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<ItemIndicator>
				<CheckIcon className="h-4 w-4" />
			</ItemIndicator>
		</span>
		{children}
	</CheckboxItem>
));
MenubarCheckboxItem.displayName = CheckboxItem.displayName;

const MenubarRadioItem = forwardRef<
	ElementRef<typeof RadioItem>,
	ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
	<RadioItem
		ref={ref}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50",
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<ItemIndicator>
				<DotFilledIcon className="h-4 w-4 fill-current" />
			</ItemIndicator>
		</span>
		{children}
	</RadioItem>
));
MenubarRadioItem.displayName = RadioItem.displayName;

const MenubarLabel = forwardRef<
	ElementRef<typeof Label>,
	ComponentPropsWithoutRef<typeof Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<Label
		ref={ref}
		className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
		{...props}
	/>
));
MenubarLabel.displayName = Label.displayName;

const MenubarSeparator = forwardRef<
	ElementRef<typeof Separator>,
	ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
	<Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-zinc-100 dark:bg-zinc-800", className)}
		{...props}
	/>
));
MenubarSeparator.displayName = Separator.displayName;

const MenubarShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			className={cn(
				"ml-auto text-xs tracking-widest text-zinc-500 dark:text-zinc-400",
				className,
			)}
			{...props}
		/>
	);
};
MenubarShortcut.displayname = "MenubarShortcut";

export default {
	Bar: {
		Component: Menubar,
		Menu: MenubarMenu,
		Trigger: MenubarTrigger,
		Content: MenubarContent,
		Separator: MenubarSeparator,
		Label: MenubarLabel,
		Group: {
			Component: MenubarGroup,
			Radio: MenubarRadioGroup,
			Item: {
				Component: MenubarItem,
				Radio: MenubarRadioItem,
				Checkbox: MenubarCheckboxItem,
			},
			Separator: MenubarSeparator,
		},

		Portal: MenubarPortal,
		Sub: {
			Component: MenubarSub,
			Content: MenubarSubContent,
			Trigger: MenubarSubTrigger,
		},

		Shortcut: MenubarShortcut,
	},
	Component: Menubar,
	Menu: MenubarMenu,
	Trigger: MenubarTrigger,
	Content: MenubarContent,
	Label: MenubarLabel,
	Group: {
		Component: MenubarGroup,
		Radio: MenubarRadioGroup,
		Item: {
			Component: MenubarItem,
			Radio: MenubarRadioItem,
			Checkbox: MenubarCheckboxItem,
		},
		Separator: MenubarSeparator,
	},

	Portal: MenubarPortal,
	Sub: {
		Component: MenubarSub,
		Content: MenubarSubContent,
		Trigger: MenubarSubTrigger,
	},

	Shortcut: MenubarShortcut,
};
