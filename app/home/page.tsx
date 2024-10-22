/** @format */

"use client";
import { useEffect, useRef } from "react";
import { Success } from "@components/ui/alert";
import Layout from "@/components/navbar/index";
import { routes } from "@components/navbar/main_nav";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@components/ui/card";
import Link from "next/link";
export default function Page() {
	const firstRender = useRef(true);
	useEffect(() => {
		if (firstRender.current) {
			Success({ title: "Inicio de sesión exitoso", text: "Bienvenido al sistema" });
			//     .then(
			//     ({ isConfirmed, isDenied, isDismissed, value }) => isConfirmed && ,
			// );
			firstRender.current = false;
		}
	}, []);

	return (
		<Layout>
			<div className="flex flex-wrap justify-center gap-4 m-4 ">
				{routes.map(({ label, href, avatar }) => (
					<Card
						key={label}
						className="border border-gray-400 rounded-lg w-48 h-64 bg-gray-300 dark:bg-gray-800"
					>
						<CardHeader>
							<CardTitle className="flex flex-row w-full justify-center items-center mx-auto px-4 bg-teal-600 rounded-lg h-20 text-center">
								<span className="text-2xl text-white">{avatar}</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="h-1/3">
							<h5 className=" text-xl font-medium text-gray-900 dark:text-white text-center ">
								{label}
							</h5>
						</CardContent>
						<CardFooter>
							<Link
								href={href}
								className="flex-2 mx-2 grow text-teal-500 hover:text-black dark:text-teal-400 dark:hover:text-white hover:underline"
							>
								Ir a
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</Layout>
	);
}
