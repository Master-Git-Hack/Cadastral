/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Switch } from ".";
import { Toggle } from "rsuite";

export default {
	title: "Components/Input/Switch",
	component: Switch,
	subcomponents: { Toggle },
	argTypes: {
		checked: {
			text: "Checked",
			control: { type: "boolean" },
			type: { name: "boolean", required: true },
			defaultValue: false,
		},
		onChange: {
			text: "On Change",
			control: { type: "function" },
		},
		withText: {
			text: "With Text",
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		label: {
			text: "Label",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		checkedText: {
			text: "Checked Text",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		uncheckedText: {
			text: "Unchecked Text",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		size: {
			text: "Size",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "md",
		},
		reverse: {
			text: "Reverse",
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
	},
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
	checked: false,
	onChange: (checked: boolean) => alert(checked),
};
