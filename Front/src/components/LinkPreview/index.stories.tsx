/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LinkPreview } from ".";
import { LinkPreview as Component } from "@dhaiwat10/react-link-preview";
import { Text } from "../Input";

export default {
	title: "Components/LinkPreview",
	component: LinkPreview,
	subcomponents: { Component, Text },
	argTypes: {
		onChange: {
			type: { name: "function", required: true },
		},
		value: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "",
		},
		size: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "xs",
		},
	},
} as ComponentMeta<typeof LinkPreview>;

const Template: ComponentStory<typeof LinkPreview> = (args) => <LinkPreview {...args} />;
export const Default = Template.bind({});

Default.args = {
	onChange: (value) => {
		alert(value);
	},
	value: "",
	size: "xs",
};
