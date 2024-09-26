/** @format */
"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import useUser from "@/store/user/index.ts";
export default function User() {
	const { user, username } = useUser();
	const { theme, setTheme } = useTheme();
	const [isDark, setIsDark] = useState(theme === "dark");
	console.log(user, username);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src="/avatars/01.png" alt="@shadcn" />
						<AvatarFallback>{username}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{username}</p>
						<p className="text-xs leading-none text-muted-foreground">{user}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="flex justify-between"
						onClick={() => {
							const theme = isDark ? "light" : "dark";
							setTheme(theme);
							setIsDark(theme === "dark");
						}}
					>
						<p>{isDark ? "Deshabilitar " : "Habilitar "} Tema Oscuro</p>
						<p>
							{isDark ? (
								<MoonIcon className="h-[1.2rem] w-[1.2rem] " />
							) : (
								<SunIcon className="h-[1.2rem] w-[1.2rem] " />
							)}
						</p>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="bg-red-500 opacity-75 text-dark hover:text-red-400 dark:text-white  hover:opacity-100 text-right">
					Cerrar Sesión
					{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
