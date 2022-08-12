/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Range } from ".";
import { Slider as Component } from "rsuite";

export default {
	title: "Components/Input/Range",
	component: Range,
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
} as ComponentMeta<typeof Range>;

const Template: ComponentStory<typeof Range> = (args) => <Range {...args} />;

export const Default = Template.bind({});
Default.args = {
	defaultValue: 0,
	onChange: (value) => alert(value),
	min: 0,
	max: 100,
	step: 1,
	progress: false,
};
