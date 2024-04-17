/** @format */

import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from "react";
import {
	Root,
	Trigger,
	DialogPortalProps,
	Portal,
	Overlay,
	Content,
	Close,
	Title,
	Description,
} from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "@lib/utils/ui";

const Dialog = Root;

const DialogTrigger = Trigger;

const DialogPortal = ({ className, ...props }: DialogPortalProps) => (
	<Portal className={cn(className)} {...props} />
);
DialogPortal.displayName = Portal.displayName;

const DialogOverlay = forwardRef<
	ElementRef<typeof Overlay>,
	ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
	<Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-zinc-950/80",
			className,
		)}
		{...props}
	/>
));
DialogOverlay.displayName = Overlay.displayName;

const DialogContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
	<DialogPortal>
		<DialogOverlay />
		<Content
			ref={ref}
			className={cn(
				"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full dark:border-zinc-800 dark:bg-zinc-950",
				className,
			)}
			{...props}
		>
			{children}
			<Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:ring-offset-zinc-950 dark:focus:ring-zinc-800 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400">
				<Cross2Icon className="h-4 w-4" />
				<span className="sr-only">Close</span>
			</Close>
		</Content>
	</DialogPortal>
));
DialogContent.displayName = Content.displayName;

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
		{...props}
	/>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
		{...props}
	/>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<ElementRef<typeof Title>, ComponentPropsWithoutRef<typeof Title>>(
	({ className, ...props }, ref) => (
		<Title
			ref={ref}
			className={cn("text-lg font-semibold leading-none tracking-tight", className)}
			{...props}
		/>
	),
);
DialogTitle.displayName = Title.displayName;

const DialogDescription = forwardRef<
	ElementRef<typeof Description>,
	ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
	<Description
		ref={ref}
		className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
		{...props}
	/>
));
DialogDescription.displayName = Description.displayName;

export default {
	Dialog: {
		Component: Dialog,
		Trigger: DialogTrigger,
		Content: DialogContent,
		Header: DialogHeader,
		Footer: DialogFooter,
		Title: DialogTitle,
		Description: DialogDescription,
	},
	Component: Dialog,
	Trigger: DialogTrigger,
	Content: DialogContent,
	Header: DialogHeader,
	Footer: DialogFooter,
	Title: DialogTitle,
	Description: DialogDescription,
};
