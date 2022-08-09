/** @format */
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "./Dropdown";
import { Dropdown as Component } from "../../Dropdown/Dropdown";

export default {
	title: "Components/Rounded Selection",
	component: Dropdown,
	subcomponents: { Component },
	argTypes: {
		name: {
			text: "Dropdown name",
			type: { name: "string", required: true },
			defaultValue: "some name",
		},
		currentItem: {
			text: "Dropdown currentItem",
			type: { name: "number", required: true },
			defaultValue: 0,
		},
		onClick: {
			text: "Dropdown onClick",
			type: { name: "function", required: true },
			defaultValue: (option: string, index: number) => {},
		},
	},
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;
export const Example = Template.bind({});
Example.args = {
	name: "Dropdown",
	currentItem: 0,
	onClick: (option: string, index: number) =>
		alert("You clicked on " + option + " at index " + index),
};
