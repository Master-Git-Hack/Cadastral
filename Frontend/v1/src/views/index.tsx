/** @format */

import { Routes, Route } from "react-router-dom";
import { getURLParams } from "../utils/url";
import { Navbar } from "../components/Navbar";
import ErrorPage from "./Error";
import Homologacion from "./Justipreciacion/Homologacion";
import ObrasComplementarias from "./Justipreciacion/ObrasComplementarias";
import CostosConstruccion from "./Justipreciacion/CostosConstruccion";
import Catastral from "./Catastral";
import Comparables from "./Comparables";
export const IndexPage = () => (
	<div className="container container-fluid text-center px-5 my-3">
		<h1>Bienvenido</h1>
		<p>
			El siguiente sistema es para uso de la Secretaría de Finanazas, Inversión y
			Administración del Municipio de Guanajuato.
		</p>
	</div>
);
export const WithNavigation = () => (
	<Navbar>
		<Routes>
			<Route path="/" element={<IndexPage />} />
			<Route path="/reportes-catastrales" element={<Catastral />} />
			{/*
			<Route path="/Docs/Frontend" element={<Docs />} />
			<Route path="/Docs/Backend" element={<SwaggerUI url={`${baseURL}/swagger.json`} />} />
			*/}
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	</Navbar>
);

export const SinglePages = () => (
	<Routes>
		<Route path="/homologaciones/" element={<Homologacion />} />
		<Route path="/homologaciones/OC" element={<ObrasComplementarias />} />
		<Route path="/homologaciones/CC" element={<CostosConstruccion />} />
		<Route path="/comparables" element={<Comparables />} />
		<Route path="*" element={<ErrorPage />} />
	</Routes>
);

const params = getURLParams("key");

export const Pages = () => (params !== undefined ? <SinglePages /> : <WithNavigation />);
