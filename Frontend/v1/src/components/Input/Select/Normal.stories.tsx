/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Select } from ".";
import { SelectPicker as Component } from "rsuite";
import { Item } from "./select.types";
export default {
	title: "Components/Input/Select/Normal",
	component: Select.Normal,
	subcomponents: { Component },
	argTypes: {
		index: {
			text: "Index",
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 0,
		},
		className: {
			text: "Class Name bootstrap or rsuite or custom",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		label: {
			text: "Label",
			control: { type: "text" },
			type: { name: "string", required: false },
		},
		labelKey: {
			text: "custom label Key",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "label",
		},
		valueKey: {
			text: "custom value Key",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "value",
		},
		defaultValue: {
			text: "Default Value",
			control: { type: "text" },
			defaultValue: undefined,
		},
		data: {
			text: "Data",

			defaultValue: [],
		},

		value: {
			text: "Value",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		placement: {
			text: "Placement",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "bottomStart",
		},
		block: {
			text: "Block",
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		onSelect: {
			text: "On Select",
			control: { type: "function" },
		},
		size: {
			text: "Size",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "md",
		},
		onChange: {
			text: "On Change",
			control: { type: "function" },
		},
	},
} as ComponentMeta<typeof Select.Normal>;

const Normal: ComponentStory<typeof Select.Normal> = (args) => <Select.Normal {...args} />;

export const Default = Normal.bind({});

Default.args = {
	label: "Select",
	value: {
		label: "+",
		value: 1,
	},
	data: [
		{
			label: "+",
			value: 1,
		},
		{
			label: "=",
			value: 0,
		},
		{
			label: "-",
			value: -1,
		},
	],
	onChange: (event) => alert(event.currentTarget.value),
};
