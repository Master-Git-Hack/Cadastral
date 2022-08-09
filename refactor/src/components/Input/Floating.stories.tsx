/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Floating } from "./Input";

export default {
	title: "Components/Input/Floating",
	component: Floating,

	argTypes: {
		index: {
			text: "Input index",
			type: { name: "number", required: false },
			defaultValue: 0,
		},
		name: {
			text: "Input name",
			type: { name: "string", required: true },
			defaultValue: "input",
		},
		label: {
			text: "Input label",
			type: { name: "string", required: true },
			defaultValue: "Input",
		},
		onChange: {
			text: "Input onChange event",
			type: { name: "function", required: true },
			action: "changed",
		},
		className: {
			text: "Input className custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		value: {
			text: "Input value",
			type: { name: "string", required: true },
		},

		tag: {
			text: "Input tag",
			type: { name: "string", required: true },
			defaultValue: "Input",
		},
		type: {
			text: "Input type",
			type: { name: "string", required: true },
			defaultValue: "text",
		},
		valueToShow: {
			text: "Input valueToShow",
			type: { name: "string", required: true },
			defaultValue: "value at label",
		},
		minWidth: {
			text: "Input minWidth",
			type: { name: "number", required: false },
			defaultValue: undefined,
		},
		maxLength: {
			text: "Input maxLength",
			type: { name: "number", required: false },
			defaultValue: undefined,
		},
		min: {
			text: "Input min",
			type: { name: "number", required: false },
			defaultValue: undefined,
		},
		max: {
			text: "Input max",
			type: { name: "number", required: false },
			defaultValue: undefined,
		},
		step: {
			text: "Input step",
			type: { name: "number", required: false },
			defaultValue: undefined,
		},
	},
} as ComponentMeta<typeof Floating>;
const Template: ComponentStory<typeof Floating> = (args) => <Floating {...args} />;

export const FloatingInput = Template.bind({});
FloatingInput.args = {
	name: "Floating",
	label: "Floating",
	tag: "Input",
	type: "text",
	value: 0,
	valueToShow: "0",
};
