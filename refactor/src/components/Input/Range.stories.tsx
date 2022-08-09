/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Range } from "./Input";

export default {
	title: "Components/Input/Range",
	component: Range,

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
			type: { name: "number", required: true },
			defaultValue: 0,
		},
		disabled: {
			text: "Input disabled",
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
	},
} as ComponentMeta<typeof Range>;
const Template: ComponentStory<typeof Range> = (args) => <Range {...args} />;
/*export const RangeInput = Template.bind({});
RangeInput.args = {
	name: "Range",
	label: "Range",
	value: 0,
	onChange: (event) => alert(event.target.value),
};*/
