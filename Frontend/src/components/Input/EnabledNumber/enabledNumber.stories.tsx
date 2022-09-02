/** @format */

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InputNumber } from "rsuite";
import { Switch } from "../Switch";
import { EnabledInputNumber } from ".";

export default {
	title: "Components/Input/EnabledNumber",
	component: EnabledInputNumber,
	subcomponents: { Switch, InputNumber },
	argTypes: {
		defaultValue: { control: "number" },
		max: { control: "number" },
		min: { control: "number" },
		step: { control: "number" },
		value: { control: "number" },
		onChange: { action: "onChange" },
		size: { control: "select", options: ["sm", "md", "lg"] },
		postfix: { control: "text" },
		prefix: { control: "text" },
		checked: { control: "boolean" },
		setChecked: { action: "onChange" },
	},
} as ComponentMeta<typeof EnabledInputNumber>;

const Template: ComponentStory<typeof EnabledInputNumber> = (args) => (
	<EnabledInputNumber {...args} />
);
export const Default = Template.bind({});
Default.args = {
	value: 0,
	onChange: (value) => console.log(value),
	checked: false,
	setChecked: (checked) => console.log(checked),
};
