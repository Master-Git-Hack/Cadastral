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
			ls.clean();
			void navigate("/sign-in");
		}
	}, [token]);
	useEffect(() => {
		if (idle) {
			ls.clean();
			void navigate("/sign-in");
		}
	}, [idle]);
	return (
		<main className="w-full h-screen bg-transparent dark:bg-black">
			<Navbar group={group} name={name} username={username} />
			<div className="container mx-auto px-1 sm:px-1 lg:px-1 py-auto py-2 sm:py-3 lg:py-4 h-max">
				{children}
			</div>
		</main>
	);
}
