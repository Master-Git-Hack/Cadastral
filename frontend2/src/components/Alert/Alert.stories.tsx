/** @format */

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Alert } from "./Alert";
export default {
	title: "Components/Alert",
	component: Alert,
	subcomponents: {},
	argTypes: {
		type: {
			text: "Alert type",
			type: { name: "string", required: false },
			defaultValue: "success",
		},
		header: {
			text: "Alert header",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		body: {
			text: "Alert body",
			type: { name: "string", required: true },
			defaultValue: "Some text",
		},
		headerStyle: {
			text: "Alert header custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		bodyStyle: {
			text: "Alert body custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
	},
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;
export const Success = Template.bind({});
export const Danger = Template.bind({});
export const Warning = Template.bind({});
export const Info = Template.bind({});
export const Light = Template.bind({});
export const Dark = Template.bind({});
export const Primary = Template.bind({});
export const Secondary = Template.bind({});

Success.args = {
	type: "success",
	header: "Success",
	children: "Some success text",
};
Danger.args = {
	type: "danger",
	header: "Danger",
	children: "Some danger text",
};
Warning.args = {
	type: "warning",
	header: "Warning",
	children: "Some warning text",
};
Info.args = {
	type: "info",
	header: "Info",
	children: "Some info text",
};
Light.args = {
	type: "light",
	header: "Light",
	children: "Some light text",
};
Dark.args = {
	type: "dark",
	header: "Dark",
	children: "Some dark text",
};
Primary.args = {
	type: "primary",
	header: "Primary",
	children: "Some primary text",
};
Secondary.args = {
	type: "secondary",
	header: "Secondary",
	children: "Some secondary text",
};
