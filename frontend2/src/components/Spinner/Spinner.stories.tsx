/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Spinner } from "./Spinner";
import { Spinner as Component } from "react-bootstrap";

export default {
	title: "Components/Spinner",
	component: Spinner,
	subcomponents: { Component },
	argTypes: {
		animation: {
			text: "Spinner animation",
			type: { name: "string", required: false },
			defaultValue: "border",
		},
		type: {
			text: "Spinner type",
			type: { name: "string", required: false },
			defaultValue: "secondary",
		},
		className: {
			text: "Spinner className",
			type: { name: "string", required: false },
			defaultValue: "",
		},
		text: {
			text: "Spinner text",
			type: { name: "string", required: false },
			defaultValue: "",
		},
		size: {
			text: "Spinner size",
			type: { name: "string", required: false },
			defaultValue: "sm",
		},
	},
} as ComponentMeta<typeof Spinner>;
const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Example = Template.bind({});
Example.args = {
	animation: "border",
	type: "secondary",
	className: "",
	text: "",
	size: "sm",
};
