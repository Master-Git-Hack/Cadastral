/** @format */

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	NavbarItem,
} from "@heroui/react";
import { cn } from "@utils/index";
export interface Route {
	label: string;
	href: string;
	avatar: string;
	children?: Route[];
}

export const routes: Route[] = [
	{
		label: "Avaluos Catastrales",
		href: "/avaluos-catastrales",
		avatar: "AC",
	},
	{
		label: "Comparables",
		href: "/comparables",
		avatar: "Co",
	},
	{
		label: "Fotogrametría",
		href: "/fotogrametria",
		avatar: "Fo",
	},
	{
		label: "Homologación",
		href: "/homologacion",
		avatar: "Ho",
		// children:[{
		// 	label:"Terreno",
		// 	href:"/terreno",
		// 	avatar:"Te",
		// },{
		// 	label:"Renta",
		// 	href:"/renta",
		// 	avatar:"Re",
		// }]
	},
	{
		label: "Metadatos",
		href: "/metadatos",
		avatar: "Me",
	},
	{
		label: "Revisión Avaluos",
		href: "/revision-avaluos",
		avatar: "RA",
	},
];

interface TriggerProps {
	label: string;
	href: string;
	pathname: string;
	routes?: Route[];
}

export const Trigger = ({ label, href, pathname, routes }: TriggerProps) =>
	routes !== undefined ? (
		<Dropdown>
			<DropdownTrigger>
				<Button
					key={href}
					aria-current={pathname === href ? "page" : undefined}
					disableRipple
					className={cn(
						`bg-transparent border border-none hover:bg-transparent hover:cursor-pointer dark:bg-transparent text-gray-300 dark:text-gray-100 hover:text-white dark:hover:text-gray-400  ${pathname === href ? "underline" : ""}`,
					)}
					radius="lg"
				>
					{label}
					<span
						key={`${label}-chevron`}
						className="pi pi-chevron-down focus:pi-chevron-up hover:animate-pulse"
					/>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				classNames={{
					list: "rounded-lg bg-white dark:bg-gray-800 border mx-5 px-5 text-start",
				}}
				variant="bordered"
				aria-label={label}
				itemClasses={{ base: "gap-4" }}
			>
				{routes.map(({ label, ...route }: Route) => (
					<DropdownItem
						key={href}
						description={label}
						href={`${href}/${route.href}`}
						className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-gray-400"
					/>
				))}
			</DropdownMenu>
		</Dropdown>
	) : (
		<NavbarItem isActive={pathname === href}>
			<Link
				aria-current={pathname === href ? "page" : undefined}
				key={href}
				href={href}
				className={cn(
					`text-gray-300 dark:text-gray-100 hover:text-white dark:hover:text-gray-400 ${pathname === href ? "underline" : ""}`,
				)}
			>
				{label}
			</Link>
		</NavbarItem>
	);
