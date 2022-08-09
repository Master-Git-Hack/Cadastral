/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "./Dropdown";
import { Button } from "../Button/Button";
export default {
	title: "Components/Dropdown",
	component: Dropdown,
	subcomponents: { Button },
	argTypes: {
		index: {
			text: "Dropdown index",
			type: { name: "number", required: false },
			defaultValue: 0,
		},
		name: {
			text: "Dropdown name",
			type: { name: "string", required: true },
			defaultValue: "dropdown",
		},
		btnText: {
			text: "Dropdown button text",
			type: { name: "string", required: true },
			defaultValue: "Dropdown",
		},
		btnType: {
			text: "Dropdown button type",
			type: { name: "string", required: false },
			defaultValue: "primary",
		},
		options: {
			text: "Dropdown options",
			type: { name: "array", required: true },
			defaultValue: ["Option 1", "Option 2"],
		},
		currentItem: {
			text: "Dropdown current item",
			type: { name: "string" | "number", required: true },
			defaultValue: "Option 1" | 0,
		},
		menuStyle: {
			text: "Dropdown menu custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		btnStyle: {
			text: "Dropdown button custom or bootstrap style",
			type: { name: "string", required: false },
			defaultValue: undefined,
		},
		onClick: {
			text: "Dropdown onClick event",
			type: { name: "function", required: false },
			action: "clicked",
		},
	},
} as ComponentMeta<typeof Dropdown>;
const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;
export const Example = Template.bind({});
Example.args = {
	name: "test",
	btnText: "Dropdown",
	btnType: "primary",
	options: ["Option 1", "Option 2"],
	currentItem: "Option 1",
	onClick: (option: string, index: number) => alert(option + " " + index),
};
