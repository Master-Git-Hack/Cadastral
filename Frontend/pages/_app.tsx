/** @format */

import { AppProps } from "next/app";
import "animate.css";
import { Provider } from "react-redux";
import { store } from "../src/redux";
import "../public/assets/css/globals.css";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
