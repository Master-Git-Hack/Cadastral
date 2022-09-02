/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Spinner } from ".";
import { Loader as Component } from "rsuite";

export default {
	title: "Components/Spinner",
	component: Spinner,
	subcomponents: { Component },
	argTypes: {
		children: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Spinner",
		},
		backdrop: {
			text: "Backdrop",
			control: { type: "boolean" },

			defaultValue: false,
		},
		center: {
			text: "Center",
			control: { type: "boolean" },

			defaultValue: true,
		},
		inverse: {
			text: "Inverse",
			control: { type: "boolean" },

			defaultValue: false,
		},
		size: {
			text: "Size",
			control: { type: "select" },

			defaultValue: "md",
		},
		speed: {
			text: "Speed",
			control: { type: "select" },

			defaultValue: "slow",
		},
		vertical: {
			text: "Vertical",
			control: { type: "boolean" },
			defaultValue: true,
		},
	},
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;
export const Default = Template.bind({});
Default.args = {
	children: "Spinner",
	backdrop: false,
	center: true,
	inverse: false,
	size: "md",
	speed: "slow",
	vertical: true,
};
