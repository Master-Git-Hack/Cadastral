/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from ".";
export default {
	title: "Components/Table/Container",
	component: Container,
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
			control: { type: "text" },
			type: { name: "string", required: false },
			defaultValue: "light",
		},
	},
} as ComponentMeta<typeof Container>;
const Template: ComponentStory<typeof Container> = (args) => <Container {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: "Container",
	className: "",
};
