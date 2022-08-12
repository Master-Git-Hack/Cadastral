/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from ".";
import { Dropdown as Component } from "rsuite";

export default {
	title: "Components/Dropdown",
	component: Dropdown,
	subcomponents: { Component },
	argTypes: {
		items: {
			control: { type: "array" },

			defaultValue: [],
		},
		trigger: {
			text: "Trigger",
			control: { type: "select" },

			defaultValue: "click",
		},
		placement: {
			text: "Placement",
			control: { type: "select" },

			defaultValue: "bottom-start",
		},
		activeKey: {
			text: "Active Key",
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "",
		},
		title: {
			text: "Title",
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "",
		},
		onSelect: {
			text: "On Select",
			control: { type: "function" },
			defaultValue: (eventKey: string, event: any) => {
				alert(eventKey);
			},
		},
		size: {
			text: "Size",
			control: { type: "select" },
			defaultValue: "md",
		},
		type: {
			text: "Button type",
			control: { type: "select" },
		},
		appearance: {
			text: "Button appearance",
			control: { type: "select" },
		},
	},
} as ComponentMeta<typeof Dropdown>;
const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});

Default.args = {
	title: "Dropdown",
	items: ["Item 1", "Item 2", "Item 3"],
	activeKey: "Item 1",
	onSelect: (eventKey: string, event: any) => {
		alert(eventKey);
	},
};
