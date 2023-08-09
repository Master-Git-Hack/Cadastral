/** @format */

import * as React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@utils/ui";
import logo from "@assets/logo.png";

import { Navbar as Component, DarkThemeToggle } from "flowbite-react";
const links = [
	{
		label: "Reportes Catastrales",
		href: "/reportes-catastrales",
	},
	{
		label: "Metadatos",
		href: "/metadatos",
	},
];
export default function Navbar() {
	return (
		<Component fluid className="bg-navbar">
			<Component.Brand href="/">
				<img
					src={logo}
					alt="Gobierno de Guanajuato"
					width="250"
					height="90"
					className="mr-3 h-7 sm:h-20 "
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					Catastro
				</span>
			</Component.Brand>

			<Component.Toggle className="rounded-full" />
			<Component.Collapse>
				<div className="flex items-center md:order-2 mx-auto">
					{links.map(({ label, href }, index) => (
						<span className="flex-2 mx-2" key={`${label} - ${index}`}>
							<Component.Link>
								<NavLink to={href}>{label}</NavLink>
							</Component.Link>
						</span>
					))}

					<DarkThemeToggle className="mx-2 rounded-full" />
				</div>
			</Component.Collapse>
		</Component>
	);
}

// const ListItem = React.forwardRef<
// 	React.ElementRef<typeof NavLink>,
// 	React.ComponentPropsWithoutRef<typeof NavLink>
// >(({ className, title, children, href }, ref) => {
// 	return (
// 		<li>
// 			<Link asChild>
// 				<NavLink
// 					ref={ref}
// 					to={href}
// 					className={cn(
// 						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
// 						className
// 					)}
// 				>
// 					<div className='text-sm font-medium leading-none'>{title}</div>
// 					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
// 				</NavLink>
// 			</Link>
// 		</li>
// 	);
// });
// ListItem.displayName = 'ListItem';
