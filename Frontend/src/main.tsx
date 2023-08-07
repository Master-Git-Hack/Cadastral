/** @format */

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@redux/index";
import router from "@pages/index";
import "@assets/globals.css";
const root = createRoot(document.getElementById("root")! as HTMLElement);
root.render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
