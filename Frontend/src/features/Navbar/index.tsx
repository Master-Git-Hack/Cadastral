/** @format */

import { useRef, useState } from "react";
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
import { DarkThemeToggle as DTToggle } from "flowbite-react";
import links from "@context/modules";

export default function Navbar({ group, name, username }) {
	const location = useLocation();
	const user = useRef(null);
	const notify = useRef(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { badge } = useAppSelector(getNotifications);
	const [dark, setDark] = useState(true);
	return (
		<Component fluid className="bg-navbar">
			<Component.Brand>
				<NavLink to="/" className="flex flex-row">
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
				</NavLink>
			</Component.Brand>

			<Component.Toggle className="rounded-full" />
			<Component.Collapse>
				<div className="flex flex-row flex-wrap w-full items-center md:order-2  mx-auto">
					{links.map(({ label, href }, index) => (
						<span
							className={`flex-2 mx-2 grow ${
								href === location.pathname
									? "text-teal-500 dark:text-teal-400 "
									: "text-black dark:text-white "
							} dark:hover:text-gray-400`}
							key={`${label} - ${index}`}
						>
							<NavLink to={href}>{label}</NavLink>
						</span>
					))}
					{dark && (
						<ul>
							<li>
								<DarkToggle children={" "} />
							</li>
						</ul>
					)}
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
						onHide={() => setDark(true)}
						onShow={() => setDark(false)}
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
