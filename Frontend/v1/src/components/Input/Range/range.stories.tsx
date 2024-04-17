/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InputRange } from ".";
import { Slider as Component } from "rsuite";

export default {
	title: "Components/Input/Range",
	component: InputRange,
	subcomponents: { Component },
	argTypes: {
		defaultValue: {
			control: { type: "number" },
			type: { name: "number", required: true },
			defaultValue: 0,
		},
		min: {
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 0,
		},
		max: {
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 100,
		},
		step: {
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 1,
		},
		progress: {
			control: { type: "boolean" },

			defaultValue: false,
		},
		onChange: {
			control: { type: "function" },
			defaultValue: (value: number) => {
				console.log(value);
			},
		},
	},
} as ComponentMeta<typeof InputRange>;

const Template: ComponentStory<typeof InputRange> = (args) => <InputRange {...args} />;

export const Default = Template.bind({});
Default.args = {
	defaultValue: 0,
	min: 0,
	max: 100,
	step: 1,
	progress: false,
};
