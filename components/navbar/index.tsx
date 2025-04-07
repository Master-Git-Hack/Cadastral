/** @format */
"use client";
import Spinner from "@/components/ui/spinner";
import { useStatusStore } from "@/store/api.config";
import gtoLogo from "@assets/logo.png";
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type Route, Trigger, routes } from "./main_nav";
import TeamSwitcher from "./team_switcher";
import UserNav from "./user_nav";
interface INavBar {
	children: React.ReactNode;
	container?: boolean;
}

export default function NavBar({ children, container = false }: INavBar) {
	const { isLoading } = useStatusStore((state) => state);
	const pathname = usePathname();

	return (
		<div className="hidden flex-col md:flex">
			<Navbar
				className="border-black bg-navbar"
				shouldHideOnScroll
				maxWidth="full"
			>
				{/* Left Content */}
				<NavbarContent className="hidden sm:flex gap-4" justify="start">
					<TeamSwitcher />
				</NavbarContent>

				{/* Logo */}
				<NavbarBrand className="ms-4 my-1">
					<Link href="/home">
						<Image
							src={gtoLogo}
							width={150}
							className="bg-white rounded-full self-center pl-3 pb-1"
							alt="Logo Guanajuato"
						/>
					</Link>
				</NavbarBrand>

				<NavbarContent justify="start">
					{!["/", "/home"].includes(pathname.replace(/\/+$/, "")) &&
						routes.map(({ label, href, children }: Route) => (
							<Trigger
								key={label}
								label={label}
								href={href}
								pathname={pathname}
								routes={children}
							/>
						))}
				</NavbarContent>

				{/* Right Content */}
				<NavbarContent justify="end">
					<UserNav />
				</NavbarContent>
			</Navbar>

			{/* Page Content */}
			<div
				className={`flex-1 space-y-4 p-8 pt-6 ${
					container
						? "m-1 rounded-lg border hover:m-0 hover:rounded-none hover:border-none dark:bg-gray-600 dark:border-white"
						: ""
				}`}
			>
				{isLoading && <Spinner />}
				{children}
			</div>
		</div>
	);
}
