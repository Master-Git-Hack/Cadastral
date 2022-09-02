/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LinkPreviewed } from ".";
import { LinkPreview as Component } from "@dhaiwat10/react-link-preview";
import { Text } from "../Input";

export default {
	title: "Components/LinkPreview",
	component: LinkPreviewed,
	subcomponents: { Component, Text },
	argTypes: {
		onChange: {
			type: { name: "function", required: true },
		},
		value: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: null,
		},
		size: {
			control: { type: "select" },

			defaultValue: "xs",
		},
	},
} as ComponentMeta<typeof LinkPreviewed>;

const Template: ComponentStory<typeof LinkPreviewed> = (args) => <LinkPreviewed {...args} />;
export const Default = Template.bind({});

Default.args = {
	onChange: (value) => {
		console.log(value);
	},

	size: "xs",
};
