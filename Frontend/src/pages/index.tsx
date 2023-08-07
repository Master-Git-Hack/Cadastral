/** @format */
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Error";
import Home from "./Home";
const RouterPages = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <ErrorPage />,
	},
]);
export default RouterPages;
