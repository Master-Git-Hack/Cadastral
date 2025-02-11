/** @format */

import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/globals.css";
import "rsuite/dist/rsuite.min.css";
import "./assets/css/bootstrap.min.css";
import "animate.css";
import { Pages } from "./views";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<Fragment>
		<Provider store={store}>
			<Router>
				<Pages />
			</Router>
		</Provider>
	</Fragment>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
