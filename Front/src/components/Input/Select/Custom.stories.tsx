/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Select } from ".";
import { SelectPicker as Component } from "rsuite";
import { Item } from "./select.types";
export default {
	title: "Components/Input/Select/Custom",
	component: Select.Custom,
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

			defaultValue: {},
		},
		data: {
			text: "Data",
			defaultValue: [],
		},

		value: {
			text: "Value",

			defaultValue: {},
		},
		placement: {
			text: "Placement",
			control: { type: "select" },

			defaultValue: "bottomStart",
		},
		block: {
			text: "Block",
			control: { type: "boolean" },

			defaultValue: false,
		},
		onSelect: {
			text: "On Select",
			control: { type: "function" },
		},
		size: {
			text: "Size",
			control: { type: "select" },

			defaultValue: "md",
		},
		onChange: {
			text: "On Change",
			control: { type: "function" },
		},
	},
} as ComponentMeta<typeof Select.Custom>;

const Custom: ComponentStory<typeof Select.Custom> = (args) => <Select.Custom {...args} />;

export const CustomSelect = Custom.bind({});

CustomSelect.args = {
	label: "Select",
	defaultValue: 1,
	value: 1,
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
	onSelect: (value) => alert(value),
};
