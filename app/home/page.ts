/** @format */

"use client";
import { useEffect, useRef } from "react";
import { Success } from "@components/ui/alert";
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
}
