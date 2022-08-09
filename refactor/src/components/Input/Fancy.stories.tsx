/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Fancy } from "./Input";

export default {
	title: "Components/Input/Fancy",
	component: Fancy,

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
		isCurrency: {
			text: "Input isCurrency",
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		isPercentage: {
			text: "Input isPercentage",
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		classNameEditing: {
			text: "Input classNameEditing custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		classNameDecorator: {
			text: "Input classNameEditing custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		decimals: {
			text: "Input decimals",
			type: { name: "number", required: false },
			defaultValue: 2,
		},
	},
} as ComponentMeta<typeof Fancy>;
const Template: ComponentStory<typeof Fancy> = (args) => <Fancy {...args} />;
export const FancyCurrency = Template.bind({});
export const FancyPercentage = Template.bind({});
export const FancyNumber = Template.bind({});
FancyCurrency.args = {
	name: "Fancy",
	label: "Fancy",
	value: 0,
	isCurrency: true,
};
FancyPercentage.args = {
	name: "Fancy",
	label: "Fancy",
	value: 0,
	isPercentage: true,
};
FancyNumber.args = {
	name: "Fancy",
	label: "Fancy",
	value: 0,
};
