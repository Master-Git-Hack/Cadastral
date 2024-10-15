/** @format */
"use client";
import { useState } from "react";
import Image from "next/image";
import useUser from "@/store/user/index";
import useStatusStore from "@/store/api.config";
import Spinner from "@components/ui/spinner";
import { Button } from "@components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import logo200 from "@assets/logo_sfia_200.png";
import { Success, Danger } from "@components/ui/alert";
import { useRouter } from "next/navigation";
const oauthSchema = z.object({
	username: z.string().min(2, {
		message:
			"Recuerde que su nombre de usuario es el mismo que el del sistema de avaluos y es obligatorio",
	}),
	password: z.string().min(2, {
		message:
			"Recuerde que su contraseña es la misma que la del sistema de avaluos y es obligatoria",
	}),
});

export default function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const { token, signIn } = useUser((state) => state);
	const { isLoading, isError, message } = useStatusStore((state) => state);
	const form = useForm<z.infer<typeof oauthSchema>>({
		resolver: zodResolver(oauthSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	function onSubmit(data: z.infer<typeof oauthSchema>) {
		if (!isLoading) {
			signIn(data);
		}
	}
	if (token) {
		router.push("/home");
	}
	if (isError) {
		await Danger({ title: "Error al iniciar sesión", text: message });
	}
	return (
		<main className="flex items-center justify-center h-screen bg-gray-900  bg-opacity-20 rounded drop-shadow-lg ">
			{isLoading && <Spinner />}
			<div className="bg-login z-50 absolute blur-sm border-8 rounded-3xl border-white" />
			<div className="z-50 bg-white p-8 rounded-2xl shadow-2xl shadow-black text-center opacity-90">
				<Image
					src={logo200}
					className="text-center w-96 self-center "
					alt="Logo 200 años"
					width="350"
				/>
				<h1 className="text-4xl font-semibold mb-4">Bienvenido</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-600 mb-4">Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Ingrese su nombre de usuario"
											className="rounded-full w-full border-gray-300 self-center"
											{...field}
										/>
									</FormControl>
									<FormDescription className="text-left">
										Usuario del Sistema de Avaluos
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-600 mb-4">Contraseña</FormLabel>
									<FormControl>
										<Input
											type={showPassword ? "text" : "password"} // Cambia el tipo según el estado
											placeholder="Ingrese su contraseña"
											{...field}
											className="rounded-full w-full border-gray-300 self-center pr-10"
										/>
									</FormControl>
									<FormDescription className="text-right">
										<Button
											variant="ghost"
											className="rounded-full"
											onClick={(e) => {
												e.preventDefault();
												setShowPassword(!showPassword);
											}}
										>
											{!showPassword ? "Mostrar " : "Ocultar "}Contraseña
										</Button>
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full rounded-full mt-2"
							variant="default"
							disabled={isLoading}
						>
							Iniciar Sesión
						</Button>
					</form>
				</Form>
			</div>
		</main>
	);
}
