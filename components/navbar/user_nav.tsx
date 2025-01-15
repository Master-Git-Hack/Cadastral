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
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import useUser from "@/store/user/index.ts";
export default function User() {
	const { nombre, usuario, iniciales, signOut } = useUser((state) => state);
	const { theme, setTheme } = useTheme();
	const [isDark, setIsDark] = useState(theme === "dark");
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-12 w-12">
						<AvatarImage
							src="/assets/rounds.png"
							className="p-2 rounded-full"
							alt="gto"
						/>
						<AvatarFallback className="font-mono uppercase align-middle">
							{iniciales}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-58" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{nombre}</p>
						<p className="text-xs leading-none text-muted-foreground">{usuario}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="flex justify-between hover:white:bg-gray-400"
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
				<DropdownMenuItem
					className="bg-red-600  text-black hover:text-red-600 hover:font-bold  dark:text-white  hover:opacity-100 text-right focus:text-red-600 focus:font-bold hover:border focus:border hover:border-red-600 focus:border-red-600 rounded-md "
					onClick={() => signOut() && setTimeout(() => router.push("/sign-in"), 1500)}
				>
					Cerrar Sesión
					{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
