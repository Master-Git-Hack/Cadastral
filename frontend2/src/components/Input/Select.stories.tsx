/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Select } from "./Input";

export default {
	title: "Components/Input/Select",
	component: Select,

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
		current: {
			text: "Input current element for select",
			type: { name: "object", required: true },
			defaultValue: {
				value: {
					text: "Input value",
					type: { name: "number", required: true },
				},
				type: {
					text: "Input type",
					type: { name: "string", required: true },
				},
			},
		},
		options: {
			text: "Input options",
			type: { name: "array", required: true },
			defaultValue: [
				{
					value: {
						text: "Input value",
						type: { name: "number", required: true },
					},
					type: {
						text: "Input type",
						type: { name: "string", required: true },
					},
				},
			],
		},
	},
} as ComponentMeta<typeof Select>;
const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const SelectInput = Template.bind({});
SelectInput.args = {
	name: "Select",
	label: "Select",
	current: {
		value: 1,
		type: "type 1",
	},
	options: [
		{
			id: 0,
			name: "Option 1",
			value: 1,
			type: "type 1",
		},
		{
			id: 1,
			name: "Option 2",
			value: 2,
			type: "type 2",
		},
		{
			id: 2,
			name: "Option 3",
			value: 3,
			type: "type 3",
		},
	],
};
