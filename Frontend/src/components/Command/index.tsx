/** @format */

import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@lib/utils/ui";
import { Component as Dialog, Content as DialogContent } from "@components/Dialog";
const { Input, displayName, List, Empty, Group, Separator, Item } = CommandPrimitive;
const Command = forwardRef<
	ElementRef<typeof CommandPrimitive>,
	ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
	<CommandPrimitive
		ref={ref}
		className={cn(
			"flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50",
			className,
		)}
		{...props}
	/>
));
Command.displayName = displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
	return (
		<Dialog {...props}>
			<DialogContent className="overflow-hidden p-0">
				<Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-zinc-500 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 dark:[&_[cmdk-group-heading]]:text-zinc-400">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};

const CommandInput = forwardRef<ElementRef<typeof Input>, ComponentPropsWithoutRef<typeof Input>>(
	({ className, ...props }, ref) => (
		<div className="flex items-center border-b px-3" cmdk-input-wrapper="">
			<MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
			<Input
				ref={ref}
				className={cn(
					"flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400",
					className,
				)}
				{...props}
			/>
		</div>
	),
);

CommandInput.displayName = Input.displayName;

const CommandList = forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
	({ className, ...props }, ref) => (
		<List
			ref={ref}
			className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
			{...props}
		/>
	),
);

CommandList.displayName = List.displayName;

const CommandEmpty = forwardRef<ElementRef<typeof Empty>, ComponentPropsWithoutRef<typeof Empty>>(
	(props, ref) => <Empty ref={ref} className="py-6 text-center text-sm" {...props} />,
);

CommandEmpty.displayName = Empty.displayName;

const CommandGroup = forwardRef<ElementRef<typeof Group>, ComponentPropsWithoutRef<typeof Group>>(
	({ className, ...props }, ref) => (
		<Group
			ref={ref}
			className={cn(
				"overflow-hidden p-1 text-zinc-950 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-zinc-500 dark:text-zinc-50 dark:[&_[cmdk-group-heading]]:text-zinc-400",
				className,
			)}
			{...props}
		/>
	),
);

CommandGroup.displayName = Group.displayName;

const CommandSeparator = forwardRef<
	ElementRef<typeof Separator>,
	ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
	<Separator
		ref={ref}
		className={cn("-mx-1 h-px bg-zinc-200 dark:bg-zinc-800", className)}
		{...props}
	/>
));
CommandSeparator.displayName = Separator.displayName;

const CommandItem = forwardRef<ElementRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
	({ className, ...props }, ref) => (
		<Item
			ref={ref}
			className={cn(
				"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-zinc-100 aria-selected:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50",
				className,
			)}
			{...props}
		/>
	),
);

CommandItem.displayName = Item.displayName;

const CommandShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
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
CommandShortcut.displayName = "CommandShortcut";

export default {
	Command: {
		Component: Command,
		Dialog: CommandDialog,
		Input: CommandInput,
		List: CommandList,
		Empty: CommandEmpty,
		Group: CommandGroup,
		Item: CommandItem,
		Shortcut: CommandShortcut,
		Separator: CommandSeparator,
	},
	Component: Command,
	Dialog: CommandDialog,
	Input: CommandInput,
	List: CommandList,
	Empty: CommandEmpty,
	Group: CommandGroup,
	Item: CommandItem,
	Shortcut: CommandShortcut,
	Separator: CommandSeparator,
};