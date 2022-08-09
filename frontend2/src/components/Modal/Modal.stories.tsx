/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";
import { Modal as Component } from "react-bootstrap";

export default {
	title: "Components/Modal",
	component: Modal.Regular,
	subcomponents: { Component },
	argTypes: {
		actionToDo: {
			text: "Action to do",
			type: { name: "string", required: true },
			defaultValue: "show",
		},
		title: {
			text: "Title",
			type: { name: "string", required: true },
			defaultValue: "Modal",
		},

		btnType: {
			text: "Button type",
			type: { name: "string", required: false },
			defaultValue: "primary",
		},
	},
} as ComponentMeta<typeof Modal.Regular>;

const Template: ComponentStory<typeof Modal.Regular> = (args) => (
	<Modal.Regular {...args}>
		<div>Elements</div>
	</Modal.Regular>
);
export const Example = Template.bind({});
Example.args = {
	actionToDo: "show",
	title: "Modal",
};
