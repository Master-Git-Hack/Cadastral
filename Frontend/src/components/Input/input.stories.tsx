/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Text } from ".";
import { Input as Component, InputGroup } from "rsuite";

export default {
	title: "Components/Input/Text",
	component: Text,
	subcomponents: { Component, InputGroup },
	argTypes: {
		isArea: {
			text: "Is Area",
			control: { type: "boolean" },
			type: { name: "boolean", required: false },
			defaultValue: false,
		},
		onChange: {
			text: "On Change",
			control: { type: "function" },
		},
		type: {
			text: "Type",
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "text",
		},
		placeholder: {
			text: "Placeholder",
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
		rows: {
			text: "Rows",
			control: { type: "number" },
			type: { name: "number", required: false },
			defaultValue: 1,
		},
	},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
	value: "",
	onChange: (e) => {
		console.log(e);
	},
};
