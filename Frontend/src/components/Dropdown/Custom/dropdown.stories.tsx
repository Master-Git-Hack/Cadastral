/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from ".";
import { Dropdown as Component, Popover, Whisper, IconButton, ButtonGroup } from "rsuite";
import { Button } from "../../Button";
export default {
	title: "Components/Dropdown/Custom",
	component: Dropdown,
	subcomponents: { Button, Component, Popover, Whisper, IconButton, ButtonGroup },
	argTypes: {
		items: {
			control: { type: "array" },
			defaultValue: [],
		},
		trigger: {
			text: "Trigger",
			control: { type: "select" },

			defaultValue: undefined,
		},
		placement: {
			text: "Placement",
			control: { type: "select" },

			defaultValue: undefined,
		},
		title: {
			text: "Title",
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Press Me",
		},
		onSelect: {
			text: "On Select",
			control: { type: "function" },
			defaultValue: (eventKey: string, event: any) => {
				alert(eventKey);
			},
		},
		children: {
			text: "Children",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		type: {
			text: "Type",
			control: { type: "select" },
			defaultValue: "primary",
		},
		appearance: {
			text: "Appearance",
			control: { type: "select" },
			defaultValue: "link",
		},
		btnSize: {
			text: "Button Size",
			control: { type: "select" },

			defaultValue: "md",
		},
	},
} as ComponentMeta<typeof Dropdown>;
const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});

Default.args = {
	title: "Dropdown",
	items: ["Item 1", "Item 2", "Item 3"],
	onSelect: (eventKey: string | undefined) => {
		alert(eventKey);
	},
};
