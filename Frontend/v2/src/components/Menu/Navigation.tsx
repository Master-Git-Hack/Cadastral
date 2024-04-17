/** @format */

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
	Root,
	List,
	Item,
	Trigger,
	Content,
	Link,
	Viewport,
	Indicator,
} from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";

import { cn } from "@utils/ui";

const NavigationMenu = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
	({ className, children, ...props }, ref) => (
		<Root
			ref={ref}
			className={cn(
				"relative z-10 flex max-w-max flex-1 items-center justify-center",
				className,
			)}
			{...props}
		>
			{children}
			<NavigationMenuViewport />
		</Root>
	),
);
NavigationMenu.displayName = Root.displayName;

const NavigationMenuList = forwardRef<
	ElementRef<typeof List>,
	ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
	<List
		ref={ref}
		className={cn(
			"group flex flex-1 list-none items-center justify-center space-x-1",
			className,
		)}
		{...props}
	/>
));
NavigationMenuList.displayName = List.displayName;

const NavigationMenuItem = Item;

const navigationMenuTriggerStyle = cva(
	"group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:bg-zinc-100 focus:text-zinc-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-zinc-100/50 data-[state=open]:bg-zinc-100/50 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 dark:data-[active]:bg-zinc-800/50 dark:data-[state=open]:bg-zinc-800/50",
);

const NavigationMenuTrigger = forwardRef<
	ElementRef<typeof Trigger>,
	ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
	<Trigger ref={ref} className={cn(navigationMenuTriggerStyle(), "group", className)} {...props}>
		{children}
		{""}
		<ChevronDownIcon
			className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
			aria-hidden="true"
		/>
	</Trigger>
));
NavigationMenuTrigger.displayName = Trigger.displayName;

const NavigationMenuContent = forwardRef<
	ElementRef<typeof Content>,
	ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
	<Content
		ref={ref}
		className={cn(
			"left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
			className,
		)}
		{...props}
	/>
));
NavigationMenuContent.displayName = Content.displayName;

const NavigationMenuLink = Link;

const NavigationMenuViewport = forwardRef<
	ElementRef<typeof Viewport>,
	ComponentPropsWithoutRef<typeof Viewport>
>(({ className, ...props }, ref) => (
	<div className={cn("absolute left-0 top-full flex justify-center")}>
		<Viewport
			className={cn(
				"origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
				className,
			)}
			ref={ref}
			{...props}
		/>
	</div>
));
NavigationMenuViewport.displayName = Viewport.displayName;

const NavigationMenuIndicator = forwardRef<
	ElementRef<typeof Indicator>,
	ComponentPropsWithoutRef<typeof Indicator>
>(({ className, ...props }, ref) => (
	<Indicator
		ref={ref}
		className={cn(
			"top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
			className,
		)}
		{...props}
	>
		<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-zinc-200 shadow-md dark:bg-zinc-800" />
	</Indicator>
));
NavigationMenuIndicator.displayName = Indicator.displayName;

export default {
	Navigation: {
		Component: NavigationMenu,
		Trigger: {
			Component: NavigationMenuTrigger,
			Style: navigationMenuTriggerStyle,
		},
		List: NavigationMenuList,
		Item: NavigationMenuItem,
		Content: NavigationMenuContent,
		Link: NavigationMenuLink,
		Indicator: NavigationMenuIndicator,
		Viewport: NavigationMenuViewport,
	},
	Component: NavigationMenu,
	Trigger: {
		Component: NavigationMenuTrigger,
		Style: navigationMenuTriggerStyle,
	},
	List: NavigationMenuList,
	Item: NavigationMenuItem,
	Content: NavigationMenuContent,
	Link: NavigationMenuLink,
	Indicator: NavigationMenuIndicator,
	Viewport: NavigationMenuViewport,
};
