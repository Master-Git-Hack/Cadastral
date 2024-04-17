/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Body } from ".";
export default {
	title: "Components/Table/Body",
	component: Body,
	argTypes: {
		children: {
			control: { type: "text" },
			type: { name: "string", required: true },
			defaultValue: "Spinner",
		},
		className: {
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "",
		},
		type: {
			control: { type: "select" },

			defaultValue: "light",
		},
	},
} as ComponentMeta<typeof Body>;

const Template: ComponentStory<typeof Body> = (args) => <Body {...args} />;
export const Default = Template.bind({});
Default.args = {
	children: "Body",
	className: "",
};
