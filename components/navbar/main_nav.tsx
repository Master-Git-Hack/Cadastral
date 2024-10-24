/** @format */

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@utils/index";
export const routes = [
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
export default function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	if (pathname === "/" || pathname === "/home") {
		return <></>;
	}
	return (
		<nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
			{routes.map(({ label, href }) => (
				<Link
					key={label}
					href={href}
					className={`text-sm font-medium transition-colors hover:text-primary ${pathname.includes(href) ? "text-primary" : "text-gray-500"}`}
				>
					{label}
				</Link>
			))}
		</nav>
	);
}
