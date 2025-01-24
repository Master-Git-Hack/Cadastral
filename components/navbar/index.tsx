/** @format */
"use client";
import TeamSwitcher from "./team_switcher";

import UserNav from "./user_nav";
import MainNav from "./main_nav";
import Image from "next/image";
import Link from "next/link";
import gtoLogo from "@assets/logo.png";
import { useStatusStore } from "@/store/api.config";
import Spinner from "@components/ui/spinner";
export default function NavBar({ children, container = false }) {
	const { isLoading, isError, isSuccess, message } = useStatusStore((state) => state);

	return (
		<div className="hidden flex-col md:flex ">
			<div className="border-black bg-navbar">
				<div className="flex h-16 items-center px-4">
					<TeamSwitcher />
					<Link href="/home" className="ms-4">
						<Image
							src={gtoLogo}
							width={150}
							className="bg-white rounded-full self-center pl-3 pb-1"
							alt="Logo Guanajuato"
						/>
					</Link>
					<MainNav className="mx-6" />
					<div className="ml-auto flex items-center space-x-4">
						<UserNav />
					</div>
				</div>
			</div>
			<div
				className={`flex-1 space-y-4 p-8 pt-6 ${container ? "m-1 rounded-lg border hover:m-0 hover:rounded-none hover:border-none dark:bg-gray-600 dark:border-white " : ""}`}
			>
				{isLoading && <Spinner />}
				<>{children}</>
			</div>
		</div>
	);
}
