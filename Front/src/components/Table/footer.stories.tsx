/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Footer } from ".";
export default {
	title: "Components/Table/Footer",
	component: Footer,
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
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
	children: "Footer",
	className: "",
};
