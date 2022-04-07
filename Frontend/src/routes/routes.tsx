/** @format */

import { FC, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { NavigationBar } from "../components/navigation/navbar";
import Index from "../views/Index";
import ErrorPage from "../views/ErrorPage";
import Homologation from "../views/Homologation";
import SupplementaryWorks from "../views/Homologation/SupplementaryWorks";
import HandleReports from "../views/HandleReports";
export const WithNavigation: FC = () => (
	<Fragment>
		<NavigationBar />
		<Routes>
			<Route path="/" element={<Index />} />
			<Route path="/Reportes" element={<HandleReports />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	</Fragment>
);

export const SinglePages: FC = () => (
	<Routes>
		<Route path="/homologaciones/" element={<Homologation />} />
		<Route path="/homologaciones/OC" element={<SupplementaryWorks />} />
		<Route path="*" element={<ErrorPage />} />
	</Routes>
);
const params = new URLSearchParams(window.location.search).get("key");
export const RenderRoutes: FC = () =>
	params !== undefined && params !== null ? <SinglePages /> : <WithNavigation />;
