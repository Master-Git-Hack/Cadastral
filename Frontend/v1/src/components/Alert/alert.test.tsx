/** @format */
import React from "react";
import { render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./alert.stories";
import { expect } from "@storybook/jest";
const { Success, Warning, Danger, Info } = composeStories(stories);

test("renders Success alert with default args", () => {
	render(<Success />);
	const alertElement = screen.getByText(/This is a success message/i);
	expect(alertElement).not.toBeNull();
});
