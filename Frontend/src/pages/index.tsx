/** @format */
import { createBrowserRouter, useParams } from "react-router-dom";
import ErrorPage from "./Error";
import Home from "./Home";
import Metadata from "./Meta";
import EditMetadatos from "@features/Metadatos/edit.tsx";
const RouterPages = createBrowserRouter([
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
		],
	},
]);

export default RouterPages;
