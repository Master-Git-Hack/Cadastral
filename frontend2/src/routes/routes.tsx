/** @format */

import React from "react";
import { Routes, Route } from "react-router";
import { getURLParams } from "../utils/utils.url";
import Test from "../pages/Test";
import Navbar from "../modules/Navbar/Navbar";
const params = getURLParams("key");
const WithNavigation = () => (
	<Navbar>
		<Routes>
			<Route path="/test" element={<Test />} />
		</Routes>
	</Navbar>
);

const SinglePages = () => (
	<Routes>
		<Route path="/test" element={<Test />} />
	</Routes>
);
export const App = () => (params !== "" ? <SinglePages /> : <WithNavigation />);
