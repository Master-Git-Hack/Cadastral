/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from ".";
import { Modal as Component } from "rsuite";
import { Button } from "../Button";

export default {
	title: "Components/Modal",
	component: Modal,
	subcomponents: { Component, Button },
	argTypes: {
		action: {
			text: "Action",
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "",
		},
		children: {
			text: "Children",
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "",
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
		btnSize: {
			text: "Button Size",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "md",
		},
		size: {
			text: "Size",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "md",
		},
		header: {
			text: "Header",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		footer: {
			text: "Footer",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		title: {
			text: "Title",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
	},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
	action: "Press Me",
	children: "Something",
};
