/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Badge } from ".";
import { Badge as Component } from "rsuite";

export default {
	title: "Components/Badge",
	component: Badge,
	subcomponents: { Component },
	argTypes: {
		children: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		type: {
			text: "Type",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "primary",
		},
		text: {
			text: "Text",
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "",
		},
	},
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Success = Template.bind({});
export const Danger = Template.bind({});
export const Warning = Template.bind({});
export const Info = Template.bind({});
export const Orange = Template.bind({});

Primary.args = {
	type: "primary",
	text: "Primary",
};
Secondary.args = {
	type: "secondary",
	text: "Secondary",
};
Success.args = {
	type: "success",
	text: "Success",
};
Danger.args = {
	type: "danger",
	text: "Danger",
};
Warning.args = {
	type: "warning",
	text: "Warning",
};
Info.args = {
	type: "info",
	text: "Info",
};
Orange.args = {
	type: "orange",
	text: "Orange",
};
