/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Alert } from ".";
import { Message } from "rsuite";

export default {
	title: "Components/Alert",
	component: Alert,
	subcomponents: { Message },
	argTypes: {
		closable: {
			text: "Closable",
			control: { type: "boolean" },
			defaultValue: false,
		},
		duration: {
			text: "Duration",
			control: { type: "range" },
			defaultValue: undefined,
		},
		header: {
			text: "Header",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		type: {
			text: "Type",
			control: { type: "select" },

			defaultValue: "success",
		},
		children: {
			text: "Children",
			control: { type: "text" },
		},
	},
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;
export const Success = Template.bind({});
export const Danger = Template.bind({});
export const Warning = Template.bind({});
export const Info = Template.bind({});

Success.args = {
	type: "success",
	header: "Success",
	children: "This is a success message",
};
Danger.args = {
	type: "error",
	header: "Error",
	children: "This is a error message",
};
Warning.args = {
	type: "warning",
	header: "Warning",
	children: "This is a warning message",
};
Info.args = {
	type: "info",
	header: "Info",
	children: "This is an info message",
};
