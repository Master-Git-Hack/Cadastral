/** @format */

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@redux/index";
import router from "@pages/index";
import "@assets/globals.css";
import { Flowbite } from "flowbite-react";
const root = createRoot(document.getElementById("root")! as HTMLElement);
root.render(
	<StrictMode>
		<Provider store={store}>
			<Flowbite>
				<RouterProvider router={router} />
			</Flowbite>
		</Provider>
	</StrictMode>,
);
