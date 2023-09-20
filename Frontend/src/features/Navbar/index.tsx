/** @format */

import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@utils/ui";
import logo from "@assets/logo.png";
import { useLocation } from "react-router-dom";
import { Navbar as Component, DarkThemeToggle } from "flowbite-react";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { useAppDispatch } from "@redux/provider";
import { logOut } from "@reducers/User";
import { useNavigate } from "react-router-dom";
import { Badge } from "primereact/badge";
import Notify from "../Notify";
import { getNotifications } from "@reducers/Notifications";
import { useAppSelector } from "@redux/provider";
import DarkToggle from "@components/ThemeToggle";
const links = [
	{
		label: "Reportes Catastrales",
		href: "/reportes-catastrales",
	},
	{
		label: "Homologación",
		href: "/homologacion",
	},
	{
		label: "Obras Complementarias",
		href: "/obras-complementarias",
	},
	{
		label: "Metadatos",
		href: "/metadatos",
	},
	{
		label: "Revisión de Avalúos",
		href: "/revision-avaluos",
	},
];
export default function Navbar({ group, name, username }) {
	const location = useLocation();
	const user = useRef(null);
	const notify = useRef(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { badge } = useAppSelector(getNotifications);
	return (
		<Component fluid className="bg-navbar">
			<Component.Brand href="/">
				<img
					src={logo}
					alt="Gobierno de Guanajuato"
					width="250"
					height="90"
					className="mr-3 h-10 sm:h-24 "
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white hover:text-teal-600">
					Catastro
				</span>
			</Component.Brand>

			<Component.Toggle className="rounded-full" />
			<Component.Collapse>
				<div className="flex flex-row flex-wrap items-center md:order-2  mx-auto">
					{links.map(({ label, href }, index) => (
						<span
							className={`flex-2 mx-2 grow ${
								href === location.pathname
									? "text-teal-500 dark:text-teal-400"
									: "text-black"
							}`}
							key={`${label} - ${index}`}
						>
							<NavLink to={href}>{label}</NavLink>
						</span>
					))}
					{badge > 0 && (
						<Avatar
							icon="pi pi-bell"
							size="large"
							shape="circle"
							className="cursor-pointer bg-transparent  hover:bg-gray-200 dark:hover:bg-gray-700 fill-current text-gray-600 dark:text-gray-300 mr-2 p-overlay-badge w-fit grow"
							onClick={(e) => {
								if (badge > 0) {
									notify.current.toggle(e);
								}
							}}
						>
							<Badge value={badge} />
						</Avatar>
					)}

					<Avatar
						icon="pi pi-user"
						size="large"
						shape="circle"
						className="cursor-pointer bg-transparent  hover:bg-gray-200 dark:hover:bg-gray-700 fill-current text-gray-600 dark:text-gray-300 w-fit grow hover:animate-pulse"
						onClick={(e) => user.current.toggle(e)}
					/>

					<OverlayPanel
						ref={user}
						dismissable
						pt={{
							root: {
								className: "bg-white dark:bg-gray-800 w-73",
							},
						}}
					>
						<ul
							tabIndex={0}
							className=" z-[1]  menu-sm dropdown-content bg-white rounded-box w-64 dark:bg-gray-800"
						>
							<li>
								<Button
									label={name}
									className="rounded-full w-full dark:text-white dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
									text
									size="small"
									disabled
								/>
							</li>
							<li>
								<DarkToggle />
							</li>
							<li>
								<Button
									label="Cerrar Sesión"
									icon="pi pi-sign-out"
									className="rounded-full w-full"
									text
									severity="danger"
									size="small"
									onClick={() => {
										dispatch(logOut());
										void navigate("/sign-in");
									}}
								/>
							</li>
						</ul>
					</OverlayPanel>
					<OverlayPanel
						ref={notify}
						dismissable
						pt={{
							root: {
								className: "bg-white dark:bg-gray-800 W-6/12",
							},
						}}
					>
						<Notify />
					</OverlayPanel>
				</div>
			</Component.Collapse>
		</Component>
	);
}
