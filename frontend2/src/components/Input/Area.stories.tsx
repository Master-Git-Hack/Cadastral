/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Area } from "./Input";

export default {
	title: "Components/Input/Area",
	component: Area,
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
			defaultValue: "",
		},
		rows: {
			text: "Input rows for textarea",
			type: { name: "number", required: false },
			defaultValue: 1,
		},
	},
} as ComponentMeta<typeof Area>;

const Template: ComponentStory<typeof Area> = (args) => <Area {...args} />;

export const Input = Template.bind({});
Input.args = {
	name: "Area",
	label: "Area",
	value: "",
	rows: 2,
};
