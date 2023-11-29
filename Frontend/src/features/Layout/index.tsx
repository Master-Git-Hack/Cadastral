/** @format */
import { useEffect, useState } from "react";
import { useAppSelector } from "@redux/provider";
import { getUser } from "@reducers/User";
import { useNavigate } from "react-router-dom";
import { idleTime } from "@utils/datetime";
import ls from "@utils/localstorage";
import Navbar from "../Navbar";

export default function Layout({ children, className }) {
	const navigate = useNavigate();
	const { token, group, name, username } = useAppSelector(getUser);
	const [lastRequest] = useState(ls.get("timestamp"));
	const [idle] = useState(idleTime(lastRequest));
	useEffect(() => {
		if (token === null) {
			ls.clear();
			void navigate("/sign-in");
		}
	}, [token]);
	useEffect(() => {
		if (idle) {
			ls.clear();
			void navigate("/sign-in");
		}
	}, [idle]);
	return (
		<main className="w-full min-h-screen bg-transparent dark:bg-black antialiased tracking-tight">
			<Navbar group={group} name={name} username={username} />
			<div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip m-1">
				{children}
			</div>
		</main>
	);
}
