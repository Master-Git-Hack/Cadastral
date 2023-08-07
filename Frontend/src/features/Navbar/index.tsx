/** @format */

import * as React from "react";
import { NavLink } from "react-router-dom";
import { BellIcon, SlashIcon } from "@radix-ui/react-icons";
import { cn } from "@utils/ui";
import logo from "@assets/logo.png";
import Navigation from "@components/Menu/Navigation";
import Dropdown from "@components/Menu/Dropdown";
const { Component, Content, Item, Link, List, Trigger } = Navigation;

const docs: { title: string; href: string; description: string }[] = [
	{
		title: "Frontend",
		href: "/docs/Frontend",
		description: "...",
	},
	{
		title: "Backend",
		href: "/docs/Backend",
		description: "...",
	},
];

export default function Navbar() {
	console.log();
	return (
		<Component className="grid grid-flow-row-dense grid-cols-2 grid-rows-1 bg-navbar container mx-auto w-screen ">
			<img
				src={logo}
				alt="Gobierno de Guanajuato"
				width="250"
				height="90"
				className="object-fill w-1/3  my-2 grow-0 "
			/>

			<List className="w-auto grow ">
				<Item>
					<NavLink to="/reportes-catastrales">
						<Link
							className={
								Trigger.Style() + " bg-navbar hover:bg-transparent hover:text-white"
							}
						>
							Reportes Catastrales
						</Link>
					</NavLink>
				</Item>
				<Item>
					<Trigger.Component className="bg-navbar hover:bg-transparent focus:bg-transparent hover:text-white ">
						Documentación
					</Trigger.Component>
					<Content className>
						{/* <ul className='grid w-[100px] gap-2 p-4 md:w-[200px] md:grid-cols-1 lg:w-[300px] '>
							{docs.map(({ title, href, description }) => (
								<ListItem key={title} title={title} href={href}>
									{description}
								</ListItem>
							))}
						</ul> */}
					</Content>
				</Item>
				<Item>
					<Trigger.Component className="bg-navbar hover:bg-transparent focus:bg-transparent hover:text-white">
						<BellIcon />
						<Content>
							{/* <ul className='grid w-[100px] gap-2 p-4 md:w-[200px] md:grid-cols-1 lg:w-[300px] '>
								{docs.map(({ title, href, description }) => (
									<ListItem key={title} title={title} href={href}>
										{description}
									</ListItem>
								))}
							</ul> */}
						</Content>
					</Trigger.Component>
				</Item>
			</List>
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
