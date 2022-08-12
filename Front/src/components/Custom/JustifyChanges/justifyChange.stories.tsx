/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { JustifyChanges } from ".";
import { Modal } from "../../Modal";

import { Input } from "../../Input";
const { Switch, Text } = Input;

export default {
	title: "Custom/JustifyChanges",
	component: JustifyChanges,
	subcomponents: { Modal, Switch, Text },
	argTypes: {
		type: {
			text: "Button Type",
			control: { type: "select" },
			defaultValue: "info",
		},
		appearance: {
			text: "Button Appearance",
			control: { type: "select" },
			defaultValue: "default",
		},
		btnSize: {
			text: "Button Size",
			control: { type: "select" },
			defaultValue: "md",
		},
		size: {
			text: "Modal Size",
			control: { type: "select" },
		},
		action: {
			text: "Modal Action",
			control: { type: "text" },
		},
		name: {
			text: "Modal Name",
			control: { type: "text" },
		},
		editable: {
			text: "Modal Editable",
			control: { type: "boolean" },
		},
		setEditable: {
			text: "Modal SetEditable",
			control: { type: "function" },
		},
		comment: {
			text: "Modal Comment",
			control: { type: "text" },
		},
		setComment: {
			text: "Modal SetComment",
			control: { type: "function" },
		},
		children: {
			text: "Modal Children",
			control: { type: "text" },
		},
	},
} as ComponentMeta<typeof JustifyChanges>;
const Template: ComponentStory<typeof JustifyChanges> = (args) => <JustifyChanges {...args} />;

export const Default = Template.bind({});
Default.args = {
	action: "Press Me",
	editable: false,
	comment: "Justificacion",
	children: "Elemento",
};
