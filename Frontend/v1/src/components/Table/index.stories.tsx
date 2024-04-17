/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Container, Header, Body, Footer, Component } from ".";
export default {
	title: "Components/Table/Component",
	component: Component,
	subcomponents: { Container, Header, Body, Footer },
	argTypes: {
		name: {
			control: { type: "string" },
			type: { name: "string", required: true },
			defaultValue: "Table",
		},
		header: {
			defaultValue: [],
		},
		body: {
			defaultValue: [],
		},
		footer: {
			defaultValue: [],
		},
		customHeader: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		customBody: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		customFooter: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		hasFooter: {
			control: { type: "boolean" },

			defaultValue: false,
		},
	},
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});

Default.args = {
	name: "Table",
	header: ["Header 1", "Header 2", "Header 3"],
	body: [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	],
	footer: ["Footer 1", "Footer 2", "Footer 3"],
	hasFooter: true,
};
