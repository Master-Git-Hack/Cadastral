/** @format */

import { Routes, Route } from "react-router-dom";
import { getURLParams } from "../utils/url";
import { Navbar } from "../components/Navbar";
export const WithNavigation = () => (
	<Navbar>
		<Routes>
			{/*
			<Route path="/Docs/Frontend" element={<Docs />} />
			<Route path="/Docs/Backend" element={<SwaggerUI url={`${baseURL}/swagger.json`} />} />*/}
			<Route path="*" element={<></>} />
		</Routes>
	</Navbar>
);

export const SinglePages = () => <Routes></Routes>;

const params = getURLParams("key");
export const Pages = () => (params !== undefined ? <SinglePages /> : <WithNavigation />);
