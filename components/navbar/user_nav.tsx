/** @format */
"use client";
import { useState, useEffect } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Input,
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownSection,
	Avatar,
  } from "@heroui/react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import useUser from "@/store/user/index";
export default function User() {
	const { nombre, usuario, iniciales, isExpired, signOut } = useUser(
		(state) => state,
	);
	const { theme, setTheme } = useTheme();
	const [isDark, setIsDark] = useState(theme === "dark");
	const router = useRouter();
	useEffect(() => {
		if (isExpired()) {
			signOut();
			alert("Sesión Expirada");
			router.push("/sign-in");
			if (typeof window !== 'undefined') window.location.href = '/sign-in';
			
		}
	}, [isExpired,signOut]);

	return (
		<Dropdown placement="bottom-end" backdrop="opaque">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform font-mono uppercase align-middle pt-4 px-4 text-xs cursor-pointer"
              color="secondary"
              name={iniciales}
              size="sm"
			 
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" classNames={{list:"rounded-lg bg-white dark:bg-gray-800 border mx-5 px-5 text-start"}} >
            <DropdownItem key="profile" className="h-14 gap-2 cursor-text" >
              <p className="font-semibold">{nombre}</p>
              <p className="text-xs leading-none text-muted-foreground">@{usuario}</p>
            </DropdownItem>
            <DropdownItem key="settings" 
			className="hover:text-gray-900 hover:bg-gray-300 text-gray-800  rounded-lg dark:text-white dark:hover:text-gray-400 dark:hover:bg-gray-600"
			startContent={<span key="light-dark-icon" className="animate-pulse hover:motion-safe:animate-spin size-[1.2rem] me-2">
				{isDark ? (
					<MoonIcon className="size-[1.2rem]" />
			   ) : (
					<SunIcon className="size-[1.2rem]" />
				)}
			</span>} 
			>
				<div className="flex justify-between hover:white:bg-gray-400 " key="light-dark-button"
				onClick={() => {
					const theme = isDark ? "light" : "dark";
					setTheme(theme);
					setIsDark(theme === "dark");
				}}
				>
			{isDark ? "Deshabilitar " : "Habilitar "} Tema Oscuro</div>
			</DropdownItem>
           
			 <DropdownSection showDivider>
					<DropdownItem key="logout" className="hover:text-red-600 hover:bg-red-400 text-red-300  rounded-lg "startContent={<span className="animate-pulse pi pi-sign-out me-2"/>} onPress={()=>{
				signOut();
				router.push("/sign-in");
				if (typeof window !== 'undefined') window.location.href = '/sign-in';
			 }}>
					Cerrar Sesión
					</DropdownItem>
				
			</DropdownSection>
            </DropdownMenu>
        </Dropdown>
	);
}
//<DropdownMenu>
		// 	<DropdownMenuTrigger asChild>
		// 		<Button variant="ghost" className="relative h-8 w-8 rounded-full">
		// 			<Avatar className="h-12 w-12">
		// 				<AvatarImage
		// 					src="/assets/rounds.png"
		// 					className="p-2 rounded-full"
		// 					alt="gto"
		// 				/>
		// 				<AvatarFallback className="font-mono uppercase align-middle">
		// 					{iniciales}
		// 				</AvatarFallback>
		// 			</Avatar>
		// 		</Button>
		// 	</DropdownMenuTrigger>
		// 	<DropdownMenuContent className="w-58" align="end" forceMount>
		// 		<DropdownMenuLabel className="font-normal">
		// 			<div className="flex flex-col space-y-1">
		// 				<p className="text-sm font-medium leading-none">{nombre}</p>
		// 				<p className="text-xs leading-none text-muted-foreground">
		// 					{usuario}
		// 				</p>
		// 			</div>
		// 		</DropdownMenuLabel>
		// 		<DropdownMenuSeparator />
		// 		<DropdownMenuGroup>
		// 			<DropdownMenuItem
		// 				className="flex justify-between hover:white:bg-gray-400"
		// 				onClick={() => {
		// 					const theme = isDark ? "light" : "dark";
		// 					setTheme(theme);
		// 					setIsDark(theme === "dark");
		// 				}}
		// 			>
		// 				<p>{isDark ? "Deshabilitar " : "Habilitar "} Tema Oscuro</p>
		// 				<p>
		// 					{isDark ? (
		// 						<MoonIcon className="h-[1.2rem] w-[1.2rem] " />
		// 					) : (
		// 						<SunIcon className="h-[1.2rem] w-[1.2rem] " />
		// 					)}
		// 				</p>
		// 			</DropdownMenuItem>
		// 		</DropdownMenuGroup>
		// 		<DropdownMenuSeparator />
		// 		<DropdownMenuItem
		// 			className="bg-red-600  text-black hover:text-red-600 hover:font-bold  dark:text-white  hover:opacity-100 text-right focus:text-red-600 focus:font-bold hover:border focus:border hover:border-red-600 focus:border-red-600 rounded-md "
		// 			onClick={() =>
		// 				signOut() && setTimeout(() => router.push("/sign-in"), 1500)
		// 			}
		// 		>
		// 			Cerrar Sesión
		// 			{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
		// 		</DropdownMenuItem>
		// 	</DropdownMenuContent>
		// </DropdownMenu>