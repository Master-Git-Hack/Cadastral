/** @format */

"use client";
import { useEffect, useRef } from "react";
import { Success } from "@components/ui/alert";
import User from "@components/navbar/user";
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
		<div className="flex flex-col items-center justify-center h-screen bg-gray-900 bg-opacity-20 rounded drop-shadow-lg">
			<div className="flex items-center space-x-4">
				<h1 className="text-3xl font-bold text-white">Bienvenido al sistema</h1>
				<User />
			</div>
		</div>
	);
}
