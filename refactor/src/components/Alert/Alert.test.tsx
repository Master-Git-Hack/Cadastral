/** @format */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Success } from "./Alert.stories";
test("render ", () => {
	const Text = "Success Text fot testing";
	render(<Success>{Text}</Success>);
	expect(screen.getByRole("div")).toHaveTextContent(Text);
});
/*
import React from "react";

import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

test("renders learn react link", () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>,
	);

	expect(getByText(/learn/i)).toBeInTheDocument();
});*/
// storybook.test.js
