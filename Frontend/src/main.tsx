/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@redux/index";
import router from "@pages/index";
import { PrimeReactProvider } from "primereact/api";
import { Flowbite } from "flowbite-react";
import "@assets/globals.css";
//theme
import "primereact/resources/themes/tailwind-light/theme.css";
import "primeicons/primeicons.css";
//core
import "primereact/resources/primereact.min.css";

const root = createRoot(document.getElementById("root")! as HTMLElement);
root.render(
	<StrictMode>
		<Flowbite>
			<Provider store={store}>
				<PrimeReactProvider>
					<RouterProvider router={router} />
				</PrimeReactProvider>
			</Provider>
		</Flowbite>
	</StrictMode>,
);
