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
import MetadatosViewer from "@features/Metadatos/viewer";
import Comparables from "./Comparables";
import Cedula from "@features/Comparables/cedula_mercado";
import CreateCedula from "@features/Comparables/create";
import ComparableViewer from "@features/Comparables/viewer";
import AvaluosCatastrales from "./AvaluosCatastrales";
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
		path: "metadatos/*",
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
			{
				path: "view/:uid",
				element: <MetadatosViewer />,
			},
		],
	},
	{
		path: "revision-avaluos/*",
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
		path: "comparables",
		element: <Comparables />,
		children: [
			{
				path: "cedulas/:cedula_mercado",
				element: <Cedula />,
				children: [
					{
						path: "crear",
						element: <CreateCedula />,
					},
					{
						path: "view",
						element: <ComparableViewer />,
					},
				],
			},
		],
	},
	{
		path: "avaluos-catastrales/",
		element: <AvaluosCatastrales />,
	},
	{
		path: "homologacion",
		element: <></>,
	},
	{
		path: "obras-complementarias/*",
		element: <></>,
	},
	{
		path: "modules/*",
		children: [
			{
				path: "comparables/:username",
				element: <Comparables useLayout={false} />,
				children: [
					{
						path: "cedulas/:cedula_mercado",
						element: <Cedula />,
						children: [
							{
								path: "comparables",
								element: <Comparables />,
								children: [
									{
										path: "cedulas/:cedula_mercado",
										element: <Cedula />,
										children: [
											{
												path: "crear",
												element: <CreateCedula />,
											},
											{
												path: "view",
												element: <ComparableViewer />,
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
	{
		path: "*",
		element: <ErrorPage />,
	},
]);

export default RouterPages;
