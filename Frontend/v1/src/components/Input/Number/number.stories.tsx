/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { InputNumber as Component, InputGroup } from "rsuite";
import { InputNumber } from ".";
export default {
	title: "Components/Input/Number",
	component: InputNumber,
	subcomponents: { Component, InputGroup },
	argTypes: {
		defaultValue: {
			control: { type: "number" },
		},
		disabled: { control: { type: "boolean" } },
		max: { control: { type: "number" } },
		min: { control: { type: "number" } },
		step: { control: { type: "number" } },
		value: {
			control: { type: "number" },
			type: { name: "number", required: true },
			defaultValue: 0,
		},

		size: { control: { type: "select", options: ["lg", "md", "sm", "xs"] } },
	},
} as ComponentMeta<typeof InputNumber>;

const Template: ComponentStory<typeof InputNumber> = (args) => {
	const [value, setValue] = useState(0);
	return <InputNumber {...args} value={value} onChange={setValue} />;
};
export const Default = Template.bind({});
