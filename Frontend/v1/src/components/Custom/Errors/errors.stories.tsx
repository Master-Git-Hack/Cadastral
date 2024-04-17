/** @format */
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Errors } from ".";
import { Alert } from "../../Alert";

export default {
	title: "Custom/Errors",
	component: Errors,
	subcomponents: { Alert },
	argTypes: {
		name: {
			control: { type: "text" },
			defaultValue: "Errors",
		},
		errors: {
			defaultValue: [],
		},
		show: {
			control: { type: "boolean" },
			defaultValue: false,
		},
	},
} as ComponentMeta<typeof Errors>;
const Template: ComponentStory<typeof Errors> = (args) => <Errors {...args} />;
export const Default = Template.bind({});
Default.args = {
	name: "Errors",
	errors: [
		{ title: "Error 1", message: "Error 1 message", reference: "Error 1 reference" },
		{ title: "Error 2", message: "Error 2 message", reference: "Error 2 reference" },
	],
	show: true,
};
