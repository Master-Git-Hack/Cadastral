/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container, Header, Body, Footer, Component } from ".";
export default {
	title: "Components/Table/Header",
	component: Header,
	argTypes: {
		children: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Spinner",
		},
		className: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		type: {
			control: { type: "select" },

			defaultValue: "light",
		},
	},
} as ComponentMeta<typeof Header>;
const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: "Header",
	className: "",
};
