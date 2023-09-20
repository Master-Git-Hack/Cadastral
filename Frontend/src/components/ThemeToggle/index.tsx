/** @format */
import { useState, useEffect } from "react";
import ls from "@utils/localstorage";
import { Button, ButtonProps } from "primereact/button";

export default function DarkToggle({ children, ...props }: ButtonProps) {
	const [icon, setIcon] = useState("pi-sun");
	const [theme, setTheme] = useState(ls.get("color-theme"));
	useEffect(() => {
		if (theme === "dark") {
			setIcon("pi-moon");
			document.documentElement.classList.add("dark");
		} else {
			setIcon("pi-sun");
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return (
		<Button
			label={
				children
					? children
					: `${theme === "light" ? "Habilitar" : "Deshabilitar"} Tema Oscuro`
			}
			icon={`me-2 pi ${icon} hover:animate-spin hidden fill-current items-end`}
			className="rounded-full w-full dark:text-white text-sm"
			text
			severity="secondary"
			size="small"
			onClick={() => {
				const currentTheme = theme === "dark" ? "light" : "dark";
				setTheme(currentTheme);
				ls.set("color-theme", currentTheme);
			}}
			{...props}
		/>
	);
}
