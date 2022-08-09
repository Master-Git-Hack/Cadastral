/** @format */

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Alert } from "./Alert";
import { Alert as Component } from "../../Alert/Alert";
export default {
	title: "Components/Error Alert",
	component: Alert,
	subcomponents: { Component },
	argTypes: {
		name: {
			text: "Error Alert Name",
			type: { type: "string", required: true },
			defaultValue: "Error",
		},
		errors: {
			text: "Alert body",
			type: { name: "array", required: false },
			defaultValue: undefined,
		},
		show: {
			text: "Visibility",
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
	},
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;
export const Example = Template.bind({});

Example.args = {
	name: "Example",
	errors: [{ title: "some title", message: "some message", reference: "at some reference" }],
	show: true,
};
