/** @format */

/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from ".";
import { Button as Component } from "rsuite";

export default {
	title: "Components/Button",
	component: Button,
	subcomponents: { Component },
	argTypes: {
		children: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Button",
		},
		type: {
			text: "Type",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "primary",
		},
		appearance: {
			text: "Appearance",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "default",
		},
		block: {
			text: "Block",
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		href: {
			text: "Href",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		loading: {
			text: "Loading",
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		size: {
			text: "Size",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "md",
		},
		onClick: {
			text: "On Click",
			control: { type: "function" },
		},
	},
} as ComponentMeta<typeof Button>;
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
export const Primary = Template.bind({});
export const Link = Template.bind({});
export const Light = Template.bind({});
export const Outline = Template.bind({});

Default.args = {
	children: "Press me",
	type: "primary",
	appearance: "default",
};
Primary.args = {
	children: "Press me",
	type: "primary",
	appearance: "primary",
};
Link.args = {
	children: "Press me",
	type: "primary",
	appearance: "link",
	href: "https://www.google.com",
};
Light.args = {
	children: "Press me",
	type: "primary",
	appearance: "light",
};

Outline.args = {
	children: "Press me",
	type: "primary",
	appearance: "outline",
};
