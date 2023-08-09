/** @format */
import { createBrowserRouter, useParams } from "react-router-dom";
import ErrorPage from "./Error";
import Home from "./Home";
import Metadata from "./Meta";

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
				element: <Child />,
			},
		],
	},
]);

function Child() {
	// We can use the `useParams` hook here to access
	// the dynamic pieces of the URL.
	const { uid } = useParams();

	return (
		<div>
			<h3>ID: {uid}</h3>
		</div>
	);
}
export default RouterPages;
