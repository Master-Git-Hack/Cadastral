/** @format */
"use client";
import { useState, useEffect } from "react";
import { Label } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@redux/provider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useSignInMutation } from "@redux-api/Auth";
import Spinner from "@components/Spinner";
import { useNavigate } from "react-router-dom";

import { getUser, setUser } from "@reducers/User";
import logo200 from "@assets/logo_sfia_200.png";

import { Image } from "primereact/image";

export default function Login() {
	const [signIn, { isLoading, data, isSuccess }] = useSignInMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { token } = useAppSelector(getUser);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const handleChange = ({ target: { name, value } }) =>
		setFormData({ ...formData, [name]: value });
	const handleSubmit = (event) => {
		event.preventDefault();
		signIn(formData);
	};
	useEffect(() => {
		if (token === null && isSuccess) {
			dispatch(setUser());
			void navigate("/");
		}
		if (token) {
			void navigate("/");
		}
	}, [token, isSuccess]);
	if (isLoading) return <Spinner size={20} />;
	return (
		<main className="flex items-center justify-center h-screen bg-gray-900  bg-opacity-20    rounded drop-shadow-lg ">
			<div className="bg-login z-50 absolute blur-sm border-8 rounded-3xl border-white" />
			<div className="z-50 bg-white p-8 rounded-2xl shadow-2xl shadow-black text-center opacity-90">
				<Image
					src={logo200}
					className="text-center w-96 "
					alt="Logo 200 años"
					width="350"
				/>
				<h1 className="text-4xl font-semibold mb-4">Bienvenido</h1>
				<form className="flex flex-col gap-4">
					<div>
						<div className="mb-2 block ">
							<Label
								htmlFor="username"
								className="text-gray-600 mb-4"
								value="Usuario"
							/>
							<InputText
								id="username"
								name="username"
								type="text"
								className="rounded-full border-gray-300 w-full  "
								placeholder="Ingrese su nombre de usuario"
								value={formData.username}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div>
						<div className="mb-2 block text-center">
							<Label
								htmlFor="password"
								className="text-gray-600 mb-4"
								value="Contraseña"
							/>
							<Password
								inputId="password"
								name="password"
								toggleMask
								feedback={false}
								className="w-full"
								inputClassName="rounded-full w-full border-gray-300 self-center"
								placeholder="Ingrese su contraseña"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div>
						<div className="mb-2 block text-center">
							<Button
								label="Iniciar Sesión"
								icon="pi pi-user"
								className="rounded-full"
								severity="info"
								onClick={handleSubmit}
								loading={isLoading}
							/>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
}
