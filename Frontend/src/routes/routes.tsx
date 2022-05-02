/** @format */
import { getParams } from "../utils/utils";
import { FC, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { NavigationBar } from "../components/navigation/navbar";
import Index from "../views/Index";
import ErrorPage from "../views/ErrorPage";
import Homologation from "../views/Homologation";
import SupplementaryWorks from "../views/Homologation/SupplementaryWorks";
import HandleReports from "../views/HandleReports";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
const baseURL = process.env.REACT_APP_API_URL;

export const WithNavigation: FC = () => (
	<Fragment>
		<NavigationBar />
		<Routes>
			<Route path="/" element={<Index />} />
			<Route path="/Reportes" element={<HandleReports />} />
			<Route path="/Docs/Frontend" element={<>En construccion</>} />
			{/*<Route path="/Docs/Backend" element={<SwaggerUI url={`${baseURL}/swagger.json`} />} />*/}
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
const params = getParams("key");
export const RenderRoutes: FC = () => (params !== "" ? <SinglePages /> : <WithNavigation />);
