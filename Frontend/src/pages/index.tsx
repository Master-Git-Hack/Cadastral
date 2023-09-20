/** @format */
import { createBrowserRouter, useParams } from "react-router-dom";
import ErrorPage from "./Error";
import Home from "./Home";
import Metadata from "./Meta";
import EditMetadatos from "@features/Metadatos/edit.tsx";
import CreateMetadatos from "@features/Metadatos/create.tsx";
import SignIn from "@features/Login";
import RevisionAvaluos from "./RevisionAvaluos";
import CreateRevisionAvaluos from "@features/RevisionAvaluos/create";
const RouterPages = createBrowserRouter([
	{
		path: "/sign-in",
		element: <SignIn />,
	},
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: "metadatos",
		element: <Metadata />,
		children: [
			{
				path: "edit/:uid",
				element: <EditMetadatos />,
			},
			{
				path: "crear/",
				element: <CreateMetadatos />,
			},
		],
	},
	{
		path: "revision-avaluos",
		element: <RevisionAvaluos />,
		children: [
			{
				path: "edit/:uid",
				element: <EditMetadatos />,
			},
			{
				path: ":type/nuevo-registro",
				element: <CreateRevisionAvaluos />,
			},
		],
	},
	{
		path: "reportes-catastrales",
		element: <></>,
	},
	{
		path: "homologacion",
		element: <></>,
	},
	{
		path: "obras-complementarias",
		element: <></>,
	},
	{
		path: "*",
		element: <ErrorPage />,
	},
]);

export default RouterPages;
