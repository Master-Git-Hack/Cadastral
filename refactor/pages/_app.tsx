/** @format */

import "../public/assets/css/globals.css";
import "../public/assets/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "../src/storage/Storage";
import type { AppProps } from "next/app";
export default function Catastro({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
