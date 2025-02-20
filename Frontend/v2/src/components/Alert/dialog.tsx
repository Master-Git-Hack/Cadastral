/** @format */

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import {
	Root,
	Trigger,
	AlertDialogPortalProps,
	Portal,
	Overlay,
	Content,
	Title,
	Description,
	Action,
	Cancel,
} from "@radix-ui/react-alert-dialog";

import { cn } from "@lib/utils/ui";
import { Variants as buttonVariants } from "@components/Button";

const AlertDialog = Root;

const AlertDialogTrigger = Trigger;

const AlertDialogPortal = ({ className, ...props }: AlertDialogPortalProps) => (
	<Portal className={cn(className)} {...props} />
);
AlertDialogPortal.displayName = Portal.displayName;

const AlertDialogOverlay = forwardRef<
	ElementRef<typeof Overlay>,
	ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
	<Overlay
		className={cn(
			"fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-zinc-950/80",
			className,
		)}
		{...props}
		ref={ref}
	/>
));
AlertDialogOverlay.displayName = Overlay.displayName;

const AlertDialogContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<Content
			ref={ref}
			className={cn(
				"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full dark:border-zinc-800 dark:bg-zinc-950",
				className,
			)}
			{...props}
		/>
	</AlertDialogPortal>
));
AlertDialogContent.displayName = Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
		{...props}
	/>
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = forwardRef<
	ElementRef<typeof Title>,
	ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
	<Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
AlertDialogTitle.displayName = Title.displayName;

const AlertDialogDescription = forwardRef<
	ElementRef<typeof Description>,
	ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
	<Description
		ref={ref}
		className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
		{...props}
	/>
));
AlertDialogDescription.displayName = Description.displayName;

const AlertDialogAction = forwardRef<
	ElementRef<typeof Action>,
	ComponentPropsWithoutRef<typeof Action>
>(({ className, ...props }, ref) => (
	<Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = Action.displayName;

const AlertDialogCancel = forwardRef<
	ElementRef<typeof Cancel>,
	ComponentPropsWithoutRef<typeof Cancel>
>(({ className, ...props }, ref) => (
	<Cancel
		ref={ref}
		className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
		{...props}
	/>
));
AlertDialogCancel.displayName = Cancel.displayName;

export default {
	Dialog: {
		Component: AlertDialog,
		Trigger: AlertDialogTrigger,
		Content: AlertDialogContent,
		Header: AlertDialogHeader,
		Footer: AlertDialogFooter,
		Title: AlertDialogTitle,
		Description: AlertDialogDescription,
		Action: AlertDialogAction,
		Cancel: AlertDialogCancel,
	},
	Component: AlertDialog,
	Trigger: AlertDialogTrigger,
	Content: AlertDialogContent,
	Header: AlertDialogHeader,
	Footer: AlertDialogFooter,
	Title: AlertDialogTitle,
	Description: AlertDialogDescription,
	Action: AlertDialogAction,
	Cancel: AlertDialogCancel,
};
