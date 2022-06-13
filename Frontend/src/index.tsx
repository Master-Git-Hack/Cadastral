/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import "./assets/css/bootstrap.min.css";
import "animate.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { RenderRoutes } from "./routes/routes";
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<RenderRoutes />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
