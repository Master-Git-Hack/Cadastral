/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Fancy } from ".";
export default {
	title: "Components/Input/Fancy",
	component: Fancy,
	argTypes: {
		value: {
			control: { type: "number" },
			type: { name: "number", required: true },
			defaultValue: 0,
		},
		isCurrency: {
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		isPercentage: {
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		classNameEditing: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		classNameDecorator: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		decimals: {
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 2,
		},
		onChange: {
			control: { type: "function" },
		},
	},
} as ComponentMeta<typeof Fancy>;

const Template: ComponentStory<typeof Fancy> = (args) => <Fancy {...args} />;
export const Default = Template.bind({});
export const Currency = Template.bind({});
export const Percentage = Template.bind({});

Default.args = {
	value: 99.99,
};
Currency.args = {
	value: 99.99,
	isCurrency: true,
};
Percentage.args = {
	value: 99.99,
	isPercentage: true,
};
