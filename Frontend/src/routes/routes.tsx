/** @format */

import { FC, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { NavigationBar } from "../components/navigation/navbar";
import Homologation from "../views/Homologation";
import HandleReports from "../views/HandleReports";
export const WithNavigation: FC = () => (
	<Fragment>
		<NavigationBar />
		<Routes>
			<Route path="/Reportes" element={<HandleReports />} />
			<Route path="*" element={<h1>Error418</h1>} />
		</Routes>
	</Fragment>
);

export const SinglePages: FC = () => (
	<Routes>
		<Route path="/homologaciones/" element={<Homologation />} />
		<Route path="*" element={<h1>Error418</h1>} />
	</Routes>
);
const params = new URLSearchParams(window.location.search).get("key");
export const RenderRoutes: FC = () =>
	params !== undefined && params !== null ? <SinglePages /> : <WithNavigation />;
